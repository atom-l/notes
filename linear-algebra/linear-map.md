# 线性映射

## 线性映射定义及示例
设 $V$ 和 $W$ 是两个向量空间，存在一个函数 $T: V \to W$ , 当 $T$ 满足以下性质时则可以称之为**线性映射（linear map）**：
- **可加性（additivity）**：对于任意 $u, v \in V$ ，都有 $T(u + v) = Tu + Tv$ ；
- **齐性（homogeneity）**：对于任意 $\lambda \in \mathbf{F}$ 和 $v \in V$ ，都有 $T({\lambda}v) = {\lambda}T(v)$ ；

此外，对于向量空间 $V$ 到 $W$ 的所有线性映射所构成的集合（有时也叫做线性映射空间），记为：$\mathcal{L}(V, W)$

有一些特殊的线性映射：
1. **零（zero）**

在线性映射概念中中，符号0表示一种特殊的映射——将某个向量空间中的每个元素都映射成另一个向量空间中的加法单位元，即：
- 设 $V$ 和 $W$ 是向量空间, 有 $0 \in \mathcal{L}(V, W)$，使得任意 $v \in V$ 都满足 $0v = 0$ （这里左边的0是 $V \to W$ 的函数，右边的0是 $W$ 的加法单位元）；

2. **恒等映射（identity）**

恒等映射是一种特殊的线性映射，它将某个向量空间中的每个元素都映射为元素本身，即：
- 有向量空间 $V$ 及其恒等映射 $I \in \mathcal{L}(V, V)$ ，对于任意 $v \in V$ 满足 $Iv = v$ ；

3. **微分（differentiation）**

微分操作实际上是一种线性映射。

例如，定义 $D \in \mathcal{L}(\mathcal{P}(\mathbf{R}), \mathcal{P}(\mathbf{R}))$ ：
- 对于任意多项式 $p \in \mathcal{P}(\mathbf{R})$ ，都有 $D(p) = p'$ ；

我们可以发现函数 $D$ 是线性的，本质上是微分的一条性质：对于任意可微函数 $f, g$ 以及常数 $\lambda$ ，都有 $(f + g)' = f' + g'$ 和 $({\lambda}f)' = {\lambda}f'$ 。 

4. **积分（integration）**

相应的，积分实际上也可以是一种线性映射。

例如，定义 $T \in \mathcal{L}(\mathcal{P}(\mathbf{R}), \mathbf{R})$ ：
- 对于任意多项式 $p \in \mathcal{P}(\mathbf{R})$ ，都有 $Tp = \displaystyle \int_{0}^{1} p(x) dx$ ；

函数 $T$ 也是线性的，本质上也是积分的一条性质：两个函数之和的积分等于这两个函数的积分之和，常数与函数乘积的积分等于常数和函数积分的乘积。

5. **乘以 $x^2$**

例如，定义 $T \in \mathcal{L}(\mathcal{P}(\mathbf{R}), \mathcal{P}(\mathbf{R}))$ ：
- 对于任意 $x \in \mathbf{R}$ ，$(Tp)(x) = {x^2}p(x)$ ；

6. **后移操作（backward shift）**

$\mathbf{F}^\infty$ 表示 $\mathbf{F}$ 的长度为无穷的序列所构成的向量空间，定义 $T \in \mathcal{L}(\mathbf{F}^\infty,\mathbf{F}^\infty)$ ：
- $T(x_1, x_2, x_3, ...) = (x_2, x_3, ...)$

仔细观察，它也是满足线性映射的条件的。

7. $\mathbf{F}^n \to \mathbf{F}^m$

定义 $T \in \mathcal{L}(\mathbf{F}^n, \mathbf{F}^m)$ ，$A_{j,k} \in \mathbf{F}$ , 此处 $m, n, j, k \in \mathbb{N}_+$ (即都是正整数) :
- $T(x_1, x_2, x_3, ...) = (A_{1,1}x_1 + ... + A_{1,n}x_n, ... , A_{1,m}x_1 + ... + A_{m,n}x_n)$

