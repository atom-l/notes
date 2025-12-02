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

#### 寄存器重用
这里要分两个清醒来讨论。

对于同一个Lua闭包中的寄存器的重用：Lua会为每一个闭包中的本地变量（包括闭包的形参）分配寄存器，然而一些本地变量可能在某次调用后就不再使用了（比如未使用的形参），此时不禁令人想到是否能将这些寄存器重用给其他本地变量？答案是Lua不会这么做，因为实现的简单性和高效。

对于不同Lua闭包之间的寄存器重用：Lua在闭包内部调用另一个闭包时，会立刻将被调用闭包压入栈空间中，再依次压入传入的参数（如果有的话），此时被调用闭包和外部闭包实际上是在同一个栈空间上工作的，此时被调用闭包所使用的寄存器在物理位置上和外部闭包的寄存器位置是有重合的（例如被调用闭包的0号寄存器可能就是外部闭包的10号寄存器）。因为Lua给局部变量安排寄存器位置和函数体指令的先后有关，Lua会保证在内部调用闭包时，当前位置之后的寄存器是暂未开始使用的，被调用闭包在调用完成后会解开出自身所引用的栈空间位置的引用，外部闭包后续的指令就可以照常使用后续的寄存器了。

#### 闭包返回时栈空间变化
闭包在返回时，会将当前闭包从栈空间上释放，并且依照返回值顺序依次放入栈空间中，而这并不是对于每个返回值而言的，而是会根据外部调用的需要来决定。例如对于代码“**local a, b = FunA()**”，无论**FunA**将多少个返回值压入了栈空间中，最后都会只留下两个在栈空间上（返回值数量不够则会用nil填充）。如果外部闭包刚好使用了新的本地变量来保存返回值，那么返回值会刚好处于对应的寄存器位置。

此时可以顺便再次回应同一个Lua闭包的局部变量为什么不会重用寄存器位置：这样会使得返回值的处理变得更麻烦。

### 上值(upvalue)
上值（upvalue）是Lua闭包中一个重要的概念，它允许函数记住并访问其词法作用域之外的变量。上值可以看作是函数所依赖的外部变量，它们在函数闭包中保持其值，即使外部作用域已经不存在。

#### 数据原型
```c
// [!code focus:7]
// 在函数原型`Proto`中使用，用于描述所引用的upvalue信息
typedef struct Upvaldesc {
  TString *name; //upvalue的名称（用于调试信息）
  lu_byte instack; //是在栈空间中吗
  lu_byte idx;  // （在栈中或是外层函数的列表中的）索引
  lu_byte kind; // 类型
} Upvaldesc;

// [!code focus:15]
// Lua闭包中的上值
typedef struct UpVal {
  CommonHeader;
  union {
    TValue *p;  // 指向栈空间对应位置或直接指向对应的值
    ptrdiff_t offset;  // 栈空间重新分配后被启用
  } v;
  union {
    struct {  // 当上值处于 open 状态时
      struct UpVal *next;  // 指向下一个节点
      struct UpVal **previous; // 指向前一个节点
    } open;
    TValue value;  // 当上值处于 从 close 状态时，值存储在这里
  } u;
} UpVal;

// [!code focus:2]
// Lua线程（实际上是协程）
struct lua_State {
  CommonHeader;
  lu_byte status;
  lu_byte allowhook;
  unsigned short nci;
  StkIdRel top;
  global_State *l_G;
  CallInfo *ci;
  StkIdRel stack_last;
  StkIdRel stack;
  // [!code focus:1]
  UpVal *openupval; // 同一个线程中所有闭包的上值
  StkIdRel tbclist;
  GCObject *gclist;
  struct lua_State *twups;
  struct lua_longjmp *errorJmp;
  CallInfo base_ci;
  volatile lua_Hook hook;
  ptrdiff_t errfunc;
  l_uint32 nCcalls;
  int oldpc;
  int basehookcount;
  int hookcount;
  volatile l_signalT hookmask;
};// [!code focus]
```

#### 上值的创建
每个Lua闭包是由函数原型`Proto`创建而来，其中`Proto`会使用`Upvaldesc`来描述所引用的upvalue信息。在创建闭包时，就会根据其中的信息来创建上值，以填充上值列表`LClosure.upvals`。

