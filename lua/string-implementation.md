# Lua字符串的底层实现

## 简介
在Lua中，字符串`string`是其“first class”，是内部定义的一种值类型。一般意义上，就是表示一个不可变的字符串。但在Lua的设计中，它是一种标定了长度的字节块。也就是说，它甚至可以包含'\0'。

在Lua虚拟机内部使用中，对于字符串分为两类：短字符串和长字符串。至于长度超过多少就算长字符串，则由C代码中的`LUAI_MAXSHORTLEN`宏定义，默认为40。

对于短字符串，Lua会使用一种哈希结构来重用相同内容的短字符串。而对于长字符串，因为哈希的代价较高，则原样存储。Lua通过这样的策略，平衡了字符串对计算和内存空间的成本。

## 结构原型
```c
typedef struct TString {
  CommonHeader;
  lu_byte extra;
  lu_byte shrlen;
  unsigned int hash;
  union {
    size_t lnglen;
    struct TString *hnext;
  } u;
  char contents[1];
} TString;
```
其中各字段的含义为：
- `CommonHeader`：每种lua值都有的公共头部，包含类型和GC相关的信息
- `extra`：额外信息，对于短字符串，非零值表示该字符串为Lua语法的保留字；对于长字符串，非零值则表示已计算过哈希值
- `shrlen`：表示短字符串的长度，对于长字符串该值为0xFF
- `hash`：字符串的哈希值
- `u`：一个联合体，储存长字符串的length，或短字符串的哈希链表
- `contents`：字符串内容

## 一个`string`的诞生
上文说到，Lua对于短字符串和长字符串的处理是不同的。Lua尽可能地在空间消耗和性能之间取得平衡。

### 短字符串的创建
Lua内部使用一种哈希表来保存短字符串，以实现对短字符串的重用。

该哈希表的数据结构`stringtable`的定义如下：
```c
typedef struct stringtable {
  TString **hash; // 表体
  int nuse; // 该表中成员的数量
  int size; // 该表的容量
} stringtable;
```

既然是对哈希表操作，那么首先就需要得到字符串的哈希值。Lua采用了一种非常简单的 rotating hash 算法：以虚拟机创建时初始化的 seed 与字符串长度进行异或运算作为初始值，然后依次遍历字符串中的每个字节，通过简单的位移操作和加法运算，最终得出哈希值。之所以选择这种hash方式，主要是因为性能优越，尽管实现简单，但能很好地混合高位低位以及字节值顺序的信息。

对应的函数及其实现如下：
```c
unsigned int luaS_hash (const char *str, size_t l, unsigned int seed) {
  unsigned int h = seed ^ cast_uint(l);
  for (; l > 0; l--)
    h ^= ((h<<5) + (h>>2) + cast_byte(str[l - 1]));
  return h;
}
```

拿到哈希值后，则先取得哈希表中的位置，以检查是否已经存在相同内容的字符串。表体对应的是`stringtable`的`hash`字段。将字符串的哈希值对哈希表的地址数量取余就得到了其位置。

但总要面对一个经典问题：地址碰撞。这里Lua使用了简单的“链地址法”，发生碰撞时，将同地址下的不同字符串值以链表的形式连接起来（见上文中[`TString`](#结构原型)的`u.hnext`字段）。

虽然有链地址法来解决碰撞，但哈希表的地址总数仍然需要维持在合理的大小内。在Lua内部，当哈希地址的占用率不足1/4时会缩容，而在哈希地址满占用时会扩容，扩容和缩容的倍率都是2（哈希地址的初始总数默认为128，且Lua核心实现就会创建50多个短字符串，因此哈希地址的数量一定是以2为底的指数）。
在扩容和缩容时，如果遇到内存分配失败，则忽略错误并保持原样，这样虽然会降低性能，但Lua还是希望能尽可能地保持运行。

### 长字符串的创建
长字符串的创建嘛，就简单多了，只做一个简单的长度检查，然后作为一个Lua对象被创建并压入栈中即可，读者一看便知：
```c
TString *luaS_newlstr (lua_State *L, const char *str, size_t l) {
  if (l <= LUAI_MAXSHORTLEN)
    return internshrstr(L, str, l);
  else {
    // [!code focus:5]
    TString *ts;
    if (l_unlikely(l * sizeof(char) >= (MAX_SIZE - sizeof(TString))))
      luaM_toobig(L);
    ts = luaS_createlngstrobj(L, l);
    memcpy(getlngstr(ts), str, l * sizeof(char));
    return ts;
  }
}

```

## 一些小细节

### 面向 C API 的缓存
在Lua的内部实现中，一般使用内部公开的接口`luaS_new`来创建字符串，该函数实现为：
```c:line-numbers
TString *luaS_new (lua_State *L, const char *str) {
  // [!code focus:7]
  unsigned int i = point2uint(str) % STRCACHE_N;
  int j;                                          
  TString **p = G(L)->strcache[i];                
  for (j = 0; j < STRCACHE_M; j++) {              
    if (strcmp(str, getstr(p[j])) == 0)           
      return p[j];                                
  }                                               

  for (j = STRCACHE_M - 1; j > 0; j--)
    p[j] = p[j - 1];
  p[0] = luaS_newlstr(L, str, strlen(str));
  return p[0];
}
```
其中2-8行的部分是我们要关注的部分。

因为Lua的C API用户（Lua虚拟机内部其实也常用这些接口）常常从一些C字符串常量创建Lua字符串值，所以该热点是有很大的优化价值的。

Lua专门在虚拟机中开辟了一块面向API使用者的字符串缓存。这块缓存容量有限，采用传入字符串地址取余的方式进行哈希。当检测到目标字符串已存在时，直接返回缓存中的Lua字符串；否则，淘汰旧缓存项以腾出空间容纳新创建的字符串值。

### 长字符串其实也会计算哈希值
上文说到，Lua为了平衡计算和空间成本，是会将短字符串放在哈希表中的，而长字符串是直接存储的。

那么计算长字符串的哈希值意义在哪？

答案是长字符串不会在被创建时就计算其哈希值，而当长字符串作为一个`table`的索引之一时，会计算哈希值。因为`table`也是个哈希表呀！

由于Lua内部实现中广泛使用表结构（不仅限于用户层面），长字符串在大多数情况下仍需计算哈希值，尤其是在作为表键使用时。只有在极少数通过C API直接操作的场景下，才会跳过哈希计算。所幸，长字符串的哈希值只需要计算一次。

### 哈希所使用到的seed是如何产生的
先看代码:
```c
#define addbuff(b,p,e) \
  { size_t t = cast_sizet(e); \
    memcpy(b + p, &t, sizeof(t)); p += sizeof(t); }

static unsigned int luai_makeseed (lua_State *L) {
  char buff[3 * sizeof(size_t)];
  unsigned int h = cast_uint(time(NULL));
  int p = 0;
  addbuff(buff, p, L);  /* heap variable */
  addbuff(buff, p, &h);  /* local variable */
  addbuff(buff, p, &lua_newstate);  /* public function */
  lua_assert(p == sizeof(buff));
  return luaS_hash(buff, p, h);
}
```
其实就是将当前时间戳作为种子，根据一个由虚拟机地址、时间戳、lua_newstate函数地址混合起来的“字符串”，送入Lua字符串的哈希函数得出！