按这样构建的对任意两个在序列长度不同标量向量空间的映射，实际上也是满足线性映射的条件的。线性代数中也时常这样构建这样的映射。

## 线性映射相关性质

### 线性映射与其定义域的基
设两个向量空间 $V$ 和 $W$ ，有 $v_1, v_2, ... , v_n \in V$ 是 $V$ 的基，对于一组向量 $w_1, w_2, ... w_n \in W$ ，那么则存在一个唯一的线性映射 $T : V \to W$， 使得任意 $j = 1, ..., n$ 都有:

$$Tv_j = w_j$$

这条性质实际上揭示了线性映射的某个本质，即：线性映射实际上是将某个向量空间的基，转换为值域向量空间的子空间（也是个向量空间）的一个张成组。再进一步：因为转换成的张成组实际上可以转换为该子空间的基（即“涵有”），所以线性映射的核心就是将一个向量空间的基通过某个唯一确定的方式转换为另一个向量空间的基。

该性质的证明过程如下：
1. 定义映射 $T : V \to W$ 的形式如下：
$$T({c_1}{v_1} + ... + {c_n}{v_n}) = {c_1}{w_1} + ... + {c_n}{w_n}$$
这里的 $c_1, ... ,c_n \in \mathbf{F}$，之所以要将 $T$ 定为这种形式，是因为将某个 $c_j$ 取1并将其他的 $c$ 取为0 就能满足 $Tv_j = w_j$ 。

2. 取任意 $u, v \in V$ , 其中 $u = {a_1}{v_1} + .. {a_n}{v_n}$ 且 $v = {c_1}{u_1} + ... + {c_n}{u_n}$ ，这里的 $a$ 和 $c$ 都是 $\mathbf{F}$ 的元素，则：
$$
\begin{align}
T(u + v) &= T((a_1 + c_1)v_1 + ... + (a_n + c_n)v_n) \\
&= (a_1 + c_1)w_1 + ... + (a_n + c_n)w_n \\
&= ({a_1}{w_1} + ... + {a_n}{w_n}) + ({c_1}{w_1} + ... + {c_n}{w_n}) \\
&= Tu + Tv
\end{align}    
$$
满足线性映射所要求的**可加性**。

3. 取 $\lambda \in \mathbf{F}$ , $v = {c_1}{v_1} ... {c_n}{v_n}$ ，则：
$$
\begin{align}
T({\lambda}v) &= T({\lambda}{c_1}{v_1} + .. + {\lambda}{c_n}{v_n})\\
&= {\lambda}{c_1}{w_1} + .. + {\lambda}{c_n}{w_n} \\
&= {\lambda}({c_1}{w_1} + .. + {c_n}{w_n}) \\
&= {\lambda}Tv
\end{align}
$$

满足线性映射所要求的**齐性**，至此，已经证明 $T$ 是一个线性映射。

4. 现在开始证明唯一性，设 $T \in \mathcal{L}(V, W)$ ，且 $T{v_j} = w_j , j = 1, ..., n$ ；
设 $c_1, c_2, ..., c_n \in \mathbf{F}$。由于$T$的齐性，$T({c_j}{v_j}) = {c_j}{w_j}, j = 1, 2, ..., n$。又因为其可加性：
$$T({c_1}{v_1} + ... + {c_n}{v_n}) = {c_1}{w_1} + ... + {c_n}{w_n}$$
上式其实等价于 $\text{span}(v_1, v_2, ..., v_n)$ ，并且上式是唯一确定的（式子右侧全是确定的标量和向量），又由于 $v_1, v_2, ..., v_n$ 是 $V$ 的基，所以 $\text{span}(v_1, v_2, ..., v_n) = V$ ，所以 $T$ 在 $V$ 上也是唯一确定的。

### $\mathcal{L}(V,W)$ 上的代数运算

