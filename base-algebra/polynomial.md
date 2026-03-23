# 多项式

## 定义
对于函数 $p : \mathbf{F} \to \mathbf{F}$ ，若存在 $a_0, \dots , a_m \in \mathbf{F}$ 使得对任意 $z \in \mathbf{F}$ 都有：
$$p(z) = a_0, a_1 z + a_2 z^2 + \dots + a_m z^m$$
则称 $p$ 为系数属于 $\mathbf{F}$ 的**多项式**（polynomial）。

$\mathcal{P}(\mathbf{F})$ 是所有系数属于 $F$ 的多项式所构成的集合。

## 次数
对于多项式 $p \in \mathcal{P}(\mathbf{F})$ ，当对任意 $z \in \mathbf{F}$ 都有 $p(z) = a_0, a_1 z + a_2 z^2 + \dots + a_m z^m$ ，其中 $a_0, \dots a_m \in \mathbf{F}$ 且 $a_m \neq 0$ ，则称 $p$ 的**次数**（degree）为 $m$ ，记做:
$$\text{deg} \, p = m$$

对于恒等于 $0$ 的多项式，其次数规定为 $- \infty$ 。

对于非负整数 $m$ ，$\mathcal{P}_m(\mathbf{F})$ 表示系数在 $\mathbf{F}$ 中且次数不超过 $m$ 的所有多项式构成的集合：
$$
\mathcal{P}_m(\mathbf{F}) = \{ p \, : \, \text{deg} \, p \leq m \}
$$

## 多项式系数的唯一性
性质：**若一个多项式是零函数，则其系数均为0。**

如果一个多项式有多种不同的系数，那么其自身相减所得到的0函数的系数就不会全为0，与该性质相悖，说明多项式的系数是唯一确定的。

## 多项式的带余除法
设 $p,s \in \mathcal{P}(\mathbf{F})$ 且 $s \neq 0$ ，则可以唯一确定多项式 $q, r \in \mathcal{P}(\mathbf{F})$ 使得：$p = sq + r$ ，并且满足 $\text{deg} \, r < \text{deg} \, s$ 。

可以用线性代数来做个优雅证明：

设 $ n = \text{deg} \, p$ ， $m = \text{deg} \, s$ ，当 $n < m$ 时，显然只能令 $q = 0$ 且 $r = p$ ，故而我们只需以 $n \geq m$ 为前提做证明即可。

我们将带余除法定义为映射 $T : \mathcal{P}_{n - m}(\mathbf{F}) \times \mathcal{P}_{m - 1}(\mathbf{F}) \to \mathcal{P}_{n}(\mathbf{F})$ ，且该映射满足：
$$T(q,r) = sq + r$$

易证 $T$ 是一个线性映射。在 $(q,r) \in \text{null} \, T$ 的情况下，$sq + r = 0$ 成立，因为 $\text{deg} \, s = m$ 且 $s \neq 0$ ，故而 $m > 0$ ，那么当 $q \neq 0$ 的情况下 $\text{deg} \, sq \geq m$ ，在\text{deg} \, r < \text{deg} \, s$ 的约束下，$sq = -r$ 是不可能成立的，故而 $(q,r) \in \text{null} \, T \Rightarrow q = 0 \text{且} r = 0$ 。

所以 $\text{null} \, T = {0}$ ，即 $T$ 是单射的，故而证明了命题的唯一性。

由向量空间乘积的相关性质可得：
$$\text{dim}(\mathcal{P}_{n - m}(\mathbf{F}) \times \mathcal{P}_{m - 1}(\mathbf{F})) = (n - m + 1) + (m -1 + 1) = n + 1$$

即 $\text{dim} \, \text{range} \, T = \text{dim} \, \mathcal{P}(\mathbf{F})$ ，所以 $\text{range} \, T = \mathcal{P}(\mathbf{F})$ ，所以 $T$ 是满射的，这证明了命题的存在性。

## 零点

### 定义
对于任意多项式 $p \in \mathcal{P}(\mathbf{F})$ ，若有 $\lambda \in \mathbf{F}$ 使得 $p(\lambda) = 0$ ，则称 $\lambda$ 为 $p$ 的**零点**(或**根**)。

### 因式
对于任意多项式 $p, s \in \mathcal{P}(\mathbf{F})$ ，若存在 $q \in \mathcal{P}(\mathbf{F})$ 使得 $p = sq$ ，则称 $s$ 为 $p$ 的**因式**（factor）。

