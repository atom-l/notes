# Lua表的底层实现（Lua5.4）

## 结构原型

```c
typedef struct Table {
  CommonHeader;
  lu_byte flags;
  lu_byte lsizenode;
  unsigned int alimit;
  TValue *array;
  Node *node;
  Node *lastfree;
  struct Table *metatable;
  GCObject *gclist;
} Table;
```
其中成员`array`和`node`分别是Lua表的数组和哈希部分。

其中哈希部分是以下边的数据结构`Node`来存储各个键值对的：
```c
typedef union Node {
  struct NodeKey {
    TValuefields;
    lu_byte key_tt;
    int next;
    Value key_val;
  } u;
  TValue i_val;
} Node;
```

## 数组部分的实现
Lua的表（`table`）是数组和哈希的结合体，底层实现为哈希表。数组部分是连续内存存储，哈希部分则是哈希表存储。

因此，如果要讨论Lua的表，就要分别讨论这两者。这里我们先讨论较为简单的数组部分。

### 数组部分的扩容和缩容策略
对于新的Key，且该Key是个整数，那么会先触发Lua对数组部分的优化，优化策略如下：
1. 先收集表中有多少个整数Key（包括数组和哈希部分的），我们记为`AllNumCount`
2. 在上一步遍历数组部分的过程中，顺便收集数组部分在以2为底的各指数幂的范围内有多少个整数Key，即：设 0 < n < 31, 且Key值满足 2^(n-1) < Key <= 2^n 的个数
3. 根据前边收集的整数键值数量以及在数组部分的分布，求出一个新的指数`NewIndexN`，满足分布在\[1, 2^`NewIndexN`\]的键值数量超过`AllNumCount`的一半
4. 那么新的数组部分的大小就是2^`NewIndexN`
> 这部分的逻辑可以参考Lua源码中的`computesizes`函数实现。

Lua采用这种做法还是为了平衡空间和计算的成本。

### Xmilia trick
`Table`中的`alimit`字段用于“指示”数组部分的大小，而并非直接记录`array`的size。在这里Lua使用到了其称为“Xmilia trick”的技巧。

根据`Table.flags`的位标志（当前最新Lua代码中为第七位），`alimit`字段表示两种信息：
1. （标志未置1）`alimit`直接表示`Table.array`的大小。
2. （标志已置1）`alimit`作为用于指示取长操作的值，其含义为“在数组部分的 \[1, alimit\] 区间内有边界”，同时`Table.array`的大小size满足："size = 2^p >= alimit > 2^(p-1)"。

这种操作是为了在用户使用取长操作符`#`和查询表的整数键的场景中获得优化，我们分开讨论。

首先，使用`#`时，`alimit`会分为几种情况来指示“边界”(即对数组做取长操作的结果)的位置：
1. 当tb\[`alimit`\]为空时，那么数组大小的“边界”必定在`alimit`之前，此时再检查tb\[`alimit` - 1]是否非空，如果是，那么边界就是 `alimit` - 1 了；反之就在数组的 \[1, alimit\] 中做二分查找以确定边界。
2. 当tb\[`alimit`\]非空时，先尝试检查tb\[`alimit` + 1]是否为空，如果是，那么边界就是`alimit`了；如果不是，就进一步检查`array`的最后一个元素是否为空，如果检查成功，则在`alimit`之后的区域做二分查找以确定边界。
3. 当前两种情况都未找到边界时（此时要么是`array`部分的长度为0，要么是`array`的最后一个元素非空），此时必须在哈希部分查找边界了。

## 哈希部分的实现

