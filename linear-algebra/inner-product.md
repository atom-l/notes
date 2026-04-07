# 内积与范数

## 点积
内积的定义实际上就是点积在更多的域（如复数域）上的概念推广，所以先介绍点积的定义。

对于任意 $x,y \in \mathbf{R}^n$ ，$x$ 与 $y$ 的点积记作 $x \cdot y$ ，其定义为：
$$x \cdot y = x_1 y_1 + \dots + x_n y_n$$
其中 $x = (x_1, \dots , x_n)$ ， $y = (y_1 , \dots , y_n)$ 。

## 内积

### 定义
向量空间 $V$ 上的**内积**（inner product）是一个函数，其将 $V$ 中元素的任意有序对 $(u, v)$ 都映射成为一个标量 $\langle u, v \rangle \in \mathbf{F}$ ，并且该函数需要满足以下性质：
- **非负性**（non-negativity）

    对于任意 $v \in V$ 都有 $\langle v,v \rangle \geq 0$ ；

- **确定性**（definiteness）

    $\langle v,v \rangle = 0$ 当且仅当 $v = 0$ 时；

- **首位可加性**（additivity in first slot）

    对于任意 $u, v, w \in V$ 都有 $\langle u + v, w \rangle = \langle u, w \rangle + \langle v, w \rangle$ ；

- **首位齐次性**（homogeneity in first slot）

    对于任意 $\lambda \in \mathbf{F}$ 和 $u, v \in V$ 都有 $\langle {\lambda} u,v \rangle = \lambda \langle u,v \rangle$ ；

- **共轭对称性**（conjugate symmetry）

    对于任意 $u, v \in V$ 都有 $\langle u,v \rangle = \overline{\langle v,u \rangle}$ ；

### 内积的示例
为了方便理解内积，提供一些内积示例：
1. $\mathbf{F}^n$ 上的欧几里得内积定义为：
$$\langle (w_1, \dots , w_n) , (z_1, \dots, z_n)\rangle = w_1 \overline{z_1} + \dots + w_n \overline{z_n}$$

2. 设 $c_1, \dots ,c_n > 0$ ，那么我们可以在 $\mathbf{F}^n$ 上定义一个特别的内积：
$$\langle (w_1, \dots , w_n) , (z_1, \dots, z_n)\rangle = c_1 w_1 \overline{z_1} + \dots + c_n w_n \overline{z_n}$$

3. 在 $\mathcal{P}(\mathbf{R})$ 上可定义内积：
$$\langle p,q \rangle = \int_{0}^{\infty} p(x)q(x)e^{-x}\text{d}x$$

### 内积空间
**内积空间**（inner product space）就是带有内积定义的向量空间。

### 内积的基本性质
1. 对于某个选定的 $u \in V$ ，将任意 $v \in V$ 映射到 $\langle v,u \rangle$ 的函数实际上是 $V \to \mathbf{F}$ 的线性映射；
2. 对于任意 $u \in V$ 都有 $\langle 0,u \rangle = 0$ ;
3. 对于任意 $u \in V$ 都有 $\langle u,0 \rangle = 0$ ;
4. 对于任意 $u,v,w \in V$ 都有 $\langle u,v+w \rangle = \langle u,v \rangle + \langle u,w \rangle$ ;
5. 对于任意 $\lambda \in \mathbf{F}$ 和 $u,v \in V$ 都有 $\langle u,{\lambda}v \rangle = \overline{\lambda}\langle u,v \rangle$ ；

证明：

性质1：由内积的首位可加性与齐次性可知，该性质所定义的这类函数满足线性映射的性质；

性质2：由性质1可知，$\langle 0,u \rangle$ 是一个线性映射，因为线性映射总是将 $0$ 映射到 $0$，该性质成立；

性质3：结合前两条性质和内积的共轭对称性可做推导：$\langle u,0 \rangle = \overline{\langle 0,u \rangle} = \overline{0} = 0$

性质4：结合内积定义中的相关性质，做以下推导
$$
\begin{align}
\langle u,v+w \rangle
&= \overline{\langle v+w,u \rangle} \\
&= \overline{\langle v,u \rangle + \langle w,u \rangle} \\
&= \overline{\langle v,u \rangle} + \overline{\langle w,u \rangle} \\
&= \langle u,v \rangle + \langle u,w \rangle \\
\end{align}
$$