根据`Upvaldesc.instack`字段分为两种情况：
- `Upvaldesc.instack`为真(非零)：表示该上值在外部闭包的栈空间中，`Upvaldesc.idx`此时表示在栈空间中的索引，但需要在`lua_State.openupval`链表中查找是否已存在相应的上值，如果存在则共用同一个上值，如果不存在则创建新的上值并加入`lua_State.openupval`链表。
- `Upvaldesc.instack`为假(零)：表示该上值同时也是外部函数的上值，直接在外部闭包的上值列表对应下标处`Upvaldesc.idx`就可以找到。

#### open & close
既然上值是外部闭包所定义的局部变量，那么上值就会有两种状态：
- 外部闭包还未调用结束，此时被其内部声明的闭包所引用的局部变量还未越出其作用域，此时这些对应的上值的状态被Lua定义为"open"，表示这些上值所引用的局部变量是可直接访问的。
- 外部闭包已经调用结束，此时被其内部声明的闭包所引用的局部变量已经越出其作用域，此时这些对应的上值的状态被Lua定义为"closed"，表示这些上值所引用的局部变量已经不可直接访问，但它们仍然需要被保留，以维持引用了这些上值得闭包正常工作。

考虑这段Lua代码:
```lua
function outer()
  local x = 10  -- 外部函数的局部变量
  local function inner()
    x = x + 1 -- 内部闭包捕获 x
  end
  local function printer()
    print(x)  -- 内部闭包捕获 x，并和inner共用同一个上值
  end
  -- 直到此时outer还没调用结束， x 还处于open状态
  return inner, printer
end
local closure, printer = outer()  -- outer 返回后，调用结束，其内部定义的 x 作为内部闭包引用的上值已经处于closed状态 
closure() -- 调用内部闭包，虽然 x 已经处于closed状态，但上值仍然需要访问
printer() -- 调用内部闭包，输出 x 的值，此时 x 和 closure 是共用一个值的
```

当闭包 outer 还没调用结束时，其局部变量 x 还是个栈空间上的值，inner 和 printer 引用的是其在栈空间上的地址，且它们共用一个`UpVal`，如下图所示：

<center>
    <img src="/function-impl-5.png">
</center>

当闭包 outer 还没调用结束时，其局部变量 x 需要在从栈空间上释放，这时会将值 x 拷贝到`UpVal.u.value`中，其引用栈的指针也改为指向自身的value，最后还需要将从`lua_State.openupval`链表中移出，如下图所示：

<center>
    <img src="/function-impl-6.png">
</center>

#### 上值在Lua协程之间的共享争议
在上文中，我们知道，同一个Lua协程中所有闭包的相同语义的上值是共享的，那么协程之间的情况呢？

观察Lua代码：
```lua
local x = 0

local co_a = coroutine.create(functon()
  x = 10
end)

local co_b = coroutine.create(functon()
  x = -10
end)

local co_c = coroutine.create(functon()
  print(x)

  local y = 0
  local function inner()
    y = 100
  end
  inner()
end)

coroutine.resume(co_a)
print(x) -- 10

coroutine.resume(co_b)
print(x) -- -10

x = 99
coroutine.resume(co_c) -- 99
```
事实上以上代码会如预期一样工作，3个协程以及主协程会实时共享变量 x 的变化。

这是在Lua内部实现中，创建闭包时会在当前协程的`openupval`链表中查找并共用上值，在上边的代码中，调用`coroutine.create`是传入的闭包是由主协程创建的，故而它们对变量 x 的引用都是共用链在主协程上的上值。也就是说 co_a 、co_b、co_c 这些协程的主函数其实是“属于”主协程的闭包，只有在其调用过程中创建的闭包所引用的上值才会链在这些协程本身的`openupval`中（例如上边的协程 co_c 中的变量 y）。

## C闭包和C函数
首先C闭包和C函数在Lua的实现中都使用结构体`CClosure`描述，C函数就是没有上值的闭包。

其次C闭包和Lua闭包的不同之处主要在于对于上值的处理不同。可以从结构体`CClosure`和`LClosure`的不同之处可以看出，Lua闭包中存储的是上值的引用，而C闭包中会直接存储上值。因为存储方式的不同，C闭包的上值始终处于“closed”状态，因为其不会存在于栈上。并且因为C闭包的上值是在创建时用户手动传入的，其并非从外部作用域中捕获得来，所以C闭包之间也不会共享上值。