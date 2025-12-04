# Lua GC 机制

## 相关结构原型
```c
typedef void * (*lua_Alloc) (void *ud, void *ptr, size_t osize, size_t nsize); // [!code focus]

// [!code focus:2]
// Lua状态机
typedef struct global_State {
  lua_Alloc frealloc;   // [!code focus] 用于分配内存的函数
  void *ud;             // [!code focus] 和frealloc配合，内存分配器所需的额外数据
  l_mem totalbytes;     // [!code focus] 已分配内存大小（字节）减去GCdebt
  l_mem GCdebt;         // [!code focus] GC“债务”，用于评估是否需要触发GC
  lu_mem GCestimate;    // [!code focus] 对非垃圾内存的估计大小（字节）
  lu_mem lastatomic;    // [!code focus] 辅助变量，用于配合分代GC，表示上次GC原子阶段遍历的对象数量
  stringtable strt;
  TValue l_registry;
  TValue nilvalue;
  unsigned int seed;
  lu_byte currentwhite; // [!code focus] 当前“白色”类型
  lu_byte gcstate;      // [!code focus] 当前GC状态机的状态
  lu_byte gckind;       // [!code focus] 当前GC运行模式（增量或分代）
  lu_byte gcstopem;     // [!code focus] 停止紧急回收的标志
  lu_byte genminormul;  // [!code focus] 年轻代回收的频率，用于配合分代GC
  lu_byte genmajormul;  // [!code focus] 老年代回收的频率，用于配合分代GC
  lu_byte gcstp;        // [!code focus] 用于控制GC停止
  lu_byte gcemergency;  // [!code focus] 表示当前是否处于一个紧急回收的阶段
  lu_byte gcpause;      // [!code focus] 控制GC周期之间的暂停间隔
  lu_byte gcstepmul;    // [!code focus] 控制GC的速度
  lu_byte gcstepsize;   // [!code focus] 控制GC的粒度
  GCObject *allgc;      // [!code focus] 所有可回收对象
  GCObject **sweepgc;   // [!code focus] 当前清扫的位置
  GCObject *finobj;     // [!code focus] 有终结器的对象
  GCObject *gray;       // [!code focus] 所有“灰色”对象
  GCObject *grayagain;  // [!code focus] 需要原子遍历的对象链表
  GCObject *weak;       // [!code focus] 所有弱表中的值（弱表引用的对象不会阻挡GC）
  GCObject *ephemeron;  // [!code focus] 包含所有弱键表
  GCObject *allweak;    // [!code focus] 所有的弱表
  GCObject *tobefnz;    // [!code focus] 所有待终结对象
  GCObject *fixedgc;    // [!code focus] 永不回收的对象

  // [!code focus]
  // 以下成员都用于分代GC
  GCObject *survival;   // [!code focus] 存活一个周期的对象的起点
  GCObject *old1;       // [!code focus] 旧对象的第一个周期起点
  GCObject *reallyold;  // [!code focus] 旧对象起点
  GCObject *firstold1;  // [!code focus] 第一个 OLD1 对象
  GCObject *finobjsur;  // [!code focus] 带有终结器的对象
  GCObject *finobjold1; // [!code focus] 带有终结器的 OLD1 对象
  GCObject *finobjrold; // [!code focus] 带有终结器的旧对象
  struct lua_State *twups;
  lua_CFunction panic;
  struct lua_State *mainthread;
  TString *memerrmsg;
  TString *tmname[TM_N];
  struct Table *mt[LUA_NUMTYPES];
  TString *strcache[STRCACHE_N][STRCACHE_M];
  lua_WarnFunction warnf;
  void *ud_warn;
} global_State; // [!code focus]
```
## 主要算法

### 三色标记法
三色标记法是当前包括Lua在内的一众高性能语言所使用的GC算法，其核心思想是递进扫描。

