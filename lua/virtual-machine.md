# Lua虚拟机实现

## 简介
Lua虚拟机是Lua语言的核心执行引擎，专门负责解释和执行Lua字节码。在Lua 5.0版本之前，Lua采用的是**基于栈的虚拟机**架构；但从Lua 5.0开始，Lua虚拟机已重构为更高效的**基于寄存器的虚拟机**实现。在深入介绍Lua虚拟机的底层实现之前，要先理解这两种虚拟机的区别：

- 在基于栈的虚拟机中，所有操作都通过一个栈来进行。操作数从栈中弹出，计算完成后结果再压入栈中。这种设计简单直观，但在执行效率方面存在一些劣势。
- 基于寄存器的虚拟机使用一组虚拟寄存器来存储操作数和中间结果。每条指令可以直接引用这些寄存器，避免了频繁的栈操作，显著提升了执行效率。

例如对于同一段代码：
```lua
local a, t, i
a = a + i
a = a + 1
a = t[i]
```

在基于栈的虚拟机中，可能会按照以下指令执行：
```text:line-numbers
PUSHNIL   3   ; local a, t, i
GETLOCAL  0   ; a
GETLOCAL  2   ; i
ADD           ; a = a + i
SETLOCAL  0   ; a
GETLOCAL  0   ; a
ADDI      1   ; a = a + 1
SETLOCAL  0   ; a
GETLOCAL  1   ; t
GETINDEXED 2  ; t[i]
SETLOCAL  0   ; a = t[i]
```

