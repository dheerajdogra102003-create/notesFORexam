# DESIGN AND ANALYSIS OF ALGORITHMS — EXAM PREPARATION NOTES

---

## Question 1: What are the parameters used to measure the efficiency of an algorithm?

### Answer

The efficiency of an algorithm is mainly measured using two parameters:

#### 1. Time Complexity ⏱️
It measures how much time an algorithm takes to execute as the input size increases.
- It is usually expressed using Big-O notation, such as $O(1)$, $O(n)$, $O(n^2)$.
- **Example:** Searching for a name in an unsorted list may take $O(n)$ time.

**Real-life example:**
> Suppose there are 1,000 student names in a list. If we search for a name one by one, we may have to check many names before finding it. Therefore, the time increases as the number of students increases.

---

#### 2. Space Complexity 💾
It measures how much extra memory an algorithm requires while executing.
- It includes memory used for variables, arrays, data structures, recursion, etc.
- **Example:** An algorithm that creates an extra array of size $n$ requires $O(n)$ space.

**Real-life example:**
> If an application stores information about 1,000 students in an additional array, it will require more memory than storing information about only 100 students.

---

### 📌 Simple Example to Remember

If an algorithm takes:
- **Less time** → Better Time Complexity ⏱️
- **Less memory** → Better Space Complexity 💾

$$\text{Time Complexity} + \text{Space Complexity} = \text{Main parameters used to measure the efficiency of an algorithm}$$

> [!TIP]
> **In simple words:** A good algorithm should run faster and use less memory.

---

### Visual Complexity Graph (Big-O Growth Rates)

The graph below visually compares how various time complexities scale as the input size ($n$) increases:

![Algorithm Complexity Graph - Big O Growth Rates](assets/images/diagrams/algorithm_complexity_graph.svg)

---

## Question 2: Describe asymptotic analysis and explain the significance of asymptotic notations.

### Answer

Asymptotic analysis is the technique of analyzing the time and space complexity of an algorithm based on the growth of input size $n$, especially when $n$ becomes very large.

It mainly helps us understand the **growth of an algorithm's time and space requirements** without depending on the actual computer, programming language, or execution time.

---

### 📌 Example

Suppose an algorithm performs:
$$5n + 10 \text{ operations}$$

When $n$ becomes very large, the constant $10$ and coefficient $5$ become less important. We focus on the rate of growth of $n$.

Therefore:
$$5n + 10 \longrightarrow O(n)$$

So, the algorithm has **linear time complexity**.

---

### 🔑 Common Asymptotic Notations

| Notation | Meaning | Example |
| :--- | :--- | :--- |
| **$O$ (Big-O)** | Upper bound / worst-case growth | $O(n^2)$ |
| **$\Omega$ (Omega)** | Lower bound / best-case growth | $\Omega(n)$ |
| **$\Theta$ (Theta)** | Tight bound / exact growth order | $\Theta(n)$ |
---

## Question 3: Analyze the time complexity of a non-recursive algorithm.

### Answer

The time complexity of a non-recursive algorithm is analyzed by counting the number of times its basic operations are executed with respect to the input size $n$. The resulting growth rate is expressed using asymptotic notation such as Big-O.

---

### Steps to Analyze Time Complexity

1. **Identify the input size** → Usually represented by $n$.
2. **Find the basic operation** → The statement that is executed repeatedly.
3. **Count how many times it executes**.
4. **Express the result using Big-O notation**.
5. **Ignore constants and lower-order terms**.

---

### Example 1: Single Loop

```text
Algorithm Sum(A, n)

sum ← 0

for i ← 1 to n do
    sum ← sum + A[i]

return sum
```

The loop executes $n$ times.  
Therefore:
$$T(n) = n$$

**Time Complexity** $= O(n)$

---

### Example 2: Nested Loops

```text
for i ← 1 to n do
    for j ← 1 to n do
        print(i, j)
```

- **Outer loop** → $n$ times
- **Inner loop** → $n$ times for every outer iteration

Therefore:
$$\text{Total operations} = n \times n = n^2$$

**Time Complexity** $= O(n^2)$

---

## Question 4: Explain the difference between polynomial and exponential running time.

### Answer

**Polynomial running time** means the running time grows as a polynomial function of input size $n$, such as $n$, $n^2$, or $n^3$.

**Exponential running time** means the running time grows exponentially with $n$, such as $2^n$ or $3^n$.

---

### Comparison Table

| Polynomial Time | Exponential Time |
| :--- | :--- |
| Growth is relatively slower | Growth is extremely fast |
| Examples: $O(n)$, $O(n^2)$, $O(n^3)$ | Examples: $O(2^n)$, $O(3^n)$ |
| Practical for large inputs | Usually impractical for large inputs |
| Used in many efficient algorithms | Often occurs in brute-force/complex problems |

---

### Example

- **Polynomial:** Searching through $n$ elements → **$O(n)$**
- **Exponential:** Generating all possible subsets of $n$ elements → **$O(2^n)$**

---

### Real-Life Example

For **100 students**, an $O(n^2)$ algorithm may require about **10,000 comparisons**, which can still be manageable. An $O(2^n)$ algorithm would require an enormously large number of operations.

---

**Conclusion:** Polynomial algorithms are generally preferred because they scale much better with increasing input size, while exponential algorithms become very slow even for moderately large inputs.

---

# Deterministic Algorithms

## Question 5: Write the concept of deterministic algorithms and mention their applications.

### Answer

A **deterministic algorithm** is an algorithm that produces the **same output for the same input every time**. It follows a fixed and predictable sequence of steps and does not depend on randomness.

---

### Example

If an algorithm adds two numbers:

```text
Input: 5, 3
Output: 8
```

For the same input, the output will always be **8**.

---

### Applications

1. **Searching** – Binary Search, Linear Search.
2. **Sorting** – Merge Sort, Bubble Sort.
3. **Database systems** – Retrieving records using fixed conditions.
4. **Banking systems** – Calculating balances and transactions.
5. **Compiler design** – Processing programs in a fixed sequence.

---

### Conclusion

Deterministic algorithms are useful when **predictable, repeatable, and accurate results** are required.

---

# Recursion

## Question 6: Interpret the working of recursion in problem-solving.

### Answer

Recursion is a problem-solving technique in which a function calls itself to solve a smaller version of the same problem. It continues until a base condition is reached.

---

### Working of Recursion

1. **Base Case:** Stops the recursion when the simplest case is reached.
2. **Recursive Case:** The function calls itself with a smaller input.
3. **Progress:** Each call moves the problem closer to the base case.
4. **Return:** After reaching the base case, the previous calls return their results one by one.

---

### Example: Factorial

```text
Factorial(n)
    if n = 0
        return 1
    else
        return n × Factorial(n - 1)
```

For **5!**:
$$5 \times 4 \times 3 \times 2 \times 1 = 120$$

The calls continue as:
$$\text{Factorial}(5) \longrightarrow \text{Factorial}(4) \longrightarrow \text{Factorial}(3) \longrightarrow \text{Factorial}(2) \longrightarrow \text{Factorial}(1) \longrightarrow \text{Factorial}(0)$$

Then the results return back to give **120**.

---

### Applications

1. Tree and graph traversal
2. Searching and sorting
3. Factorial and Fibonacci problems
4. Solving divide-and-conquer problems
5. Backtracking problems such as N-Queens

---

## Question 7: Explain the difference between recursive and non-recursive algorithms.

### Answer

| **Basis** | **Recursive Algorithm** | **Non-Recursive Algorithm** |
| :--- | :--- | :--- |
| **Meaning** | A function **calls itself** to solve the problem. | A function **does not call itself**. |
| **Method** | Usually uses recursive function calls. | Usually uses `for` or `while` loops. |
| **Memory** | Uses the **call stack** to store function calls. | Generally requires **less extra memory**. |
| **Execution** | Repeatedly calls the same function with a smaller input. | Repeats instructions using loops. |
| **Speed** | May have extra overhead due to function calls. | Usually has less function-call overhead. |
| **Risk** | Deep recursion can cause **stack overflow**. | Does not normally have recursion-related stack overflow. |
| **Best suited for** | Trees, graphs, divide-and-conquer, and backtracking. | Simple repetitive operations and iterative processing. |
| **Example** | Recursive Binary Search. | Loop-based Binary Search. |

---

### Example: Factorial

**Recursive:**
```text
Factorial(n)
    if n = 0
        return 1
    else
        return n × Factorial(n - 1)
```

**Non-Recursive:**
```text
Factorial(n)
    result ← 1

    for i ← 1 to n do
        result ← result × i

    return result
```

For **$n = 4$**:
$$\text{Both produce: } 4 \times 3 \times 2 \times 1 = 24$$

---

**Key Difference:**  
- **Recursive** = Function calls itself.  
- **Non-recursive** = Uses loops and direct iteration.

---

# Divide-and-Conquer

## Question 8: Explain the divide-and-conquer strategy used in solving problems.

