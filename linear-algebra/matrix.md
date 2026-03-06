# 矩阵（matrix）
定义：
设 $m,n$ 都是正整数，那么一个 $m \times n$ **矩阵** $A$ 是一个由 $\mathbf{F}$ 中的元素构成的一个 $m$ 行 $n$ 列的阵列：
$$
A = 
\begin{pmatrix}
A_{1,1} & \dots & A_{1,n} \\
\vdots  &       &  \vdots \\
A_{m,1} & \dots & A_{m,n} \\
\end{pmatrix}
$$
其中 $A_{j,k}$ 指 $A$ 中的第$j$行、第$k$列的元素。

## 用矩阵表示线性映射
线性代数中常常使用矩阵来表示线性映射:

设 $T \in \mathcal{L}(V, W)$ ，$v_1, \dots , v_n \in V$ 为 $V$ 的基，$w_1, \dots , w_m \in W$ 是 $W$ 的基，那么规定 $T$ 关于这些基的矩阵为一个 $m \times n$ 的矩阵，记为 $\mathcal{M}(T)$ ，对于 $V$ 的任意的基（还是设这个矩阵叫 $A$）：
$$T{v_k} = A_{1,k}w_{1} + \dots + A_{m,k}w_{m}$$

矩阵通过这种方式描述了一个线性映射是如何从定义域的基是如何映射到值域的。一般情况下，线性映射的定义域和值域的基都是在上下文中明了的，如果遇到了上下文不明的时候，也使用：
$$\mathcal{M}(T, (v_1, \dots, v_n), (w_1, \dots, w_m))$$
这样的记法来明确基。

在写矩阵的时候，也可以将基明确标注在矩阵的顶部和左侧：
$$
\begin{array}{cc}
\mathcal{M}(T) =
& 
\begin{array}{cc}
\quad & {\quad v_1 \quad \dots \quad v_k \quad \dots \quad v_n \quad} \\
\begin{array}{c}
w_1 \\
\vdots \\
w_m \\
\end{array}
&
\left(
    \begin{array}{ccccc}
    \quad & \quad & A_{1,k} & \quad & \quad \\
    \quad & \quad & \vdots  & \quad & \quad \\
    \quad & \quad & A_{m,k} & \quad & \quad \\
    \end{array}
\right)
\end{array}
\end{array}
$$

## 矩阵加法
首先，两个矩阵只有在行数和列数完全相等时才能相加，它们的和是每个对应元素的和所构成的新矩阵，即：
$$
\begin{pmatrix}
A_{1,1} & \dots & A_{1,n} \\
\vdots  &       & \vdots  \\
A_{m,1} &       & A_{m,n} \\
\end{pmatrix}
+
\begin{pmatrix}
B_{1,1} & \dots & B_{1,n} \\
\vdots  &       & \vdots  \\
B_{m,1} &       & B_{m,n} \\
\end{pmatrix}
=
\begin{pmatrix}
C_{1,1} & \dots & C_{1,n} \\
\vdots  &       & \vdots  \\
C_{m,1} &       & C_{m,n} \\
\end{pmatrix}
$$
其中 $C_{j,k} = A_{j,k} + B_{j,k}$ 。

对于表示线性映射的矩阵，例如设 $S,T \in \mathcal{L}(V,W)$ ，那么：
$$\mathcal{M}(S+T) = \mathcal{M}(S) + \mathcal{M}(T)$$

## 矩阵的标量乘法
矩阵与标量的乘积就是每个元素和标量乘积所构成的同大小矩阵，例如对于 $\lambda \in \mathbf{F}$ ：
$$
\lambda
\begin{pmatrix}
A_{1,1} & \dots & A_{1,n} \\
\vdots  &       & \vdots  \\
A_{m,1} &       & A_{m,n} \\
\end{pmatrix}
=
\begin{pmatrix}
{\lambda}A_{1,1} & \dots & {\lambda}A_{1,n} \\
\vdots           &       & \vdots           \\
{\lambda}A_{m,1} &       & {\lambda}A_{m,n} \\
\end{pmatrix}
$$

对于表示线性映射的矩阵，例如 $T \in \mathcal{L}(V,W)$ ，$\lambda \in \mathbf{F}$ ，则：
$$\mathcal{M}({\lambda}T) = {\lambda}\mathcal{M}(T)$$

