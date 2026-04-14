# 正交补

## 定义
设向量空间 $V$ 且有子集 $U \subset V$ ，那么 $U$ 的**正交补**（orthogonal complement）记作 $U^\perp$ ，其是一个定义如下的向量集合：
$$U^\perp = \{v \in V \, : \, \text{对于任意} u \in U \text{都有} \langle v, u \rangle = 0 \}$$

## 基本性质
设向量空间 $V$ 且有子集 $U, W \in V$ 、$U \subset W$ ，那么以下情况均成立：

1. **$U^\perp$ 是 $V$ 的子空间。**

证明：首先，对于任意 $u \in U$ 都有 $\langle 0, u \rangle = 0$ ，故而 $0 \in U^\perp$ 。

设 $v_1, v_2 \in U^\perp$ ，对于任意 $u \in U$ 都有
$$\langle v_1 + v_2 , u \rangle = \langle v_1, u \rangle + \langle v_2, u \rangle = 0 + 0 = 0$$

$U^\perp$ 满足加法封闭性。

设 $\lambda \in \mathbf{F}$ 、$v \in U^\perp$ ，则
$$\langle \lambda v , u \rangle = \lambda \langle v, u \rangle = \lambda \cdot 0 = 0$$

$U^\perp$ 满足标量乘法的封闭性，至此证毕。

2. $\{0\}^\perp = V$

3. $V^\perp = \{0\}$

4. $U \cap U^\perp \in \{0\}$

5. $W^\perp \subset U^\perp$

## 其他性质
设有限维向量空间 $V$ ，及其有限维子空间 $U$ ，则以下情况均成立：

1. $V = U \oplus U^\perp$

2. $\text{dim} \, U^\perp = \text{dim} \, V - \text{dim} \, U$

3. $U = (U^\perp)^\perp$

## 正交投影

### 定义
设 $U$ 是 $V$ 的有限维子空间，那么 $V$ 到 $U$ 上的**正交投影**（orthogonal projection）记作 $P_U$ ，其为符合定义的一个在 $V$ 上的算子：
对于任意 $v \in V$ ，那么 $P_U v \in U$ ，且必然存在某个向量 $w \in U^\perp$ 使得 $v = P_U v + w$ 。

以三维空间 $\mathbf{R}^3$ 为例，它到某个二维平面 $\mathbf{R}^2$ 的正交投影是一个函数，该函数将任意的三维向量垂直投影到这个二维平面上。

### 相关性质
设 $U$ 是 $V$ 的有限维子空间，对于任意 $v \in V$ ，以下描述均成立：

1. $P_U \in \mathcal{L}(V)$

2. **对于任意 $u \in U$ 均有 $P_U u = u$ 。**

3. **对于任意 $w \in U^\perp$ 均有 $P_U w = 0$ 。**

4. $\text{range} \, P_U = U$

5. $\text{null} \, P_U = U^\perp$

6. $v - P_U v \in U^\perp$

7. **$P_U^2 = P_U$ 或者说 $P_U(P_U v) = P_U v$**

8. $\lVert P_U v \rVert \leq \lVert v \rVert$

9. **对于 $U$ 的任意规范正交基 $e_1, \dots, e_m$ 均有 $P_U v = \langle v, e_1 \rangle e_1 , \dots , \langle v, e_m \rangle e_m$ 。**

### 极小化问题
设 $U$ 是 $V$ 的最小子空间，且 $v \in V$ 、 $u \in U$ ，则
$$\lVert v - P_U v \rVert  \leq \lVert v - u \rVert$$

此处的等号仅在 $u = P_U v$ 的情况下成立。

形象地讲，一个向量和某个子空间的距离等于它与该子空间的正交投影的距离。
