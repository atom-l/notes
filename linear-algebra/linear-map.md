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
上式其实等价于 $span(v_1, v_2, ..., v_n)$ ，并且上式是唯一确定的（式子右侧全是确定的标量和向量），又由于 $v_1, v_2, ..., v_n$ 是 $V$ 的基，所以 $span(v_1, v_2, ..., v_n) = V$ ，所以 $T$ 在 $V$ 上也是唯一确定的。

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
此处 $T \in \mathcal(L)(V, W)$ ，其中第一个 $I$ 是 $V$ 上的恒等映射，第二个 $I$ 是 $W$ 上的恒等映射。

- **分配律（distributive properties）**
$$({S_1} + {S_2})T = {S_1}T + {S_2}T {\ },{\ }S({T_1} + {T_2}) = S{T_1} + S{T_2}$$
此处 $T,T_1,T_2 \in \mathcal(L)(U,V)$，$S,S_1,S_2 \in \mathcal(L)(V,W)$

### 对于0的线性映射
若 $T : V \to W$ ，则 $T(0) = 0$。

其证明过程十分简单，利用线性映射的可加性即可：
$$T(0) = T(0+0) = T(0) + T(0) \Rightarrow T(0) = 0$$