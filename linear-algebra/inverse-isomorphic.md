# 可逆性与同构

## 可逆性
定义：
- 设 $T \in \mathcal{L}(V,W)$，若存在 $S \in \mathcal{L}(W,V)$ 使得 $ST \in \mathcal{L}(V,V)$ 和 $TS \in \mathcal{L}(W,W)$ 都为恒等映射，那么则称 $T$ 是一个**可逆的**（invertible）线性映射；
- 其中，线性映射 $S$ 称之为 $T$ 的**逆**（inverse），它使得 $ST = I : I \in \mathcal{L}(V,V)$ 和 $TS = I : I \in \mathcal{L}(W,W)$ 成立；

由定义延申可证明，**若一个线性映射可逆，那么它的逆是有且只有一个**：

设 $T \in \mathcal{L}(V, W)$ 可逆，且 $S_1, S_2 \in \mathcal{L}(W, V)$ 都是 $T$ 的逆，那么可得
$$S_1 = {S_1}I = {S_1}(T{S_2}) = ({S_1}T)S_2 = I{S_2} = S_2$$
所以可得，$S_1 = S_2$ 。

对于可逆的线性映射 $T$ ，它的逆一般记作 $T^{-1}$。

结合之前提到的单射和满射，我们还可以得出结论——**“任意可逆的线性映射必然是单射且满射的，反之亦然”**：

**证明** 设 $T \in \mathcal{L}(V,W)$

（1）设 $T$ 是可逆的，下面证明其单射和满射性：

- 取任意 $v_1, v_2 \in V$ 且 $T{v_1} = T{v_2}$ ，则：
$$
\begin{gather}
v_1 = I{v_1} = T^{-1}T{v_1} = T^{-1}T{v_2} = v_2 \\
\Rightarrow v_1 = v_2
\end{gather}
$$

- 因为 $T$ 可逆，则：
$$
\begin{gather}
\forall w \in W : T(T_{-1}w) = w \\
\Rightarrow \text{range}{\,}T = W
\end{gather}
$$

（2）设 $T$ 是单射且满射的，下面证明其可逆性：

- 因为 $T$ 单射且满射，故而对于任意 $w \in W$，必然存在唯一 $v \in V$ 使得 $Tv = w$ ，那么设有线性映射 $S \in \mathcal{L}(W,V)$ 使得 $Sw = v$ ，则：
$$
\begin{gather}
(S \circ T) v = S(Tv) = Sw = v \\
\Rightarrow S \circ T = I \in \mathcal{L}(V, V) \\
\end{gather}
$$

- 设 $w_1, w_2 \in W$，且 $T{w_1} = v_1 , T{w_2} = v_2$则：
$$
\begin{gather}
T(S{w_1} + S{w_2}) = T(v_1, v_2) = T(v_1) + T(v_2) = w_1 + w_2 = I(w_1 + w_2) = TS(w_1 + w_2) \\
\Rightarrow S{w_1} + S{w_2} = S(w_1 + w_2)
\end{gather}
$$

因此 $S$ 满足可加性。

- 设 $\lambda \in \mathbf{F}$ ，则：
$$
\begin{gather}
T({\lambda}v) = T({\lambda}Sw) = {\lambda}T(Sw) = {\lambda}w \\
\Rightarrow S({\lambda}w) = {\lambda}Sw
\end{gather}
$$

因此 $S$ 满足齐性，至此可以得出 $ST = I, TS = I$ 且 $S$ 是线性映射，所以 $S = T^{-1}$。

> 学到这里，我不禁有疑问：是否存在某个可明确定义计算过程的线性映射，它可逆，但它的逆映射缺无法被明确定义？
>
> 经过一番查证，答案是存在。但这往往要在无限维的空间中发生，起码值域需要是无限维的，这种情况下，是维度的无限所带来的不可计算性，而映射关系并非“不可寻”。
>
> 在有限维的情况下，因为定义域与值域维度有限，故而每个定义域中的向量元素都可以通过有限步计算得到对应的值域向量元素，有限维向量空间上的可逆线性映射的逆映射总是可计算的。

## 同构性
定义：
- **同构映射（isomorphism）**：若一个线性映射可逆，那么它就是一个同构映射（其英文对应术语为同构（名词），为了符合中文的文法习惯，这里冠以映射作为主体名词）。
- **同构的（isomorphic）向量空间**：若两个向量空间之间存在同构映射，那么就称这两个向量空间是同构的。

由同构的定义延申，我们还可以得到以下结论：
- 向量空间之间的线性映射所构成的向量空间与对应维度的标量空间之间的线性映射所构成的向量空间是同构的，即：
设 $\text{dim}{\,}V = n, \text{dim}{\,}W = m : n, m \in \mathbb{N+}$ ，那么 $\mathcal{L}(V,W)$ 和 $\mathbf{F}^{m,n}$ 是同构的。

- 且线性映射的维数为其定义域与值域维数的乘积，即：
$$
\text{dim}{\,}\mathcal{L}(V,W) = (\text{dim}{\,}V)(\text{dim}{\,}W)
$$

## 算子（operator）
定义：
- 向量空间到自身的线性映射称之为**算子**；
- 以向量空间 $V$ 为例，其全体算子的集合记为 $\mathcal{L}(V)$ ，即 $\mathcal{L}(V,V)$ 的简写；

算子的性质有些特殊，其可逆性、单射性、满射性是等价的，即对于任意 $T \in \mathcal{L}(V)$，以下三个条件同时成立：
- $T$ 可逆；
- $T$ 是单射的；
- $T$ 是满射的；