性质5：结合内积定义中的相关性质，做以下推导
$$
\begin{align}
\langle u,{\lambda}v \rangle
&= \overline{\langle {\lambda}v,u \rangle} \\
&= \overline{\lambda \langle v,u \rangle} \\
&= \overline{\lambda} \, \overline{\langle v,u \rangle} \\
&= \overline{\lambda} \langle u,v \rangle \\
\end{align}
$$

## 范数

### 定义
对于 $v \in V$ ，$v$ 的**范数**（norm）记作 $\lVert v \rVert$ ，其定义为 $\lVert v \rVert = \sqrt{\langle v,v \rangle}$ 。

### 范数的基本性质
1. $\lVert v \rVert = 0$ 当且仅当 $v = 0$ ；
2. 对于任意 $\lambda \in \mathbf{F}$ 都有 $\lVert \lambda v \rVert = \lvert \lambda \rvert \lVert v \rVert$ ；

证明：

性质1易证，略。

结合内积相关性质，通过以下推导可证性质2：
$$
\begin{align}
\lVert \lambda v \rVert
&= \sqrt{\lVert \lambda v \rVert ^2} \\
&= \sqrt{\langle \lambda v , \lambda v\rangle} \\
&= \sqrt{\lambda \langle v, \lambda v \rangle} \\
&= \sqrt{\lambda \overline{\lambda} \langle v, v \rangle} \\
&= \sqrt{\lvert \lambda \rvert ^2 \lVert v \rVert ^2} \\
&= \lvert \lambda \rvert \lVert v \rVert \\
\end{align}
$$

## 正交

### 定义
若两个向量 $u,v \in V$ 是**正交的**（orthogonal），那么它们的内积为零，即：$\langle u,v \rangle = 0$ 。

### $0$ 与正交性
1. $0$ 正交与 $V$ 中的任意向量；
2. $0$ 是 $V$ 中唯一与自身正交的向量；

### 正交分解
若 $u,v \in V$ 且 $v \neq 0$ ，令 $c = \frac{\langle u,v \rangle}{\lVert v \rVert ^2}$ 、 $w = u - \frac{\langle u,v \rangle}{\lVert v \rVert ^2} v$ ，可使得 $\langle w,v \rangle = 0$ 且 $u = cv + w$ 。

证明：

首先，有 $u,v$ 的定义，我们可以知道存在一个 $c \in \mathbf{F}$ 可以使得：
$$u = cv + (u - cv)$$

那么，我们需要 $v$ 与 $u - cv$ 正交，即：
$$\langle u - cv, v \rangle = 0 = \langle u,v \rangle - c \lVert v \rVert ^2$$

可以得到 $c = \frac{\langle u,v \rangle}{\lVert v \rVert ^2}$ ，那么：

$$u = \frac{\langle u,v \rangle}{\lVert v \rVert ^2}v + (u - \frac{\langle u,v \rangle}{\lVert v \rVert ^2} v)$$

### 柯西-施瓦兹不等式（Cauchy–Schwarz Inequality）
对于 $u, v \in V$ ，则 $\lvert \langle u,v \rangle \rvert \leq \lVert u \rVert \lVert v \rVert$ ，相等情况等价成立的条件是 $u, v$ 中一个向量是另一个向量的标量倍。

证明：
当 $v = 0$ 时，等式两端都等于 $0$ ，故而我们可以在 $v \neq 0$ 的情况下做证明。此时将 $u$ 做正交分解，可得：
$$u = \frac{\langle u,v \rangle}{\lVert v \rVert ^2}v + w$$

其中 $w = u - \frac{\langle u,v \rangle}{\lVert v \rVert ^2}v$ ，且 $w$ 和 $v$ 正交。

