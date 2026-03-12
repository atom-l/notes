# 矩阵的秩

## 行秩与列秩
设 $A$ 的元素是一个 $m \times n$ 的矩阵，且 $A_{j,k} \in \mathbf{F}$，那么：
- $A$ 的**行秩**（row rank）是 $A$ 的诸行在 $\mathbf{F}^{1,n}$ 中的张成空间的维数，即线性无关的行数；
- $A$ 的**列秩**（column rank）是 $A$ 的诸列在 $\mathbf{F}^{m,1}$ 中的张成空间的维数，即线性无关的列数；

## 线性映射的值域维数等于其矩阵的列秩
设 $V$ 和 $W$ 都是有限维向量空间，对于任意 $T \in \mathcal{L}(V, W)$ ，则：
$$\text{dim} \, \text{range} \, T = \text{dim} \, \mathcal{M}(T)$$

可以形象地理解：线性映射如果有线性相关的列，那么必然会发生维数的损失。

## 行秩必然等于列秩
若矩阵 $A \in \mathbf{F}^{m,n}$ ，定义 $T : \mathbf{F}^{n,1} \to \mathbf{F}^{n,1}$ 为 $Tx = Ax$ ，那么 $\mathcal{M}(T) = A$ ，那么：
$$
\begin{align}
\text{column rank}(A) &= \text{couumn rank}(\mathcal{M}(T)) \\
&= \text{dim} \, \text{range} \, T \\
&= \text{dim} \, \text{range} \, T' \\
&= \text{column rank}(\mathcal{M}(T')) \\
&= \text{column rank}(A^t) \\
&= \text{row rank}(A)
\end{align}
$$ 

## 统一定义秩
因为行秩与列秩等价，所以我们直接约定，矩阵的**秩**（rank）为矩阵的列秩。