其实到了这里，结合矩阵的加法和标量乘法，已经可以证明矩阵本身已经是一个向量空间了，此外一般将元素取自 $\mathbf(F)$ 、大小为 $m \times n$ 的矩阵记为 $\mathbf{F}^{m,n}$ 。

## 矩阵乘法
矩阵乘法的核心定义是复合映射，所以矩阵乘法的算术过程可以推导得到。

设向量空间 $U, V, W$ ，$u_1, \dots , u_p$ 、$v_1, \dots , v_n$ 、$w_1, \dots , w_m$ 分别是 $U, V, W$ 的基，有映射 $S : U \to V$ 和 $T : V \to W$ , 并设 $\mathcal{M}(S) = A$ ，$\mathcal{M}(T) = B$，那么对于任意 $1 \le k \le p$ 有：
$$
\begin{align}
(ST)u_k &= S(T{u_k}) \\
&= S({\sum_{r=1}^n}C_{r,k}{v_r}) \\
&= {\sum_{r=1}^n}C_{r,k}S{v_r} \\
&= {\sum_{r=1}^n}C_{r,k}{\sum_{j=1}^m}A_{j,r}{w_j} \\
&= {\sum_{j=1}^m}({\sum_{r=1}^n}C_{r,k}A_{j,r}C_{r,k}{w_j}) \\
\end{align}
$$

所以，对于 $\mathcal{M}(ST)$ 是一个 $m \times p$ 的矩阵，那么对于 $1 \le j \le m$ 、$1 \le k \le q$ :
$$\mathcal{M}(ST)_{j,k} = (AC)_{j,k} = {\sum_{r=1}^n}A_{j,r}C_{r,k}$$
即将$A$的第 $j$ 行与 $C$ 的第 $k$ 列的元素对应相乘再取和，就得到矩阵 $AC$ 的第 $j$ 行 第 $k$ 列的元素。

还要注意，矩阵的乘积必须在前向映射的值域维数等于后向映射的定义域维数时才有意义。

例如：
$$
\begin{pmatrix}
1 & 2 \\
3 & 4 \\
5 & 6 \\
\end{pmatrix}
\begin{pmatrix}
6 & 5 & 4 & 3 \\
2 & 1 & 0 & -1 \\
\end{pmatrix}
=
\begin{pmatrix}
10 & 7 & 4 & 1 \\
26 & 19 & 12 & 5 \\
42 & 31 & 20 & 9 \\
\end{pmatrix}
$$

同样，对于表示线性映射的矩阵的乘积，表示的就是两个线性映射的复合映射，设 $T \in \mathcal{L}(U, V)$ 、 $S \in \mathcal{L}(V, W)$ ，那么：
$$\mathcal{M}(ST) = \mathcal{M}(S)\mathcal{M}(T) : \mathcal{M}(ST) \in \mathcal{L}(U, W)$$

有时我们需要取矩阵得某一行或某一列出来作为新的矩阵，例如对于一个 $m \times n$ 的矩阵 $A$：
- 记 $A_{j,\cdot}$ ，用于表示由 $A$ 的第 $j$ 行组成的一个 $1 \times n$ 矩阵；
- 记 $A_{\cdot,k}$ ，用于表示由 $A$ 的第 $k$ 列组成的一个 $m \times 1$ 矩阵；

有了这样的概念，我们就可以用其他的方式来表达矩阵乘法：
- 矩阵乘积的元素等于行乘以列；
- 矩阵乘积的列等于矩阵乘以列；

意思其实是，设 $A$ 是一个 $m \times n$ 的矩阵，$C$ 是一个 $n \times p$ 的矩阵那么可以得到：
$$
\begin{align}
(AC)_{j,k} &= A_{j,\cdot}C_{\cdot,k} \\
(AC)_{\cdot,k} &= AC_{\cdot,k} \\
\end{align}
$$

对某个向量做线性映射，实际上可以看作表示线性映射的矩阵与表示向量的单列矩阵做乘积，例如设 $A$ 是一个 $m \times n$ 的矩阵，向量 $c$ 作为一个 $n \times 1$ 的矩阵 $\begin{pmatrix}c_1 \\ \vdots \\ c_n \end{pmatrix}$，则：
$$Ac = {c_1}A_{\cdot,1} + \dots + {c_n}A_{\cdot,n}$$

也可以说 $AC$ 是 $A$ 的诸列在标量组 $c$ 上的**线性组合**。
