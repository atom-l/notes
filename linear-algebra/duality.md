# 对偶

## 线性泛函
**线性泛函**（linear functional）实际上是特指从某个向量空间 $V$ 到标量空间的线性映射，即 $\mathcal{L}(V,\mathbf{F})$ 中的元素。

## 对偶空间
**对偶空间**（dual space）就是某个向量空间 $V$ 上所有的线性泛函所构成的向量空间，记作 $V'$ ，根据定义：
$$V' = \mathcal{L}(V,\mathbf{F})$$

有限维的情况下，对偶空间的维数实际上就等于向量空间的维数，即：
$$\text{dim}{\,}V' = \text{dim}{\,}V$$

## 对偶基
设 $v_1, \dots , v_n$ 都是向量空间 $V'$ 的基，则 $v_1, \dots , v_n$ 的**对偶基**（dual basis）便是 $V'$ 中对应数量的元素 ${\varphi}_1 , \dots , {\varphi}_n$ ，其中第 $j$ 个线性泛函 ${\varphi}_j$ 对于 $V$ 的任意基 $v_k$ 的映射关系为：
$$
{\varphi}_j(v_k) = 
\begin{cases}
1, \quad 若 k = j, \\
2, \quad 若 k \neq j. 
\end{cases}
$$

虽然对偶基本的定义是从原向量空间的基出发的，但对偶基实际上也是对偶空间的基。

## 对偶映射
若对于向量空间 $V,M$ 有线性映射 $T \in \mathcal{L}(V,W)$，则 $T$ 的**对偶映射**（dual map）是一个线性映射 $T' = \mathcal{L}(W',V')$，且该映射对于任意 $\varphi \in W'$ 的映射关系为：
$$T'(\varphi) = \varphi \, \circ \, T$$

此外，对偶映射的相关代数性质如下：
- 若 $S,T \in \mathcal{L}(V,W)$ ，则 $(S+T)' = S' + T'$ ；
- 若 $\lambda \in \mathbf{F}$ , $T \in \mathcal{L}(V,W)$ ，则 $(\lambda T)' = \lambda T'$ ；
- 若 $T \in \mathcal{L}(U,V)$ , $S \in \mathcal{L}(V,W)$ ，则 $(ST)' = T'S'$ ；

