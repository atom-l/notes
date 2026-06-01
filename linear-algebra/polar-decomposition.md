# 极分解

**设 $T \in \mathcal{L}(V)$ ，存在一个等距同构 $S \in \mathcal{L}(V)$ 使得 $T = S \sqrt{T^*T}$ 。**

证明: 

对于任意 $v \in V$ ，都有
$$
\begin{align}
\lVert Tv \rVert ^2
&= \langle Tv, Tv \rangle \\
&= \langle T^* Tv, v \rangle \\
&= \langle \sqrt{T^*T} \sqrt{T^*T} v, v \rangle \\
&= \langle \sqrt{T^*T}v, \sqrt{T^*T} v \rangle \\
&= \lVert \sqrt{T^*T} v \rVert ^2
\end{align}
$$

因此我们可以得到 $\lVert Tv \rVert = \lVert c v \rVert$ 。

定义线性映射 $S_1 \ : \ \text{range} \ \sqrt{T^*T} \ \to \text{range} \ T$ 为 $S_1(\sqrt{T^*T}v) = Tv$ 。

首先，我们要证明 $S_1$ 是合理定义的：设 $v_1, v_2 \in V$ 且满足 $\sqrt{T^*T} v_1 = \sqrt{T^*T} v_2$ ，那么
$$
\begin{align}
\lVert Tv_1 - Tv_2 \rVert
&= \lVert T(v_1 - v_2) \rVert \\
&= \lVert \sqrt{T^*T} (v_1 - v_2) \rVert \\
&= \lVert \sqrt{T^*T} v_1 - \sqrt{T^*T} v_2 \rVert \\
&= 0
\end{align}
$$

因此 $Tv_1 = Tv_2$ ，所以它是一个明确成立的映射关系，定义合理。

此外，因为 $\lVert Tv \rVert = \lVert c v \rVert$ ，所以 $S_1$ 对于任意 $u \in \text{range} \ \sqrt{T^*T}$ 都有 $\lVert S_1 u \rVert = \lVert u \rVert$ 。

证明 $S_1$ 的定义合理性时，揭示了其单射的特质，因此
$$\text{dim} \ \text{range} \ \sqrt{T^*T} = \text{dim} \ \text{range} \ T$$

所以 $\text{dim} \ (\text{range} \ \sqrt{T^*T})^\perp = \text{dim} \ (\text{range} \ T)^\perp$ ，所以可以取得 $(\text{range} \ \sqrt{T^*T})^\perp$ 的规范正交基 $e_1, \dots, e_m$ 与 $(\text{range} \ T)^\perp$ 的规范正交基 $f_1, \dots, f_m$ ，且这两组基的长度相同。

定义线性映射 $S_2 \ : \ (\text{range} \ \sqrt{T^*T})^\perp \ \to \ (\text{range} \ T)^\perp$ 为 $S_2(a_1 e_1, \dots, a_m e_m) = a_1 f_1, \dots, a_m f_m$ 。

因为 $\lVert a_1 e_1, \dots, a_m e_m \rVert = \lvert a_1 \rvert ^2 + \dots + \lvert a_m \rvert ^2$ ，所以对于任意 $w \in (\text{range} \ \sqrt{T^*T})^\perp$ 均有 $\lVert S_2 w \rVert = \lVert w \rVert$ 。

因为 $u,w$ 的定义互相正交，那么对于任意 $v \in V$ 都可以写成 $v = u + w$ 的形式，以此类推，我们可以定义线性映射 $S \in \mathcal{V}$ 为 $Sv = S_1 u + S_2 w$ 。

那么对于任意 $v \in V$ 则有 $S(\sqrt{T^*T}v) = S_1(\sqrt{T^*T}v) = Tv$ ，因此可得 $T = S\sqrt{T^*T}$ 。

此外，将 $v = u + w $ 的形式代入到 $S$ 中可得 $\lVert Sv \rVert ^2 = \lVert S_1 u + S_2 w \rVert ^2$ 。

因为 $S_1 u \in \text{range} \ T$ 以及 $S_2 w \in (\text{range} \ T) ^\perp$ ，即它们互相正交， 所以 $\lVert S_1 u + S_2 w \rVert ^2 = \lVert S_1 u \rVert ^2 + \lVert S_2 w \rVert ^2$ 。

再由 $\lVert S_1 u \rVert = \lVert u \rVert$ 且 $\lVert S_2 w \rVert = \lVert w \rVert$ ，最终可得 $\lVert Sv \rVert ^2 = \lVert u \rVert ^2 + \lVert w \rVert ^2 = \lVert v \rVert ^2$ ，所以 $S$ 是一个等距同构。
