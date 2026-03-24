# 复数

## 定义
- 一个**复数**（complex number）是一个有序对 $(a,b)$ ，其中 $a,b \in \mathbf{R}$ （即都是实数），对于某个复数 $z \in \mathbf{C}$ 通常会写成 $a + b\text{i}$ 的形式。
    - 其中 $a$ 称为**实部**（real part），一般记作 $\text{Re} \, z = a$ ；
    - 其中 $b$ 称为**虚=部**（imaginary part），一般记作 $\text{Im} \, z = b$ ；
    - 所以 $z$ 可以写成 $z = \text{Re} \, z + (\text{Im} \, z) \text{i}$ ；
    - 虚部后的 $\text{i}$ 称为**虚数单位**（imaginary unit），它的定义非常简单： $\text{i}^2 = -1$ ，复数的概念就是围绕这个十分特殊的性质建立的。
    - 当一个复数虚部为 $0$ 时，实际上它等同于实部，变成了一个实数，所以可以说 $\mathbf{R} \subset \mathbf{C}$ 。

- 由所有复数构成的集合一般记为 $\mathbf{C}$ ：
$$\mathbf{C} = \{ a + b\text{i} \, : \, a,b \in \mathbf{R} \}$$

- $\mathbf{C}$ 上的**加法**和**乘法**运算定义为：
$$
\begin{align}
(a + b\text{i}) + (c + d\text{i}) &= (a + c) + (b + c) \text{i} \\
(a + b\text{i})(c + d\text{i}) &= (ac - bd) + (ad + bc) \text{i} \\
\end{align}
$$

实际上复数乘法不必定义，只要围绕性质 $\text{i}^2 = -1$ 就可以推导出来：
$$
\begin{align}
(a + b\text{i})(c + d\text{i}) &= a \cdot c + c \cdot b\text{i} + a \cdot d\text{i} + b\text{i} \cdot d\text{i} \\
&= a \cdot c + c \cdot b\text{i} + a \cdot d\text{i} + b \cdot d \cdot(\text{i} \cdot \text{i}) \\
&= a \cdot c + c \cdot b\text{i} + a \cdot d\text{i} + b \cdot d \cdot (-1) \\
&= a \cdot c - b \cdot d + (c \cdot b + a \cdot d)\text{i} \\
&= (ac - bd) + (ad + bc)\text{i}
\end{align}
$$

## 算数性质
- **交换性**（commutativity）：

对所有 $\alpha , \beta \in \mathbf{C}$ 都有 $\alpha + \beta = \beta + \alpha$ ， $\alpha \beta = \beta \alpha$ ；

- **结合性**（associativity）：

对所有 $\alpha , \beta , \lambda \in \mathbf{C}$ 都有 $(\alpha + \beta) + \lambda = \alpha + (\beta + \lambda)$ ， $(\alpha \beta)\lambda = \alpha(\beta \lambda)$ ；

- **单位元**（identities）:

对所有 $\lambda \in \mathbf{C}$ 都有  $\lambda + 0 = \lambda$ ，$\lambda 1 = \lambda$ ；

- **加法逆元**（additive inverse）：

对任意 $\alpha \in \mathbf{C}$ 都存在唯一的 $\beta \in \mathbf{C}$ 使得 $\alpha + \beta = 0$ ；

- **乘法逆元**（mutiplicative）:

对任意 $\alpha \in \mathbf{C} \, , \, \alpha \neq 0$ 都存在唯一 $\beta \in \mathbf{C}$ 使得 $\alpha \beta = 1$ ；

- **分配律**（distributive property）：

对任意 $\lambda \alpha \beta \in \mathbf{C}$ 都有 $\lambda (\alpha + \beta) = \lambda \alpha + \lambda \beta$ ；

## 减法与除法运算
有了加法逆元和乘法逆元的概念后，就可以明确定义复数集上的减法和除法了。

设 $\alpha , \beta \in \mathbf{C}$ ：
- $\mathbf{C}$ 上的减法定义为与减数的加法逆元相加，即：
$$\alpha - \beta = \alpha + (-\beta)$$
这里的 $-\beta$ 指的是 $\beta$ 的加法逆元。

- $\mathbf{C}$ 上的除法定义为与除数的乘法逆元相乘，即：
$$\alpha / \beta = \alpha \cdot (1/\beta)$$
这里的 $1/\beta$ 指的是 $\beta$ 的乘法逆元。

## 复共轭与绝对值

### 定义
对于任意 $z \in \mathbf{C}$ ：
- $z$ 的**复共轭**（complex conjugate） 记作 $\overline{z}$ ，其定义为：
$$\overline{z} = \text{Re} \, z - (\text{Im} \, z)\text{i}$$
- $z$ 的**绝对值**（absolute value）记作 $\lvert z \rvert$ ，定义为：
$$\lvert z \rvert = \sqrt{(\text{Re} \, z)^2 + (\text{Im} \, z)^2}$$
故而对于任意 $z \in \mathbf{C}$ 都有：
$$\lvert z \rvert \in \mathbf{R} \, \land \, \lvert z \rvert \geq 0$$

### 相关性质
设 $w, z \in \mathbf{C}$ ：
- $z + \overline{z} = 2 \, \text{Re} \, z$ ；
- $z - \overline{z} = 2(\text{Im} \, z)\text{i}$ ；
- $z \overline{z} = \lvert z \rvert^2$ ；
- $\overline{w + z} = \overline{w} + \overline{z}$ ；
- $\overline{wz} = \overline{w} \, \overline{z}$ ；
- $\overline{\,\overline{z}} = z$ ；
- $\lvert \text{Re} \, z \rvert \leq \lvert z \rvert$ ；
- $\lvert \text{Im} \, z \rvert \leq \lvert z \rvert$ ；
- $\lvert \overline{z} \rvert = \lvert z \rvert$ ；
- $\lvert wz \rvert = \lvert w \rvert \lvert z \rvert$ ；
- $\lvert w + z \rvert \leq \lvert w \rvert + \lvert z \rvert$ ；

## 标量集 $\mathbf{F}$
通常我们会用记号 $\mathbf{F}$ 表示 $\mathbf{R}$ 或 $\mathbf{C}$ ，而称其中的元素为**标量**（scalar），它在数学领域中用来强调某个对象是一个“数”而不是向量（例如，一个复数有实部和虚部，是可以作为二维向量来看待的，但在有些上下文中，它只能是一个数，没有维数）。
