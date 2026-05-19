# 等距同构

## 定义
对于算子 $S \in \mathcal{L}(V)$ ，如果它对任意 $v \in V$ 都有 $\lVert Sv \rVert = \lVert v \rVert$ ，那么则称 $S$ 是**等距同构**（isometry）。

等距同构即保持向量范数不变的算子。

> 术语上，分别将实内积空间上的等距同构称之为正交算子；复内积空间上的等距同构称之为酉算子。

## 等距同构的等价条件
设 $S \in \mathcal{L}(V)$ ，则以下条件等价：
1. **$S$ 是等距同构；**
2. **对所有 $u,v \in V$ 均有 $\langle Su,Sv \rangle = \langle u, v \rangle$ ；**
3. **对于 $V$ 中的任意规范正交向量组 $e_1, \dots e_n$ 均满足 $Se_1, \dots , Se_n$ 是规范正交的；**
4. **$S^*S = I$ ；**
5. **$SS^* = I$ ；**
6. **$S^*$ 是等距同构；**
7. **$S$ 是可逆的且 $S^{-1} = S^*$ ；**

证明：

条件1成立时，根据极化恒等式，对任意 $u,v \in V$ 都有
$$
\begin{align}
\langle Su, Sv \rangle
&= \frac{\lVert Su + Sv \rVert ^2 - \lVert Su - Sv \rVert ^2 + i \lVert Su + iSv \rVert ^2 - i \lVert Su - iSv \rVert ^2}{4} \\
&= \frac{\lVert S(u + v) \rVert ^2 - \lVert S(u - v) \rVert ^2 + i \lVert S(u + iv) \rVert ^2 - i \lVert S(u - iv) \rVert ^2}{4} \\
&= \frac{\lVert u + v \rVert ^2 - \lVert u - v \rVert ^2 + i \lVert u + iv \rVert ^2 - i \lVert u - iv \rVert ^2}{4} \\
&= \langle u, v \rangle
\end{align}
$$

因此条件1蕴含条件2。

当条件2成立时，可知在 $V$ 中的某一规范正交向量组 $e_1, \dots , e_n$ 中的任意两个向量 $e_j, e_k$ 都有
$$\langle Se_j, Se_k \rangle = \langle e_j, e_k \rangle = 0$$

有因为 $S$ 保持向量的范数不变，故而 $Se_1, \dots, Se_n$ 还是规范正交的。因此条件2蕴含条件3。

当条件3成立时，设 $e_1, \dots , e_n$ 是 $V$ 的一个规范正交基，那么对于其中任意两个向量 $e_j, e_k$ 都有
$$\langle S^*Se_j, e_k \rangle = \langle Se_j, (S^*)^*e_k \rangle = \langle Se_j, Se_k \rangle = \langle e_j, e_k \rangle$$

因为对于任意向量 $u, v \in V$ ，$u$ 和 $v$ 都可以表示为 $e_1, \dots , e_n$ 的线性组合，那么 $\langle S^*Su, v \rangle$ 可以用两个规范正交基的线性组合做内积来表示，最后展开会消去 $S$ （此处省略展开过程，太冗长了），最终可以得到 $\langle S^*Su, v \rangle = \langle u, v \rangle = \langle Iu, v \rangle$ 。因此条件3蕴含条件4。

条件4显然蕴含条件5。

当条件5成立时，对于任意 $v \in V$ 有
$$\lVert S^*v \rVert ^2 = \langle S^*v, S^* v \rangle = \langle (S^*)^*S^* v, v \rangle = \langle SS^*v, v \rangle = \langle v, v \rangle = \lVert v \rVert ^2$$

可得 $\lVert S^*v \rVert = \lVert v \rVert$ ，所以 $S^*$ 也是等距同构，条件5蕴含条件6。

当条件6成立时，因为伴随映射的存在性，结合条件4和条件5的蕴含关系，可以得出此时条件7成立。

当条件7成立时，对于任意 $v \in V$ 有
$$\lVert Sv \rVert ^2 = \langle Sv, Sv \rangle = \langle S^*Sv, v \rangle = \langle S^{-1}Sv, v \rangle = \langle Iv, v \rangle = \langle v, v \rangle = \lVert v \rVert ^2$$

所以 $\lVert Sv \rVert = \lVert v \rVert$ ，因此条件7蕴含条件1。

至此已经证明以上条件是依次蕴含的关系，从而已证以上条件成立的等价性。

### 复内积空间下的等价条件
设 $V$ 是复内积空间，且有 $S \in \mathcal{L}(V)$ ，则以下条件等价成立：
1. **$S$ 是等距同构；**
2. **$V$ 有一个由 $S$ 的本征向量组成的规范正交基，并且这组本征向量对应的本征值绝对值均为1；**

证明：

假设条件1成立，那么可知 $S^*S = I = SS^*$ ，故而 $S$ 是个正规算子，根据复谱定理可知，必然存在一组 $S$ 的本征向量构成的规范正交基 $e_1, \dots , e_n$ ，设对应的本征值为 ${\lambda}_1, \dots , {\lambda}_n$ ，那么对于任意 $j \in \{1, \dots, n\}$ 都有
$$\lvert {\lambda}_j \rvert = {\lambda}_j \lVert e_j \rVert = \lVert {\lambda}_j e_j \rVert = \lVert Se_j \rVert = \lVert e_j \rVert = 1$$

因此条件1蕴含条件2。

假设条件2成立，那么根据规范正交基的相关性质，对于任意 $v \in V$ 有
$$
\begin{align}
v &= \langle v, e_1 \rangle e_1 + \dots + \langle v, e_n \rangle e_n \\
\lVert v \rVert ^2 &= \lvert \langle v, e_1 \rangle \rvert ^2 + \dots + \lvert \langle v, e_n \rangle \rvert ^2 \\
\end{align}
$$

将 $S$ 作用于第一个等式
$$
\begin{align}
Sv &= \langle v, e_1 \rangle Se_1 + \dots + \langle v, e_n \rangle Se_n \\
&= {\lambda}_1 \langle v, e_1 \rangle e_1 + \dots + {\lambda}_n \langle v, e_n \rangle e_n
\end{align}
$$

因为 $\lvert {\lambda}_j \rvert = 1$ ，代入上式并平方，可得
$$\lVert Sv \rVert ^2 = \lvert \langle v, e_1 \rangle \rvert ^2 + \dots + \lvert \langle v, e_n \rangle \rvert ^2$$

所以 $\lVert Sv \rVert ^2 = \lVert v \rVert ^2$ ，可得 $\lVert Sv \rVert = \lVert v \rVert$ ，即 $S$ 是等距同构，条件2蕴含条件1。
