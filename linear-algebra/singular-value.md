# 奇异值

## 定义
设 $T \in \mathcal{L}(V)$ ，那么 $T$ 的**奇异值**（singular value）就是由 $\sqrt{T^*T}$ 的本征值构成的数组，并且每个本征值 $\lambda$ 都要在这个数组中重复其本征空间的维数 $\text{dim} \ E(\lambda, \sqrt{T^*T})$ 次。

## 奇异值分解
设 $T \in \mathcal{L}(V)$ 有奇异值 $s_1, \dots, s_n$ ，则 $V$ 有两个规范正交基 $e_1, \dots, e_n$ 和 $f_1, \dots, f_n$  使得对每个 $v \in V$ 都有 $Tv = s_1 \langle v, e_1 \rangle f_1 + \dots + s_n \langle v, e_n \rangle f_n$ 。

证明： 因为 $\sqrt{T^*T}$ 是正算子，根据谱定理可知，有规范正交基 $e_1, \dots, e_n$ 使得对于 $1 \leq j \leq n$ 均有 $\sqrt{T^*T} e_j = s_j e_j$ 。
并且对每个 $v \in V$ 均有
$$v = \langle v, e_1 \rangle e_1 + \dots + \langle v, e_n \rangle e_n$$

将 $\sqrt{T^*T}$ 作用于该等式两端可得
$$\sqrt{T^*T} v = s_1 \langle v, e_1 \rangle e_1 + \dots + s_n \langle v, e_n \rangle e_n$$

对 $T$ 做极分解，可知有等距同构 $S \in \mathcal{L}(V)$ 使得 $T = S\sqrt{T^*T}$ ，将 $S$ 作用于上边的等式，可得
$$S\sqrt{T^*T} v = s_1 \langle v, e_1 \rangle S e_1 + \dots + s_n \langle v, e_n \rangle S e_n$$

设 $f_j = Se_j$ ，因为 $S$ 是等距同构， 所以 $\lVert f_j \rVert = \lVert Se_j \rVert = \lVert e_j \rVert = 1$ ，所以 $f_1, \dots, f_n$ 也是一个规范正交基。那么上述等式就变成了
$$Tv = s_1 \langle v, e_1 \rangle f_1 + \dots + s_n \langle v, e_n \rangle f_n$$