### Answer

**Divide-and-Conquer** is a problem-solving technique in which a large problem is **divided into smaller problems**, each problem is solved separately, and their solutions are **combined** to get the final answer.

It follows three main steps:  
**Divide → Conquer → Combine**

---

### 1. Divide
The main problem is divided into **smaller subproblems** of the same type.

### 2. Conquer
Each smaller problem is solved. Usually, **recursion** is used to solve these subproblems.

### 3. Combine
The solutions of the smaller problems are **combined** to obtain the solution to the original problem.

---

### Simple Example: Merge Sort

Suppose we have:

```text
[8, 3, 5, 2]

       ↓ Divide

[8, 3]    [5, 2]

       ↓ Divide

[8] [3]   [5] [2]

       ↓ Conquer + Combine

[3, 8]    [2, 5]

       ↓ Combine

[2, 3, 5, 8]
```

Thus, Merge Sort divides the list into smaller parts, sorts them, and then combines them.

---

### Applications

- **Merge Sort** – Sorting data
- **Quick Sort** – Sorting data
- **Binary Search** – Searching data
- **Matrix Multiplication** – Solving large mathematical problems

---

### Advantages

1. Makes large problems easier to solve.
2. Reduces a complex problem into smaller problems.
3. Often gives efficient algorithms.
4. Works well with recursion.

---

### Visual Divide & Conquer Recursion Tree

![Divide and Conquer Strategy Architecture](assets/images/diagrams/recursion_tree_dac.svg)

---

## Question 9: Describe the steps of divide-and-conquer in Merge Sort.

### Answer

**DIVIDE**: Find $mid=\lfloor(l+r)/2\rfloor$. Split into `arr[l..mid]` and `arr[mid+1..r]`.

**CONQUER**: Recursively sort each half (base: size 1 already sorted).

**COMBINE**: Merge two sorted halves.

**Example `[38,27,43,3]`**:
```
DIVIDE:  [38,27,43,3] → [38,27][43,3] → [38][27][43][3]
COMBINE: [27,38] [3,43] → [3,27,38,43] ✓
```

**Recurrence**: $T(n)=2T(n/2)+\Theta(n)=\Theta(n\log n)$

---

### Visual Merge Sort Recursion Tree

![Merge Sort Divide and Conquer Tree](assets/images/diagrams/merge_sort_tree.svg)

---

# Dynamic Programming

## Question 10: Explain overlapping subproblems in Dynamic Programming.

### Answer

**Dynamic Programming (DP)** is an algorithmic paradigm that solves complex problems by breaking them down into smaller subproblems, solving each subproblem once, and storing their solutions in a table (memory) to avoid redundant computations.

A problem can be solved using Dynamic Programming if and only if it exhibits **two fundamental properties**:
1. **Optimal Substructure:** An optimal solution to the overall problem contains within it optimal solutions to its subproblems.
2. **Overlapping Subproblems:** The same subproblems are encountered and solved **multiple times** throughout the computation.

---

### What are Overlapping Subproblems?

When a recursive algorithm visits the same subproblems repeatedly instead of generating new, unique subproblems, the problem is said to have **overlapping subproblems**.

If we use naive recursion, the algorithm recalculates the exact same values exponentially many times. Dynamic Programming eliminates this redundancy by caching (memoizing) or tabulating the result of each subproblem after computing it once.

```text
                  Naive Recursive Tree for fib(5):
                                fib(5)
                              /        \
                        fib(4)          fib(3)  ← REPEATED!
                       /      \         /    \
                  fib(3)      fib(2)  fib(2) fib(1)
                 /      \     /    \
             fib(2)   fib(1)fib(1)fib(0)
             /    \
         fib(1)  fib(0)

Redundancy breakdown:
- fib(3) is evaluated 2 times
- fib(2) is evaluated 3 times
- fib(1) is evaluated 5 times
- fib(0) is evaluated 3 times
Total recursive calls = 15 (Exponential: O(2ⁿ))
```

With Dynamic Programming:
- `fib(2)` is calculated **once** and stored.
- `fib(3)` is calculated **once** and stored.
- Any future call directly looks up the answer in $O(1)$ time.
- Total operations reduce from $O(2^n)$ to **$O(n)$**.

---

### Visual Overlapping Subproblems & DP Table

![Dynamic Programming Overlapping Subproblems](assets/images/diagrams/dp_overlapping_subproblems.svg)

---

### Divide-and-Conquer vs Dynamic Programming

| Feature | Divide-and-Conquer | Dynamic Programming |
| :--- | :--- | :--- |
| **Nature of Subproblems** | **Disjoint** (independent, non-overlapping) | **Overlapping** (subproblems repeat frequently) |
| **Recomputation** | Solves each subproblem from scratch | Solves each subproblem once and stores the result |
| **Data Structure** | Call stack (recursion) | Memory table (1D/2D array or hash map) |
| **Typical Examples** | Merge Sort, Quick Sort, Binary Search | 0/1 Knapsack, Longest Common Subsequence, Fibonacci, Floyd-Warshall |

---

### Two Approaches to Dynamic Programming

```text
                  Dynamic Programming Approaches
                 /                             \
     Top-Down (Memoization)          Bottom-Up (Tabulation)
     - Recursive                     - Iterative
     - Starts from main problem      - Starts from smallest base cases
     - Solves only needed subproblems- Solves all subproblems systematically
```

#### 1. Top-Down Approach (Memoization)
Starts with the original problem and recursively breaks it down. If a subproblem has already been solved, its stored answer is returned immediately.

```python
# Python: Fibonacci with Memoization (Top-Down)
memo = {}

def fib_memo(n):
    if n in memo:
        return memo[n]  # Return cached answer in O(1)
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return memo[n]
```

#### 2. Bottom-Up Approach (Tabulation)
Avoids recursion completely. It initializes an array with base cases and iteratively builds solutions to larger subproblems until reaching the target.

```python
# Python: Fibonacci with Tabulation (Bottom-Up)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
```

```cpp
// C++: Fibonacci with Tabulation (Bottom-Up)
#include <iostream>
#include <vector>

int fibonacci(int n) {
    if (n <= 1) return n;
    std::vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

---

### Memoization vs Tabulation Comparison

| Parameter | Top-Down (Memoization) | Bottom-Up (Tabulation) |
| :--- | :--- | :--- |
| **Style** | Recursive + Cache lookup | Iterative table filling |
| **Subproblem Coverage** | Computes only required subproblems | Computes all subproblems up to $n$ |
| **Overhead** | Function call stack overhead; risk of recursion limit | No recursion overhead; faster execution |
| **State Transition** | Easy to conceptualize from recursive formula | Requires formulating an exact iterative loop order |

> [!TIP]
> **Exam Writing Tip:** When answering this question in an exam, always draw the recursive Fibonacci tree showing the repeated calls to `fib(3)` and `fib(2)`. Mention **Bellman's Principle of Optimality** and clearly contrast memoization with tabulation.

---

## Question 11: Explain the use of Dynamic Programming for solving TSP.

### Answer

The **Travelling Salesperson Problem (TSP)** asks:
> Given a list of $n$ cities and the distances between every pair of cities, find the shortest possible route that visits every city **exactly once** and returns to the origin city.

- **Input:** A complete weighted graph $G = (V, E)$ with distance matrix $C[i][j]$.
- **Brute-Force Complexity:** There are $(n-1)! / 2$ possible tours. For $n = 20$, $19! \approx 1.21 \times 10^{17}$ checks — computationally impossible ($O(n!)$).
- **DP Solution:** The **Held-Karp Algorithm** uses Dynamic Programming to reduce the time complexity from factorial $O(n!)$ to exponential $O(n^2 \cdot 2^n)$.

---

### State Representation in Held-Karp Algorithm

Let the cities be indexed $\{1, 2, 3, \dots, n\}$, and assume without loss of generality that the tour starts and ends at **city 1**.

Define the DP state:
$$\mathbf{C(S, i)}$$
- **$S \subseteq \{1, 2, \dots, n\}$**: A subset of cities that must be visited.
- **$i \in S$**: The ending city of this sub-path.
- **$C(S, i)$**: The minimum cost of a path that starts at city 1, visits all vertices in set $S$ exactly once, and terminates at vertex $i$.

---

### Recurrence Relation

1. **Base Case:**
   When the subset consists only of city 1 and city $i$:
   $$C(\{1, i\}, i) = \text{dist}(1, i) \quad \text{for every } i \neq 1$$

2. **Recursive Transition:**
   For a subset $S$ containing more than 2 vertices, to end at city $i$, the salesperson must have visited some city $j \in S \setminus \{i\}$ immediately before $i$:
   $$C(S, i) = \min_{j \in S, \, j \neq 1, \, j \neq i} \Big( C(S \setminus \{i\}, \, j) + \text{dist}(j, i) \Big)$$

3. **Optimal Tour Completion:**
   After visiting all cities in $V$, return to the start city 1:
   $$\text{Optimal Tour Cost} = \min_{i=2}^{n} \Big( C(V, i) + \text{dist}(i, 1) \Big)$$

---

### Visual 4-City TSP Graph & Optimal Tour

![TSP 4-City Graph Representation](assets/images/diagrams/tsp_graph_representation.svg)

---

### Step-by-Step 4-City Example

Consider 4 cities $\{1, 2, 3, 4\}$ with distance matrix:

$$\text{Distance Matrix } D = \begin{bmatrix}
0 & 10 & 15 & 20 \\
10 & 0 & 35 & 25 \\
15 & 35 & 0 & 30 \\
20 & 25 & 30 & 0
\end{bmatrix}$$

```text
Step 1: Subsets of size 2 (Direct from city 1):
C({1, 2}, 2) = dist(1, 2) = 10
C({1, 3}, 3) = dist(1, 3) = 15
C({1, 4}, 4) = dist(1, 4) = 20