三色标记法将所有对象分为三种颜色：
- 白色：还未被GC扫描过或是GC扫描不到的对象（即垃圾对象）
- 灰色：已经被GC扫描到，但是它引用的对象并非全部被GC扫描过
- 黑色：已经被GC扫描到，并且它引用的对象全都被GC扫描过

其工作流程大概是这样：
1. GC工作之前，所有的对象都是白色的
2. 有几个固定的对象是GC系统已知的对象，被称作根对象，这些对象是不会被清理的（这也是GC工作的前提）
3. GC先扫描这几个根对象，并将它们标记为灰色
4. 依次扫描灰色对象所引用的对象，并将扫描到的对象也标记为灰色
5. 检查灰色对象，如果某些灰色对象的所有引用对象都被扫描过，则将其标记为黑色
6. 检查还有没有灰色对象，如果没有灰色对象了，则进入下一步，否则回到第4步继续扫描
7. 此时只有黑色对象和白色对象（也许没有白色，即没有垃圾），清理所有的白色对象，再将所有的黑色对象恢复白色，等待下一轮扫描（下一轮扫描就是从第3步开始了）

三色标记法有两个不变式，在必要的时候所有的对象必须满足这些规则，否则会发生GC错误：
- 不能存在黑色对象对白色对象的引用
- 所有的灰色对象必须在灰色列表中，不能有遗漏（但在Lua中，闭包所引用的处于 open 状态的上值例外）

### 屏障
因为在Lua实际运行的过程中，并不是一次性同时完成一个三色标记法的循环周期的，扫描对象和产生新的引用是交替出现的。

考虑一种情况：GC刚经过扫描完一个对象的所有引用，并将其标记为黑色，然后GC让出，Lua正常的逻辑开始运行，刚好让刚刚的黑色对象引用了一个白色的对象（GC还没扫描到的，或是新创建的）。如果不做任何处理，在GC的清理阶段会清理白色对象，然而实际上黑色对象还维持着引用，一个致命的GC错误就出现了。

那么就需要在黑色对象引用白色对象时做处理，这里有两种方式：
- 将黑色对象新引用的对象标记为灰色或黑色（例如，若引用的是 number 这类不会引用其他对象的类型，则可直接标记为黑色），这种方式被称为**前向屏障**。
- 将原本被标记为黑色的对象重新标记为灰色对象，使得在后边的GC步骤中重新扫描，这种方式被称为**后向屏障**。

这两种屏障有各自的优劣势。

**前向屏障**：
- 优势：实现简单，不改变父对象的状态
- 劣势：后续再产生新引用都要再次处理

**后向屏障**：
- 优势：在第一次处理后，后续无需再做处理（因为父对象不再是黑色对象了）
- 劣势：父对象会被重复扫描，增加灰色列表的处理负担

因此前向屏障适合不常修改的引用场景，例如闭包的上值、元表、全局表、函数原型`Proto`的常量表。后向屏障则适合频繁修改引用的场景，例如一般的表`table`相关操作。

## GC模式

### 增量模式
增量模式下，GC以状态机的形式运作，其状态机包含以下几个主要状态：
```c
#define GCSpropagate    0  // 传播标记阶段
#define GCSenteratomic  1  // 进入原子阶段
#define GCSatomic       2  // 原子阶段
#define GCSswpallgc     3  // 清扫allgc链表
#define GCSswpfinobj    4  // 清扫finobj链表
#define GCSswptobefnz   5  // 清扫tobefnz链表
#define GCSswpend       6  // 清扫结束
#define GCScallfin      7  // 调用终结器
#define GCSpause        8  // 暂停状态，等待下一轮GC周期
```

