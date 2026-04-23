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
设 $T \in \mathcal{L}(V)$ ，如果 $T = T^*$ ，则称 $T$ 是**自伴**（self-adjoint）的。即 $T$ 对于任意 $v, w \in V$ 都有 $\langle Tv, w \rangle = \langle v, Tw \rangle$ 。

### 相关性质
1. **自伴算子的本征值都是实数。**

证明：设 $T \in \mathcal{L}(V)$ 且 $T* = T$ ，取 $\lambda \in \mathbf{F}$ 、$v \in V$ 使得 $Tv = \lambda v$ ，那么
$$\lambda \lVert v \rVert ^2 = \langle \lambda v, v \rangle = \langle Tv, v \rangle = \langle v, T^* v \rangle = \langle v, \lambda v \rangle = \overline{\lambda} \lVert v \rVert ^2$$

所以 $\lambda = \overline{\lambda}$ ，因此 $\lambda \in \mathbf{R}$ 。

2. **设 $V$ 是复内积空间，若 $T \in \mathcal{L}(V)$ 且对于任意 $v \in V$ 都有 $\langle Tv, v \rangle = 0$ ，那么 $T$ 只能是 $0$ 算子，即$T = 0$。**

证明：根据算子极化恒等式可知，对于任意 $u, w \in V$ 都有
$$
\begin{align}
\langle Tu, w \rangle
&= \frac{\langle T(u + w), u + w \rangle - \langle T(u - w), u - w \rangle}{4} \\
&+ \frac{i\langle T(u + iw), u + iw \rangle - i\langle T(u - iw), u - iw \rangle}{4} \\
\end{align}
$$

因为 $\langle Tv, v \rangle = 0$ ，故而上式中的 $\langle T(u + w), u + w \rangle$ 、$\langle T(u - w), u - w \rangle$ 、$\langle T(u + iw), u + iw \rangle$ 、$\langle T(u - iw), u - iw \rangle$ 都为 $0$ 。

所以对于任意 $u, w \in V$ 都有 $\langle Tu, w \rangle = 0$ , 所以 $T$ 只能为 $0$ 。

3. **设 $V$ 是复内积空间，$T \in \mathcal{L}(V)$ 且 $v \in V$，那么 $T$ 是自伴的情况与 $\langle Tv, v \rangle = \mathbf{R}$ 等价成立。**

证明：我们构造以下等式
$$
\langle Tv , v \rangle - \overline{\langle Tv , v \rangle} = \langle Tv , v \rangle - \langle v , Tv \rangle = \langle Tv , v \rangle - \langle T^*v , v \rangle =  \langle (T - T^*)v , v \rangle
$$

当 $T$ 是自伴的情况成立时

$$
\begin{align}
\langle (T - T^*)v , v \rangle = \langle (T - T)v , v \rangle &= \langle 0 , v \rangle = 0 \\
&\Downarrow \\
\langle Tv , v \rangle - \overline{\langle Tv , v \rangle} &= 0 \\
&\Downarrow \\
\langle Tv , v \rangle &= \overline{\langle Tv , v \rangle}
\end{align}
$$

显然 $\langle Tv , v \rangle = 0$ 的情况也随之成立。

反之，当 $\langle Tv , v \rangle = 0$ 成立时，显然 $\langle (T - T^*)v , v \rangle = 0$ ，那么此时显然 $T = T^*$ ，即 $T$ 是自伴的情况随之成立。

4. **在内积空间 $V$ 中，若 $T \in \mathcal{L}(V)$ 且对于任意 $v \in V$ 都有 $\langle Tv, v \rangle = 0$，那么 $T = 0$ 。**

在复内积空间中，性质2已经证明过。至于实内积空间，将算子极化恒等式退化到实内积空间的情况下即可证明。

## 正规算子

### 定义
设有内积空间 $V$ 以及算子 $T \in \mathcal{L}(V)$ ，那么当 $TT^* = T^*T$ 时，则称该算子 $T$ 是**正规的**（normal）。

### 相关性质
设有内积空间 $V$ 、$T \in \mathcal{L}(V)$ 以及任意 $v \in V$，那么以下性质均成立。

1. **$T$ 是正规的情况与 $\lVert Tv \rVert = \lVert T^*v \rVert$ 等价成立。**

证明：若 $T$ 是正规的，那么 $\langle (T^*T - TT^*)v, v \rangle = 0$ ，因此
$$
\begin{align}
\langle T^*Tv, v \rangle &= \langle TT^*, v \rangle \\
&\Downarrow \\
\lVert Tv \rVert ^2 &= \lVert T^*v \rVert ^2 \\
&\Downarrow \\
\lVert Tv \rVert &= \lVert T^*v \rVert \\
\end{align}
$$

证明完毕，反之，当 $\lVert Tv \rVert = \lVert T^*v \rVert$ 成立时，将上述过程倒转，即可证明 $T$ 时正规的。

2. **若 $T$ 是正规的，那么 $T$ 与 $T^*$ 有相同的本征向量。**

证明：设 $v \in V$ 是 $T$ 相应于本征值 $\lambda \in \mathbf{F}$ 的本征向量，则
$$
\begin{align}
(T - \lambda I)(T - \lambda I)^* = (T - \lambda I)(T^* - \overline{\lambda} I) = TT^* - \overline{\lambda} T - \lambda T^* + \lambda ^2 \\
(T - \lambda I)^*(T - \lambda I) = (T^* - \overline{\lambda} I)(T - \lambda I) = T^*T - \lambda T^* - \overline{\lambda} T + \lambda ^2
\end{align}
$$

因为 $T^*T = TT^*$ ，代入上边的两个等式可得 $(T - \lambda I)(T - \lambda I)^* = (T - \lambda I)^*(T - \lambda I)$ ，因此 $T - \lambda I$ 也是正规的。根据性质1可得

$$
0 = \lVert (T - \lambda I)v, v \rVert = \lVert (T - \lambda I)^*v, v \rVert = \lVert (T - \overline{\lambda} I)^*v, v \rVert
$$

因此 $v$ 是相应于 $T^*$ 的本征值 $\overline{\lambda}$ 的本征向量。

3. **若 $T$ 是正规的，且相应于 $T$ 有多个不同的本征值，那么这些本征值所对应的本征向量之间互相正交。**

证明： 设 $\alpha , \beta \in \mathbf{F}$ 是 $T$ 不同的两个本征值，其分别对应的本征向量是 $u , v \in V$ 。那么

$$
\begin{align}
(\alpha - \beta)\langle u, v \rangle
&= \langle (\alpha - \beta) u, v \rangle \\
&= \langle \alpha u, v \rangle - \langle \beta u, v \rangle \\
&= \langle Tu, v \rangle - \langle Tu, v \rangle \\
&= 0 \\
\end{align}
$$

因为 $\alpha \neq \beta$ ，所以 $\alpha - \beta \neq 0$ ，最后可知 $\langle u, v \rangle = 0$ ，即向量 $u$ 和 $v$ 正交。