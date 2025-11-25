# Lua函数/闭包的底层实现

## 简述
在Lua中，`function`作为**一等公民**(first-class)类型。对于Lua内部而言，它实际上有三种子类型：
- **Lua闭包**(Lua closure)
- **轻量C函数**(Light C function)
- **C闭包**(C closure)

关于“函数*function*”和“闭包closure”这两个概念需要做出区分，尽管它们在Lua中密切相关，大部分时候它们的意思也相近。但它们二者在内部是不同的实现：函数是无状态的，其只包含了“计算方法”，只能负责接受参数然后返回结果；而闭包是可以包含状态的，可以依赖外部的变量或值。

下方的代码示例中，`increment` 函数引用了外部作用域中的 `counter` 变量，因此它形成了一个闭包。每次调用 `increment()` 都会改变并记住 `counter` 的值，这体现了闭包的状态性。

```lua
local counter = 0

-- 这是一个闭包，因为它捕获了外部变量 `counter`
local function increment()
    counter = counter + 1
    return counter
end

print(increment()) --> 1
print(increment()) --> 2
```

故而用户在Lua脚本中声明的`function`，实际上并非一个“函数”，而是闭包，只不过有些“函数”没有状态（不依赖任何外部变量），因此可以被看作是无状态的闭包。

## 结构原型
```c
typedef struct Proto {
  CommonHeader;
  lu_byte numparams;
  lu_byte is_vararg;
  lu_byte maxstacksize;
  int sizeupvalues;
  int sizek;
  int sizecode;
  int sizelineinfo;
  int sizep;
  int sizelocvars;
  int sizeabslineinfo;
  int linedefined;
  int lastlinedefined;
  TValue *k;
  Instruction *code;
  struct Proto **p;
  Upvaldesc *upvalues;
  ls_byte *lineinfo;
  AbsLineInfo *abslineinfo;
  LocVar *locvars;
  TString  *source;
  GCObject *gclist;
} Proto;
```