## 零化子
若有向量空间 $V$ ，且有 $U \subset V$ , 那么 $U$ 的**零化子**（annihilator）$U^0$ 为符合以下定义的一个集合：
$$U^0 = \{\varphi \in V' : \forall u \in U, \, \varphi (u) = 0 \}$$

虽然定义中用集合表示，但零化子 $U^0$ 是对偶空间 $V'$ 的子空间。并且在维数上，其 $V$ 的子空间 $U$ 的维数关系为：
$$\text{dim}{\,}U + \text{dim}{\,}U^0 = \text{dim}{\,}V$$

## $T'$ 的零空间
设有限维向量空间 $V$ 和 $M$，以及线性映射 $T \in \mathcal{L}(V, W)$ ，那么：
- (a) $\text{null} \, T' = (\text{range} \, T)^0$ ；
- (b) $\text{dim} \, \text{null} \, T' = \text{dim} \, \text{null} \, T + \text{dim} \, W - \text{dim} \, V$

证明：

(a) 对于任意 $\varphi \in \text{null} \, T'$ 以及 $v \in V$ ，有：
$$
\begin{align}
0 &= (\varphi \circ T)(v) \\
&= \varphi(Tv) \\
&\Downarrow \\
\varphi &\in (\text{range} \, T)^0 \\
&\Downarrow \\
\text{null} \, T' &\subset (\text{range} \, T)^0
\end{align}
$$

反过来，对于任意 $\varphi \in (\text{range} \, T)^0$ 以及 $v \in V$ 则有：
$$
\begin{align}
0 &= \varphi(Tv) \\
&\Downarrow \\
0 &= \varphi \circ T \\
&= T'(\varphi) \\
&\Downarrow \\
(\text{range} \, T)^0 &\subset \text{null} \, T'
\end{align}
$$

至此可知 $\text{null} \, T'$ 与 $(\text{range} \, T)^0$ 相互包含，那么自然 $\text{null} \, T' = (\text{range} \, T)^0$ 。

(b) 由性质 (a) 可得：
$$
\begin{align}
\text{dim} \, \text{null} \, T' &= \text{dim} \, (\text{range} \, T)^0 \\
&= \text{dim} \, W - \text{dim} \, \text{range} \, T \\
&= \text{dim} \, W - (\text{dim} \, V - \text{dim} \, \text{null} \, T) \\
&= \text{dim} \, \text{null} \, T + \text{dim} \, W - \text{dim} \, V
\end{align}
$$

## $T'$ 的值域
设有限维向量空间 $V$ 和 $W$ ，以及线性映射 $T \in \mathcal(V,W)$ ，那么：
- (a) $\text{dim} \, \text{range} \, T' = \text{dim} \, \text{range} \, T$ ；
- (b) $\text{range} \, T' = (\text{null} \, T)^0$ ；

证明：

(a)
$$
\begin{align}
\text{dim} \, range T' &= \text{dim} \, W' - \text{dim} \, \text{null} \, T' \\
&= \text{dim} \, W - \text{dim} \, (\text{range} \, T)^0 \\
&= \text{dim} \, \text{range} \, T
\end{align}
$$

(b) 首先对于任意 $\varphi \in \text{range} \, T'$ ，那么则有 $\psi \in W'$ 使得 $T'(\psi) = \varphi$ ，那么对于任意 $v \in \text{null} \, T$ ：
$$
\begin{align}
\varphi(v) &= (T'(\psi))v \\
&= (\phi \circ T)v \\
&= \psi(Tv) \\
&= \psi(0) \\
&= 0 \\
&\Downarrow \\
\varphi &\in (\text{null} \, T)^0 \\
&\Downarrow \\
\text{range} \, T' &\subset (\text{null} \, T)^0
\end{align}
$$

此外，由已证的 (a) 可知：
$$
\begin{align}
\text{dim} \, \text{range} \, T' &= \text{dim} \, \text{range} \, T \\
&= \text{dim} \, V - \text{dim} \, \text{null} \, T \\
&= \text{dim} \, (\text{null} \, T)^0
\end{align}
$$

故而可得 $\text{range} \, T' = (\text{null} \, T)^0$ 。

## 线性映射与对偶映射、单射与满射

### 线性映射的满射性等价于其对偶映射的单射性
设有限维向量空间 $V$ 和 $W$ ，若线性映射 $T \in \mathcal(V,W)$ 是满射的，那么：
$$
\begin{align}
\text{range} \, T &= W \\
&\Downarrow \\
(\text{range} \, T)^0 &= \{ 0 \} \\
&\Downarrow \\
\text{null} \, T' &= \{ 0 \} 
\end{align}
$$
故而 $T'$ 是单射的。

### 线性映射的单射性等价于其对偶映射的满射性
设有限维向量空间 $V$ 和 $W$ ，若线性映射 $T \in \mathcal(V,W)$ 是单射的，那么：
$$
\begin{align}
\text{null} \, T &= \{ 0 \} \\
&\Downarrow \\
(\text{null} \, T)^0 &= V' \\
&\Downarrow \\
\text{range} \, T' &= V'
\end{align}
$$
故而 $T'$ 是满射的。

> 可以从更容易理解的角度去看以上这两个性质：
>
> 满射性往往是从高维空间映射向低维空间，而根据定义，对偶映射的映射方向与线性映射相反，此时等同于从低维空间映射向高维空间（因为对偶空间与原向量空间同维），自然就只能单射了。
>
> 反之，就能解读线性映射的单射性与对偶映射的满射性关系。


## 转置矩阵
### 定义
对于一个矩阵 $A$ ，其**转置**（transpose）矩阵 $A^t$ 实际上就是讲 $A$ 的行与列互换而来的矩阵，即：
$$(A^t)_{j,k} = A_{k,j}$$

### 矩阵乘积的转置
若 $A$ 是一个 $m \times n$ 的矩阵，$C$ 是一个 $n \times p$ 的矩阵，那么：
$$(AC)^t = C^t \times A^t$$

## 对偶映射的矩阵
性质：**对偶映射的矩阵是其线性映射的转置**。

即：设 $T \in \mathcal{L}(V,W)$ ，则 $\mathcal{M}(T') = (\mathcal{M}(T))^t$ 。

原因很简单，根据对偶映射的定义，任意 $\varphi \in W'$ ，都有 $T'(\varphi) = \varphi \circ T$ ，以 $V \in \mathbf{R}^2$ 和 $W \in \mathbf{R}^3$ 为例，线性泛函 $\varphi$ 可以看作一个3维向量，此时 $T$ 要和 $\varphi$ 做内积，最终得到一个2维向量，对应某个在 $V$ 上的线性泛函，此时表示 $T$ 的矩阵自然需要转置。