Step 2: Subsets of size 3:
- For S = {1, 2, 3}:
  C({1, 2, 3}, 2) = C({1, 3}, 3) + dist(3, 2) = 15 + 35 = 50
  C({1, 2, 3}, 3) = C({1, 2}, 2) + dist(2, 3) = 10 + 35 = 45

- For S = {1, 2, 4}:
  C({1, 2, 4}, 2) = C({1, 4}, 4) + dist(4, 2) = 20 + 25 = 45
  C({1, 2, 4}, 4) = C({1, 2}, 2) + dist(2, 4) = 10 + 25 = 35

- For S = {1, 3, 4}:
  C({1, 3, 4}, 3) = C({1, 4}, 4) + dist(4, 3) = 20 + 30 = 50
  C({1, 3, 4}, 4) = C({1, 3}, 3) + dist(3, 4) = 15 + 30 = 45

Step 3: Subsets of size 4 (All cities visited):
- C({1, 2, 3, 4}, 2) = min( C({1, 3, 4}, 3)+dist(3, 2), C({1, 3, 4}, 4)+dist(4, 2) )
                     = min( 50 + 35, 45 + 25 ) = min(85, 70) = 70
- C({1, 2, 3, 4}, 3) = min( C({1, 2, 4}, 2)+dist(2, 3), C({1, 2, 4}, 4)+dist(4, 3) )
                     = min( 45 + 35, 35 + 30 ) = min(80, 65) = 65
- C({1, 2, 3, 4}, 4) = min( C({1, 2, 3}, 2)+dist(2, 4), C({1, 2, 3}, 3)+dist(3, 4) )
                     = min( 50 + 25, 45 + 30 ) = min(75, 75) = 75

Step 4: Return to city 1:
min {
  C({1,2,3,4}, 2) + dist(2, 1) = 70 + 10 = 80,
  C({1,2,3,4}, 3) + dist(3, 1) = 65 + 15 = 80,
  C({1,2,3,4}, 4) + dist(4, 1) = 75 + 20 = 95
}
Minimum Tour Cost = 80
Optimal Tour: 1 → 2 → 4 → 3 → 1 (or reverse: 1 → 3 → 4 → 2 → 1)
Cost: 10 + 25 + 30 + 15 = 80
```

---

### Complexity Analysis

| Metric | Held-Karp DP | Brute Force Search |
| :--- | :--- | :--- |
| **Time Complexity** | **$O(n^2 \cdot 2^n)$** | **$O(n!)$** |
| **Space Complexity** | **$O(n \cdot 2^n)$** | **$O(n)$** |
| **Feasibility** | Feasible for $n \le 20$ | Impractical for $n > 12$ |
| **Solution Quality** | Exact (Optimal) | Exact (Optimal) |

> [!NOTE]
> Even though $O(n^2 \cdot 2^n)$ is exponential, it is dramatically faster than $O(n!)$. For $n = 20$, $n! \approx 2.4 \times 10^{18}$, whereas $n^2 \cdot 2^n \approx 4.2 \times 10^8$, making computation practical on modern computers.

---

# Randomization

## Question 12: Define randomization in algorithm design.

### Answer

A **Randomized Algorithm** is an algorithm that incorporates a degree of randomness into its logic. It uses a random number generator during its execution to decide what step to take next.

Unlike a deterministic algorithm which always follows the identical sequence of steps for a given input, a randomized algorithm can follow different execution paths across multiple runs on the exact same input.

---

### Why Use Randomization?

1. **Avoid Worst-Case Traps:** Malicious or skewed inputs (like an already sorted list in QuickSort) cannot force the algorithm into worst-case runtime.
2. **Simplicity:** Randomized algorithms are frequently much easier to implement and require fewer complex data structures.
3. **Speed:** They often yield much faster expected runtimes than the best-known deterministic alternatives.
4. **Symmetry Breaking:** In distributed systems and networking, randomization breaks deadlocks and contention (e.g., Ethernet CSMA/CD exponential backoff).

---

### Classification of Randomized Algorithms

Randomized algorithms are broadly classified into two categories based on how randomness affects their correctness and runtime:

```text
               Randomized Algorithms
              /                     \
       Las Vegas                      Monte Carlo
   - Output: ALWAYS CORRECT       - Output: CORRECT WITH HIGH PROBABILITY
   - Runtime: RANDOM VARIABLE     - Runtime: DETERMINISTIC & FAST
```

#### Detailed Comparison: Las Vegas vs Monte Carlo

| Feature | Las Vegas Algorithm | Monte Carlo Algorithm |
| :--- | :--- | :--- |
| **Correctness** | Guaranteed **100% correct** result | May occasionally produce an incorrect answer |
| **Running Time** | Random variable (varies from run to run) | Deterministic (guaranteed upper bound on time) |
| **Failure Mode** | Takes longer in rare unlucky cases | Produces wrong answer with small bounded error $\le \epsilon$ |
| **Error Reduction** | Not needed (never produces incorrect answer) | Run $k$ independent trials to reduce error to $\epsilon^k$ |
| **Classic Examples** | **Randomized QuickSort**, Randomized Selection | **Miller-Rabin Primality Test**, Karger's Min-Cut |

---

### Example: Randomized QuickSort (Las Vegas)

Standard QuickSort has a worst-case time complexity of $O(n^2)$ if the pivot is chosen deterministically (e.g., always the first or last element) on sorted input.

**Randomized approach:**
Pick a random index $k \in [\text{low}, \text{high}]$, swap `arr[k]` with `arr[high]`, and proceed with standard partitioning.

```python
import random

def randomized_partition(arr, low, high):
    rand_idx = random.randint(low, high)
    arr[rand_idx], arr[high] = arr[high], arr[rand_idx]  # Swap random element to pivot
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def randomized_quicksort(arr, low, high):
    if low < high:
        pi = randomized_partition(arr, low, high)
        randomized_quicksort(arr, low, pi - 1)
        randomized_quicksort(arr, pi + 1, high)
