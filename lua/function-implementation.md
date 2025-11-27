# Lua函数/闭包的底层实现

## 简述
Lua的工作机制是从一个函数开始执行，函数是Lua程序的基本构建块。函数的内部机制是Lua的核心实现之一。

`function`作为**一等公民**(first-class)类型。对于Lua内部而言，它实际上有三种子类型：
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
#define ClosureHeader \
	CommonHeader; lu_byte nupvalues; GCObject *gclist

typedef struct CClosure {
  ClosureHeader;
  lua_CFunction f;
  TValue upvalue[1];
} CClosure;


typedef struct LClosure {
  ClosureHeader;
  struct Proto *p;
  UpVal *upvals[1];
} LClosure;


typedef union Closure {
  CClosure c;
  LClosure l;
} Closure;

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
`CClosure`和`LClosure`的分别对应C闭包和Lua闭包。

`Proto`是核心结构，它代表的是Lua闭包中的**函数原型**，部分成员的作用如下（忽略了GC相关和debug相关的成员，以及一些辅助成员）：
- CommonHeader: Lua对象的通用头部，包含类型、GC等相关信息
- numparams: 函数的形参数量
- is_vararg: 是否为变长参数函数
- maxstacksize: 该函数所需要的寄存器数量
- sizeupvalues: 该函数所携带的upvalue数量
- k: 常量表
- code: 字节码
- p: 定义在本函数内部的函数
- upvalues: 外部变量列表

Lua脚本中，同一段`function`声明出的函数，可能会因为调用处不同，而创建不同闭包；这些不同的闭包会引用同一份Lua函数原型，区别只是他们所依赖的外部变量不同（即闭包可以看作是函数原型加上一组外部变量，所以会指向不同的upvalue）。

## Lua闭包

### 寄存器与栈
在Lua中，寄存器（register）和栈（stack）是两个重要的概念。

