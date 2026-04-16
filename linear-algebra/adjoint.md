# 自伴算子与正规算子

## 伴随映射

### 定义
设 $T \in \mathcal{V, W}$ ，那么 $T$ 的**伴随映射**（adjoint）记作 $T^*$ ，它是满足如下条件的函数： $T^* \, : \, W \to V$ : 对任意 $v \in V$ 和 $w \in W$ 均有 $\langle Tv, w \rangle = \langle v, T^* w \rangle$ 。

### 相关性质
1. **伴随是线性映射。**

证明：设 $T \in \mathcal{L}(V, W)$ 及其伴随映射 $T^* \in \mathcal{L}(W, V)$ ，取 $w_1, w_2 \in W$ 、$v \in V$ ，那么
$$
\begin{align}
\langle v, T^*(w_1 + w_2) \rangle
&= \langle Tv, w_1 + w_2 \rangle \\
&= \langle Tv, w_1 \rangle + \langle Tv, w_2 \rangle \\
&= \langle v, T^*w_1 \rangle + \langle v, T^*w_2 \rangle \\
&= \langle v, T^*w_1 + T^*w_1 \rangle \\
&\Downarrow \\
T^*(w_1 + w_2) &= T^*w_1 + T^*w_1 \\
\end{align}
$$

取 $\lambda \in \mathbf{F}$ 、$w \in W$，那么
$$
\begin{align}
\langle v, T^*(\lambda w) \rangle
&= \langle Tv, \lambda w \rangle \\
&= \overline{\lambda} \langle Tv, w \rangle \\
&= \overline{\lambda} \langle v, T^*w \rangle \\
&= \langle v, \lambda T^*w \rangle \\
&\Downarrow \\
T^*(\lambda w) &= \lambda T^*w \\
\end{align}
$$

至此已证明可加性与齐性，证毕。

2. **对所有 $S,T \in \mathcal{L}(V,W)$ 均有 $(S+T)^* = S^* + T^*$ 。**

证明：设 $v \in V$ 、$w \in W$ ，则
$$
\begin{align}
\langle v, (S+T)^* w \rangle
&= \langle (S+T)v, w \rangle \\
&= \langle Sv, w \rangle + \langle Tv, w \rangle \\
&= \langle v, S^* w \rangle + \langle v, T^* w \rangle \\
\end{align}
$$

3. **对任意 $\lambda \in \mathbf{F}$ 和 $T \in \mathcal{L}(V, W)$ 均有 $(\lambda T)^* = \overline{\lambda} T^*$ 。**

证明：设 $v \in V$ 、$w \in W$ ，则
$$
\begin{align}
\langle v, (\lambda T)^* w \rangle
&= \langle \lambda T v, w \rangle \\
&= \lambda \langle T v, w \rangle \\
&= \lambda \langle v, T^*w \rangle \\
&= \langle v, \overline{\lambda}T^*w \rangle \\
\end{align}
$$

4. **对于任意 $T \in \mathcal{L}(V, W)$ 均有 $(T^*)^* = T$ 。**

证明：设 $v \in V$ 、$w \in W$ ，则
$$
\begin{align}
\langle w, (T^*)^* v \rangle
&= \langle (T^*) w, v \rangle \\
&= \overline{\langle w, T^* v \rangle} \\
&= \overline{\langle Tv, w \rangle} \\
&= \langle w, Tv \rangle \\
\end{align}
$$

5. **对于任意向量空间上的恒等算子 $I$ 均有 $I^* = T$ 。**

易证，证明略。

6. **对于 $T \in \mathcal{L}(V, W)$ 、$S \in \mathcal{L}(W, U)$ 有 $(ST)^* = T^* S^*$ 。**

证明：取 $v \in V$ 、$w \in W$ 、$u \in U$ ，则
$$
\begin{align}
\langle v, (ST)^*u \rangle
&= \langle STv, u \rangle \\
&= \langle Tv, S^*u \rangle \\
&= \langle v, T^* S^* u \rangle \\
\end{align}
$$

### 伴随映射的零空间和值域
设 $T \in \mathcal{L}(V, W)$ ，则：