```

- **Worst-case Time:** Still $O(n^2)$, but occurs with probability $\approx 0$.
- **Expected Time:** **$O(n\log n)$** on **every single input**, regardless of initial order.

---

# Optimization Problems

## Question 13: Summarize the Assignment Problem and the Knapsack Problem.

### Answer

Both the **Assignment Problem** and the **Knapsack Problem** are fundamental combinatorial optimization problems widely studied in computer science and operations research.

---

### Part 1: The Assignment Problem

#### Problem Statement
Given $n$ agents (workers) and $n$ tasks (jobs), with a cost matrix $C$ where $C[i][j]$ represents the cost of assigning agent $i$ to task $j$:
- Assign **each agent to exactly one task**, and
- Assign **each task to exactly one agent**, such that
- The **total assignment cost is minimized**.

$$\min \sum_{i=1}^n \sum_{j=1}^n C[i][j] \cdot x_{ij} \quad \text{subject to } \sum_{j=1}^n x_{ij} = 1, \; \sum_{i=1}^n x_{ij} = 1, \; x_{ij} \in \{0, 1\}$$

#### Solution Approaches
- **Brute Force:** Try all permutations of job assignments $\implies n!$ possibilities ($O(n!)$) — impractical for $n > 12$.
- **Hungarian Method (Kuhn-Munkres Algorithm):** An optimal combinatorial algorithm based on bipartite matching:
  - Time Complexity: **$O(n^3)$**.
  - Relies on reducing rows and columns by subtracting minima, finding the minimum lines to cover all zeros, and augmenting paths.

---

### Part 2: The Knapsack Problem

Given $n$ items, where each item $i$ has weight $w_i$ and value $v_i$, and a knapsack with maximum weight capacity $W$:
Determine the collection of items to pack such that total weight $\le W$ and total value is maximized.

There are two major variations:

#### Comparison: 0/1 Knapsack vs Fractional Knapsack

| Characteristic | 0/1 Knapsack Problem | Fractional Knapsack Problem |
| :--- | :--- | :--- |
| **Item Division** | Items are indivisible: take whole item ($x_i = 1$) or leave it ($x_i = 0$) | Items can be divided: take fraction $x_i \in [0, 1]$ |
| **Solving Paradigm** | **Dynamic Programming** or Branch & Bound | **Greedy Strategy** |
| **Optimal Substructure** | Yes | Yes |
| **Greedy Choice Property** | **Fails** (Greedy does NOT guarantee optimal solution) | **Holds** (Greedy guarantees optimal solution) |
| **Time Complexity** | **$O(n \cdot W)$** (Pseudo-polynomial via DP) | **$O(n\log n)$** (Dominated by sorting) |
| **NP-Completeness** | **NP-Complete** | Belongs to **P** |

---

### 0/1 Knapsack: Dynamic Programming Formulation

Let $DP[i][w]$ represent the maximum value attainable using a subset of the first $i$ items with weight capacity limit $w$:

$$DP[i][w] = \begin{cases}
DP[i-1][w] & \text{if } w_i > w \quad (\text{item too heavy}) \\
\max\Big( DP[i-1][w], \; v_i + DP[i-1][w - w_i] \Big) & \text{if } w_i \le w \quad (\text{choose max of skip vs include})
\end{cases}$$

#### Step-by-Step Worked DP Table Example
Given items:
- Item 1: Weight = 2, Value = ₹12
- Item 2: Weight = 1, Value = ₹10
- Item 3: Weight = 3, Value = ₹20
- Knapsack Capacity $W = 5$

**DP Matrix Computation:**

| $i \backslash w$ | $w = 0$ | $w = 1$ | $w = 2$ | $w = 3$ | $w = 4$ | $w = 5$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$i = 0$ (No items)** | 0 | 0 | 0 | 0 | 0 | 0 |
| **$i = 1$ ($w_1=2, v_1=12$)** | 0 | 0 | 12 | 12 | 12 | 12 |
| **$i = 2$ ($w_2=1, v_2=10$)** | 0 | 10 | 12 | 22 | 22 | 22 |
| **$i = 3$ ($w_3=3, v_3=20$)** | 0 | 10 | 12 | 22 | 30 | **32** |

- At $i=3, w=5$: $\max(DP[2][5], 20 + DP[2][5-3]) = \max(22, 20 + 12) = \mathbf{32}$.
- **Optimal Maximum Value = ₹32** (Selecting Item 1 + Item 2 + Item 3: weights $2 + 1 + 3 = 6 > 5 \implies$ select Item 1 ($w=2$) + Item 3 ($w=3$), weight = 5, value = $12 + 20 = 32$).

```python
# Python 0/1 Knapsack Dynamic Programming
def knapsack_01(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]
```

> [!TIP]
> **Key Exam Takeaway:** Always highlight that **Fractional Knapsack** is solved using a **Greedy method** (sorting items in descending order of value-to-weight ratio $v_i/w_i$), while **0/1 Knapsack** requires **Dynamic Programming** because greedy choices can leave suboptimal empty space in the knapsack.

---

# PART B — SORTING

---

# Insertion Sort

## Question 14: Explain the working of Insertion Sort with a suitable example.

### Answer

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]  # Shift right
            j -= 1
        arr[j+1] = key         # Insert key
```

#### Example: `[12, 11, 13, 5, 6]`

| Pass | Key | Array State |
| :--- | :--- | :--- |
| Initial | — | `[12, 11, 13, 5, 6]` |
| Pass 1 | 11 | `[11, 12, 13, 5, 6]` |
| Pass 2 | 13 | `[11, 12, 13, 5, 6]` (no shift) |
| Pass 3 | 5 | `[5, 11, 12, 13, 6]` |
| Pass 4 | 6 | `[5, 6, 11, 12, 13]` ✓ |

---

### Visual Step-by-Step Execution Trace

![Insertion Sort Step-by-Step Execution Trace](assets/images/diagrams/insertion_sort_trace.svg)

---

# Selection Sort

## Question 15: Explain the working of Selection Sort with a suitable example.

### Answer

**Selection Sort** repeatedly finds the **minimum** from the unsorted portion and places it at the beginning.

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n-1):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]: min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
```

#### Example: `[64, 25, 12, 22, 11]`

| Pass | Min | Array After |
| :--- | :--- | :--- |
| 1 | 11 (idx 4) | `[11, 25, 12, 22, 64]` |
| 2 | 12 (idx 2) | `[11, 12, 25, 22, 64]` |
| 3 | 22 (idx 3) | `[11, 12, 22, 25, 64]` |
| 4 | 25 (idx 3) | `[11, 12, 22, 25, 64]` ✓ |

**Total comparisons**: $n(n-1)/2=10$ (same regardless of input) | **Time**: $O(n^2)$ | **Stable**: ❌

---

### Visual Step-by-Step Execution Trace

![Selection Sort Step-by-Step Execution Trace](assets/images/diagrams/selection_sort_trace.svg)

---

# Bubble Sort

## Question 16: Arrange {25, 12, 9, 30, 18} using Bubble Sort. Illustrate each pass and calculate total comparisons.

### Answer

**Pass 1** (4 comparisons — largest element 30 bubbles to end):
```
[25,12,9,30,18]: 25>12→swap, 25>9→swap, 25<30→no, 30>18→swap
→ [12, 9, 25, 18, 30]
```

**Pass 2** (3 comparisons):
```
[12,9,25,18,30]: 12>9→swap, 12<25→no, 25>18→swap
→ [9, 12, 18, 25, 30]
```

**Pass 3** (2 comparisons — no swaps → early termination):
```
[9,12,18,25,30]: 9<12→no, 12<18→no
→ [9, 12, 18, 25, 30] ✓
```

| Pass | Comparisons | Array After |
| :--- | :--- | :--- |
| 1 | 4 | `[12, 9, 25, 18, 30]` |
| 2 | 3 | `[9, 12, 18, 25, 30]` |
| 3 | 2 | `[9, 12, 18, 25, 30]` ✓ |

**Total Comparisons = 9** | **Sorted**: `[9, 12, 18, 25, 30]` ✓

---

### Visual Pass-by-Pass Execution Trace

![Bubble Sort Pass-by-Pass Execution Trace](assets/images/diagrams/bubble_sort_trace.svg)

---

# Merge Sort

## Question 17: Explain the working of Merge Sort with a suitable example and analyze its complexity.

### Answer

### Video Explanations 🎥

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/eGO_FMca7mk?si=ZJS91f3EhsrsH9vG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/WYrMGRJ9qFE?si=544nYN4vosTUpIqo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

---

# Quick Sort

## Question 18: Explain the partitioning process of Quick Sort with a suitable example.

### Answer

### Video Explanations 🎥

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/K_qoLz6Fv7M?si=E0TR7_FFPwpRr_Q6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/NmpJG94mNNY?si=CtbZrL-N6DU6JcFr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/uf_DyA_Ku7A?si=ueq76_egvGQX9-uN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

---

# Heap Sort

## Question 19: Explain the working of Heap Sort and its time complexity.

### Answer

**Heap Sort** is a comparison-based sorting algorithm that operates by leveraging the properties of a **Binary Heap** data structure. It divides the array into a sorted and an unsorted region, iteratively extracting the largest element from a **Max-Heap** and placing it into its correct position at the end of the array.

---

### What is a Binary Heap?

A **Binary Heap** is a complete binary tree that satisfies the **Heap Property**:
- **Complete Binary Tree:** Every level is completely filled, except possibly the last level, which is filled from left to right.
- **Max-Heap Property:** For every node $i$ (other than the root), the value of the node is less than or equal to the value of its parent:
  $$\mathbf{A[\text{parent}(i)] \ge A[i]}$$
  Therefore, the **maximum element is always located at the root**.

```text
                  Max-Heap Tree Concept:
                            [13]              ← Root (Maximum)
                           /    \
                        [11]    [12]          ← Children ≤ Parent
                        /  \    /
                      [5]  [6] [7]
```

#### Array Representation (0-indexed)
For any element at index $i$:
- **Parent:** $\lfloor(i - 1) / 2\rfloor$
- **Left Child:** $2i + 1$
- **Right Child:** $2i + 2$
- **Last Non-Leaf Node:** $\lfloor n / 2 \rfloor - 1$

---

### Visual Binary Max-Heap & Array Index Representation

![Heap Sort Binary Max-Heap Tree Structure](assets/images/diagrams/heap_sort_structure.svg)

---

### The Two Main Phases of Heap Sort

```text
                   Heap Sort Process
                  /                 \
        Phase 1: Build Max-Heap      Phase 2: Extract & Sort
        - Transform array into heap  - Swap root (max) with end
        - Takes O(n) time            - Reduce heap size by 1
                                     - Heapify root (O(log n))
                                     - Repeat n - 1 times → O(n log n)
