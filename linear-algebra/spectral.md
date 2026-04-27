# 谱定理

## 复谱定理
设 $\mathbf{F} = \mathbf{C}$ 且 $T \in \mathcal{L}(V)$，则以下条件等价成立：
1. $T$ 是正规的；
2. $V$ 有一个由 $T$ 的本征向量组成的规范正交基；
3. $T$ 关于 $V$ 的某个规范正交基具有对角矩阵；

证明：首先条件2和条件3显然等价成立，我们只需证明条件1和条件3等价成立即可。

当假定条件3成立时，则 $T$ 关于 $V$ 的某个规范正交基具有对角矩阵，因为 $T^*$ 的矩阵是 $T$ 的共轭转置矩阵，所以 $T^*$ 的矩阵还是一个对角矩阵，两个对角矩阵都是可交换的，所以 $T^*$ 和 $T$ 也是可以交换的，从而得知条件1成立。

当假定条件1成立时，由舒尔定理可知， $V$ 有一个规范正交基使得 $T$ 关于该基有上三角矩阵，还是因为 $T^*$ 的矩阵是 $T$ 的共轭转置矩阵，所以 $T^*$ 的矩阵是一个下三角矩阵，又因为 $T$ 是正规的，所以 $T^*T = TT^*$ ，所以 $T^*$ 和 $T$ 的矩阵也要可以交换，故而它们的矩阵只能是个对角矩阵，因此条件3成立。

## 实谱定理
实谱定理的内容和复谱定理的内容相差无几，但证明方式不同，且需要一些前置定理。所以我们先介绍这些前置定理，将实谱定理及其证明放在最后

### 可逆的二次式
设 $T \in \mathcal{L}(V)$ 是正规的 ，并且设 $b, c \in \mathbf{R}$ 且 $b^2 < 4c$ ，则
$$T^2 + bT + cI$$
是可逆的。

证明：设 $v \in V$ 且 $v \neq 0$ ，则
$$
\begin{align}
\langle (T^2 + bT + cI)v, v \rangle
&= \langle T^2 v, v \rangle + \langle bT v, v \rangle + \langle cI v, v \rangle \\
&= \langle T(Tv), v \rangle + b \langle T v, v \rangle + c \langle v, v \rangle \\
&= \langle Tv, T^* v \rangle + b \langle T v, v \rangle + c \langle v, v \rangle \\
&= \langle Tv, Tv \rangle + b \langle T v, v \rangle + c \langle v, v \rangle \\
&= \lVert Tv \rVert ^2 + b \langle T v, v \rangle + c \lVert v \rVert ^2 \\
\end{align}
$$

由柯西-施瓦茨不等式可知，$\lVert Tv \rVert \lVert v \rVert \geq \lvert \langle Tv, v \rangle \rvert$ ，因此可以得到 $b \langle T v, v \rangle \leq - \lvert b \rvert \lVert Tv \rVert \lVert v \rVert$ ，又因为

$$\lVert Tv \rVert ^2 - \lvert b \rvert \lVert Tv \rVert \lVert v \rVert + c \lVert v \rVert ^2 = (\lVert Tv \rVert - \frac{\lvert b \rvert \lVert v \rVert}{2})^2 + (c - \frac{b^2}{4}) \lVert v \rVert ^2 > 0 $$

因此 $\langle (T^2 + bT + cI)v, v \rangle > 0$ ，那么 $(T^2 + bT + cI)v \neq 0$ ，故而 $T^2 + bT + cI$ 是单射的，因为算子的单射性和可逆性等价，故而 $T^2 + bT + cI$ 也是可逆的。

### 自伴算子都有本征值
设 $V \neq \{0\}$ 且 $T \in \mathcal{L}(V)$ 是自伴算子，那么 $T$ 必然有本征值。

证明：因为复向量空间上的算子必然有本征值，故而我们只需证明本定理在实内积空间成立即可，所以这里设 $V$ 是实内积空间。

设 $\text{dim} \, V = n$ ，取 $v \in V$ 且 $v \neq 0$ ，那么我们可以得到一个长度为 $n + 1$ 的向量组
$$\{v, Tv, T^2v, \dots , T^nv\}$$

因为该向量组长度超过了向量空间的维数，故而这组向量必然线性相关，所以可以取 $a_0, \dots , a_n \in \mathbf{R}$ 使得
$$0 = a_0v + a_1 Tv + a_2 T^2v + \dots + a_n T^nv$$