设 $c = \frac{\langle u,v \rangle}{\lVert v \rVert ^2}$ ,可以得到：
$$
\begin{align}
\lVert u \rVert ^2
&= \lVert cv + w \rVert ^2 \\
&= \langle cv + w,  cv + w \rangle \\
&= \langle cv,cv \rangle + \langle cv,w \rangle + \langle w,cv \rangle + \langle w,w \rangle \\
&= \langle cv,cv \rangle + c\langle c,w \rangle + \overline{c}\langle w,v \rangle + \langle w,w \rangle \\
&= \langle cv,cv \rangle + c \cdot 0 + \overline{c} \cdot 0 + \langle w,w \rangle \\
&= \langle cv,cv \rangle + \langle w,w \rangle \\
&= \lVert cv \rVert ^2 + \lVert w \rVert ^2 \\
&= \lVert \frac{\langle u,v \rangle}{\lVert v \rVert ^2}v \rVert ^2 + \lVert w \rVert ^2 \\
&= \frac{\lvert \langle u,v \rangle \rvert ^2}{\lVert v \rVert ^2} + \lVert w \rVert ^2 \\
&\geq \frac{\lvert \langle u,v \rangle \rvert ^2}{\lVert v \rVert ^2} \\
\end{align}
$$

将上面的不等式两端都乘以 $\lVert v \rVert ^2$ 再开方即可：
$$
\begin{align}
\lVert u \rVert ^2 \lVert v \rVert ^2 &\geq  \lvert \langle u,v \rangle \rvert ^2 \\
&\Downarrow \\
\sqrt{\lVert u \rVert ^2 \lVert v \rVert ^2} &\geq  \sqrt{\lvert \langle u,v \rangle \rvert ^2} \\
&\Downarrow \\
\lvert \langle u,v \rangle \rvert &\leq \lVert u \rVert \lVert v \rVert
\end{align}
$$

### 三角不等式
对于 $u, v \in V$ ，有 $\lVert u + v \rVert \leq \lVert u \rVert + \lVert v \rVert$ ，相等情况等价成立的条件是 $u, v$ 中一个向量是另一个向量的标量倍。

> 该不等式揭露了一个众所周知的规律——“两点之间，直线最短”，哪怕在高维空间中也是如此。

证明：

$$
\begin{align}
\lVert u + v \rVert ^2
&= \langle u + v , u + v \rangle \\
&= \langle u, u \rangle + \langle v, v \rangle + \langle u, v \rangle + \langle v, u \rangle \\
&= \langle u, u \rangle + \langle v, v \rangle + \langle u, v \rangle + \overline{\langle u, v \rangle} \\
&= \lVert u \rVert ^2 + \lVert v \rVert ^2 + \langle u, v \rangle + \overline{\langle u, v \rangle} \\
&= \lVert u \rVert ^2 + \lVert v \rVert ^2 + 2 \text{Re} \langle u, v \rangle \\
\end{align}
$$

$$
\begin{align}
(\lVert u \rVert + \lVert v \rVert) ^2
&= \lVert u \rVert ^2 + \lVert v \rVert ^2 + 2 \lVert u \rVert \lVert v \rVert \\
\end{align}
$$

因为 $\lvert \langle u,v \rangle \rvert \leq \lVert u \rVert \lVert v \rVert$ 且 $\text{Re} \langle u, v \rangle \leq \lvert \langle u,v \rangle \rvert$ ，所以可得：
$$
\begin{align}
\lVert u \rVert ^2 + \lVert v \rVert ^2 + 2 \text{Re} \langle u, v \rangle &\leq \lVert u \rVert ^2 + \lVert v \rVert ^2 + 2 \lVert u \rVert \lVert v \rVert \\
&\Downarrow \\
\lVert u + v \rVert &\leq \lVert u \rVert + \lVert v \rVert \\
\end{align}
$$

### 平行四边形恒等式
设 $u,v \in V$ ，则 $\lVert u + v \rVert ^2 + \lVert u - v \rVert ^2 = 2(\lVert u \rVert ^2 + \lVert v \rVert ^2)$ 。

> 在平面几何中，平行四边形的对角线平方和等于其四条边的长度之和。这在高维向量空间中也是如此。

证明：

$$
\begin{align}
\lVert u + v \rVert ^2 + \lVert u - v \rVert ^2
&= \langle u + v , u + v \rangle + \langle u - v , u - v \rangle \\
&= \lVert u \rVert ^2 + \lVert v \rVert ^2 + \langle u, v \rangle + \langle v, u \rangle \\
&+ \lVert u \rVert ^2 + \lVert v \rVert ^2 - \langle u, v \rangle - \langle v, u \rangle \\
&= 2(\lVert u \rVert ^2 + \lVert v \rVert ^2) \\
\end{align}
$$