```

#### 1. Phase 1: Build Max-Heap ($O(n)$)
- Elements from index $\lfloor n/2 \rfloor$ to $n-1$ are leaves (already valid trivial heaps of size 1).
- We start from the last non-leaf node ($\lfloor n/2 \rfloor - 1$) and work backward to index $0$, calling `Heapify` on each node to sift it down to its correct position.

#### 2. Phase 2: Extract Maximum & Sort ($O(n\log n)$)
1. The largest element in the current heap is always at the root (`A[0]`).
2. Swap `A[0]` with the last element of the heap (`A[size - 1]`).
3. Decrease the heap size by 1 (the extracted maximum is now permanently sorted at the end).
4. Call `Heapify(A, size, 0)` on the root to restore the Max-Heap property.
5. Repeat until the heap size is reduced to 1.

---

### Step-by-Step Worked Example

Consider the array:
$$\mathbf{A = [12, 11, 13, 5, 6, 7]} \quad (n = 6)$$

#### Part A: Building the Max-Heap
Last non-leaf index = $\lfloor 6 / 2 \rfloor - 1 = \mathbf{2}$.
We heapify nodes at indices $2, 1, 0$:

1. **Heapify at index 2 ($A[2] = 13$):**
   - Left child = $2(2) + 1 = 5$ ($A[5] = 7$).
   - $13 > 7 \implies$ No change.
   - Array: `[12, 11, 13, 5, 6, 7]`

2. **Heapify at index 1 ($A[1] = 11$):**
   - Left child = $3$ ($A[3] = 5$), Right child = $4$ ($A[4] = 6$).
   - $11 > 5$ and $11 > 6 \implies$ No change.
   - Array: `[12, 11, 13, 5, 6, 7]`

3. **Heapify at index 0 ($A[0] = 12$):**
   - Left child = $1$ ($A[1] = 11$), Right child = $2$ ($A[2] = 13$).
   - Largest among $\{12, 11, 13\}$ is $13$ at index 2.
   - Swap $A[0]$ and $A[2]$.
   - Recurse on index 2: $A[2]=12$, child $A[5]=7$. Since $12 > 7$, valid.
   - **Max-Heap Built:** $\mathbf{[13, 11, 12, 5, 6, 7]}$

---

#### Part B: Extraction and Sorting

| Pass | Current Heap | Action | Array State |
| :---: | :--- | :--- | :--- |
| **Initial** | `[13, 11, 12, 5, 6, 7]` | Heap ready (size = 6) | `[13, 11, 12, 5, 6, 7]` |
| **Pass 1** | Root = `13` | Swap $A[0] \leftrightarrow A[5]$ (13 placed at end). Heapify root `7`. | `[12, 11, 7, 5, 6 | 13]` |
| **Pass 2** | Root = `12` | Swap $A[0] \leftrightarrow A[4]$ (12 placed). Heapify root `6`. | `[11, 6, 7, 5 | 12, 13]` |
| **Pass 3** | Root = `11` | Swap $A[0] \leftrightarrow A[3]$ (11 placed). Heapify root `5`. | `[7, 6, 5 | 11, 12, 13]` |
| **Pass 4** | Root = `7` | Swap $A[0] \leftrightarrow A[2]$ (7 placed). Heapify root `5`. | `[6, 5 | 7, 11, 12, 13]` |
| **Pass 5** | Root = `6` | Swap $A[0] \leftrightarrow A[1]$ (6 placed). Heap size = 1 $\implies$ stop. | `[5 | 6, 7, 11, 12, 13]` |

**Final Sorted Array:**
$$\mathbf{[5, 6, 7, 11, 12, 13]} \quad \checkmark$$

---

### Algorithm & Pseudocode

```text
Algorithm HeapSort(A, n)
    // Step 1: Build max heap (rearrange array)
    for i ← floor(n / 2) - 1 down to 0 do
        Heapify(A, n, i)

    // Step 2: One by one extract an element from heap
    for i ← n - 1 down to 1 do
        // Move current root to end
        swap(A[0], A[i])

        // Call max heapify on the reduced heap
        Heapify(A, i, 0)

Algorithm Heapify(A, n, i)
    largest ← i
    left ← 2 * i + 1
    right ← 2 * i + 2

    // If left child is larger than root
    if left < n and A[left] > A[largest] then
        largest ← left

    // If right child is larger than largest so far
    if right < n and A[right] > A[largest] then
        largest ← right

    // If largest is not root
    if largest ≠ i then
        swap(A[i], A[largest])
        // Recursively heapify the affected subtree
        Heapify(A, n, largest)
