# 零空间、值域

## 零空间（null space）
定义：
对于某个 $T \in \mathcal{L}(V, W)$ ，$T$ 的**零空间**记为 $\text{null}{\,}T$ ，它是 $V$ 中被 $T$ 映射为0的向量集合：
$$\text{null}{\,}T = \{v \in V : Tv = 0 \}$$

对于任意 $u, v \in \text{null}{\ }T$ 和 $\lambda \in \mathbf{F}$ ，根据零空间的定义，我们可以简单得到零空间中任意向量之和与标量乘法的结果：
$$T(u + v) = T(u) + T(v) = 0 \Rightarrow u + v \in \text{null}{\,}T$$
$$T({\lambda}u) = {\lambda}T(u) = {\lambda}0 = 0 \Rightarrow {\lambda}u \in \text{null}{\,}T$$
所以，**零空间是子空间**。

## 值域
定义：
对于某个 $T \in \mathcal{L}(V, W)$ ， $T$ 的**值域**（range）记为 $\text{range}{\,}T$ ，它是在 $W$ 中由 $v$ 的向量经 $T$ 映射而来的向量集合：
$$\text{range}{\,}T = \{ Tv : v \in V \}$$

对于任意 $v_1, v_2 \in \text{range}{\,}T$ 和 $\lambda \in \mathbf{F}$ ，且设 $w_1 = T{v_1}$ 和 $w_2 = T{v_2}$ ， 根据值域的定义，我们同样可以得到：
$$T(v_1 + v_2) = T{v_1} + T{v_2} = w_1 + w_2 \Rightarrow w_1 + w_2 \in \text{range}{\,}T$$
$$T({\lambda}v_1) = {\lambda}T{v_1} = {\lambda}w_1 \Rightarrow {\lambda}w_1 \in \text{range}{\,}T$$
所以，**值域是子空间**。

## 单射（injective）
定义：
如果某个 $T : V \to W$ , 对于任意 $v_1, v_2 \in V$ ，当 $T{v_1} = T{v_2}$ 只在 $v_1 = v_2$ 的情况下才成立时，则称 $T$ 是**单射**的。

结合零空间的概念，我们可以得到结论：
- **对于线性映射，单射性等同于零空间为 $\{0\}$ 。**

证明过程如下：
1. 若 $T$ 是单射的线性映射，那么 $T(0) = 0$ ，即$\{0\} \subset \text{null}{\,}T$ ，设 $v \in \text{null}{\,}T$ ，则：
$$
\begin{align}
& T(v) = 0 = T(0) \\
& \Rightarrow v = 0 \\
& \Rightarrow \text{null}{\,}T = \{0\} \\
\end{align}
$$
2. 若 $\text{null}{\,}T = \{0\}$ ，设 $v_1, v_2 \in V \land T{v_1} = T{v_2}$ ， 则：
$$
\begin{align}
& 0 = T{v_1} -T{v_2} = T(v_1 - v_2) \\
& \Rightarrow T(v_1 - v_2) \in \text{null}{\,}T \\
& \Rightarrow v_1 - v_2 \in \{0\} \\
& \Rightarrow v_1 - v_2 = 0 \\
& \Rightarrow v_1 = v_2 \\
\end{align}
$$

## 满射（surjective）
定义：
如果某个 $T : V \to W$ 的值域完全等于 $W$ ，则称 $T$ 是**满射**的。即：线性映射 $T$ 的值域与其**陪域**（codomain）完全重合。

结合维数的概念，我们可以有这样的结论：
- **若一个有限维非零线性映射的陪域维数和值域维数相同，那么该线性映射是满射的 。**
