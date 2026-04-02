# 上三角矩阵

## 相关定义
这里我们主要讨论有限维向量空间上算子相关的矩阵，故而这些矩阵都是方形矩阵，其列数和行数相等，这里我们给出一些术语定义：
- 一个方形矩阵的**对角线**（diagonal）是由从左上角至右下角的直线上的元素组成;
- 若一个矩阵的对角线以下的元素全部为 $0$，则称该矩阵为**上三角矩阵**（upper triangular matrix）；

上三角矩阵的形式如下:
$$
\left(
\begin{array}{ccc}
{\lambda}_1 &  & * \\
&\ddots & \\
0 & & {\lambda}_n
\end{array}
\right)
$$

## 上三角矩阵的成立条件
设 $T \in \mathcal{L}(V)$ ，且 $v_1, \dots , v_n$ 是 $V$ 的基，那么以下条件等价：
- $T$ 关于 $v_1, \dots , v_n$ 的矩阵是一个上三角矩阵；
- 对于任意 $1 \leq j \leq n$ ，都有 $Tv_j \in \text{span}(v_1, \dots , v_j)$ ；
- 对于任意 $1 \leq j \leq n$ ，都有 $\text{span}(v_1, \dots, v_j)$ 在 $T$ 下不变；

## 上三角矩阵的存在性
设 $V$ 是有限维复向量空间，对于任意 $T \in \mathcal{L}(V)$ ，则 $T$ 关于 $V$ 上的某个基有上三角矩阵。

证明：

当 $\text{dim} \, V = 1$ 时，结论自然成立。故而现在假设 $\text{dim} \, V > 1$ ，且设维数比 $V$ 小的复向量空间结论都成立。

设 $\lambda$ 是 $T$ 的某个本征值，由之前的“有限维非零复向量空间的算子都有本征值”结论可知，$\lambda$ 一定存在。此外，设向量空间 $U$ 定义为：
$$U = \text{range}(T - \lambda I)$$

设 $\lambda$ 对应的本征向量 $v_e \in V$ ，那么 $(T - \lambda I) v_e = 0$ ，因此 $(T - \lambda I)$ 必然不满足单射性，由算子的单射性、满射性、可逆性等价成立的结论可知，$(T - \lambda I)$ 不是满的，那么 $\text{dim} \, U < \text{dim} \, V$ 。

此外，对于任意 $u \in U$ 有：
$$Tu = (T - \lambda I)u + \lambda u$$

由 $U$ 的定义可知 $(T - \lambda I)u \in U$ ，所以 $Tu \in U$ ，故而 $U$ 在 $T$ 下不变。

所以 $T \mid _u$ 是 $U$ 上的算子，因为之前的假设，$U$ 存在基 $u_1, \dots , u_m$ 使得 $T \mid _u$ 关于该基有上三角矩阵，故而对于任意 $1 \leq j \leq m$ 有：
$$Tu_j = (T \mid _u)(u_j) \in \text{span}(u_1, ... , u_j)$$

在 $u_1, \dots , u_m$ 扩充到 $V$ 的基 $u_1, \dots , u_m, v_1, \dots , v_n$ , 那么对于任意 $1 \leq k \leq n$ 有：
$$Tv_k = (T - \lambda I)v_k + \lambda v_k$$

有 $U$ 的定义可知 $(T - \lambda I)v_k \in U$ ，因此：
$$Tv_k \in \text{span}(u_1, \dots , u_m, v_1, \dots , v_k)$$

由上三角矩阵成立的等价条件可知，$T$ 有关于基 $u_1, \dots , u_m, v_1, \dots , v_n$ 的上三角矩阵。

使用归纳法，将以上步骤递归，收敛到 $\text{dim} \, U = 1$ 的情况即可证明结论。

## 上三角矩阵与可逆性
设 $T \in \mathcal{L}(V)$ 关于 $V$ 的某个基有上三角矩阵，那么该矩阵对角线上的元素全不为 $0$ 的情况与 $T$ 可逆的情况等价成立。

证明：

设 $v_1, \dots ,v_n$ 是 $V$ 的基，且 $T$ 关于该基有上三角矩阵：
$$
\mathcal{M}(T) =
\left(
\begin{array}{ccc}
{\lambda}_1 & & * \\
& \ddots & \\
0 & & {\lambda}_n \\
\end{array}
\right)
$$

首先，设 ${\lambda}_1, \dots , {\lambda}_n$ 均不为零。对于 $v_1$ ，我们可以得到：
$$
\begin{align}
Tv_1 &= {\lambda}_1 v_1 \\
& \Downarrow \\
T(v_1/{\lambda}_1) &= v_1 \\
& \Downarrow \\
v_1 & \in \text{range} \, T \\
\end{align}
$$

对于 $v_2$ ，则存在 $a \in \mathcal{F}$ 使得：
$$
\begin{align}
T(v_2/{\lambda}_2) &= av_1 + {\lambda}_2 v_2 \\
& \Downarrow \\
v_2 & \in \text{range} \, T \\
\end{align}
$$

对于 $v_3$ , 则存在 $a, b \in \mathcal{F}$ 使得：
$$
\begin{align}
T(v_3/{\lambda}_3) &= av_1 + bv_2+ {\lambda}_3 v_3 \\
& \Downarrow \\
v_3 & \in \text{range} \, T \\
\end{align}
$$

依此类推，我们可以知道 $v_1, \dots , v_n \in \text{range} \, T$ ，因为它们都是 $V$ 的基，故而它们必然线性无关，因此 $\text{span}(v_1, \dots , v_n) = \text{range} \, T = V$ ，故而 $T$ 是满射的，因为算子的满射性和可逆性同时成立，所以当算子的矩阵对角线元素均不为 $0$ 时该算子可逆。

现在设 $T$ 是可逆的，那么 ${\lambda}_1 \neq 0$ ，否则的话 $Tv_1 = 0$ ，这就与 $T$ 可逆矛盾了。所以我们设 $1 < j \leq n$ 使得 ${\lambda}_j = 0$ ，这说明 $T$ 将 $\text{span}(v_1, \dots , v_j)$ 映射到 $\text{span}(v_1, \dots , v_{j - 1})$ ，明显前者的维数比后者大，那么 $T \mid _{\text{span}(v_1, \dots , v_j)}$ 不是单射的，即存在一个 $v_x \in \text{span}(v_1, \dots , v_j) \subset V$ 会使得 $Tv_x = 0$ ，即 $T$ 在 $V$ 上也不是单射的，因为算子的单射性和可逆性等价成立，此时就与我们的假设相悖了，故而当 $T$ 可逆时， ${\lambda}_1, \dots, {\lambda}_n$ 均不为 $0$。至此证毕。

## 上三角矩阵与本征值
若 $T \in \mathcal{L}(V)$ 关于 $V$ 上的某个基有上三角矩阵，那么该矩阵的每个对角线元素都是 $T$ 的本征值。