对上述等式使用多项式因式分解可得
$$
\begin{align}
0 &= a_0v + a_1 Tv + a_2 T^2v + \dots + a_n T^nv \\
&= (a_0I + a_1T + a_2 T^2 + \dots + a_n T^n) v \\
&= c(T^2 + b_1T + c_1I) \dots (T^2 + b_MT + c_MT)(T - {\lambda}_1) \dots (T - {\lambda}_m)v \\
\end{align}
$$

上边等式中的 $c \in \mathbf{R}$ 且 $c \neq 0$ , $b_1, \dots, b_m, c_1, \dots , c_M, {\lambda}_1, \dots, {\lambda}_M \in \mathbf{R}$ ，且对于 $1 \leq j \leq M$ 都有 $b_j^2 \leq 4c_j$ ，$m + M \geq 1$ 。因为 $T$ 是自伴的，所以$T$ 必然是正规的，那么对于每个 $T^2 + b_jT + c_jT$ 项都是可逆的，所以对于这类项不会讲非零的 $v$ 映射到 $0$ ，因此这类项消去后等式依然成立
$$0 = (T - {\lambda}_1) \dots (T - {\lambda}_m)v$$

因此对于 $1 \leq j \leq m$ ，必然存在某个 $(T - {\lambda}_j)v = 0$ ，所以 $T$ 必然有本征值。

### 自伴算子与不变子空间
设 $T \in \mathcal{L}(V)$ 是自伴的，设 $U$ 是 $V$ 的在 $T$ 下的不变子空间，则以下说法均成立
1. $U^\perp$ 在 $T$ 下不变；
2. $T \mid _U \in \mathcal{L}(U)$ 仍是自伴的；
3. $T \mid _{U^\perp} \in \mathcal{L}(U^\perp)$ 仍是自伴的；

证明：设 $v \in U^\perp$ 、$u \in U$ ，因为 $T$ 是自伴的，那么
$$\langle Tv, u \rangle = \langle v, T^*u \rangle = \langle v, Tu \rangle$$

又因为 $U$ 在 $T$ 下不变，所以 $Tu \in U$ ，故而 $\langle v, Tu \rangle$ 还是等于 $0$ ，所以 $\langle Tv, u \rangle = 0$ ，那么 $Tv \in U^\perp$ ，因此证得说法1。

再设 $u, v \in U$ ，则
$$\langle (T \mid _U)u, v \rangle = \langle Tu, v \rangle = \langle u, T*v \rangle = \langle u, Tu \rangle = \langle u, (T \mid _U)v \rangle$$

又因为 $\langle (T \mid _U)u, v \rangle  = \langle u, (T \mid _U)^*v \rangle$ ，所以 $T \mid _U = (T \mid _U)^*$ , 因此说法2成立。结合说法1，用类似得方式也可得到说法3。

### 实谱定理
设 $\mathbf{F} = \mathbf{R}$ 且 $T \in \mathcal{L}(V)$ ，则以下条件等价成立
1. $T$ 是自伴的；
2. $V$ 有一个由 $T$ 的本征向量组成的规范正交基；
3. $T$ 关于 $V$ 的某个规范正交基具有对角矩阵；

证明：当条件3成立时，因为 $T^*$ 的矩阵就是 $T$ 的共轭转置矩阵，因为是实内积空间中，矩阵中的元素也是实数，对角矩阵经过共轭转置后不变，故而 $T^* = T$ ，条件1成立。

当 $\text{dim} \, V = 1$ 时，显然条件1成立必然使得条件2成立，因此我们可以假设 $\text{dim} \, V > 1$ ，并且假设在更小维数的实内积空间中，条件1成立会使得条件2成立。

设条件1成立，那么 $T$ 必然有本征值，设 $u$ 是 $T$ 的一个本征向量且 $\lVert u \rVert = 1$ ，设 $U = \text{span}(u)$ ，那么显然 $U$ 在 $T$ 下不变，故而 $T \mid _{U^\perp} \in \mathcal{L}(U^\perp)$ 也是自伴的。因为之前的假设，$U^\perp$ 有一个由 $T \mid _{U^\perp}$ 的本征向量组成的规范正交基，那么将 $u$ 添加到这组规范正交基，即可得到 $V$ 的一个由 $T$ 的本征向量组成的规范正交基。向维度更小的空间归纳使用这段逻辑，直到维数为 $2$ ，即可证明在有限维下，条件1的成立会使得条件2成立。

显然，条件2会使得条件1成立，因此我们可知条件1、2、3会循环导致彼此成立，故而证得这三个条件等价成立。