```

---

### Complexity Analysis

#### 1. Time Complexity

- **Building the Max-Heap:**  
  Although an intuitive upper bound is $O(n\log n)$, a tight mathematical analysis shows that building the heap takes **$O(n)$** time:
  $$\sum_{h=0}^{\lfloor\log n\rfloor} \left\lceil \frac{n}{2^{h+1}} \right\rceil O(h) = O\left(n \sum_{h=0}^\infty \frac{h}{2^h}\right) = \mathbf{O(n)}$$
- **Extraction & Heapify:**  
  There are $n - 1$ extractions. In each extraction, calling `Heapify` on a tree of height $\le \log n$ takes $O(\log n)$ time.
  $$\text{Time} = (n - 1) \times O(\log n) = \mathbf{O(n\log n)}$$
- **Total Time Complexity:**
  $$T(n) = O(n) + O(n\log n) = \mathbf{O(n\log n)}$$

| Case | Time Complexity | Justification |
| :--- | :---: | :--- |
| **Best Case** | $\mathbf{\Theta(n\log n)}$ | Must still build heap and extract all elements |
| **Average Case** | $\mathbf{\Theta(n\log n)}$ | Random permutations |
| **Worst Case** | $\mathbf{\Theta(n\log n)}$ | All elements distinct, even reverse sorted |

#### 2. Space Complexity
- Heap Sort operates directly within the input array by maintaining boundary pointers.
- It requires only $O(1)$ additional variables for swaps and indices.
- **Space Complexity:** $\mathbf{O(1)}$ (In-place sorting algorithm).

#### 3. Stability
- **Not Stable** ❌: Swapping elements between the root and the end of the array can change the relative order of identical keys across large distances.

---

### Comparison: Heap Sort vs Quick Sort vs Merge Sort

| Feature | Heap Sort | Quick Sort | Merge Sort |
| :--- | :--- | :--- | :--- |
| **Worst-Case Time** | $\mathbf{O(n\log n)}$ | $O(n^2)$ | $\mathbf{O(n\log n)}$ |
| **Average Time** | $\mathbf{O(n\log n)}$ | $\mathbf{O(n\log n)}$ | $\mathbf{O(n\log n)}$ |
| **Best-Case Time** | $\mathbf{O(n\log n)}$ | $\mathbf{O(n\log n)}$ | $\mathbf{O(n\log n)}$ |
| **Auxiliary Space** | $\mathbf{O(1)}$ (In-place) | $O(\log n)$ (Stack) | $O(n)$ (Aux array) |
| **Stable?** | ❌ No | ❌ No | ✅ Yes |
| **Worst-Case Guarantee?** | ✅ **Guaranteed optimal** | ❌ Can degrade to $O(n^2)$ | ✅ Guaranteed optimal |

> [!TIP]
> **Key Exam Advantage:** Heap Sort is the **only comparison-based sorting algorithm** that achieves both an optimal worst-case running time of $\mathbf{O(n\log n)}$ **AND** strictly $\mathbf{O(1)}$ auxiliary space.

---

# Radix Sort

## Question 20: Explain Radix Sort with a suitable example and analyze its complexity.

### Answer

**Radix Sort** is a **non-comparative integer sorting algorithm** that sorts numbers by processing individual digits. It sorts the array digit by digit, typically starting from the **Least Significant Digit (LSD)** to the **Most Significant Digit (MSD)**.

Instead of comparing elements directly (like Quick Sort or Merge Sort), Radix Sort groups elements into buckets according to each digit's value using an underlying **stable sorting algorithm** (usually **Counting Sort**).

---

### Key Properties

| Property | Value | Explanation |
| :--- | :--- | :--- |
| **Type** | Non-comparative | Does not compare elements directly ($A[i] < A[j]$) |
| **Stability** | **Stable** ✅ | Preserves relative order of elements with equal keys (mandatory) |
| **In-place** | **No** ❌ | Requires $O(n + k)$ auxiliary space for intermediate counting sort |
| **Lower Bound** | **Breaks $\Omega(n\log n)$** | Can achieve linear time $O(n)$ when $d = O(1)$ |

---

### Working Principle & Algorithm

Radix Sort operates in passes equal to the number of digits ($d$) in the maximum number:

1. **Find Maximum:** Find the maximum element in the array to determine the total number of digits $d$.
2. **Initialize Radix:** Set `exp = 1` (representing units place: $10^0$).
3. **Iterate Digit by Digit:**
   - For each place value (`exp = 1, 10, 100, ...` up to $\lfloor\text{max} / \text{exp}\rfloor > 0$):
     - Perform a **stable Counting Sort** on the array based on the current digit:
       $$\text{digit} = \Big\lfloor \frac{A[i]}{\text{exp}} \Big\rfloor \pmod{10}$$
   - Multiply `exp` by 10 for the next place value.
4. **Completion:** After $d$ passes, the array is completely sorted.

> [!IMPORTANT]
> **Why Must the Sub-Sort be Stable?**  
> Stability is **critical** for Radix Sort. When sorting by a higher digit (e.g., tens), elements that have identical tens digits must remain in the relative order established by the previous pass (units digit). If the sub-sort is not stable, the correctness of previous passes is destroyed!

---

### Step-by-Step Worked Example

Consider sorting the array:

$$\mathbf{A = [170, 45, 75, 90, 802, 24, 2, 66]}$$

- **Maximum element:** $802 \implies 3\text{ digits } (d = 3)$.
- **Padded elements (3 digits):** `[170, 045, 075, 090, 802, 024, 002, 066]`

---

### Visual Multi-Pass LSD Digit Sorting Trace

![Radix Sort Multi-Pass LSD Execution Trace](assets/images/diagrams/radix_sort_buckets.svg)

---

#### Pass 1: Sort by Units Digit ($\text{exp} = 1$)

Extract the units digit of each element:
- $17\mathbf{0} \to 0$
- $04\mathbf{5} \to 5$
- $07\mathbf{5} \to 5$
- $09\mathbf{0} \to 0$
- $80\mathbf{2} \to 2$
- $02\mathbf{4} \to 4$
- $00\mathbf{2} \to 2$
- $06\mathbf{6} \to 6$

Group into digit buckets ($0$ to $9$) maintaining original arrival order:

| Digit | Elements Collected (Stable) |
| :---: | :--- |
| **0** | `170`, `090` |
| **1** | — |
| **2** | `802`, `002` |
| **3** | — |
| **4** | `024` |
| **5** | `045`, `075` |
| **6** | `066` |
| **7–9** | — |

**Array after Pass 1:**
$$\mathbf{[170, 90, 802, 2, 24, 45, 75, 66]}$$

---

#### Pass 2: Sort by Tens Digit ($\text{exp} = 10$)

Extract the tens digit from the array of Pass 1:
- $1\mathbf{7}0 \to 7$
- $0\mathbf{9}0 \to 9$
- $8\mathbf{0}2 \to 0$
- $0\mathbf{0}2 \to 0$
- $0\mathbf{2}4 \to 2$
- $0\mathbf{4}5 \to 4$
- $0\mathbf{7}5 \to 7$
- $0\mathbf{6}6 \to 6$

Group into digit buckets stably:

| Digit | Elements Collected (Stable) |
| :---: | :--- |
| **0** | `802`, `2` *(preserves units order: 802 came before 2)* |
| **1** | — |
| **2** | `24` |
| **3** | — |
| **4** | `45` |
| **5** | — |
| **6** | `66` |
| **7** | `170`, `75` *(170 came before 75 in Pass 1, order preserved)* |
| **8** | — |
| **9** | `90` |

**Array after Pass 2:**
$$\mathbf{[802, 2, 24, 45, 66, 170, 75, 90]}$$

---

#### Pass 3: Sort by Hundreds Digit ($\text{exp} = 100$)

Extract the hundreds digit from the array of Pass 2:
- $\mathbf{8}02 \to 8$
- $\mathbf{0}02 \to 0$
- $\mathbf{0}24 \to 0$
- $\mathbf{0}45 \to 0$
- $\mathbf{0}66 \to 0$
- $\mathbf{1}70 \to 1$
- $\mathbf{0}75 \to 0$
- $\mathbf{0}90 \to 0$

Group into digit buckets stably:

| Digit | Elements Collected (Stable) |
| :---: | :--- |
| **0** | `2`, `24`, `45`, `66`, `75`, `90` *(fully ordered from Pass 2!)* |
| **1** | `170` |
| **2–7**| — |
| **8** | `802` |
| **9** | — |

**Array after Pass 3 (Final Sorted Array):**
$$\mathbf{[2, 24, 45, 66, 75, 90, 170, 802]} \quad \checkmark$$

---

### Pseudocode

```text
Algorithm RadixSort(A, n)
    // Step 1: Find the maximum number to determine digit count
    max_val ← find_max(A, n)

    // Step 2: Do counting sort for every digit position (exp = 1, 10, 100, ...)
    for exp ← 1 to (max_val / exp > 0) step exp ← exp * 10 do
        CountingSortByDigit(A, n, exp)

Algorithm CountingSortByDigit(A, n, exp)
    output[0 ... n - 1]
    count[0 ... 9] ← 0

    // Count occurrences of each digit
    for i ← 0 to n - 1 do
        digit ← (A[i] / exp) mod 10
        count[digit] ← count[digit] + 1

    // Cumulative count for stable positioning
    for i ← 1 to 9 do
        count[i] ← count[i] + count[i - 1]

    // Build the output array from right to left (preserves stability!)
    for i ← n - 1 down to 0 do
        digit ← (A[i] / exp) mod 10
        output[count[digit] - 1] ← A[i]
        count[digit] ← count[digit] - 1

    // Copy output array back to A
    for i ← 0 to n - 1 do
        A[i] ← output[i]
```

---

### Complexity Analysis

Let:
- $n$ = Number of elements in the array
- $d$ = Number of digits in the maximum element ($d = \lfloor\log_b(\text{max})\rfloor + 1$)
- $b$ = Base (radix) of the number system (for decimal numbers, $b = 10$)

#### 1. Time Complexity
- Each pass uses Counting Sort which runs in $O(n + b)$ time.
- The total number of passes is $d$.
- Therefore:
  $$\text{Total Time} = d \times O(n + b) = \mathbf{O(d \cdot (n + b))}$$

| Case | Time Complexity | Condition |
| :--- | :---: | :--- |
| **Best Case** | $\mathbf{O(d \cdot (n + b))}$ | Same running time regardless of initial order |
| **Average Case** | $\mathbf{O(d \cdot (n + b))}$ | Uniformly distributed digit values |
| **Worst Case** | $\mathbf{O(d \cdot (n + b))}$ | Even if the array is reverse sorted |

> [!TIP]
> **Linear Time Condition ($O(n)$):**  
> If the maximum number of digits $d$ is a constant independent of $n$ (e.g., 3-digit registration numbers or fixed-length 32-bit integers), and the base $b = 10 = O(1)$, then:
> $$T(n) = O(1 \cdot (n + 10)) = \mathbf{O(n)}$$
> This makes Radix Sort **faster than comparison-based sorting algorithms** ($O(n\log n)$ like Merge Sort and Quick Sort).

#### 2. Space Complexity
- Counting sort requires an `output` array of size $n$ and a `count` array of size $b$.
- **Space Complexity:** $\mathbf{O(n + b)}$ auxiliary memory.
- Therefore, Radix Sort is **not an in-place sort**.

---

### Advantages & Disadvantages

| Advantages | Disadvantages |
| :--- | :--- |
| ✅ Can achieve **linear time complexity $O(n)$** when digits $d$ are bounded. | ❌ Requires **extra auxiliary memory** ($O(n + b)$); not in-place. |
| ✅ **Stable** sorting algorithm. | ❌ Slower than QuickSort when elements have very large numbers of digits ($d$ large). |
| ✅ Excellent for sorting fixed-length integers, dates, and fixed-size strings. | ❌ Not practical for variable-length arbitrary floating-point numbers. |

---

# PART B — SEARCHING

---

# Linear Search

## Question 21: Explain the working of Linear Search and its time complexity.

### Answer

Linear Search is a simple searching technique in which each element of an array is checked one by one from the beginning until the required element is found or the end of the array is reached.

---

### Working

1. Start from the first element of the array.
2. Compare the current element with the search element.
3. If both are equal, the element is found.
4. If they are not equal, move to the next element.
5. Repeat the process until the element is found or all elements are checked.

---

### Example

Consider the array:

`[10, 25, 30, 45, 50]`

Search for **45**:
$$10 \longrightarrow 25 \longrightarrow 30 \longrightarrow 45 \quad (\text{Match!})$$

Since 45 matches the required element, it is found at position 4.

---

### Visual Sequential Scanning Trace

![Linear Search Step-by-Step Sequential Scanning](assets/images/diagrams/linear_search_trace.svg)

---

### Algorithm

```text
LinearSearch(A, n, key)
    for i = 0 to n - 1
        if A[i] == key
            return i
    return -1