#### 加法与标量乘法
设 $S, T \in \mathcal{L}(V,W)$，$\lambda \in \mathbf{F}$，先定义其两者之**和** $S + T$ 与**积** ${\lambda}T$ 都是从 $V$ 到 $W$ 的映射，即：
- $S + T : V \to W$
- ${\lambda}T : V \to W$

并且，对于任意 $v \in V$ , 都满足：
$$(S + T)(v) = Sv + ST$$
$$({\lambda}T)(v) = \lambda(Tv)$$

#### 线性映射的乘积
设有向量空间$U, V, W$，以及线性映射 $T \in \mathcal{L}(U, V)$ , $S \in \mathcal{L}(V, W)$，**乘积** $ST \in \mathcal{L}(U, W)$ 定义为：
$$\forall u \in U , (ST)(u) = S(Tu)$$

即，$ST$是一个函数的复合 $S{\circ}T$，所以要注意，线性映射乘积的顺序十分重要，并且这里只有 $T$ 的值域在 $S$ 的定义域中是才有意义。

线性映射的乘积还有以下代数性质：
- **结合律（associativity）**：
$$({T_1}{T_2})T_3 = {T_1}({T_2}{T_3})$$

- **单位元（identity）**
$$TI = IT = T$$
此处 $T \in \mathcal{L}(V, W)$ ，其中第一个 $I$ 是 $V$ 上的恒等映射，第二个 $I$ 是 $W$ 上的恒等映射。

- **分配律（distributive properties）**
$$({S_1} + {S_2})T = {S_1}T + {S_2}T {\ },{\ }S({T_1} + {T_2}) = S{T_1} + S{T_2}$$
此处 $T,T_1,T_2 \in \mathcal{L}(U,V)$，$S,S_1,S_2 \in \mathcal{L}(V,W)$

### 对于0的线性映射
若 $T : V \to W$ ，则 $T(0) = 0$。

其证明过程十分简单，利用线性映射的可加性即可：
$$T(0) = T(0+0) = T(0) + T(0) \Rightarrow T(0) = 0$$

## 零空间、值域

### 零空间（null space）
定义：
对于某个 $T \in \mathcal{L}(V, W)$ ，$T$ 的**零空间**记为 $\text{null}{\,}T$ ，它是 $V$ 中被 $T$ 映射为0的向量集合：
$$\text{null}{\,}T = \{v \in V : Tv = 0 \}$$

对于任意 $u, v \in \text{null}{\ }T$ 和 $\lambda \in \mathbf{F}$ ，根据零空间的定义，我们可以简单得到零空间中任意向量之和与标量乘法的结果：
$$T(u + v) = T(u) + T(v) = 0 \Rightarrow u + v \in \text{null}{\,}T$$
$$T({\lambda}u) = {\lambda}T(u) = {\lambda}0 = 0 \Rightarrow {\lambda}u \in \text{null}{\,}T$$
所以，**零空间是子空间**。

### 值域
定义：
对于某个 $T \in \mathcal{L}(V, W)$ ， $T$ 的**值域**记为 $\text{range}{\,}T$ ，它是在 $W$ 中由 $v$ 的向量经 $T$ 映射而来的向量集合：
$$\text{range}{\,}T = {Tv : v \in V}$$

对于任意 $v_1, v_2 \in \text{range}{\,}T$ 和 $\lambda \in \mathbf{F}$ ，且设 $w_1 = T{v_1}$ 和 $w_2 = T{v_2}$ ， 根据值域的定义，我们同样可以得到：
$$T(v_1 + v_2) = T{v_1} + T{v_2} = w_1 + w_2 \Rightarrow w_1 + w_2 \in \text{range}{\,}T$$
$$T({\lambda}v_1) = {\lambda}T{v_1} = {\lambda}w_1 \Rightarrow {\lambda}w_1 \in \text{range}{\,}T$$
所以，**值域是子空间**。

