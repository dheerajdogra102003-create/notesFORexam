# DESIGN AND ANALYSIS OF ALGORITHMS — EXAM PREPARATION NOTES

# UNIT 1 — ASYMPTOTIC ANALYSIS & DIVIDE-AND-CONQUER

---

## Question 1: Explain Asymptotic Notations (Big-O, Big-Omega, Big-Theta) with mathematical definitions and graphical interpretations.

### Answer
**Asymptotic notations** are mathematical tools used to describe and compare the running time or space complexity of an algorithm as the input size $n$ approaches infinity ($n \to \infty$).

#### 1. Big-O Notation ($O$ - Upper Bound)
- **Concept**: Represents the **worst-case scenario** (or upper limit) of algorithm growth. It guarantees that the algorithm will never take more time than this bound.
- **Mathematical Definition**:
  $$f(n) = O(g(n)) \iff \text{there exist constants } c > 0 \text{ and } n_0 \ge 1 \text{ such that } 0 \le f(n) \le c \cdot g(n) \text{ for all } n \ge n_0$$
- **Example**: Linear search takes at most $O(n)$ comparisons when searching an array of $n$ elements.

#### 2. Big-Omega Notation ($\Omega$ - Lower Bound)
- **Concept**: Represents the **best-case scenario** (or minimum time required). It guarantees that the algorithm will take at least this much time for large $n$.
- **Mathematical Definition**:
  $$f(n) = \Omega(g(n)) \iff \text{there exist constants } c > 0 \text{ and } n_0 \ge 1 \text{ such that } 0 \le c \cdot g(n) \le f(n) \text{ for all } n \ge n_0$$
- **Example**: Finding an item in an unsorted array takes $\Omega(1)$ time if the target is at the very first index.

#### 3. Big-Theta Notation ($\Theta$ - Tight Bound)
- **Concept**: Represents an **exact or tight bound** where an algorithm's performance is enclosed between lower and upper limits.
- **Mathematical Definition**:
  $$f(n) = \Theta(g(n)) \iff \text{there exist constants } c_1, c_2 > 0 \text{ and } n_0 \ge 1 \text{ such that } c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n) \text{ for all } n \ge n_0$$
- **Rule**: $f(n) = \Theta(g(n))$ holds if and only if $f(n) = O(g(n))$ AND $f(n) = \Omega(g(n))$.

| Notation | Growth Bound | Practical Meaning | Real-world Analogy |
| :--- | :--- | :--- | :--- |
| **Big-O ($O$)** | Upper Bound | Worst-case ceiling | Trip takes *at most* 4 hours |
| **Big-Omega ($\Omega$)** | Lower Bound | Best-case floor | Trip takes *at least* 1 hour |
| **Big-Theta ($\Theta$)** | Tight Bound | Exact behavior | Trip takes *consistently* 2.5 hours |

---

## Question 2: Explain the Divide-and-Conquer paradigm with Merge Sort. State its recurrence relation and analyze its time complexity.

### Answer

#### 1. Divide-and-Conquer Paradigm
The divide-and-conquer strategy solves a problem by breaking it into three distinct steps:
1. **Divide**: Break the primary problem of size $n$ into smaller, independent subproblems of the same type.
2. **Conquer**: Recursively solve the subproblems. If the subproblem is small enough (base condition), solve it directly.
3. **Combine**: Merge the solutions of the subproblems into the solution for the original problem.

#### 2. Merge Sort Algorithm
Merge Sort splits an unsorted array of size $n$ into two halves of size $n/2$, recursively sorts each half, and merges the two sorted halves into a single sorted list.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])
    
    return merge(left_half, right_half)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

#### 3. Recurrence Relation & Complexity Analysis
- **Divide step**: Computing the middle element takes $O(1)$ time.
- **Conquer step**: Solving two subproblems of size $n/2$ takes $2 \cdot T(n/2)$.
- **Combine (Merge) step**: Merging $n$ elements takes linear time $\Theta(n)$.

**Recurrence Relation**:
$$T(n) = 2T(n/2) + \Theta(n), \quad \text{for } n > 1$$
$$T(1) = \Theta(1)$$

**Solving using Master Theorem ($T(n) = aT(n/b) + f(n)$)**:
- Here $a = 2$, $b = 2$, $f(n) = \Theta(n) = \Theta(n^{\log_b a}) = \Theta(n^{\log_2 2}) = \Theta(n^1)$.
- By Case 2 of the Master Theorem:
  $$T(n) = \Theta(n^{\log_b a} \log n) = \Theta(n \log n)$$

- **Worst Case Time**: $O(n \log n)$
- **Best Case Time**: $\Omega(n \log n)$
- **Average Case Time**: $\Theta(n \log n)$
- **Auxiliary Space Complexity**: $O(n)$ for auxiliary buffers during the merge phase.

