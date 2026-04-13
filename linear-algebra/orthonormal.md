# 规范正交基

## 规范正交

### 定义
如果一个向量组中的每个向量的范数都是 $1$ 且与其他向量正交，，则称这个向量组是**规范正交的**（orthononmal）。

即对于向量空间 $V$ 上的向量组 $e_1, \dots , e_n$ ，如果其是规范正交的，则：
$$
\langle e_j , e_k \rangle =
\begin{cases}
1, \, \text{若} j = k, \\
\\
0, \, \text{若} j \neq k, \\
\end{cases}
$$

### 相关性质
1. **若 $e_1, \dots , e_m$ 是 $V$ 中的规范正交向量组，则对所有 $a_1, \dots, a_m \in \mathbf{F}$ 均有：**
$$\lVert a_1 e_1 + \dots + a_m e_m \rVert ^2 = \lvert a_1 \rvert ^2 + \dots + \lvert a_m \rvert ^2$$

因为规范正交向量组中的向量的范数都是 $1$ ，所以很容易得到这条性质。

2. **规范正交向量组是线性无关的。**

证明：设 $e_1, \dots , e_m$ 是 $V$ 中的规范正交向量组，并设 $a_1, \dots, a_m \in \mathbf{F}$ 使得：
$$a_1 e_1 + \dots + a_m e_m = 0$$

根据性质1，并结合上式：
$$
\begin{align}
\lVert a_1 e_1 + \dots + a_m e_m \rVert ^2 &= \lvert a_1 \rvert ^2 + \dots + \lvert a_m \rvert ^2 = 0 \\
& \Downarrow \\
\lvert a_j \rvert ^2 = 0 &, \text{其中} 1 \leq j \leq m \\
& \Downarrow \\
a_j &= 0
\end{align}
$$

因此根据线性无关成立的条件，可知 $e_1, \dots , e_m$ 线性无关。

## 规范正交基

### 定义
如果一个规范正交向量组正好也是张成该向量空间的基，那么这个向量组就是这个向量空间的**规范正交基**（orthonormal basis）。

### 相关性质
1. **向量空间 $V$ 中的每个长度为 $\text{dim} \, V$ 的规范正交向量组都是 $V$ 的规范正交基。**

该性质由规范正交向量组的线性无关性易得，故省略证明。

2. **对于向量空间中的任意向量，我们可以通过以下方式将其转换为规范正交基的线性组合：**

**设 $e_1, \dots, e_n$ 是 $V$ 的规范正交基，那么对于任意 $v \in V$ 都有**
$$v = \langle v, e_1 \rangle e_1 + \dots + \langle v, e_n \rangle e_n$$
**且**
$$\lVert v \rVert ^2 = \lvert \langle v, e_1 \rangle \rvert ^2 + \dots + \lvert \langle v, e_n \rangle \rvert ^2$$

证明：

因为 $e_1, \dots, e_n$ 是 $V$ 的基，所以一定存在 $a_1, \dots , a_n \in \mathbf{F}$ 使得
$$v = a_1 e_1 , \dots , a_n e_n$$

将上式与基中的任意向量 $e_j$ 做内积，可以得到
$$
\langle v, e_j \rangle = a_1 \langle e_1, e_j \rangle + \dots + a_j \langle e_j, e_j \rangle + \dots + a_n \langle e_n, e_j \rangle
$$

因为该基是规范正交的，故而每个 $\langle e_k, e_j \rangle = 0 \text{其中} k \neq j$ ，那么
$$
\begin{align}
\langle v, e_j \rangle = a_j \langle e_j, e_j \rangle &= a_j \cdot 1 = a_j \\
&\Downarrow \\
v = \langle v, e_1 \rangle e_1 + &\dots + \langle v, e_n \rangle e_n
\end{align}
$$

本性质中的第一个等式证明完毕，由规范正交组的相关性质易得本性质中的第二个等式，故省略。

## 格拉姆-施密特过程

### 过程定义
**格拉姆-施密特过程**（Gram–Schmidt Procedure）是一个将任意线性无关组转换成规范正交组的方法，该方法如下所述。

设 $v_1, \dots ,v_m$ 是 $V$ 中的线性无关组，设 $e_1 = v_1 / \lVert v_1 \rVert$ ，对于 $1 < j \leq m$ 则定义为
$$
e_j = 
\frac
{v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_n \rangle e_n}
{\lVert v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_n \rangle e_n \rVert}
$$

则 $e_1, \dots , e_m$ 是 $V$ 中的规范正交组，使得对 $1 \leq j \leq m$ 有
$$\text{span}(v_1, \dots , v_j) = \text{span}(e_1, \dots , e_j)$$

**证明：**

首先对于 $j = 1$ 的情况，显然 $e_1$ 是 $v_1$ 的正数倍，那么 $$\text{span}(v_1) = \text{span}(e_1)$$ 自然成立。

我们先设 $1 < j <m$ 的情况下成立
$$\text{span}(v_1, \dots, v_j) = \text{span}(e_1, \dots ,e_j)$$

因为 $v_j \notin \text{span}(v_1, \dots, v_j)$ （$v_1, \dots ,v_m$ 是线性无关组），所以 $v_j \notin \text{span}(v_1, \dots, v_j)$ ，所以根据 $e_j$ 的定义，可知其中的分母不为 $0$ ，又因为 $e_j$ 的定义可以看作是一个向量除以其本身范数，故而可知 $\lVert e_j \rVert = 1$ 。