### 单射（injective）
定义：
如果某个 $T : V \to W$ , 对于任意 $v_1, v_2 \in V$ ，当 $T{v_1} = T{v_2}$ 只在 $v_1 = v_2$ 的情况下才成立时，则称 $T$ 是**单射**的。

结合零空间的概念，我们可以得到结论：
- **对于线性映射，单射性等同于零空间为 $\{0\}$**

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

### 满射（surjective）
定义：
如果某个 $T : V \to W$ 的值域完全等于 $W$ ，则称 $T$ 是**满射**的。

## 线性映射基本定理
定理：
- 若向量空间 $V$ 是有限维的，且有 $T \in \mathcal{L}(V, W)$ ，则 $\text{range}{\,}T$ 也是有限维的 ，并且：
$$\text{dim}V = \text{dim}{\,}\text{null}{\,}T + \text{dim}{\,}\text{range}{\,}T$$
该定理揭示了线性映射的定义域与值域维数的数量关系。

**证明过程如下：**

设 $u_1, u_2, ..., u_m$ 为 $\text{null}{\,}T$ 的基，即 $\text{dim}{\,}\text{null}{\,}T = m$ ；

因为 $u_1, u_2, ..., u_m$ 作为基必然是个线性无关组，那么它就可以用 $V$ 中的一组向量扩充为 $V$ 的基 $\{u_1, u_2, ..., u_m, v_1, v_2, ..., v_n\}$ ，即设 $\text{dim}{\,}V = m + n$ ；

所以我们需要证明 $\text{dim}{\,}\text{range}{\,}T = n$ ，即只要证明 $\{T{v_1}, T{v_2}, ..., T{v_n}\}$ 是 $\text{range}{\,}T$ 的基。

(1) 先证明 $\text{span}(T{v_1}, T{v_2}, ..., T{v_n}) = \text{range}{\,}T$ ：

设 $v \in V$ ，$a_1, a_2, ... a_m, b_1, b_2, ... b_n \in \mathbf{F}$ ，因为 $\{u_1, u_2, ..., u_m, v_1, v_2, ..., v_n\}$ 是 $V$ 的基，所以：
$$v = {a_1}{u_1} + {a_2}{u_2} + ... + {a_m}{u_m} + {b_1}{v_1} + {b_2}{v_2} + ... + {b_n}{v_n}$$

那么：
$$
\begin{align}
Tv &= T({a_1}{u_1} + {a_2}{u_2} + ... + {a_m}{u_m} + {b_1}{v_1} + {b_2}{v_2} + ... + {b_n}{v_n}) \\
&= T({a_1}{u_1}) + T({a_2}{u_2}) + ... + T({a_m}{u_m}) + T({b_1}{v_1}) + T({b_2}{v_2}) + ... + T({b_n}{v_n}) \\
&= {a_1}T{u_1} + {a_2}T{u_2} + ... + {a_m}T{u_m} + {b_1}T{v_1} + {b_2}T{v_2} + ... + {b_n}T{v_n} \\
\end{align}
$$

又因为 $u_1, u_2, ..., u_m$ 是 $\text{null}{\,}T$ 的基，所以 $T{u_1} = T{u_2} = ... = T{u_m} = 0$ ，则：

$$Tv = {b_1}T{v_1} + {b_2}T{v_2} + ... + {b_n}T{v_n}$$
$$ \Rightarrow \text{span}(T{v_1}, T{v_2}, ..., T{v_n}) = \text{range}{\,}T$$

(2) 接下来要证明 $T{v_1}, T{v_2}, ..., T{v_n}$ 线性无关：

设 $c_1, c_2, ..., c_n \in \mathbf{F}$ ，并且：
$${c_1}T{v_1} + {c_2}T{v_2} + ... + {c_3}T{v_n} = 0$$

因为线性映射的性质，那么：
$$T({c_1}{v_1} + {c_2}{v_2} + ... + {c_3}{v_n}) = 0$$