### 相关性质
- **多项式的每个零点都对应一个一次因式**：

设 $p \in \mathcal{P}(\mathbf{F})$ , $\lambda \in \mathbf{F}$ ，$p(\lambda) = 0$ 情况的成立，等价于存在多项式 $q \in \mathcal{P}(\mathbf{F})$ 使得对于任意 $z \in \mathbf{F}$ 都有 $p(z) = (z - \lambda)q(z)$ 。

证明：

当存在多项式 $q \in \mathcal{P}(\mathbf{F})$ 使得对于任意 $z \in \mathbf{F}$ 都有 $p(z) = (z - \lambda)q(z)$ 时，很显然 $p(\lambda) = 0$ 成立:
$$
\begin{align}
p(\lambda) &= (\lambda - \lambda)q(z) \\
&= 0 \, \cdot \, q(z) \\
&= 0
\end{align}
$$

当 $p(\lambda) = 0$ 时，设 $s \in \mathcal{P}(\mathbf{F})$ 且对于任意 $z \in \mathbf{F}$ 都有 $s(z) = z - \lambda$ 。

显然 $\text{deg} \, s = 1$，根据多项式带余除法的定义，必然存在多项式 $q,r \in \mathcal{P}(\mathbf{F})$ ，使得 $p = sq + r$ ，因为 $\text{deg} \, r < \text{deg} \, s \Rightarrow \text{deg} \, r \in (-\infty, \,0]$ ，所以多项式 $r$ 实际上就是个标量，即对于每个 $z \in \mathbf{F}$ 都有：
$$p(z) = s(z)q(z) + r = (z - \lambda)q(z) + r$$

因为 $p(\lambda) = 0$ ，所以 $(z - \lambda)q(z) = 0$ ，故而此时 $r = 0$ ，所以 $p(z) = (z - \lambda)q(z)$ 成立。

- **多项式零点的个数不超过它的次数**：
对于任意多项式 $p \in \mathcal{P}_m(F)$ ，当 $m \geq 0$ 时，$p$ 最多有 $m$ 个不同的零点。

结合上一条性质，再利用归纳法可证，这里就省略证明过程了。

## 代数学基本定理
每个非常数的复系数多项式都有零点。
> 优雅地证明该定理需要使用复分析领域的知识，以后再补充。

## 多项式的分解

### $\mathbf{C}$ 上的多项式分解
若 $p \in \mathcal{P}(\mathbf{C})$ 是非常数多项式，则 $p$ 可以唯一分解为：
$$p(z) = c(z - {\lambda}_1) \dots (z - {\lambda}_m)$$
其中 $c,{\lambda}_1 , \dots {\lambda}_m \in \mathbf{C}$ 。

**证明：**设 $p \in \mathcal{P}(\mathbf{C})$ 且 $m = \text{deg} \, p$ ，首先由代数学基本定理可知，对于 $p$ 一定存在一个根 $\lambda$ 使得：
$$p(z) = (z - \lambda)q(z)$$

此处 $\text{deg} \, q = m - 1$ ，再将多项式 $q$ 代入到上述过程并以此类推，就可以证明多项式 $p$ 的分解形式的存在。

接下来证明唯一性，设对于任意 $z \in \mathbf{C}$ 都有：
$$(z - {\lambda}_1) \dots (z - {\lambda}_m) = (z - {\tau}_1) \dots (z - {\tau}_m)$$

将 $z = {\lambda}_1$ 代入上式，此时整个等式左右两边都应等于 $0$ ，故而等式右边必然存在一个 $\tau$ 等于 ${\lambda}_1$ ，我们可以重新整理下标，使得 ${\lambda}_1 = {\tau}_1$ ，并将等式整体除以 $z - {\lambda}_1$ ：
$$(z - {\lambda}_2) \dots (z - {\lambda}_m) = (z - {\tau}_2) \dots (z - {\tau}_m)$$

重复这个流程，就能得到结论：
$${\lambda}_1 = {\tau}_1 , \dots , {\lambda}_m = {\tau}_m$$

故而多项式的 $p$ 的分解形式存在且唯一。

### $\mathbf{R}$ 上的多项式分解

#### 实系数多项式的非实数根都是成对出现的
设 $p \in \mathcal{P}(\mathbf{C})$ 是实系数多项式，若 $\lambda \in \mathbf{C}$ 是 $p$ 的根，则 $\overline{\lambda}$ 也是 $p$ 的根。