1. $\text{null} \, T^* = (\text{range} \, T)^\perp$
2. $\text{rangle} \, T^* = (\text{null} \, T)^\perp$
3. $\text{null} \, T = (\text{range} \, T^*)^\perp$
4. $\text{range} \, T = (\text{null} \, T^*)^\perp$

### 共轭转置矩阵
$m \times n$ 矩阵的**共轭转置**（conjugate transpose）矩阵就是将矩阵的转置矩阵的每个元素取复共轭得到的 $n \times m$ 矩阵。

例如矩阵
$$
\begin{pmatrix}
1 & 2 + 3i & 4 \\
-5 + 6i & 7 & -8
\end{pmatrix}
$$

的共轭转置矩阵便是
$$
\begin{pmatrix}
1 & -5 - 6i \\
2 - 3i & 7 \\
4 & -8 \\
\end{pmatrix}
$$

### 伴随映射的矩阵
设 $T \in \mathcal{L}(V, W)$ ，且 $e_1, \dots , e_n$ 是 $V$ 的规范正交基，$f_1, \dots , f_m$ 是 $W$ 的规范正交基，那么 $\mathcal{M}(T^*, (f_1, \dots , f_m), (e_1, \dots , e_n))$ 是 $\mathcal{M}(T, (e_1, \dots , e_n), (f_1, \dots , f_m))$ 的共轭转置矩阵。

证明：因为$f_1, \dots , f_m$ 是 $W$ 的规范正交基，故而对于任意 $1 \leq k \leq n$ 都有
$$Te_k = \langle Te_k, f_1 \rangle f_1 + \dots + \langle Te_k, f_m \rangle f_m$$

那么设 $1 \leq j \leq m$ , $\mathcal{M}(T, (e_1, \dots , e_n), (f_1, \dots , f_m))$ 可以写成
$$
\begin{pmatrix}
\langle Te_1, f_1 \rangle & \dots & \langle Te_k, f_1 \rangle & \dots & \langle Te_n, f_1 \rangle \\
\vdots && \vdots && \vdots \\
\langle Te_1, f_j \rangle & \dots & \langle Te_k, f_j \rangle & \dots & \langle Te_n, f_j \rangle \\
\vdots && \vdots && \vdots \\
\langle Te_1, f_m \rangle & \dots & \langle Te_k, f_m \rangle & \dots & \langle Te_n, f_m \rangle \\
\end{pmatrix}
$$

反之，因为 $e_1, \dots , e_n$ 是 $V$ 的规范正交基，所以
$$T^*f_j = \langle T^*f_j,e_1 \rangle e_1 + \dots + \langle T^*f_j,e_n \rangle e_n$$

对于 $\langle T^*f_j,e_k \rangle$ 做变换
$$\langle T^*f_j,e_k \rangle = \langle f_j, (T^*)^*e_k \rangle = \langle f_j, Te_k \rangle = \overline{\langle Te_k, f_j \rangle}$$

最终得到
$$T^*f_j = \overline{\langle Te_1, f_j \rangle} e_1 + \dots + \overline{\langle Te_n, f_j \rangle} e_n$$

所以 $\mathcal{M}(T^*, (f_1, \dots , f_m), (e_1, \dots , e_n))$ 可以写成
$$
\begin{pmatrix}
\overline{\langle Te_1, f_1 \rangle} & \dots & \overline{\langle Te_1, f_j \rangle} & \dots & \overline{\langle Te_1, f_m \rangle} \\
\vdots && \vdots && \vdots \\
\overline{\langle Te_k, f_1 \rangle} & \dots & \overline{\langle Te_k, f_j \rangle} & \dots & \overline{\langle Te_k, f_m \rangle} \\
\vdots && \vdots && \vdots \\
\overline{\langle Te_n, f_1 \rangle} & \dots & \overline{\langle Te_n, f_j \rangle} & \dots & \overline{\langle Te_n, f_m \rangle} \\
\end{pmatrix}
$$

显然两个矩阵是共轭转置关系。

## 自伴算子

### 定义