再设 $1 \leq k < j$ ，则
$$
\begin{align}
\langle e_j, e_k \rangle &=
\langle
\frac
{v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_{j-1} \rangle e_{j-1}}
{\lVert v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_{j-1} \rangle e_{j-1} \rVert}
,
e_k
\rangle \\
&=
\langle
\frac
{v_j - (\langle v_j, e_1 \rangle e_1 + \dots + \langle v_j, e_{j-1} \rangle e_{j-1})}
{\lVert v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_{j-1} \rangle e_{j-1} \rVert}
,
e_k
\rangle \\
&=
\langle
\frac
{v_j - v_j}
{\lVert v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_{j-1} \rangle e_{j-1} \rVert}
,
e_k
\rangle \\
&=
\frac
{\langle v_j, e_k \rangle - \langle v_j, e_k \rangle}
{\lVert v_j - \langle v_j, e_1 \rangle e_1 - \dots - \langle v_j, e_{j-1} \rangle e_{j-1} \rVert} \\
&= 0
\end{align}
$$

可知 $e_1, \dots , e_j$ 是个规范正交组。

使用归纳法重复以上过程，可以证得 $e_1, \dots , e_m$ 是规范正交组。

接着，因为在 $1 \leq j \leq m$ 的情况下，格拉姆-施密特过程中的第二个等式左右两边都是线性无关组，且两边长度相等，故而其张成空间的维数也相等，任意 $e_j$ 又是通过代数方法由 $v_j$ 转换而来（它们都在同一个向量空间中），那么等式两边的张成空间必然也相等。

### 相关推论

1. **任意有限维内积空间都有规范正交基。**

证明：对于某个有限维内积空间，其必然存在基，对其任意基做格拉姆-施密特过程，就可以得到长度与该基相同的规范正交组（因为基的长度是有限的），那么此规范正交组显然张成该内积空间，即得到了该空间的规范正交基。

2. **对于任意有限维内积空间，其中任意规范正交向量组都可以扩充为规范正交基。**

简略证明：将任意规范正交向量组的长度扩充到和该内积空间的维度相同，并且保持线性无关，再应用基做格拉姆-施密特过程即可（最后得到的组因为前若干个向量本就规范正交，故而保持不变）。

3. **设 $T \in \mathcal{L}(V)$ ，如果 $T$ 关于 $V$ 的某个基有上三角矩阵，那么 $T$ 关于 $V$ 某个规范正交基也有上三角矩阵。**

证明：

设 $T$ 关于 $v_1, \dots , v_n$ 具有上三角矩阵，那么对于任意 $1 \leq j \leq n$ 都有 $\text{span}(v_1, \dots, v_n)$ 在 $T$ 下不变。

对 $v_1, \dots , v_n$ 做基做格拉姆-施密特过程，得到 $V$ 的规范正交基 $e_1, \dots , e_m$ ，那么对于任意 $1 \leq j \leq n$ 都有
$$\text{span}(v_1, \dots, v_j) = \text{span}(e_1, \dots, e_j)$$

所以对于任意 $1 \leq j \leq n$ 也都有 $\text{span}(e_1, \dots, e_j)$ 在 $T$ 下不变，故而 $T$ 关于规范正交基 $e_1, \dots, e_m$ 有上三角矩阵。

4. **舒尔定理：设 $V$ 是有限维复向量空间且 $T \in \mathcal{L}(V)$ , 则 $T$ 关于 $V$ 的某个规范正交基有上三角矩阵。**

结合性质3以及算子关于向量空间基的上三角矩阵的存在性，就可以得到该定理。

## 里斯表示定理
**设 $V$ 是有限维的且 $\varphi$ 是 $V$ 上的线性泛函，即 $\varphi \in \mathcal{L}(V, \mathbf{F})$ ，则唯一存在向量 $u \in V$ 使得对任意 $v \in  V$ 都有 $\varphi(v) = \langle v, u \rangle$ 。**

> 该定理揭示了一个真相：与任意取定向量做内积运算其实是一种线性泛函。

证明：

设 $e_1, \dots, e_n$ 是 $V$ 的一个规范正交基，那么对于任意 $v \in V$ 均有

$$
\begin{align}
\varphi(v) &= \varphi(\langle v, e_1 \rangle e_1 + \dots + \langle v, e_n \rangle e_n) \\
&= \langle v, e_1 \rangle \varphi(e_1) + \dots + \langle v, e_n \rangle \varphi(e_n) \\
&= \langle v, \overline{\varphi(e_1)} e_1 \rangle + \dots \langle v, \overline{\varphi(e_n)} e_n \rangle \\
&= \langle v, \overline{\varphi(e_1)} e_1 + \dots + \overline{\varphi(e_n)} e_n \rangle
\end{align}
$$

显然，取 $u = \overline{\varphi(e_1)} e_1 + \dots + \overline{\varphi(e_n)} e_n$ 就可以使得 $\varphi(v) = \langle v, u \rangle$ ，已证得命题的存在性。

为了证明命题的唯一性，设有 $u_1, u_2 \in V$ 使得任意 $v \in V$ 均有
$$\varphi(v) = \langle v, u_1 \rangle = \langle v, u_2 \rangle$$

显然对于任意 $v \in V$ 也有
$$0 = \langle v, u_1 \rangle - \langle v, u_2 \rangle = \langle v, u_1 - u_2 \rangle$$

取 $v = u_1 - u_2$ ，那么可得 $\langle u_1 - u_2, u_1 - u_2 \rangle$ ，此时 $u_1 - u_2$ 必然为 $0$ ，故而 $u_1 = u_2$ ，证得命题的唯一性。