证明：设
$$p(z) = a_0 + a_1 z + \dots + a_{m-1} z^{m-1} + a_m z^m$$

此处 $a_0, \dots a_m \in \mathbf{F}$ 。

设 $\lambda \in \mathbf{C}$ 是 $p$ 的根，那么 $p(\lambda) = 0$ ，对整个等式取复共轭：
$$
\begin{align}
\overline{p(\lambda)} &= \overline{0} = 0 \\
&\Downarrow \\
0 &= \overline{a_0 + a_1 z + \dots + a_{m-1} z^{m-1} + a_m z^m} \\
&= \overline{a_0} + \overline{a_1 z} + \dots + \overline{a_{m-1} z^{m-1}} + \overline{a_m z^m} \\
&= \overline{a_0} + \overline{a_1} \cdot \overline{z} + \dots + \overline{a_{m-1}} \cdot \overline{z^{m-1}} + \overline{a_m} \cdot \overline{z^m} \\
&= \overline{a_0} + \overline{a_1} \cdot \overline{z} + \dots + \overline{a_{m-1}} \cdot \overline{z}^{m-1} + \overline{a_m} \cdot \overline{z}^m \\ 
&= a_0 + a_1 \overline{z} + \dots + a_{m-1} \cdot (\overline{z})^{m-1} + a_m \cdot (\overline{z})^m \\
&= p(\overline{z}) \\
&\Downarrow \\
p(\overline{z}) &= 0 \\
\end{align}
$$

#### $\mathbf{R}$ 上多项式的分解
设 $p \in \mathcal{P}(\mathbf{R})$ 是非常数多项式，那么 $p$ 可以唯一分解为：
$$p(x) = c(x - {\lambda}_1) \dots (x - {\lambda}_m)(x^2 + b_1 x + c_1) \dots (x^2 + b_M x + c_M)$$
其中 $c, {\lambda}_1 , \dots , {lambda}_m, b_1, \dots, b_M, c_1, \dots, c_M  \in \mathbf{R}$ , 且对于下标 $j$ 都有 ${b_j}^2 < 4c_j$ 。

**证明：** 设 $\text{deg} \, p = n$ 。

因为 $\mathbf{R} \in \mathbf{C}$ ，故而 $p \in \mathcal{P}(\mathbf{C})$ ，如果 $p$ 的零点全部都是实数，那么结论易得。所以我们假设 $p$ 有一个根 $\lambda \in \mathbf{C}$ 且 $\lambda \notin \mathbf{R}$ ，那么其复共轭 $\overline{\lambda}$ 也是 $p$ 的根，则存在一个次数为 $n - 2$ 的多项式 $q \in \mathcal{P}(\mathbf{C})$ ，使得：
$$
\begin{align}
p(x) = (x - \lambda)(x - \overline{\lambda})q(x) &= (x^2 - 2(\text{Re} \, \lambda)x + \lvert \lambda \rvert ^ 2) q(x) \\
&\Downarrow \\
q(x) &= \frac{p(x)}{x^2 - 2(\text{Re} \, \lambda)x + \lvert \lambda \rvert ^ 2} \\
\end{align}
$$

说明对于 $x \in \mathbf{R}$ 都有 $q(x) \in \mathbf{R}$ ，将 $q$ 多项式一般形式：
$$q(x) = a_0 + a_1 x + ... + a_{n-2} x ^{n-2}$$

其中 $a_0, \dots ,a_{n-2} \in mathbf{C}$ ，则对于 $x \in \mathbf{R}$ 有：
$$
\begin{align}
\text{Im} \, q &= 0 \\
&= (\text{Im} \, a_0) + (\text{Im} \, a_1) x + \dots + (\text{Im} \, a_{n-2}) x ^{n-2} \\
\end{align}
$$

所以 $\text{Im} \, a_0 , \dots , \text{Im} \, a_{n-2}$ 均为 $0$ ，所以 $a_0, \dots ,a_{n-2} \in mathbf{R}$ ，反复将得出的 $q$ 代入到一开始的等式中，从而证明了该分解形式的存在性。

至于唯一性，假设有多个分解形式，那么 $p$ 在 $\mathcal{P}(\mathbf{C})$ 的概念中也存在两个不同形式的分解，这与“$\mathbf{C}$ 上的多项式分解形式存在且唯一”相悖，故而分解形式是唯一的。