```

---

### Time Complexity

- **Best Case:** $O(1)$ — element is found at the first position.
- **Average Case:** $O(n)$
- **Worst Case:** $O(n)$ — element is at the last position or not present.
- **Space Complexity:** $O(1)$

---

### Video Explanation 🎥

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/9J5OTuk2_CI?si=uM3WH01TAuxTfK5Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

---

# Binary Search

## Question 22: Explain the suitability of Binary Search over Linear Search for large ordered datasets.

### Answer

Binary Search is more suitable than Linear Search for large ordered (sorted) datasets because it eliminates half of the search space after every comparison, while Linear Search checks elements one by one.

---

### Feature Comparison

| Feature | Linear Search | Binary Search |
| :--- | :--- | :--- |
| **Data requirement** | Can be sorted or unsorted | Must be sorted |
| **Searching method** | Checks one by one | Divides into two halves |
| **Worst-case time** | $O(n)$ | $O(\log n)$ |
| **Number of comparisons** | More | Much fewer |
| **Suitability for large sorted data** | Less suitable | Highly suitable |

---

### Example

For **1,000,000 sorted elements**:
- **Linear Search:** May require up to **1,000,000 comparisons**.
- **Binary Search:** Requires only about **20 comparisons** ($\log_2(1,000,000) \approx 20$) because the search space is halved each time.

---

### Video Explanation 🎥

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/gJvhiR7Yi6Q?si=ZButVceoNteIhTOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

---

## Question 23: Explain the working of Binary Search with a suitable example.

### Answer

Binary Search is a searching technique used to find an element in a sorted array by repeatedly dividing the search range into two halves.

---

### Working

1. Set two positions: `low` at the beginning and `high` at the end of the array.
2. Find the middle position:
   $$\text{mid} = \frac{\text{low} + \text{high}}{2}$$
3. Compare the middle element with the required element:
   - If both are equal, the element is found.
   - If the required element is smaller, search in the left half (`high = mid - 1`).
   - If the required element is larger, search in the right half (`low = mid + 1`).
4. Repeat the process until the element is found or `low > high`.

---

### Example

Consider the sorted array:

`[10, 20, 30, 40, 50, 60, 70]`

Search for **60**:

| Step | Search Range | Middle | Result |
| :---: | :--- | :---: | :--- |
| **1** | `10, 20, 30, 40, 50, 60, 70` | 40 | $60 > 40 \implies$ Search in right half |
| **2** | `50, 60, 70` | 60 | $60 = 60 \implies$ **Found** ✓ |

Thus, **60** is found at position 6.

---

### Visual Divide & Conquer Range Halving Trace

![Binary Search Range Halving Trace](assets/images/diagrams/binary_search_range_split.svg)

---

### Algorithm

```text
BinarySearch(A, key)
    low = 0
    high = n - 1

    while low <= high
        mid = (low + high) / 2

        if A[mid] == key
            return mid
        else if key < A[mid]
            high = mid - 1
        else
            low = mid + 1

    return -1
```

---

### Time Complexity

- **Best Case:** $O(1)$
- **Average Case:** $O(\log n)$
- **Worst Case:** $O(\log n)$
- **Space Complexity:** $O(1)$

---

### Video Explanation 🎥

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/81QLBCW94Oo?si=rSsjVxDidI-ufJRf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

---

# Brute Force

## Question 25: Compare brute-force, greedy and DP for solving TSP.

### Answer

**Travelling Salesman Problem (TSP)** is the problem of finding the **minimum-cost tour** that visits every city exactly once and returns to the starting city.

### 1. Brute-Force

Brute-Force **checks all possible tours** and selects the tour with minimum cost.

- Always gives the **optimal solution**.
- Very slow for large numbers of cities.
- **Time Complexity:** `O(n!)`

### 2. Greedy

Greedy selects the **nearest or cheapest unvisited city** at every step.

- Fast and simple.
- Does **not always give the optimal solution**.
- **Time Complexity:** `O(n²)`

### 3. Dynamic Programming

DP divides TSP into **smaller subproblems**, stores their results, and reuses them to find the optimal tour.

- Gives the **optimal solution**.
- Uses more memory than Greedy.
- **Time Complexity:** `O(n² × 2ⁿ)`

### Comparison

| Feature | Brute-Force | Greedy | DP |
|---|---|---|---|
| Approach | Try all tours | Best choice at each step | Store subproblem results |
| Optimal | ✅ Yes | ❌ Not always | ✅ Yes |
| Time | `O(n!)` | `O(n²)` | `O(n²2ⁿ)` |
| Speed | Slow | Fast | Moderate |
| Memory | Low | Low | High |

---

# Brute-Force String Matching


## Question 27: Explain brute-force string matching and its time complexity.

### Answer

Brute-force string matching is a simple string-searching technique in which a pattern is compared with the text at every possible position until the pattern is found or all positions are checked.

---

### Working

Let:
- **Text ($T$):** `ABABCABC`
- **Pattern ($P$):** `ABC`

The algorithm compares the pattern with the text from left to right:

```text
Text:     A B A B C A B C
Pattern:  A B C
          ✗

Text:     A B A B C A B C
Pattern:    A B C
            ✗

Text:     A B A B C A B C
Pattern:      A B C
              ✓
```

The pattern is found starting at position 3 (0-indexed position 2).

---

### Visual Sliding Window Execution Trace

![Brute-Force String Matching Sliding Window Trace](assets/images/diagrams/string_matching_trace.svg)

---

### Algorithm

1. Start from the first position of the text.
2. Compare the pattern with the text character by character.
3. If all characters match, the pattern is found.
4. If a mismatch occurs, shift the pattern by one position.
5. Repeat until the pattern is found or no positions remain.

---

### Pseudocode

```text
BruteForceMatch(T, P)

n = length(T)
m = length(P)

for i = 0 to n - m
    j = 0

    while j < m and T[i + j] == P[j]
        j = j + 1

    if j == m
        return i

return -1
```

---

### Time Complexity

If:
- $n$ = length of text
- $m$ = length of pattern

**Worst-case time complexity:**
$$O((n - m + 1)m)$$

Usually written as:
$$O(nm)$$

- **Best-case:** $O(n)$
- **Space complexity:** $O(1)$

---

### Advantages
- Simple and easy to understand.
- Easy to implement.
- Does not require extra data structures.

---

### Disadvantage
- Slow for large texts and patterns because it may perform many repeated comparisons.

---

# PART B — GRAPH ALGORITHMS

---

# Graph Traversal

## Question 28: Explain graph traversal and discuss its two main techniques, Breadth First Search (BFS) and Depth First Search (DFS), with their algorithms, applications, and time complexity.

### Answer

**Graph traversal is the process of systematically visiting the vertices (nodes) of a graph in a proper order, without visiting the same vertex repeatedly.**

In simple words, **graph traversal is a method of exploring the nodes of a graph one by one.**

The two main graph traversal techniques are:

```text
                 Graph Traversal
                       |
              +--------+--------+
              |                 |
             BFS               DFS
    Breadth First Search  Depth First Search
              |                 |
            Queue          Stack / Recursion
              |                 |
        Level by level      Depth by depth
```

---

### Visual Comparison: BFS vs DFS Traversal Order

![Graph Traversals Compared: BFS vs DFS](assets/images/diagrams/bfs_dfs_traversal.svg)

---

### 1. Breadth First Search (BFS)

#### Definition

**Breadth First Search (BFS) is a graph traversal technique that visits the vertices level by level. It first visits all the neighbouring vertices of a node before moving to the next level.**

#### Data Structure Used

BFS uses a **Queue**.

**Queue → FIFO (First In, First Out)**

#### Example

Consider the following graph:

```text
        A
       / \
      B   C
     / \   \
    D   E   F
```

Starting from `A`, one possible BFS traversal is:

```text
A → B → C → D → E → F
```

Here:

- First, `A` is visited.
- Then its neighbours `B` and `C`.
- Then the next-level vertices `D`, `E`, and `F`.

#### Steps of BFS

1. Start from a selected vertex.
2. Mark the vertex as **visited**.
3. Insert it into a queue.
4. Remove a vertex from the queue.
5. Visit all its unvisited neighbouring vertices.
6. Insert those vertices into the queue.
7. Repeat until the queue becomes empty.

#### Applications of BFS

- Finding the **shortest path in an unweighted graph**
- Finding connected components
- Checking whether a graph is bipartite
- Level-order traversal

#### Time Complexity

For an adjacency-list representation:

**O(V + E)**

Where:

- `V` = Number of vertices
- `E` = Number of edges

---

### 2. Depth First Search (DFS)

#### Definition

**Depth First Search (DFS) is a graph traversal technique that explores a path as deeply as possible before coming back and exploring another path.**

In simple words, **DFS goes deep into one branch before moving to another branch.**

#### Data Structure Used

DFS uses a **Stack** or **Recursion**.

**Stack → LIFO (Last In, First Out)**

#### Example

Consider the same graph:

```text
        A
       / \
      B   C
     / \   \
    D   E   F
