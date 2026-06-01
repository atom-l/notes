# 正算子

## 定义
设 $T \in \mathcal{L}(V)$ ，如果 $T$ 是自伴的且对于任意 $v \in V$ 都有 $\langle Tv, v \rangle \geq 0$ ，那么则称 $T$ 是一个**正算子**（positive operator）。

> 注意，在 $V$ 是复向量空间时，只有在 $T$ 是自伴算子的情况下才有讨论是否为正算子的意义，因为复向量空间中只有自伴算子才能使得 $\langle Tv, v \rangle \in \mathbf{R}$ ，从而有与 $0$ 比较的意义。

## 算子的平方根
设有算子 $R$ 和算子 $T$ ，如果 $R^2 = T$ ，那么称 $R$ 是 $T$ 的平方根。

## 正算子的等价条件
设 $T \in \mathcal{L}(V)$ ，则以下条件等价成立：
1. **$T$ 是正算子；**
2. **$T$ 是自伴的且 $T$ 的所有本征值都不为负；**
3. **$T$ 有正的平方根；**
4. **$T$ 有自伴的平方根；**
5. **存在算子 $R$ 使得 $T = R^* R$;**

证明：首先假设条件1成立，那么根据正算子定义，显然 $T$ 是自伴的，设 $\lambda$ 是 $T$ 的本征值，$v$ 是相应的本征向量，那么有
$$0 \leq \langle Tv, v \rangle = \langle {\lambda}v, v \rangle = \lambda \langle v, v \rangle$$

因为 $v \neq 0$ ，所以 $\langle v, v \rangle = \lVert v \rVert ^2 > 0$ ，那么此处的 $\lambda > 0$ ，故而条件2成立。

假设条件2成立，因为所有的自伴算子一定是正规的，所以根据谱定理可知 $V$ 存在一个由 $T$ 的本征向量组成的规范正交基 $e_1, \dots , e_n$ ，设 $T$ 相应于这组本征向量的本征值为 ${\lambda}_1, \dots , {\lambda}_n$ 且都不为负，设算子 $R \in \mathcal{L}(V)$ 使得任意 $1 \leq j \leq n$ 有
$$Re_j = \sqrt{{\lambda}_j} e_j$$

显然对于每个 $j$ 都有 $R^2 e_j = {\lambda}_j e_j = Te_j$ , 所以 $R^2 = T$，即 $R$ 是 $T$ 的平方根。

设 $v \in V$ ，且 $v = a_1 e_1 + \dots + a_n e_n$ ，那么对于有
$$\langle Rv, v \rangle = \sqrt{{\lambda}_1} {a_1}^2 \langle e_1, e_1 \rangle + \dots + \sqrt{{\lambda}_n} {a_n}^2 \langle e_n, e_n \rangle$$

上式右边的每一项显然都大于等于零，故而可知 $R$ 是正算子，所以条件3成立；且因为正算子都是自伴的，故而条件4也成立。

设条件4成立，显然 $R^* = R$ 、$T = R^2$ ，所以 $T = R^2 = R \cdot R = R^*R$ ，条件5成立。

设条件5成立，那么

$$T^* = (R^*R)^* = R^*(R^*)^* = R^*R = T$$

所以 $T$ 是自伴的，又因为
$$\langle Tv, v \rangle = \langle R^*Rv, v \rangle = \langle Rv, (R^*)^*v \rangle = \langle Rv, R,v \rangle \geq 0$$

故而 $T$ 是正算子，条件1成立。

至此已经证明条件1至5循环蕴含，故而这5个条件等价成立。

## 正算子的正平方根唯一
**对于任意正算子 $T$ ，有且只有一个平方根是正算子，这个唯一的正算子记作 $\sqrt{T}$ 。**

证明：
设 $T \in \mathcal{L}(V)$ 是正算子，$v \in V$ 是 $T$ 的一个本征向量，其对应的本征值为 $\lambda$ ，那么可知 $\lambda \geq 0$ 且 $Tv = \lambda v$ 。

再设算子 $R$ 是 $T$ 的一个正平方根。

因为正算子必然是自伴算子，故而根据谱定理可知 $R$ 有一组本征向量 $e_1, \dots, e_n$ 可以作为 $V$ 的规范正交基，因为其本征值都是非负数，所以存在一组非负数 ${\lambda}_1, \dots , {\lambda}_n$ 使得对于任意 $1 \leq j \leq n$ 都有 $R e_j = \sqrt{{\lambda}_j}e_j$ 。

那么对于 $T$ 的本征向量 $v$ ，一定存在 $a_1, \dots , a_n \in \mathbf{F}$ 使得

$$v = a_1 e_1 + \dots + a_n e_n$$

于是
$$
\begin{align}
Rv = a_1 \sqrt{{\lambda}_1} e_1 &+ \dots + a_n \sqrt{{\lambda}_n} e_n \\
&\Downarrow \\
R^2 v = a_1 {\lambda}_1 e_1 &+ \dots + a_n {\lambda}_1 e_n
\end{align}
$$

因为 $R^2 = T$ 且 $Tv = \lambda v$ ，所以 $R^2 v = \lambda v$ ，可得
$$a_1 {\lambda}_1 e_1 + \dots + a_n {\lambda}_1 e_n = a_1 \lambda e_1 + \dots + a_n \lambda e_n$$

说明对于 $j = 1, \dots ,n$ ，存在一部分 ${\lambda}_j = \lambda$ 的情况（当 $a_j$ 为 $0$ 时，可以存在 $\lambda _j \neq \lambda$ ，又因为 $v \neq 0$ ，所以一定有 $a_j \neq 0$），所以得到
$$v = \sum\limits_{\{ j : {\lambda}_j = \lambda \}} a_j e_j$$

那么
$$Rv = \sum\limits_{\{ j : {\lambda}_j = \lambda \}} a_j \sqrt{{\lambda}_j} e_j = \sqrt{\lambda} \cdot (\sum\limits_{\{ j : {\lambda}_j = \lambda \}} a_j e_j) = \sqrt{\lambda} v$$

此时我们得到 $Rv = \sqrt{\lambda}v$ 的结论，这意味这 $T$ 的每个本征向量都可以唯一确定 $R$ 的映射关系，又因为 $T$ 必然是自伴算子，故而 $T$ 的本征向量必然可以组成一个 $V$ 的规范正交基，那么 $R$ 在 $V$ 中的映射关系也就唯一确定了。

> 此处证明的核心思路可以形象地理解为：$R$ 在空间 $V$ 中各个“方向”上的“变化”都是确定的，那么 $R$ 整体的变化也就确定下来了）。 
