# 多项式

## 定义
对于函数 $p : \mathbf{F} \to \mathbf{F}$ ，若存在 $a_0, \dots , a_m \in \mathbf{F}$ 使得对任意 $z \in \mathbf{F}$ 都有：
$$p(z) = a_0, a_1 z + a_2 z^2 + \dots + a_m z^m$$
则称 $p$ 为系数属于 $\mathbf{F}$ 的**多项式**（polynomial）。

$\mathcal{P}(\mathbf{F})$ 是所有系数属于 $F$ 的多项式所构成的集合。

## 次数
对于多项式 $p \in \mathcal{P}(\mathbf{F})$ ，当对任意 $z \in \mathbf{F}$ 都有 $p(z) = a_0, a_1 z + a_2 z^2 + \dots + a_m z^m$ ，其中 $a_0, \dots a_m \in \mathbf{F}$ 且 $a_m \neq 0$ ，则称 $p$ 的**次数**（degree）为 $m$ ，记做:
$$\text{deg} \ , p = m$$

对于恒等于 $0$ 的多项式，其次数规定为 $- \infty$ 。

对于非负整数 $m$ ，$\mathcal{P}_m(\mathbf{F})$ 表示系数在 $\mathbf{F}$ 中且次数不超过 $m$ 的所有多项式构成的集合：
$$
\mathcal{P}_m(\mathbf{F}) = \{ p \, : \, \text{deg} \, p \leq m \}
$$