而在基于寄存器的虚拟机中，指令锐减：
```text:line-numbers
LOADNIL 0 2 0   ; local a, t, i
ADD     0 0 2   ; a = a + i
ADD     0 0 250 ; a = a + 1
GETTABLE 0 1 2  ; a = t[i]
```
>[!NOTE]
> 以上示例来自于Lua官方paper[《The implementation of Lua 5.0》](https://www.lua.org/doc/jucs05.pdf)，这里俺就偷懒了。

## 字节码参考

<style>
.opcode-table th,
.opcode-table td:not(:last-child) {
  white-space: nowrap;
}
</style>

<table class="opcode-table">
  <thead>
    <tr>
      <th>操作码</th>
      <th>名称</th>
      <th>类型</th>
      <th>参数格式</th>
      <th>功能描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OP_MOVE</td>
      <td>MOVE</td>
      <td>iABC</td>
      <td>A B</td>
      <td>将寄存器B的值移动到寄存器A，如果B是临时变量则可能被重用</td>
    </tr>
    <tr>
      <td>OP_LOADI</td>
      <td>LOADI</td>
      <td>iABx</td>
      <td>A sBx</td>
      <td>将立即数sBx(有符号整数)加载到寄存器A，sBx范围为-131071到131071</td>
    </tr>
    <tr>
      <td>OP_LOADF</td>
      <td>LOADF</td>
      <td>iABx</td>
      <td>A sBx</td>
      <td>将浮点常量sBx(有符号整数转换为浮点)加载到寄存器A</td>
    </tr>
    <tr>
      <td>OP_LOADK</td>
      <td>LOADK</td>
      <td>iABx</td>
      <td>A Bx</td>
      <td>从常量表中加载索引为Bx的常量到寄存器A，Bx最大值为262143</td>
    </tr>
    <tr>
      <td>OP_LOADKX</td>
      <td>LOADKX</td>
      <td>iABx</td>
      <td>A</td>
      <td>使用EXTRAARG指令的Ax作为常量索引，从常量表加载到寄存器A</td>
    </tr>
    <tr>
      <td>OP_LOADFALSE</td>
      <td>LOADFALSE</td>
      <td>iABC</td>
      <td>A</td>
      <td>将false值加载到寄存器A，通常用于布尔表达式或条件判断初始化</td>
    </tr>
    <tr>
      <td>OP_LFALSESKIP</td>
      <td>LFALSESKIP</td>
      <td>iABC</td>
      <td>A</td>
      <td>加载false到寄存器A并跳过下一条指令，用于优化短路逻辑表达式</td>
    </tr>
    <tr>
      <td>OP_LOADTRUE</td>
      <td>LOADTRUE</td>
      <td>iABC</td>
      <td>A</td>
      <td>将true值加载到寄存器A，通常用于布尔表达式或条件判断初始化</td>
    </tr>
    <tr>
      <td>OP_LOADNIL</td>
      <td>LOADNIL</td>
      <td>iABC</td>
      <td>A B</td>
      <td>将nil值加载到从寄存器A到B的所有寄存器，用于变量初始化或清除状态</td>
    </tr>
    <tr>
      <td>OP_GETUPVAL</td>
      <td>GETUPVAL</td>
      <td>iABC</td>
      <td>A B</td>
      <td>从当前闭包的上值表中获取索引为B的上值到寄存器A，用于访问外层局部变量</td>
    </tr>
    <tr>
      <td>OP_SETUPVAL</td>
      <td>SETUPVAL</td>
      <td>iABC</td>
      <td>A B</td>
      <td>将寄存器A的值设置到当前闭包的上值表中索引为B的位置，用于修改外层局部变量</td>
    </tr>
    <tr>
      <td>OP_GETTABUP</td>
      <td>GETTABUP</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>从当前闭包的上值表中获取索引为B的上值(必须为表)，然后获取该表中键为C的值到寄存器A</td>
    </tr>
    <tr>
      <td>OP_GETTABLE</td>
      <td>GETTABLE</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>从寄存器B(必须为表)中获取键为C的值到寄存器A，如果键不存在则返回nil</td>
    </tr>
    <tr>
      <td>OP_GETI</td>
      <td>GETI</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>从寄存器B(必须为表)中获取整数键C的值到寄存器A，优化了整数键访问性能</td>
    </tr>
    <tr>
      <td>OP_GETFIELD</td>
      <td>GETFIELD</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>从寄存器B(必须为表)中获取字符串键C的值到寄存器A，优化了字符串键访问性能</td>
    </tr>
    <tr>
      <td>OP_SETTABUP</td>
      <td>SETTABUP</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>在当前闭包的上值表中设置索引为A的上值(必须为表)的键B的值为C，用于修改外层表字段</td>
    </tr>
    <tr>
      <td>OP_SETTABLE</td>
      <td>SETTABLE</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>设置寄存器A(必须为表)的键B的值为C，如果表不存在会触发错误</td>
    </tr>
    <tr>
      <td>OP_SETI</td>
      <td>SETI</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>设置寄存器A(必须为表)的整数键B的值为C，优化了整数键设置性能</td>
    </tr>
    <tr>
      <td>OP_SETFIELD</td>
      <td>SETFIELD</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>设置寄存器A(必须为表)的字符串键B的值为C，优化了字符串键设置性能</td>
    </tr>
    <tr>
      <td>OP_NEWTABLE</td>
      <td>NEWTABLE</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>创建新表并存储在寄存器A中，B指定数组部分初始大小，C指定哈希部分初始大小</td>
    </tr>
    <tr>
      <td>OP_SELF</td>
      <td>SELF</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>准备方法调用，将寄存器B的键C方法放入寄存器A和A+1</td>
    </tr>
    <tr>
      <td>OP_ADDI</td>
      <td>ADDI</td>
      <td>iABC</td>
      <td>A B sC</td>
      <td>寄存器B加立即数sC结果存入A</td>
    </tr>
    <tr>
      <td>OP_ADDK</td>
      <td>ADDK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B加常量C结果存入A</td>
    </tr>
    <tr>
      <td>OP_SUBK</td>
      <td>SUBK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B减常量C结果存入A</td>
    </tr>
    <tr>
      <td>OP_MULK</td>
      <td>MULK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B乘常量C结果存入A</td>
    </tr>
    <tr>
      <td>OP_MODK</td>
      <td>MODK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B模常量C结果存入A</td>
    </tr>
    <tr>
      <td>OP_POWK</td>
      <td>POWK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B的常量C次方结果存入A</td>
    </tr>
    <tr>
      <td>OP_DIVK</td>
      <td>DIVK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B除常量C结果存入A</td>
    </tr>
    <tr>
      <td>OP_IDIVK</td>
      <td>IDIVK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B整除常量C结果存入A</td>
    </tr>
    <tr>
      <td>OP_BANDK</td>
      <td>BANDK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B与常量C按位与结果存入A</td>
    </tr>
    <tr>
      <td>OP_BORK</td>
      <td>BORK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B或常量C按位或结果存入A</td>
    </tr>
    <tr>
      <td>OP_BXORK</td>
      <td>BXORK</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B异或常量C按位异或结果存入A</td>
    </tr>
    <tr>
      <td>OP_SHRI</td>
      <td>SHRI</td>
      <td>iABC</td>
      <td>A B sC</td>
      <td>寄存器B右移立即数sC结果存入A</td>
    </tr>
    <tr>
      <td>OP_SHLI</td>
      <td>SHLI</td>
      <td>iABC</td>
      <td>A B sC</td>
      <td>寄存器B左移立即数sC结果存入A</td>
    </tr>
    <tr>
      <td>OP_ADD</td>
      <td>ADD</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B加寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_SUB</td>
      <td>SUB</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B减寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_MUL</td>
      <td>MUL</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B乘寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_MOD</td>
      <td>MOD</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B模寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_POW</td>
      <td>POW</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B的寄存器C次方结果存入A</td>
    </tr>
    <tr>
      <td>OP_DIV</td>
      <td>DIV</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B除寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_IDIV</td>
      <td>IDIV</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B整除寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_BAND</td>
      <td>BAND</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B与寄存器C按位与结果存入A</td>
    </tr>
    <tr>
      <td>OP_BOR</td>
      <td>BOR</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B或寄存器C按位或结果存入A</td>
    </tr>
    <tr>
      <td>OP_BXOR</td>
      <td>BXOR</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B异或寄存器C按位异或结果存入A</td>
    </tr>
    <tr>
      <td>OP_SHL</td>
      <td>SHL</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B左移寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_SHR</td>
      <td>SHR</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>寄存器B右移寄存器C结果存入A</td>
    </tr>
    <tr>
      <td>OP_MMBIN</td>
      <td>MMBIN</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>调用寄存器B的元方法处理二元操作C</td>
    </tr>
    <tr>
      <td>OP_MMBINI</td>
      <td>MMBINI</td>
      <td>iABC</td>
      <td>A sB C k</td>
      <td>调用寄存器A的元方法处理立即数二元操作</td>
    </tr>
    <tr>
      <td>OP_MMBINK</td>
      <td>MMBINK</td>
      <td>iABC</td>
      <td>A B C k</td>
      <td>调用寄存器A的元方法处理常量二元操作</td>
    </tr>
    <tr>
      <td>OP_UNM</td>
      <td>UNM</td>
      <td>iABC</td>
      <td>A B</td>
      <td>寄存器B取负结果存入A</td>
    </tr>
    <tr>
      <td>OP_BNOT</td>
      <td>BNOT</td>
      <td>iABC</td>
      <td>A B</td>
      <td>寄存器B按位取反结果存入A</td>
    </tr>
    <tr>
      <td>OP_NOT</td>
      <td>NOT</td>
      <td>iABC</td>
      <td>A B</td>
      <td>寄存器B逻辑取反结果存入A</td>
    </tr>
    <tr>
      <td>OP_LEN</td>
      <td>LEN</td>
      <td>iABC</td>
      <td>A B</td>
      <td>获取寄存器B的长度存入A</td>
    </tr>
    <tr>
      <td>OP_CONCAT</td>
      <td>CONCAT</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>连接寄存器B到C的字符串存入A</td>
    </tr>
    <tr>
      <td>OP_CLOSE</td>
      <td>CLOSE</td>
      <td>iABC</td>
      <td>A</td>
      <td>关闭寄存器A到A的局部变量</td>
    </tr>
    <tr>
      <td>OP_TBC</td>
      <td>TBC</td>
      <td>iABC</td>
      <td>A</td>
      <td>标记寄存器A为待关闭</td>
    </tr>
    <tr>
      <td>OP_JMP</td>
      <td>JMP</td>
      <td>isJ</td>
      <td>sJ</td>
      <td>无条件跳转sJ</td>
    </tr>
    <tr>
      <td>OP_EQ</td>
      <td>EQ</td>
      <td>iABC</td>
      <td>A B k</td>
      <td>比较寄存器B和C是否相等</td>
    </tr>
    <tr>
      <td>OP_LT</td>
      <td>LT</td>
      <td>iABC</td>
      <td>A B k</td>
      <td>比较寄存器B是否小于C</td>
    </tr>
    <tr>
      <td>OP_LE</td>
      <td>LE</td>
      <td>iABC</td>
      <td>A B k</td>
      <td>比较寄存器B是否小于等于C</td>
    </tr>
    <tr>
      <td>OP_EQK</td>
      <td>EQK</td>
      <td>iABC</td>
      <td>A B k</td>
      <td>比较寄存器B和常量C是否相等</td>
    </tr>
    <tr>
      <td>OP_EQI</td>
      <td>EQI</td>
      <td>iABC</td>
      <td>A sB k</td>
      <td>比较寄存器A和立即数sB是否相等</td>
    </tr>
    <tr>
      <td>OP_LTI</td>
      <td>LTI</td>
      <td>iABC</td>
      <td>A sB k</td>
      <td>比较寄存器A是否小于立即数sB</td>
    </tr>
    <tr>
      <td>OP_LEI</td>
      <td>LEI</td>
      <td>iABC</td>
      <td>A sB k</td>
      <td>比较寄存器A是否小于等于立即数sB</td>
    </tr>
    <tr>
      <td>OP_GTI</td>
      <td>GTI</td>
      <td>iABC</td>
      <td>A sB k</td>
      <td>比较寄存器A是否大于立即数sB</td>
    </tr>
    <tr>
      <td>OP_GEI</td>
      <td>GEI</td>
      <td>iABC</td>
      <td>A sB k</td>
      <td>比较寄存器A是否大于等于立即数sB</td>
    </tr>
    <tr>
      <td>OP_TEST</td>
      <td>TEST</td>
      <td>iABC</td>
      <td>A k</td>
      <td>测试寄存器A是否为真</td>
    </tr>
    <tr>
      <td>OP_TESTSET</td>
      <td>TESTSET</td>
      <td>iABC</td>
      <td>A B k</td>
      <td>测试寄存器B是否为真并存入A</td>
    </tr>
    <tr>
      <td>OP_CALL</td>
      <td>CALL</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>调用寄存器A的函数，参数B-1个，结果C-1个</td>
    </tr>
    <tr>
      <td>OP_TAILCALL</td>
      <td>TAILCALL</td>
      <td>iABC</td>
      <td>A B C k</td>
      <td>尾调用寄存器A的函数</td>
    </tr>
    <tr>
      <td>OP_RETURN</td>
      <td>RETURN</td>
      <td>iABC</td>
      <td>A B</td>
      <td>从函数返回寄存器A到B的值</td>
    </tr>
    <tr>
      <td>OP_RETURN0</td>
      <td>RETURN0</td>
      <td>iABC</td>
      <td></td>
      <td>返回0个值</td>
    </tr>
    <tr>
      <td>OP_RETURN1</td>
      <td>RETURN1</td>
      <td>iABC</td>
      <td>A</td>
      <td>返回寄存器A的1个值</td>
    </tr>
    <tr>
      <td>OP_FORLOOP</td>
      <td>FORLOOP</td>
      <td>iAsBx</td>
      <td>A sBx</td>
      <td>数字for循环</td>
    </tr>
    <tr>
      <td>OP_FORPREP</td>
      <td>FORPREP</td>
      <td>iAsBx</td>
      <td>A sBx</td>
      <td>数字for循环准备</td>
    </tr>
    <tr>
      <td>OP_TFORPREP</td>
      <td>TFORPREP</td>
      <td>iAsBx</td>
      <td>A sBx</td>
      <td>通用for循环准备</td>
    </tr>
    <tr>
      <td>OP_TFORCALL</td>
      <td>TFORCALL</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>通用for循环调用</td>
    </tr>
    <tr>
      <td>OP_TFORLOOP</td>
      <td>TFORLOOP</td>
      <td>iAsBx</td>
      <td>A sBx</td>
      <td>通用for循环</td>
    </tr>
    <tr>
      <td>OP_SETLIST</td>
      <td>SETLIST</td>
      <td>iABC</td>
      <td>A B C</td>
      <td>设置列表元素</td>
    </tr>
    <tr>
      <td>OP_CLOSURE</td>
      <td>CLOSURE</td>
      <td>iABx</td>
      <td>A Bx</td>
      <td>创建闭包</td>
    </tr>
    <tr>
      <td>OP_VARARG</td>
      <td>VARARG</td>
      <td>iABC</td>
      <td>A B</td>
      <td>处理可变参数</td>
    </tr>
    <tr>
      <td>OP_VARARGPREP</td>
      <td>VARARGPREP</td>
      <td>iABC</td>
      <td>A</td>
      <td>准备可变参数</td>
    </tr>
    <tr>
      <td>OP_EXTRAARG</td>
      <td>EXTRAARG</td>
      <td>iAx</td>
      <td>Ax</td>
      <td>额外参数</td>
    </tr>
  </tbody>
</table>