```

One possible DFS traversal is:

```text
A → B → D → E → C → F
```

Here, DFS goes from `A` to `B`, then goes deeper to `D`. After reaching the end of that path, it **backtracks** and explores the remaining vertices.

#### Steps of DFS

1. Start from a selected vertex.
2. Mark the vertex as **visited**.
3. Visit an unvisited neighbouring vertex.
4. Continue going deeper.
5. When there is no unvisited neighbour, **backtrack**.
6. Continue with another unvisited vertex.
7. Repeat until all reachable vertices are visited.

#### Applications of DFS

- Detecting cycles in a graph
- Topological sorting
- Finding connected components
- Solving maze and path problems
- Finding strongly connected components

#### Time Complexity

For an adjacency-list representation:

**O(V + E)**

---

### BFS vs DFS Comparison

| Feature | BFS | DFS |
|---|---|---|
| **Full Form** | Breadth First Search | Depth First Search |
| **Approach** | Level by level | Depth first |
| **Data Structure** | Queue | Stack / Recursion |
| **Principle** | FIFO | LIFO |
| **Shortest Path in Unweighted Graph** | Yes | Not guaranteed |
| **Main Uses** | Shortest path, level traversal | Cycle detection, topological sorting, path exploration |
| **Adjacency List** | **O(V + E)** | **O(V + E)** |
| **Adjacency Matrix** | **O(V²)** | **O(V²)** |

Where:

- `V` = Number of vertices
- `E` = Number of edges

---

# Dijkstra's Algorithm

## Question 29: Explain the working of Dijkstra's algorithm with a suitable example.

### Answer

**Graph (Source: A)**: A→B:4, A→C:2, C→B:1, C→D:8, C→E:10, B→D:5, D→E:2

---

### Visual Shortest Path & Relaxation Trace

![Dijkstra Algorithm Relaxation Trace](assets/images/diagrams/dijkstra_graph_trace.svg)

---

### Video Explanation 🎥

<div class="video-embed-wrapper" style="position: relative; width: 100%; max-width: 680px; aspect-ratio: 16 / 9; margin: 16px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/XB4MIexjvY0?si=GTzp3qdjGmqN2tJL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
</div>

---

# P, NP, NP-Hard & NP-Complete

## Question 30: Evaluate the relevance of P, NP, NP-Hard and NP-Complete in computational complexity.

### Answer

In computer science, some problems can be solved **quickly**, while others may take a **very long time** as the input becomes large.  
To understand this difficulty, problems are divided into classes such as:
- **P**
- **NP**
- **NP-Hard**
- **NP-Complete**

---

### 2. P — Polynomial Time

**P** is a class of problems that can be **solved efficiently** using a polynomial-time algorithm.

Common polynomial complexities are:
$$O(n),\quad O(n\log n),\quad O(n^2),\quad O(n^3)$$

#### Example
**Binary Search**  
If we have a sorted list:

`10  20  30  40  50  60  70`

Binary Search repeatedly divides the list into half.

**Time Complexity:**
$$O(\log n)$$

So, Binary Search is a **P problem**.

#### Real-life use
P problems are useful for tasks such as:
- Searching data
- Processing databases

---

### 3. NP — Nondeterministic Polynomial Time

#### Definition
**NP** is a class of problems where a given solution can be **checked/verified in polynomial time**.

> [!NOTE]
> **Important:** NP does **not** mean "Not Polynomial".

#### Example — Subset Sum
Given:
```text
Set = {3, 5, 7, 10}
Target = 15
```

Suppose someone gives us:
```text
5 + 10 = 15
```

We can quickly check whether the answer is correct.

Therefore, **Subset Sum** is an NP problem.

#### Simple idea
```text
NP
 ↓
Solution is given
 ↓
Check the solution quickly
```

---

### 4. NP-Hard

**NP-Hard** problems are problems that are **at least as difficult as the hardest problems in NP**.

They may take a very large amount of time to solve exactly.

An NP-Hard problem **does not have to belong to NP**.

#### Example — TSP
In the Travelling Salesman Problem, we need to find the **shortest possible route** that visits every city once and returns to the starting city.

For example:
```text
A → B → C → D → A
```

For $n$ cities, a brute-force approach may check approximately:
$$O(n!)$$
possible routes.

So the **optimization version of TSP is NP-Hard**.

#### Real-life applications
- Delivery route planning
- Vehicle routing

---

### 5. NP-Complete

#### Definition
A problem is **NP-Complete** when:
1. It belongs to **NP**, and
2. It is also **NP-Hard**.

Therefore:
$$\boxed{\text{NP-Complete} = \text{NP} + \text{NP-Hard}}$$

#### Example — TSP Decision Problem
Instead of asking:
> "What is the shortest route?"

we ask:
> "Is there a route with total cost less than or equal to ₹5000?"

If a route is given, we can quickly check its cost.

Therefore, the **decision version of TSP is NP-Complete**.

Other examples include:
- **3-SAT**
- **Vertex Cover**

---

### 6. Difference Between P, NP, NP-Hard and NP-Complete

| Class | Simple Meaning | Example | Typical Complexity |
|---|---|---|---|
| **P** | Can be solved efficiently | Binary Search | $O(\log n)$ |
| **NP** | Solution can be verified efficiently | Subset Sum | Verification is polynomial |
| **NP-Hard** | At least as difficult as NP problems | TSP Optimization | Often exponential/factorial |
| **NP-Complete** | Both NP and NP-Hard | 3-SAT, TSP Decision | No known polynomial solution |

---

### 7. Relationship

Remember this simple relationship:

```text
              NP-HARD
        ┌─────────────────┐
        │                 │
        │      NP         │
        │   ┌─────────┐   │
        │   │    P    │   │
        │   └─────────┘   │
        │                 │
        │ NP-COMPLETE     │
        │                 │
        └─────────────────┘
```

The important relationships are:
$$P \subseteq NP$$
and
$$\text{NP-Complete} = NP \cap \text{NP-Hard}$$

---

### Visual Euler Diagram: Computational Complexity Classes

![Complexity Classes Euler Diagram: P, NP, NP-Complete, and NP-Hard](assets/images/diagrams/p_np_complexity_venn.svg)

---


# REMAINING SYLLABUS TOPICS

---

# N-Queens

## Question 31: Explain how Backtracking solves the N-Queens Problem.

### Answer

Place $N$ queens on $N\times N$ board — no two queens attack each other.

**Strategy**: Place row by row, check safety, backtrack if stuck.

```python
def is_safe(board,row,col,N):
    for i in range(row):
        if board[i]==col or abs(board[i]-col)==abs(i-row): return False
    return True
def solve(board,row,N):
    if row==N: print(board); return
    for col in range(N):
        if is_safe(board,row,col,N):
            board[row]=col; solve(board,row+1,N); board[row]=-1
```

**N=4 solution** `[1,3,0,2]`:
```
. Q . .
. . . Q
Q . . .
. . Q .
```

| N | Solutions |
| :--- | :--- |
| 4 | 2 |
| 8 | 92 |

**Time**: $O(N!)$ worst case.

---

### Visual 4-Queens State-Space Search Tree & Pruning

![4-Queens State-Space Search Tree with Backtracking](assets/images/diagrams/n_queens_backtracking_tree.svg)

---

# Hamiltonian Circuit

## Question 32: Explain how Backtracking solves the Hamiltonian Circuit Problem.

### Answer

**Problem**: Visit every vertex exactly once, return to start.

**Extension**: Add $v$ if edge exists AND $v$ unvisited. **Success**: All visited + edge back to start.

```python
def hamiltonian(graph,path,n):
    if len(path)==n: return graph[path[-1]][path[0]]==1
    for v in range(n):
        if graph[path[-1]][v]==1 and v not in path:
            path.append(v)
            if hamiltonian(graph,path,n): return True
            path.pop()  # BACKTRACK
    return False
```

**Time**: $O(n!)$ worst case.

---

# Lower Bound on Sorting

## Question 33: Explain the lower bound on sorting and its significance.

### Answer

**Theorem**: Any comparison-based sorting algorithm requires $\Omega(n\log n)$ comparisons in the worst case.

**Proof**: $n$ elements → $n!$ permutations → binary decision tree needs $\ge\log_2(n!)$ height.

Stirling: $\log_2(n!)\approx n\log_2 n=\Omega(n\log n)$.

---

### Visual Decision Tree Lower Bound Model

![Comparison Sort Lower Bound Decision Tree](assets/images/diagrams/sorting_decision_tree_lower_bound.svg)

---

| Significance | Explanation |
| :--- | :--- |
| Optimality | Merge Sort, Heap Sort are asymptotically optimal |
| No improvement possible | No comparison sort can beat $\Omega(n\log n)$ |
| Breaking bound | Only non-comparison sorts (Radix, Counting) can achieve $O(n)$ |

| Algorithm | Worst Case | Achieves LB? |
| :--- | :--- | :--- |
| Bubble/Insertion/Selection | $O(n^2)$ | ❌ |
| Merge Sort | $O(n\log n)$ | ✅ |
| Heap Sort | $O(n\log n)$ | ✅ |

---

---

*End of DAA Exam Preparation Notes — All 33 Questions Covered*