所以：
$${c_1}{v_1} + {c_2}{v_2} + ... + {c_3}{v_n} \in \text{null}{\,}T$$

设 $d_1, d_2, ..., d_m \in \mathbf{F}$ ，由于 $u_1, u_2, ..., u_m$ 必然张成 $\text{null}{\,}T$ ，所以：
$${c_1}{v_1} + {c_2}{v_2} + ... + {c_3}{v_n} = {d_1}{u_1} + {d_2}{u_2} + ... + {d_3}{u_m}$$

又因为 $\{u_1, u_2, ..., u_m, v_1, v_2, ..., v_n\}$ 是 $V$ 的基，它们必然线性无关，所以它们只能等于0，并且 $c_1 = c_2 = ... = c_n = 0$ , 所以 $T{v_1}, T{v_2}, ..., T{v_n}$ 是线性无关的。

$\{T{v_1}, T{v_2}, ..., T{v_n}\}$ 张成 $\text{range}{\,}T$ ，又是个线性无关组，所以它就是 $\text{range}{\,}T$ 的基。故而 $\text{dim}{\,}\text{range}{\,}T = n$ 。

有了线性映射基本定理，我们就能够引申出以下两条性质。

### 定义域维数大于值域维数的线性映射不是单射的
**证明** 设 $T \in \mathcal{L}(V, W)$，则：
$$
\begin{align}
\text{dim}{\,}\text{null}{\,}T &= \text{dim}{\,}V - \text{dim}{\,}\text{range}{\,}T \\
&\ge \text{dim}{\,}V - \text{dim}{\,}W \\
&> 0
\end{align}
$$

所以 $\text{null}{\,}T$ 必然包括非零向量，而其中的向量都会被映射为0，因此 $T$ 不会是单射的。

### 定义域维数小于值域维数的线性映射不会是满射的
**证明** 设 $T \in \mathcal{L}(V, W)$，则：
$$
\begin{align}
\text{dim}{\,}\text{range}{\,}T &= \text{dim}{\,}V - \text{dim}{\,}\text{null}{\,}T \\
&\le \text{dim}{\,}V\\
&< \text{dim}{\,}W\
\end{align}
$$

这表示 $\text{range}{\,}T \ne W$ , 因此 $T$ 不会是满射的。

### 在方程组上的应用性质
对于方程组，假如设其变量为 $n$ 个，方程数量为 $m$ 个，那么可以看作是 $\mathbf{F}^n \to \mathbf{F}^m$ 的线性映射，命名为 $T$ 。结合以上的两条性质，那么我们就可以得到以下结论：

- 对于齐次线性方程组，当变量多于方程数量时，齐次线性方程组必然有解。

这种情况下，问题可以转换成 $\text{null}{\,}T$ 是否等于 $\{0\}$ ，当变量多于方程数量可以看作此时 $n > m$ ，即定义域维数大于值域维数，所以 $\text{dim}{\,}\text{null}{\,}T > 0 \Rightarrow \text{null}{\,}T \ne \{0\}$。

- 对于非齐次线性方程组，当变量多于方程数量时，必然有一组常数项使得方程无解。

这种情况下，问题可以转换成 $T$ 是否为满射，当变量少于方程数量可以看作此时 $n < m$ ，即定义域维数小于值域维数。

## 矩阵（matrix）
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

### 用矩阵表示线性映射
线性代数中常常使用矩阵来表示线性映射:

设 $T \in \mathcal{L}(V, W)$ ，$v_1, \dots , v_n \in V$ 为 $V$ 的基，$w_1, \dots , v_n \in W$ 是 $W$ 的基，那么规定 $T$ 关于这些基的矩阵为一个 $m \times n$ 的矩阵，记为 $\mathcal{M}(T)$ ，对于 $V$ 的任意的基（还是设这个矩阵叫 $A$）：
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

### 矩阵加法
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

### 矩阵的标量乘法
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

### 矩阵乘法
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