在设计上：
- **寄存器**是对于Lua虚拟机的指令而言的，Lua字节码中的每条指令都是在操作不同下标的寄存器（[字节码参考](/lua/virtual-machine.md#字节码参考)）
- **栈**则是Lua用户最熟悉的概念了，尤其是在使用 Lua C API 时，都是使用栈来和Lua脚本交流的

然而在实践上，它们的操作对象都是`lua_State`中的`stack`所指向的同一块内存空间——一个`StackValue`动态数组，在Lua内部，还是管它叫做"stack"，不管是**寄存器**还是**栈**，它们只是不同的逻辑视角而已。

比如在虚拟机执行Lua字节码时，是**寄存器**视角，因为在字节码指令中会直接取stack中的下标操作。而用户在使用Lua C API时，则常常需要使用栈操作。

相关的结构原型如下：
```c
// [!code focus:7]
typedef union StackValue {
  TValue val;
  struct {
    TValuefields;
    unsigned short delta;
  } tbclist;
} StackValue;

typedef StackValue *StkId; // [!code focus]

// [!code focus:4]
typedef union {
  StkId p;
  ptrdiff_t offset;
} StkIdRel;

struct CallInfo {
  StkIdRel func;  // [!code focus]
  StkIdRel	top;  // [!code focus]
  struct CallInfo *previous, *next;
  union {
    struct {
      const Instruction *savedpc;
      volatile l_signalT trap;
      int nextraargs;
    } l;
    struct {
      lua_KFunction k;
      ptrdiff_t old_errfunc;
      lua_KContext ctx;
    } c;
  } u;
  union {
    int funcidx;
    int nyield;
    int nres;
    struct {
      unsigned short ftransfer;
      unsigned short ntransfer;
    } transferinfo;
  } u2;
  short nresults;
  unsigned short callstatus;
};

struct lua_State { // [!code focus]
  CommonHeader;
  lu_byte status;
  lu_byte allowhook;
  unsigned short nci;
  StkIdRel top;
  global_State *l_G;
  CallInfo *ci;         // [!code focus]
  StkIdRel stack_last;  // [!code focus]
  StkIdRel stack;       // [!code focus]
  UpVal *openupval;
  StkIdRel tbclist;
  GCObject *gclist;
  struct lua_State *twups;
  struct lua_longjmp *errorJmp;
  CallInfo base_ci;     // [!code focus]
  volatile lua_Hook hook;
  ptrdiff_t errfunc;
  l_uint32 nCcalls;
  int oldpc;
  int basehookcount;
  int hookcount;
  volatile l_signalT hookmask;
}; // [!code focus]
```
`lua_State`对应的便是Lua虚拟机中的运行时数据结构，其中`stack`指向的就是真实栈空间的第一个元素，`stack_last`指向的便是栈空间中可用的最后一个槽位（实际上的栈大小会比`stack_last`大，这样处理是为了在发生栈溢出的时候做保护措施）。

`CallInfo`便是Lua运行过程中的函数调用信息，每个调用信息之间通过`previous``next`串成了调用栈，`lua_State`的`base_ci`指向整个调用栈的第一个栈帧，`ci`则指向了正在执行的函数栈帧。

每发生一层函数调用，就会在栈中压入一个闭包对象，调用栈也会增长出对应的栈帧。对于每个闭包对象来说，自己的栈空间便是在自身闭包对象之后，到`lua_State.stack_last`为止。这里需要结合实例来说明。

比如，执行这样的Lua代码：
```lua
function FunB()
  -- do something ...
  refturn 1
end

function FunA(param1, param2, param3)
  -- do something ...

  -- 观察点二

  FunB()

  -- 观察点三
end

-- 观察点一
FunA()
```
我们根据注释中观察点的顺序，来描述不同调用时刻栈空间和调用栈发生的变化。

#### 观察点一：开始调用FunA
在调用之前，Lua会创建若干长度的`StackValue`数组作为真实的栈空间，并将`lua_State.stack`指向这个数组的第一个元素，此时`lua_State.stack_last`指向这个数组的最后一个可用元素（会在真实栈空间的最后一个元素之前的若干个位置）。`lua_State.top`此时因为未发生任何调用，故而也是指向第一个元素。此时调用栈还什么都没有，故而`ci`和`base_ci`都未指向任何帧。（如下图所示）

<center>
    <img src="/function-impl-1.png">
</center>

调用FunA时，会先将FunA（`LClosure`类型）压入栈中，紧接着压入传递给FunA的参数，并创建一个新的调用栈帧`CallInfo`，其`func`字段指向FunA，`top`字段指向FunA的栈空间（即FunA的栈空间第一个元素），`ci`和`base_ci`都指向这个栈帧。（如下图所示）

<center>
    <img src="/function-impl-2.png">
</center>

虽然参数param1-3是“压栈”操作而来的，但在FunA的运行过程中，字节码操作时却会以直接访问下标RG(X)的方式来获取值，即**寄存器**视角。

#### 观察点二：调用FunB
在调用FunB时，会先将FunB（`CClosure`类型）压入栈中，并创建一个新的调用栈帧`CallInfo`，其`func`字段指向FunB本身在栈空间所处的位置，`top`字段指向FunB的栈空间（即FunB的栈空间第一个元素），`ci`和`base_ci`都指向这个栈帧。此时FunA的栈空间则因为`CallInfo`的存在而被隔离在FunB之外。（如下图所示）

<center>
    <img src="/function-impl-3.png">
</center>

#### 观察点三：FunB返回后
在FunB返回后，FunB的栈空间被回收，其返回值被压在原FunB的地方，FunA的栈空间则恢复到FunB之前的状态，并将返回值1纳入自己的栈空间中。此时`ci`和`base_ci`都指向FunA的栈帧, FunB的调用栈帧被回收。（如下图所示）

<center>
    <img src="/function-impl-4.png">
</center>

### 上值(upvalue)
上值（upvalue）是Lua闭包中一个重要的概念，它允许函数记住并访问其词法作用域之外的变量。上值可以看作是函数所依赖的外部变量，它们在函数闭包中保持其值，即使外部作用域已经不存在。

### 待关闭变量(to-closed)

## C闭包和C函数

## 调试