---

# UNIT 2 — GREEDY & DYNAMIC PROGRAMMING

---

## Question 3: Compare Greedy Algorithms with Dynamic Programming. Solve the 0/1 Knapsack problem using Dynamic Programming.

### Answer

#### 1. Comparison: Greedy vs Dynamic Programming

| Characteristic | Greedy Approach | Dynamic Programming (DP) |
| :--- | :--- | :--- |
| **Decision Rule** | Makes the locally optimal choice at each step without reconsidering. | Explores all possible choices and builds solutions from subproblems. |
| **Subproblem Overlap**| Does not require overlapping subproblems. | Requires overlapping subproblems and optimal substructure. |
| **Backtracking** | Never backtracks or reconsiders previous choices. | Re-uses memoized answers to guarantee global optimum. |
| **Knapsack Problem**| Solves **Fractional Knapsack** optimally ($O(n \log n)$). | Required for **0/1 Knapsack** ($O(n \cdot W)$ pseudo-polynomial). |
| **Guarantee** | Does not always guarantee the optimal solution for every problem. | Guarantees the globally optimal solution when preconditions are met. |

#### 2. 0/1 Knapsack Problem Formulation
Given $n$ items, each with weight $w_i$ and value $v_i$, and a knapsack of capacity $W$, determine the maximum value that can be put in the knapsack without exceeding capacity $W$. Each item can either be taken completely ($1$) or left behind ($0$).

**Recurrence Relation**:
Let $DP[i][w]$ be the maximum value obtained using a subset of the first $i$ items with capacity $w$:
$$DP[i][w] = \begin{cases} 
0 & \text{if } i = 0 \text{ or } w = 0 \\
DP[i-1][w] & \text{if } w_i > w \\
\max(DP[i-1][w], \, v_i + DP[i-1][w - w_i]) & \text{if } w_i \le w 
\end{cases}$$

#### 3. Tabulation Implementation

```python
def knapsack_01(weights, values, W):
    n = len(values)
    # Initialize DP table of size (n + 1) x (W + 1)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        w_curr = weights[i - 1]
        v_curr = values[i - 1]
        for w in range(W + 1):
            if w_curr > w:
                dp[i][w] = dp[i - 1][w]
            else:
                dp[i][w] = max(dp[i - 1][w], v_curr + dp[i - 1][w - w_curr])
                
    return dp[n][W]

# Example Usage:
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
print("Maximum Value:", knapsack_01(weights, values, capacity))  # Output: 7 (items 1 & 2)
```

- **Time Complexity**: $O(n \cdot W)$ where $n$ is the number of items and $W$ is the maximum knapsack capacity.
- **Space Complexity**: $O(n \cdot W)$ with 2D array, or $O(W)$ when optimized with a 1D state array.

---

# UNIT 3 — GRAPH ALGORITHMS

---

## Question 4: Explain Dijkstra's Single Source Shortest Path Algorithm with step-by-step procedure and complexity analysis.

### Answer

#### 1. Overview & Constraints
**Dijkstra's Algorithm** finds the shortest path from a single source vertex $S$ to all other vertices in a directed or undirected graph with **non-negative edge weights**.
> **Important Limitation**: Dijkstra's algorithm fails if the graph contains negative edge weights (Bellman-Ford algorithm must be used instead).

#### 2. Step-by-Step Procedure
1. Initialize distance array `dist[u] = ∞` for all vertices $u \in V$.
2. Set source distance `dist[S] = 0`.
3. Insert all vertices into a Priority Queue (Min-Heap) keyed by distance.
4. While the Min-Heap is not empty:
   - Extract vertex $u$ with the minimum distance.
   - For each adjacent neighbor $v$ connected by edge weight $w(u, v)$:
     - **Relaxation Step**: If `dist[u] + w(u, v) < dist[v]`:
       - Update `dist[v] = dist[u] + w(u, v)`.
       - Update $v$'s key in the Min-Heap.
       - Set `parent[v] = u` for path reconstruction.

```python
import heapq

def dijkstra(graph, source):
    # graph: dict mapping u -> list of (v, weight)
    distances = {node: float('inf') for node in graph}
    distances[source] = 0
    pq = [(0, source)]  # (dist, node)
    
    while pq:
        curr_dist, u = heapq.heappop(pq)
        
        if curr_dist > distances[u]:
            continue
            
        for neighbor, weight in graph[u]:
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances
```

#### 3. Time Complexity
- **Using an Adjacency Matrix and Array**: $O(V^2)$
- **Using an Adjacency List and Binary Min-Heap**: $O((V + E) \log V)$
- **Using a Fibonacci Heap**: $O(E + V \log V)$ (theoretically optimal for dense graphs)
- **Space Complexity**: $O(V)$ for distance tracking and priority queue.
