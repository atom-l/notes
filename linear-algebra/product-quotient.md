# 向量空间的积和商

## 积空间

### 定义
设 $V_1, \dots ,V_m$ 均为 $\mathbf{F}$ 上的向量空间：
- 那么**积** $V_1 \times \dots \times V_m$ 定义为：
$$V_1 \times \dots \times V_m = \{ (v_1, \dots ,v_m) : v_1 \in V_1, \dots ,v_m \in V_m \}$$
- 向量空间的积仍然是一个向量空间，一般称之为**积空间**，故其加法和标量乘法仍然符合一般向量空间的规律：
$$
\begin{align}
(u_1, \dots ,u_m) + (v_1, \dots ,v_m) &= (u_1 + v_1, \dots ,u_m + v_m) \\
\lambda(v_1, \dots ,v_m) &= (\lambda v_1, \dots , \lambda v_m)
\end{align}
$$

### 向量空间积的维数等于各向量空间维数之和**：
    
设 $V_1, \dots , V_m$ 均为有限维向量空间，那么：
$$
\text{dim}(V_1 \times \dots \times V_m) = \text{dim}{\,}V_1 + \dots \text{dim}{\,}V_m
$$

### 积与直和

**设 $U_1, ... , U_m$ 皆为向量空间 $V$ 的子空间，且有线性映射： $\Gamma : U_1 \times \dots \times U_m \to U_1 + \dots U_m$ , $\Gamma$ 若是单射的，那么 $U_1 + \dots + U_m$ 必然是直和，反之亦然。**(因为单射则表明 $\text{null}{\,}\Gamma =  {0}$ ，且等式左边的 $0$ 由每个自子空间中的零向量之和组成，这同时也表明 $U_1 + \dots + U_m$ 是直和)

根据以上推论，就可以得出直和与维数的关系：**任意向量空间的子空间之和若是直和，那么子空间的维数之和等于该向量空间维数，反之亦然。**

证明：

设有限维向量空间 $V$ ，且 $U_1, \dots , U_m$ 均为V的子空间，且有线性映射： $\Gamma : U_1 \times \dots \times U_m \to U_1 + \dots U_m$，那么 $U_1 + \dots U_m$ 若是直和，那么 $\Gamma$ 定是单射的，则：
$$
\begin{align}
\text{dim}(U_1 + \dots + U_m) &= \text{dim}(U_1 \times \dots \times U_m) \\
&= \text{dim}{\,}U_1 + \dots + \text{dim}{\,}U_m
\end{align}
$$
故而可证直和到维度之和方向的推论，反方向的推论差不多也是将证明过程逆转。

## 向量与子空间之和
设 $v \in  V$，$U$是$V$的子空间，则 $v + U$ 是 $V$ 的一个子集，且符合以下定义：
$$v + U =  \{v + u : u \in U\}$$

## 仿射子集（affine subset）、平行（parallel）
设有向量空间 $V$ ，$U$ 是 $V$ 的子空间，对于任意向量 $v \in V$ 那么：
- $V$ 的**仿射子集**是 $V$ 的所有形如 $v + U$ 的子集；
- 对于某个确定的子空间 $U$ ，那么任意形如 $v + U$ 的仿射子集都**平行**于 $U$ ；

## 商空间

### 定义
设有向量空间 $V$ ，$U$ 是 $V$ 的子空间，那么**商空间** $V/U$ 是指所有平行于 $U$ 的仿射子集所构成的集合，即：
$$V/U = \{v + U : v \in V\}$$

### 相关性质
**平行于同一子空间的仿射子集要么相等，要么不相交。**

设有向量空间 $V$ 和其任意子空间 $U$，对于任意两个向量 $v, w \in V$ 以下情况同时成立或失效：
- (a) $v - w \in U$
- (b) $v + U = w + U$
- (c) $(v + U) \cap (w + U) \neq \varnothing$

证明：

（1）先假设情况 (a) 成立，对于任意 $u \in U$ ，利用子空间的封闭性，可得：
$$
\begin{align}
& v + u = v + (w - w) + u = w + ((v - w) + u) \in w + U \\
& w + u = w + (v - v) + u = v + ((w - v) + u) \in v + U
\end{align}
$$
故而 $v + U \subset  w + U$ 且 $w + U \subset v + U$，所以 $v + U = w + U$，故而证得情况 (a) 蕴涵 情况 (b)。

（2）现在假设情况 (c) 成立，于是存在向量 $u_1, u_2 \in U$ 使得：
$$v + u_1 = w + u_2$$
那么 $v - w = u_2 - u_1$ ，再次利用子空间的封闭性可知 $v - w \in U$ ，故而证得情况 (c) 蕴涵 情况 (a)，有因为已证情况 (a) 蕴涵 情况 (b)，所以情况 (c) 蕴涵情况 (b)。

（3）如果情况 (b) 成立，那么情况 (c) 必然成立，又因为已证情况 (c) 蕴涵 情况 (a)，所以情况 (b) 也蕴涵情况 (a)，此时证毕。

### 商空间上的加法与标量乘法
设有向量空间 $V$ 和其子空间 $U$ ，则对于商空间 $V/U$ 、任意向量 $v, w \in V$ 和 $\lambda \in \mathbf{F}$ 有定义：
- $(v + U) + (w + U) = (v + w) + U$
- $\lambda(v + U) = (\lambda v) + U$

### 商映射
设有向量空间 $V$ 和其任意子空间 $U$，**商映射** $\pi ：V \to V/U$ 是对于任意向量 $v \in V$ 符合以下定义的线性映射：
$$\pi(v) = v + U$$

此外，对于所有 $v \in U$ 的情况，$\pi(v)$ 始终等于 $U$ ，很容易得到 $\text{null}{\,}\pi = U$，且 $\text{range}pi = V/U$，由[线性映射基本定理](/linear-algebra/fundamental-theorem-linear-maps)可得：
$$
\begin{align}
\text{dim}{\,}V &= \text{dim}{\,}V/U + \text{dim}{\,}\text{range}{\,}\pi \\
\text{dim}{\,}V &= \text{dim}{\,}V/U + \text{dim}{\,}U \\
&\Downarrow \\
\text{dim}{\,}V/U &= \text{dim}{\,}V - \text{dim}{\,}U
\end{align}
$$

### $\tilde{T}$ 的定义
设 $T \in \mathcal{L}(V,W)$，$\tilde{T} : V/(\text{null}{\,}T) \to W$ 的定义如下：
$$\tilde{T}(v + \text{null}{\,}T) = Tv$$

即，将平行于线性映射 $T$ 零空间的仿射子集根据与零空间的距离映射到 $T$ 的值域中。

此外还有以下性质：
- $\tilde{T}$ 是 $V/(\text{null}{\,}T)$ 到 $W$ 的线性映射；
- $\tilde{T}$ 是单射的；
- $\text{range}{\,}\tilde{T} = \text{range}{\,}T$;
- $V/(\text{null}{\,}T)$ 和 $\text{range}{\,}T$ 是同构的；
