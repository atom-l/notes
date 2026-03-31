# 不变子空间

## 定义
设 $\mathbf{T} \in \mathcal{L}(V)$ ，$U$ 是 $V$ 的一个子空间，并对任意 $u \in U$ 都有 $Tu \in U$ ，则称 $U$ 是 $T$ 下的**不变子空间**（invariant subspace）。

以下是一些不变子空间的示例：
- 设 $T \in \mathcal{L}(V)$ , 那么零空间 $\{0\}$ 、 $V$ 、 $\text{null} \, T$ 、$\text{range} \, T$ 都是 $T$ 下的不变子空间。
- 设 $T \in \mathcal{L}(\mathcal{P}(\mathbf{R}))$ 定义为 $T(p) = p'$ ，则 $\mathcal{P}_4(\mathbf{R})$ 是 $T$ 下的不变子空间。

## 本征值与本征向量

### 定义
本征值和本征向量的概念离不开一个场景——一维不变子空间。

设 $v \in V$ 且 $v \neq 0$ ，并设 $U$ 为 $v$ 的标量倍向量构成的集合，即 $v$ 的张成空间：
$$U = \{ \lambda v \, : \, \lambda \in \mathbf{F} \} = \text{span}(v)$$

于是我们得到了 $V$ 的一维子空间 $U$，若是 $U$ 在某个算子 $T \in \mathcal{L}(V)$ 下不变，那么此时 $U$ 就是一个不变子空间。这里的 $\lambda$ 和 $v$ 分别称之为本征值和本征向量。

下面给出完整定义：
- 设 $T \in \mathcal{L}(V)$ 、$\lambda \in \mathbf{F}$ ，若存在非零向量 $v \in V$ 使得 $Tv = \lambda v$ ，则称 $\lambda$ 为 $T$ 的**本征值**（eigenvalue）。
- 设 $T \in \mathcal{L}(V)$ 、$v \in V \land v \neq 0$ ，若存在 $\lambda \in \mathbf{F}$ 使得  $Tv = \lambda v$ ，则称 $v$ 为 $T$ 的相应于 $\lambda$ 的**本征向量**（eigenvector）。

### 本征值存在的等价条件
设 $V$ 是有限维的 、$T \in \mathcal{L}(V)$ 、$\lambda \in \mathbf{F}$ ，那么以下情况等价成立：
- (a) $\lambda$ 是 $T$ 的本征值；
- (b) $T - \lambda I$ 不是单射的；
- (c) $T - \lambda I$ 不是满射的；
- (d) $T - \lambda I$ 不可逆；

证明：因为算子的单射性、满射性、可逆性等价成立，故而情况 (b)、(c)、(d) 等价成立。若情况 (a) 成立，则 $Tv = \lambda v$ ，可得 $Tv - \lambda v = 0$ ， 那么本征向量 $v$ 便属于 $T - \lambda I$ 的零空间，故而情况 (a) 和 (b) 也等价成立。

### 不同本征值的本征向量线性无关
若 $T \in \mathcal{L}(V)$ ，设 ${\lambda}_1 , \dots {\lambda}_m$ 都是 $T$ 互不相同的本征值，那么这些本征值对应的本征向量 $v_1 , \dots , v_m$ 线性无关。

**证明：**

设 $v_1 , \dots , v_m$ 线性相关，且设 $k$ 是使得下式成立的最小下标：
$$v_k \in \text{span}(v_1, \dots , v_{k-1})$$

于是有 $a_1, \dots , a_{k-1} \in \mathbf{F}$ 使得：
$$v_k = a_1 v_1 , \dots , a_{k-1} v_{k-1}$$

由本征值和本征向量的定义可得：
$$
\begin{align}
T(v_k) &= {\lambda}_k v_k \\
& \Downarrow \\ 
T(a_1 v_1 , \dots , a_{k-1} v_{k-1}) &= a_1 T(v_1) , \dots , a_{k-1} T(v_{k-1}) \\
&= a_1 {\lambda}_1 v_1 , \dots , a_{k-1} {\lambda}_{k-1} v_{k-1} \\
& \Downarrow \\
{\lambda}_k v_k &= a_1 {\lambda}_1 v_1 , \dots , a_{k-1} {\lambda}_{k-1} v_{k-1}
\end{align}
$$

将第一个等式乘以 ${\lambda}_k$ 后再与第二个等式相减可得：
$$0 = a_1 ({\lambda}_k - {\lambda}_1) v_1 , \dots , a_{k-1} ({\lambda}_k - {\lambda}_{k-1}) v_{k-1}$$

因为每个 $\lambda$ 不相等，且 $v_1, \dots , v_{k-1}$ 又是非零向量，所以只能是 $a_1, \dots , a_{k-1}$ 全为零，但如果反代回第一个等式，会使得 $v_k = 0$ ，此时会与本征向量的定义相悖，故而 $v_1 , \dots , v_m$ 线性相关的假设不成立。

### 本征值的个数
由不同本征值对应的本征向量线性无关的结论易得结论：

设 $V$ 是有限维向量空间，那么 $V$ 上的每个算子最多有 $\text{dim} \, V$ 个不同的本征值。

## 限制算子和商算子
设 $T \in \mathcal{L}(V)$ , 且 $U$ 是 $V$ 的在 $T$ 下的不变子空间。
- **限制算子**（restriction operator） $T \mid _U \in \mathcal{L}(U)$ 的定义为：
$$T \mid _U(u) = Tu$$
此处 $u \in U$ 。

- **商算子**（quotien operator） $T/U \in \mathcal{L}(V/U)$ 的定义为：
$$(T/U)(v + U) = Tv + U$$
此处 $v \in V$ 。