### 各类型Key的哈希地址
- 对于`nil`：不用取地址，直接返回一个内部特殊定义的空值即可
- 对于整数`number`: 对于整数，直接与哈希表的大小取模；对于实际上是个整数值的浮点数，也会将其转换为整数后用本方法计算地址
- 对于浮点数`number`：一般将指数和尾数相加，如果取尾数失败则返回0，如果相加得到的结果超出有符号整数的范围则按位取反
- 对于`string`中的[短字符串](/lua/string-implementation.md#短字符串的创建)：直接取其附带的哈希值与哈希表的大小的模
- 对于`string`中的[长字符串](/lua/string-implementation.md#长字符串的创建)：如果该字符串从未计算过哈希，则计算出哈希值并保存，再用该哈希值与哈希表大小取模
- 对于`boolean`：`false`的哈希值为0，`true`的哈希值为1，再与哈希表大小取模
- 对于`lightuserdata`：直接取其地址与哈希表的大小取模
- 对于`lightCFunction`：直接取该函数地址与哈希表的大小取模
- 其他（`userdata`、`function`、`CFunction`以及`table`本身等类型）：直接对其gcobject部分的地址与哈希表的大小取模
> [!NOTE]
> 上边提到的取模操作实际上会先向上取奇数再与哈希表的大小取模，因为哈希表的大小通常为2的幂，所以这样到的地址分布会更均匀。

### 地址分布与冲突
获取哈希地址后，便可根据该地址将键值对存入 `Table.node` 所指向的 `Node` 数组中。

针对哈希地址冲突的问题，Lua 表的处理方式不同于短字符串缓存所采用的链地址法。Lua 使用一种称为 **带 Brent 变化的链式散列表**（chained scatter table with Brent's variation） 的方法来解决冲突。其工作原理如下：

- 每个 Key 通过前述方法计算出的哈希地址被称为 **主位置**。
- 当所有 Key 的 **主位置** 均不相同时，每个键值对对应的 `Node` 节点会被存放在 `Table.node` 数组中与其 **主位置** 下标对应的位置。
- 对于发生冲突的 Key，则会在数组中寻找一个空闲位置进行存放，并通过 `Node.u.next` 将具有相同 **主位置** 的节点串联成一个“链表”。其中，`Node.u.next` 存储的是当前节点与下一个节点之间的地址偏移量。

结构示意如下：

<center>
    <img src="/hashnode.png">
</center>

当插入一个新键时，其流程如下（不考虑扩容或缩容）：
1. 首先根据上文所述方法计算出该键的哈希地址，并将其作为 **主位置**。
2. 检查 **主位置** 是否已经存在键值对（即发生冲突）。若无冲突，则直接将新键值对存入该位置；否则进入下一步。
3. 对于 **冲突节点**，重新计算其键的 **主位置**，并判断该地址是否与其当前所在位置一致。
4. 如果 **冲突节点** 的 **主位置** 与其当前位置不一致，说明它是因为冲突而被移至此处。此时应将其移动到一个更合适的空闲位置，然后将新键值对插入到原 **主位置** 。
5. 如果 **冲突节点** 的 **主位置** 正好等于其当前位置，说明它是该位置的“合法拥有者”。这时需为新键值对寻找一个新的空闲位置，并将其链接到当前主节点与其后续节点之间（如有）。
> 空闲位置通过 `Table.lastfree` 向前遍历查找获得。

### 扩缩容策略
因为`Table.lastfree`是单向递减的，所以只要经过若干次的插入新Key操作，就会因为找不到空闲位置而触发`rehash`，要么因为容量不够而扩容，要么因为浪费空间太多而缩容，每次次扩缩容都会重排哈希表。

哈希表的长度必然是2的幂，且保证元素使用率达到50%，即满足：HashSize = 2^p > ElementCount >= 2^(p-1) 。

## 补充细节
### 取长操作符没那么“严谨”
[上文](#xmilia-trick)提到，取长操作符在某些情况下是会根据`alimit`的指示来计算结果的。尤其是在“tb\[`alimit`\] == nil && tb\[`alimit`\ - 1] ~= nil”时，会直接得出结果：`alimit` - 1 。

这里就会引入一个争议：难道`alimit`之前就不存在一个`OtherBoundary`能满足“`OtherBoundary` < `alimit` && tb\[`OtherBoundary`\] == nil && tb\[`OtherBoundary`\ - 1] ~= nil”吗？

尤其是`alimit`这个指示值的更新是对用户隐藏的，那么取长操作符`#`在某些情况下返回的结果就会不符合一般预期，例如：
```lua
> tb = {}
> tb[1] = "A"
> tb[2] = "B"
> tb[3] = "C"
> print("The length of tb is:", #tb)
The length of tb is:    3
> tb[4] = "D"
> print("The length of tb is:", #tb)
The length of tb is:    4
> tb[3] = nil
> print("The length of tb is:", #tb)
The length of tb is:    4
```
但这种“不严谨”的表现，却是非常“严谨”地符合在Lua官方[参考手册](https://www.lua.org/manual/5.4/manual.html#3.4.7)中的描述（翻译版）：
> 恰好有一个边界的表被称为序列。例如，表{10, 20, 30, 40, 50}就是一个序列，因为它只有一个边界（5）。表{10, 20, 30, nil, 50}有两个边界（3和5），因此它不是一个序列。（索引4处的nil被称为空洞。）表{nil, 20, 30, nil, nil, 60, nil}有三个边界（0、3和6），所以它也不是一个序列。表{}是一个边界为0的序列。
>
> 当t是序列时，#t会返回其唯一的边界，这与序列长度的直观概念相对应。当t不是序列时，#t可能返回其任意一个边界。（具体返回哪一个取决于表的内部细节，而这又可能取决于表的填充方式以及非数字键的内存地址。）

所以也不太好说它……是吧？:)

## 数组内存布局优化（Lua5.5新增）
首先是数据结构变化：
```c
typedef struct Table {
  CommonHeader;
  lu_byte flags;  /* 1<<p means tagmethod(p) is not present */
  lu_byte lsizenode;  /* log2 of number of slots of 'node' array */
  unsigned int asize;  /* number of slots in 'array' array */
  // [!code --]
  TValue *array;  /* array part */
  // [!code ++]
  Value *array;  /* array part */
  Node *node;

  struct Table *metatable;
  GCObject *gclist;
} Table;
```
`Table.array`部分不再使用`TValue`，而是使用`Value`。

其中原本使用的`TValue`结构为：
```c
typedef struct TValue {
  Value value_;
  lu_byte tt_;
} TValue;
```
其中`Value`大小为8字节，`lu_byte`大小为1字节，因为内存对齐的关系，`TValue`则占用16字节。实际会浪费了7个字节。

在Lua5.5中，将value和tag分开连续存储，其中Value倒序存储，tag正序存储，两者相接仅隔开一个无符号整数。如图所示：

<center>
    <img src="/table-impl-1.png">
</center>

优化后的结构在使用大型数组的场景下，最多可节约60%的内存开销（指总开销，不止只是这里的优化带来的）。
