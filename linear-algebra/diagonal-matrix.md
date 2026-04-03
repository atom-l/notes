# 对角矩阵

## 定义
**对角矩阵**（diagonal matrix）指的是除对角线以外所有元素均为 $0$ 的方形矩阵。

形式如下：
$$
\left(
\begin{array}{ccc}
{\lambda}_1 & & 0 \\
& \ddots & \\
0 & & {\lambda}_n \\
\end{array}
\right)
$$

## 本征空间
设 $T \in \mathcal{L}(V)$ ，对于任意 $\lambda \in \mathbf{F}$ ，其**本征空间**（eigenspace）记为 $E(\lambda , T)$ ，该空间由所有 $T$ 关于 $\lambda$ 的本征向量与零向量所构成，即：
$$E(\lambda , T) = \text{null}(T - \lambda I)$$

结合“不同本征值的本征向量之间线性无关”的性质，还可以得出“本征空间之和是直和”的结论：

设 $V$ 是有限维的， $T \in \mathcal{L}(V)$ ，且 ${\lambda}_1, \dots ,{\lambda}_m$ 是 $T$ 的各不相同的本征值，那么
$$E({\lambda}_1,T) + \dots + E({lambda}_m,T)$$
是直和。

再结合“同一向量空间下的某个线性映射对应的不同本征值的数量不超过其维数”的性质，可以轻易得出本征空间维数之和的上限：
$$\text{dim} \, E({\lambda}_1,T) + \dots + \text{dim} \, E({\lambda}_m,T) \leq \text{dim} \, V$$

## 可对角化

### 定义
如果某个算子 $T \in \mathcal{L}(V)$ 关于 $V$ 的某个基有对角矩阵，则称其为**可对角化的**（diagonal）。

### 可对角化的成立条件
设 ${\lambda}_1, \dots , {\lambda}_m \in \mathbf{F}$ 为 $T$ 所有不同的本征值，则下列条件等价成立：
- $T$ 可对角化；
- $V$ 有由 $T$ 的本征向量构成的基；
- $V$ 有在 $T$ 下不变的一维子空间 $U_1, \dots , U_n$ 使得 $V = U_1 \oplus \dots \oplus U_n$ ；
- $V = E({\lambda}_1 , T) \oplus \dots \oplus E({\lambda}_m , T)$ ；
- $\text{dim} \, V = \text{dim} \, E({\lambda}_1, T) + \dots + \text{dim} \, E({\lambda}_n, T)$ ；

### 可对角化与本征值数量的关系
若 $T \in \mathcal{L}(V)$ 有 $\text{dim} \, V$ 个不同的本征值，则 $T$ 可以对角化。

> 该定理其实揭示了算子可对角化的本质，即可对角化的算子有足够的本征向量（本征值的不同保证了它们线性无关）以张成原向量空间。
>
> 该定理的证明思路也是如此，故而我们便省略证明过程了。