每当进入GC环节时，系统会执行若干步GC操作。每一步操作会根据当前所处的状态进行相应的处理，并推动状态机向前流转。在一个完整的GC周期中，状态的流转大致如下：
1. 处于**GCSpause**状态，等待GC的开始
2. 扫描并标记根对象，进入**GCSpropagate**阶段，这一过程会在同一步GC中完成
3. 扫描灰色列表中的对象，每一步GC只会扫描一个灰色对象；如果灰色列表中没有对象了，则进入**GCSenteratomic**阶段
4. 进入**GCSenteratomic**后的下一步GC中，直接进入原子阶段**GCSatomic**，这一阶段会在同一步中进行并不可中断，此时会一次性完成除了扫描灰色对象之外的剩余标记工作，如重新整理各类对象列表、清理弱表、收集待清理对象、将存活对象重新翻白等。做完这些后会进入清扫阶段**GCSswpallgc**
5. 接下来会依次进入**GCSswpallgc**、**GCSswpfinobj**、**GCSswptobefnz**阶段，以清理一般地垃圾对象、检查带终结器的对象（往往指有“__gc”元方法的对象），最后进入**GCSswpend**阶段
6. **GCSswpend**阶段中会尝试对字符串缓冲表做缩容，然后进入最终阶段**GCScallfin**
7. **GCScallfin**中会调用终结器，每一步GC会调用若干次，全部调用完毕后，进入下个阶段
8. 一轮GC周期结束，进入**GCSpause**状态，等待下一轮GC的开始

### 分代模式
分代模式本质是在增量模式上的一种优化，其核心思想是两个假设：
- 大多数对象都是“用后即弃”的
- 长时间存在的对象往往不需要被清理

在这个假设的前提下，就可以在扫描策略上做出倾斜：多扫描并清理年轻对象、少扫描并清理老对象。

在Lua实现中，对于对象的“年龄”定义如下：
```c
#define G_NEW       0	// 当前周期中创建的
#define G_SURVIVAL  1	// 上一个周期创建的
#define G_OLD0      2	// 在之前被标记为OLD，在本周期被屏障标记
#define G_OLD1      3	// 第一次完整周期后才转为老年代
#define G_OLD       4	// 真正的老年代（不被扫描了）
#define G_TOUCHED1  5	// 在本周期内被修改过的老年代对象
#define G_TOUCHED2  6	// 在上周期被修改过的老年代对象
```

在分代模式中，每一步GC有三种工作方式：
- 青春版（minor collection ）：标记OLD1以及更老的对象，不扫描OLD对象，执行一次增量模式中的原子阶段完成标记，清理NEW和SURVIVAL区域，释放需要其中白色对象，将其中存活的对象提升年龄
- 高端版（major collection）：当上一次进入GC到本次GC内存增长超过预期时执行，执行一次完整的增量模式的GC，然后切换回分代模式
- 旗舰版（full collection）：在上一次 major collection 清理效果不理想的情况下（根据耗费的时间和所回收到的对象进行评估），暂时进入增量模式并进行一次完整的的GC周期，如果效果还是不理想，则会重新进行一次完整的GC周期

此外，在分代模式中，[**屏障**](#屏障)也需要做更多的工作：
- 对于**前向屏障**：需要将引用的对象年龄提升为OLD0，这样是因为在分代模式的假设中，既然老对象大概率不需要清理，那么其引用的对象立刻被清理的概率也比较低
- 对于**后向屏障**：需要将父对象的年龄改为TOUCHED1，将老年对象的年龄变为的稍微年轻一点，但是需要参与到 major collection 中被重新扫描

### GC模式的选择
目前在Lua的实现中，GC默认为增量模式，因为其能够面对更广泛的场景，在运行时过程中，它的耗时也比较平稳，表现比较好预测。

而分代模式在特定场景下是更好的选择，但最好能够预测对象的声明周期，因为当遇到较大的内存增长或效果不好时，其会回退到增量模式并进行完整的GC周期，会在不可预测的时候出现长延时。

所以除非对业务的运行十分了解，且业务场景十分符合“对象用完即弃”的特性，才建议切换到分代模式中，否则建议保持默认设置，使用更成熟平稳的步进模式。
