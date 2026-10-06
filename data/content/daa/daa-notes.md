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

## Question 5: Analyze the time complexity of a non-recursive algorithm.

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

## Question 6: Explain the difference between polynomial and exponential running time.

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

# SECTION 2: DETERMINISTIC ALGORITHMS

---

## Question 7: Write the concept of deterministic algorithms and mention their applications.

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

# SECTION 3: RECURSION

---

## Question 8: Interpret the working of recursion in problem-solving.

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

## Question 9: Explain the difference between recursive and non-recursive algorithms.

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

# SECTION 4: DIVIDE-AND-CONQUER

---

## Question 10: Explain the divide-and-conquer strategy used in solving problems.

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

## Question 11: Describe the steps of divide-and-conquer in Merge Sort.

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

## Question 12: Judge the effectiveness of divide-and-conquer for large inputs.

### Answer

| Reason | Explanation |
| :--- | :--- |
| Sub-linear depth | Recursion tree depth $=\log n$ |
| Parallelizability | Independent subproblems on multiple cores |
| Optimal bounds | $\Theta(n\log n)$ — proven optimal for comparison sorting |

At $n=10^6$: Bubble Sort needs $10^{12}$ ops; Merge Sort needs $\approx2\times10^7$ ops.

---

# SECTION 5: GREEDY ALGORITHM

---

## Question 13: Define the basic principle of the greedy algorithm and mention its main features.

### Answer

Makes the **locally optimal choice** at each step, hoping it leads to a **globally optimal solution**.

**Required properties**: Greedy Choice Property + Optimal Substructure.

| Feature | Description |
| :--- | :--- |
| No Backtracking | Choices never reconsidered |
| Local Optimality | Best currently available option |
| Efficiency | Generally $O(n\log n)$ or better |

| Problem | Optimal? |
| :--- | :--- |
| Activity Selection | ✅ Yes |
| Fractional Knapsack | ✅ Yes |
| Huffman Coding | ✅ Yes |
| 0/1 Knapsack | ❌ No |
| TSP (nearest neighbor) | ❌ No |

---

## Question 14: Construct a solution using the greedy strategy for a suitable problem.

### Answer

#### Activity Selection (Greedy: Earliest Finish Time)

Activities sorted by finish: A1(1,4), A2(3,5), A3(0,6), A4(5,7), A5(8,11)

- Select A1 (finish=4)
- Skip A2 (start=3<4), Skip A3 (start=0<4)
- Select A4 (start=5≥4, finish=7)
- Select A5 (start=8≥7) ✓

**Result**: {A1,A4,A5} — 3 activities (maximum) | **Time**: $O(n\log n)$

---

## Question 15: Apply the greedy approach to obtain a feasible solution for an optimization problem.

### Answer

#### Fractional Knapsack (Greedy: Highest $v/w$ ratio)

| Item | Weight | Value | Ratio |
| :--- | :--- | :--- | :--- |
| 1 | 10 | 60 | 6.0 |
| 2 | 20 | 100 | 5.0 |
| 3 | 30 | 120 | 4.0 |

**Capacity=50**: Take all Item1($60)+all Item2($100)+2/3 Item3($80) = **$240** ✓ (Optimal)

---

## Question 16: Explain the use of the greedy approach for solving TSP.

### Answer

TSP is NP-Hard. **Greedy Nearest Neighbour**: always move to nearest unvisited city.

**Example (A–E)**: A→B(10)→D(25)→E(15)→C(20)→A(15) = **Total=85**

**Limitations**: Not optimal, order-dependent, Time=$O(n^2)$.

---

# SECTION 6: DYNAMIC PROGRAMMING

---

## Question 17: Explain overlapping subproblems in Dynamic Programming.

### Answer

Same subproblem solved **multiple times** in naive recursion. DP stores results to avoid redundant work.

**Fibonacci**: `fib(3)` computed 2×, `fib(2)` computed 3× in naive recursion → $O(2^n)$.

**With Memoization** ($O(n)$):
```python
memo = {}
def fib_dp(n):
    if n in memo: return memo[n]
    if n<=1: return n
    memo[n]=fib_dp(n-1)+fib_dp(n-2)
    return memo[n]
```

**Techniques**: Memoization (top-down) or Tabulation (bottom-up).

**Conditions**: Overlapping subproblems + Optimal substructure.

---

## Question 18: Explain the use of Dynamic Programming for solving TSP.

### Answer

#### Held-Karp DP Algorithm

$dp[S][i]$ = min cost starting at 0, visiting cities in subset $S$, ending at $i$.

**Base**: $dp[\{0\}][0]=0$

**Recurrence**: $dp[S][i]=\min_{j\in S,j\ne i}(dp[S\setminus\{i\}][j]+d(j,i))$

**Answer**: $\min_{i\ne0}(dp[V][i]+d(i,0))$

| Metric | Value |
| :--- | :--- |
| Time | $O(n^2\cdot 2^n)$ |
| Space | $O(n\cdot 2^n)$ |

Far better than brute-force $O(n!)$.

---

## Question 19: Compare Dynamic Programming with other approaches.

### Answer

| Parameter | Brute Force | Greedy | D&C | DP |
| :--- | :--- | :--- | :--- | :--- |
| Optimality | Always | Not always | Varies | Always (if conditions met) |
| Time | $O(n!)$ | $O(n\log n)$ | $O(n\log n)$ | Better than brute |
| Examples | TSP brute | Fractional Knapsack | Merge Sort | 0/1 Knapsack |

# SECTION 9: RANDOMIZATION

---

## Question 26: Define randomization in algorithm design.

### Answer

**Randomization** uses **random numbers** within an algorithm to improve expected performance or avoid worst-case inputs.

| Type | Guarantee | Example |
| :--- | :--- | :--- |
| Las Vegas | Always correct; runtime random | Randomized QuickSort |
| Monte Carlo | Fixed time; may have small error | Miller-Rabin primality |

---

## Question 27: Explain randomized algorithms and their applications.

### Answer

**Randomized QuickSort**: Random pivot avoids $O(n^2)$ worst case → Expected $O(n\log n)$.

| Application | Algorithm | Benefit |
| :--- | :--- | :--- |
| Sorting | Randomized QuickSort | Avoids worst case |
| Primality | Miller-Rabin | Fast probabilistic |
| Hashing | Universal Hashing | Minimizes collisions |
| Graph | Karger's Min-Cut | Simple minimum cut |
| AI | Monte Carlo Tree Search | Chess, Go |

---

# SECTION 10: OPTIMIZATION PROBLEMS

---

## Question 28: Summarize the Assignment Problem and the Knapsack Problem.

### Answer

**Assignment Problem**: Assign $n$ workers to $n$ jobs to minimize cost. Optimal: Hungarian Algorithm $O(n^3)$.

| Aspect | 0/1 Knapsack | Fractional Knapsack |
| :--- | :--- | :--- |
| Items | Whole or nothing | Fractions allowed |
| Approach | DP $O(nW)$ | Greedy $O(n\log n)$ |
| Greedy Optimal | ❌ | ✅ |

$DP[i][w]=\max(DP[i-1][w],\;v_i+DP[i-1][w-w_i])$ if $w_i\le w$

---

## Question 29: Explain TSP and different approaches for solving it.

### Answer

**TSP**: Shortest Hamiltonian cycle visiting all $n$ cities. **Class**: NP-Hard.

| Approach | Time | Quality |
| :--- | :--- | :--- |
| Brute Force | $O(n!)$ | Exact |
| DP (Held-Karp) | $O(n^2\cdot2^n)$ | Exact |
| Greedy (Nearest) | $O(n^2)$ | Approximate |
| B&B | Varies | Exact |
| Christofides | $O(n^3)$ | 1.5× optimal |


---

# PART B — SORTING

---

# SECTION 11: INSERTION SORT

---

## Question 30: Define the Insertion Sort algorithm.

### Answer

**Insertion Sort** builds the sorted array **one element at a time** by inserting each element into its correct position among already-sorted elements. **Analogy**: Sorting a hand of playing cards.

| Case | Time | Space | Stable |
| :--- | :--- | :--- | :--- |
| Best (sorted) | $O(n)$ | $O(1)$ | ✅ |
| Average | $O(n^2)$ | $O(1)$ | ✅ |
| Worst (reverse) | $O(n^2)$ | $O(1)$ | ✅ |

---

## Question 31: Explain the working of Insertion Sort with a suitable example.

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

# SECTION 12: SELECTION SORT

---

## Question 32: Explain the working of Selection Sort with a suitable example.

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

# SECTION 13: BUBBLE SORT

---

## Question 33: Arrange {25, 12, 9, 30, 18} using Bubble Sort. Illustrate each pass and calculate total comparisons.

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

## Question 34: Explain the working of Bubble Sort with an example and analyze its running time.

### Answer

Bubble Sort **"bubbles up"** the largest unsorted element each pass via adjacent comparisons and swaps.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        swapped = False
        for j in range(n-1-i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped: break  # Early termination
```

| Case | Complexity |
| :--- | :--- |
| Best (sorted, early stop) | $O(n)$ |
| Average | $O(n^2)$ |
| Worst (reverse sorted) | $O(n^2)$ |

**Stable**: ✅ | **In-place**: ✅

---

# SECTION 14: MERGE SORT

---

## Question 35: Describe the divide-and-conquer strategy used in Merge Sort.

### Answer

| Phase | Action | Cost |
| :--- | :--- | :--- |
| **Divide** | Find midpoint, split into two halves | $O(1)$ |
| **Conquer** | Recursively sort each half | $2T(n/2)$ |
| **Combine** | Merge two sorted halves | $\Theta(n)$ |

**Recurrence**: $T(n)=2T(n/2)+\Theta(n)\Rightarrow\Theta(n\log n)$

Recursion tree: $\log_2 n$ levels, each costs $n$ → **Total $=n\log n$**

---

## Question 36: Explain the working of Merge Sort with a suitable example and analyze its complexity.

### Answer

#### Example: Sort `[38, 27, 43, 3, 9, 82, 10]`

```
DIVIDE: [38,27,43,3,9,82,10]→[38,27,43,3][9,82,10]→[38,27][43,3][9,82][10]→[38][27][43][3][9][82][10]

MERGE:
merge([38],[27])=[27,38]  merge([43],[3])=[3,43]  merge([9],[82])=[9,82]
merge([27,38],[3,43])=[3,27,38,43]  merge([9,82],[10])=[9,10,82]
merge([3,27,38,43],[9,10,82])=[3,9,10,27,38,43,82] ✓
```

| Metric | Value |
| :--- | :--- |
| Best/Avg/Worst | $\Theta(n\log n)$ |
| Space | $O(n)$ auxiliary |
| Stable | ✅ |
| In-place | ❌ |

---

# SECTION 15: QUICK SORT

---

## Question 37: Solve Quick Sort for [38, 27, 43, 3, 9, 82, 10] step-by-step.

### Answer

**Pivot=10 (last element). Lomuto partition:**

```
i=-1, scan j=0..5:
j=0:38>10→skip; j=1:27>10→skip; j=2:43>10→skip
j=3: 3≤10→i=0,swap: [3,27,43,38,9,82,10]
j=4: 9≤10→i=1,swap: [3,9,43,38,27,82,10]
j=5:82>10→skip
Place pivot: swap arr[2]↔arr[6]: [3,9,10,38,27,82,43]   ↑ pivot at index 2
```

**Left [3,9]** (pivot=9): 3≤9→[3,9] ✓

**Right [38,27,82,43]** (pivot=43): 38,27≤43→swap→[27,38,82,43]; place pivot→[27,38,43,82] ✓

**Final**: `[3, 9, 10, 27, 38, 43, 82]` ✓

---

## Question 38: Explain the partitioning process of Quick Sort with a suitable example.

### Answer

#### Lomuto Partition Scheme

```python
def partition(arr, l, r):
    pivot = arr[r]
    i = l - 1
    for j in range(l, r):
        if arr[j] <= pivot:
            i += 1; arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[r] = arr[r], arr[i+1]
    return i+1
```

**Example `[10,80,30,90,40,50,70]` pivot=70**:
```
j=0:10≤70→i=0; j=1:80>70→skip; j=2:30≤70→i=1,swap→[10,30,80,90,40,50,70]
j=3:90>70→skip; j=4:40≤70→i=2,swap→[10,30,40,90,80,50,70]
j=5:50≤70→i=3,swap→[10,30,40,50,80,90,70]
Place pivot: swap arr[4]↔arr[6]→[10,30,40,50,70,90,80]  ↑ pivot at index 4
```

---

## Question 39: Analyze the best, average and worst-case time complexity of Quick Sort.

### Answer

| Case | Condition | Recurrence | Complexity |
| :--- | :--- | :--- | :--- |
| **Best** | Pivot always at middle | $T(n)=2T(n/2)+O(n)$ | $O(n\log n)$ |
| **Average** | Random pivot | Probabilistic | $O(n\log n)$ |
| **Worst** | Pivot always min/max | $T(n)=T(n-1)+O(n)$ | $O(n^2)$ |
| **Space** | Stack depth | — | $O(\log n)$ avg |

**Remedy**: Randomized pivot → Expected $O(n\log n)$ for all inputs.

---

# SECTION 16: HEAP SORT

---

## Question 40: Explain Heap Sort by constructing a max-heap for {20, 7, 15, 3, 10, 5}.

### Answer

**Build Max-Heap from `[20,7,15,3,10,5]`**:
- i=2 (val=15): child=5, no swap
- i=1 (val=7): children=3,10; 10>7 → swap: `[20,10,15,3,7,5]`
- i=0 (val=20): children=10,15; 20>both, no swap

**Max-Heap**: `[20,10,15,3,7,5]`

**Extract Phase**:

| Step | Swap Root With | Array State |
| :--- | :--- | :--- |
| 1 | 5 (last) | `[15,10,5,3,7 | 20]` |
| 2 | 7 (arr[4]) | `[10,7,5,3 | 15,20]` |
| 3 | 3 (arr[3]) | `[7,3,5 | 10,15,20]` |
| 4 | 5 (arr[2]) | `[5,3 | 7,10,15,20]` |
| 5 | 3 (arr[1]) | `[3 | 5,7,10,15,20]` |

**Sorted**: `[3, 5, 7, 10, 15, 20]` ✓

---

## Question 41: Explain the working of Heap Sort and its time complexity.

### Answer

**Phase 1: Build Max-Heap** — $O(n)$: Heapify from last non-leaf upward.

**Phase 2: Extract & Sort** — $O(n\log n)$: Swap root with last, reduce heap size, heapify root.

```python
def heapify(arr,n,i):
    largest=i; l,r=2*i+1,2*i+2
    if l<n and arr[l]>arr[largest]: largest=l
    if r<n and arr[r]>arr[largest]: largest=r
    if largest!=i: arr[i],arr[largest]=arr[largest],arr[i]; heapify(arr,n,largest)

def heap_sort(arr):
    n=len(arr)
    for i in range(n//2-1,-1,-1): heapify(arr,n,i)    # O(n)
    for i in range(n-1,0,-1): arr[0],arr[i]=arr[i],arr[0]; heapify(arr,i,0)  # O(n log n)
```

**Time**: $O(n\log n)$ all cases | **Space**: $O(1)$ | **Stable**: ❌

> Heap Sort: only sort guaranteeing $O(n\log n)$ worst-case AND $O(1)$ space.

---

# SECTION 17: RADIX SORT

---

## Question 43: Explain Radix Sort with a suitable example and analyze its complexity.

### Answer

#### Example: `[170, 45, 75, 90, 802, 24, 2, 66]`

| Pass | Sort By | Result |
| :--- | :--- | :--- |
| 1 (ones) | 0,5,5,0,2,4,2,6 | `[170,90,802,2,24,45,75,66]` |
| 2 (tens) | 7,9,0,0,2,4,7,6 | `[802,2,24,45,66,170,75,90]` |
| 3 (hundreds) | 8,0,0,0,0,1,0,0 | `[2,24,45,66,75,90,170,802]` ✓ |

**When $d=O(1)$**: $T(n)=O(n)$ — linear! **Advantage** over comparison sorts.

---

# PART B — SEARCHING

---

# SECTION 18: LINEAR SEARCH

---

## Question 44: Explain the working of Linear Search and its time complexity.

### Answer

Scans each element left to right until target found or array exhausted.

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target: return i
    return -1
```

| Case | Complexity |
| :--- | :--- |
| Best | $O(1)$ |
| Average | $O(n)$ |
| Worst | $O(n)$ |

Works on **any array** — sorted or unsorted.

---

# SECTION 19: BINARY SEARCH

---

## Question 45: Explain the suitability of Binary Search over Linear Search for large ordered datasets.

### Answer

Binary Search eliminates **half** the search space at each step → $O(\log n)$.

| $n$ | Linear ($n$) | Binary ($\log_2 n$) |
| :--- | :--- | :--- |
| 1,000 | 1,000 | 10 |
| 1,000,000 | 1M | 20 |
| 1,000,000,000 | 1 billion | 30 |

**Precondition**: Array must be **sorted**.

---

## Question 46: Explain the working of Binary Search with a suitable example.

### Answer

```python
def binary_search(arr, target):
    low, high = 0, len(arr)-1
    while low <= high:
        mid = (low+high)//2
        if arr[mid]==target: return mid
        elif arr[mid]<target: low=mid+1
        else: high=mid-1
    return -1
```

**Search 7 in `[1,3,5,7,9,11,13]`**:

| Step | low | high | mid | arr[mid] | Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 6 | 3 | 7 | **FOUND at index 3** ✓ |

**Search 11 in `[2,3,4,10,40]`**:

| Step | low | high | mid | arr[mid] | Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 4 | 2 | 4 | 4<11→low=3 |
| 2 | 3 | 4 | 3 | 10 | 10<11→low=4 |
| 3 | 4 | 4 | 4 | 40 | 40>11→high=3 |
| 4 | low>high | — | — | — | **NOT FOUND** |

---

## Question 47: Compare the time complexity of Linear Search and Binary Search.

### Answer

| Metric | Linear Search | Binary Search |
| :--- | :--- | :--- |
| Best | $O(1)$ | $O(1)$ |
| Average | $O(n)$ | $O(\log n)$ |
| Worst | $O(n)$ | $O(\log n)$ |
| Space | $O(1)$ | $O(1)$ iterative |
| Precondition | None | Must be sorted |

---

# EXHAUSTIVE SEARCH & STRING MATCHING

---

# SECTION 20: BRUTE FORCE

---

## Question 48: Explain exhaustive/brute-force search with a suitable example.

### Answer

**Brute-Force**: Enumerate **all candidates** and check each against conditions. Simple, always correct, very slow.

**TSP Example**: Generate all $(n-1)!$ tours, compute cost, return minimum. **Complexity**: $O(n!)$.

```python
from itertools import permutations
def brute_tsp(dist,n):
    min_cost=float('inf')
    for perm in permutations(range(1,n)):
        cost=dist[0][perm[0]]
        for i in range(len(perm)-1): cost+=dist[perm[i]][perm[i+1]]
        cost+=dist[perm[-1]][0]
        min_cost=min(min_cost,cost)
    return min_cost
```

---

## Question 49: Compare brute-force, greedy and DP for solving TSP.

### Answer

| Aspect | Brute Force | Greedy | DP (Held-Karp) |
| :--- | :--- | :--- | :--- |
| Time | $O(n!)$ | $O(n^2)$ | $O(n^2\cdot2^n)$ |
| Optimality | ✅ Exact | ❌ Approximate | ✅ Exact |
| Feasible for $n$ | $\le 12$ | Any | $\le 20$ |

---

# SECTION 21: BRUTE-FORCE STRING MATCHING

---

## Question 50: Illustrate brute-force string matching.

### Answer

**Text=`"AABABC"`**, **Pattern=`"AB"`**

| Position | Comparison | Result |
| :--- | :--- | :--- |
| $i=0$ | A=A✓, A≠B✗ | Mismatch |
| $i=1$ | A=A✓, B=B✓ | **MATCH at index 1** ✓ |
| $i=2$ | B≠A✗ | Mismatch |
| $i=3$ | A=A✓, B=B✓ | **MATCH at index 3** ✓ |
| $i=4$ | B≠A✗ | Mismatch |

---

## Question 51: Explain brute-force string matching and its time complexity.

### Answer

```python
def brute_match(text, pattern):
    n,m=len(text),len(pattern)
    for i in range(n-m+1):
        j=0
        while j<m and text[i+j]==pattern[j]: j+=1
        if j==m: print(f"Match at {i}")
```

| Case | Complexity |
| :--- | :--- |
| Best | $O(n)$ |
| Worst | $O(n\times m)$ |

KMP ($O(n+m)$) and Boyer-Moore are faster alternatives.

---

# PART B — GRAPH ALGORITHMS

---

# SECTION 22: GRAPH TRAVERSAL

---

## Question 52: Identify and explain the concept of graph traversal.

### Answer

**Graph traversal**: Visit each vertex **exactly once** systematically.

**Applications**: Connected components, cycle detection, finding paths, topological sorting.

| Algorithm | Strategy | Data Structure |
| :--- | :--- | :--- |
| DFS | Deep first, backtrack | Stack / Recursion |
| BFS | Level by level | Queue (FIFO) |

---

## Question 53: Explain the concept of DFS in graph traversal.

### Answer

**DFS** explores as far as possible along each branch before backtracking. Uses a **stack** (implicit via recursion).

**Properties**: Marks vertices visited. Detects cycles. Enables topological sort.

*(Detailed implementation: see Questions 56–58)*

---

# SECTION 23: BFS

---

## Question 54: Explain the concept of Breadth-First Search (BFS).

### Answer

```python
from collections import deque
def bfs(graph,source):
    visited=set([source]); queue=deque([source]); order=[]
    while queue:
        v=queue.popleft(); order.append(v)
        for u in graph[v]:
            if u not in visited: visited.add(u); queue.append(u)
    return order
```

**Example `{A:[B,C],B:[D,E],C:[F]}`**: BFS from A → **A→B→C→D→E→F** (level by level)

**Time**: $O(V+E)$ | **Space**: $O(V)$

---

## Question 55: Compare BFS and DFS.

### Answer

| Parameter | BFS | DFS |
| :--- | :--- | :--- |
| Data Structure | Queue (FIFO) | Stack / Recursion |
| Traversal | Level by level | Deep branch first |
| Shortest Path | ✅ (unweighted) | ❌ |
| Topological Sort | ❌ | ✅ |
| Cycle Detection | ✅ | ✅ |
| Time & Space | $O(V+E)$, $O(V)$ | $O(V+E)$, $O(V)$ |

---

# SECTION 24: DFS

---

## Question 58: Explain the working of DFS using an example.

### Answer

```python
def dfs_iterative(graph, source):
    visited=set(); stack=[source]; order=[]
    while stack:
        v=stack.pop()
        if v not in visited:
            visited.add(v); order.append(v)
            for u in reversed(graph[v]):
                if u not in visited: stack.append(u)
    return order
```

**Time**: $O(V+E)$ | **Space**: $O(V)$

DFS uses **stack (LIFO)** — goes deep before wide. BFS uses **queue (FIFO)** — level by level.

---

# SECTION 25: DIJKSTRA'S ALGORITHM

---

## Question 61: Explain the working of Dijkstra's algorithm with a suitable example.

### Answer

**Graph (Source: A)**: A→B:4, A→C:2, C→B:1, C→D:8, C→E:10, B→D:5, D→E:2

**Initialize**: `dist={A:0,B:∞,C:∞,D:∞,E:∞}`

| Step | Extract | Relax | Updated dist[] |
| :--- | :--- | :--- | :--- |
| 1 | **A(0)** | B:4, C:2 | B=4, C=2 |
| 2 | **C(2)** | B:3✓, D:10, E:12 | B=3, D=10, E=12 |
| 3 | **B(3)** | D:8✓ | D=8 |
| 4 | **D(8)** | E:10✓ | E=10 |
| 5 | **E(10)** | — | done |

**Paths**: B via A→C→B(3), C via A→C(2), D via A→C→B→D(8), E via A→C→B→D→E(10)

---

# NP & COMPUTATIONAL COMPLEXITY

---

# SECTION 26: P AND NP

---

## Question 62: Explain the relevance of P and NP in computational complexity and algorithm development.

### Answer

**Class P**: Solvable in polynomial time $O(n^k)$. **Tractable**. Examples: Sorting, Binary Search, Dijkstra.

**Class NP**: Verifiable in polynomial time. Examples: SAT, TSP (decision), Graph Coloring.

**Relationship**: $P\subseteq NP$. **Open question**: Is $P=NP$? (Millennium Prize Problem)

| Relevance | Explanation |
| :--- | :--- |
| Tractability boundary | P=efficient; NP might need exponential time |
| Cryptography | Security relies on P≠NP |
| Approximations | Design poly-time approx for NP problems |
| Algorithm design | Determines exact vs heuristic approach |

---

# SECTION 27: NP-HARD

---

## Question 63: State the meaning of NP-Hard problems.

### Answer

A problem $H$ is **NP-Hard** if every NP problem can be polynomial-time reduced to $H$.

**Key Points**: Need not be in NP. Solving any NP-Hard in poly time → P=NP. Considered **intractable**.

**Examples**: TSP (optimization), 0/1 Knapsack (optimization), Graph Coloring, Halting Problem.

---

## Question 64: Explain the relevance of NP-Hard problems in computational complexity.

### Answer

| Relevance | Explanation |
| :--- | :--- |
| Defines hardness ceiling | NP-Hard = hardest known class |
| Design direction | Stop seeking exact poly-time algorithm |
| Approximations | Design with provable approximation ratio |
| Security foundation | Cryptography relies on NP-Hard intractability |

**Strategies**: B&B/DP (small $n$), Approximation (bounded error), Heuristics (large $n$).

---

## Question 65: Use NP-Hard concepts to determine solution strategies for real-world challenges.

### Answer

| Problem | Context | Strategy |
| :--- | :--- | :--- |
| TSP | Delivery routes | Christofides (~1.5×) |
| Job Scheduling | Cloud computing | List scheduling (2-approx) |
| Graph Coloring | Register allocation | Greedy heuristic |
| Bin Packing | Container shipping | First-Fit Decreasing |

```
NP-Hard → exact needed?
  YES + n small → B&B/DP/Backtracking
  NO → Approximation or Heuristic
```

---

# SECTION 28: NP-COMPLETE

---

## Question 66: Explain the concept of NP-Complete problems.

### Answer

**NP-Complete**: $C\in NP$ AND $C$ is NP-Hard.

**First**: SAT (Cook-Levin Theorem, 1971). All NP-Complete problems equivalently hard.

| Problem | Decision Form |
| :--- | :--- |
| SAT | Satisfying Boolean assignment exists? |
| Vertex Cover | Cover of size ≤ k exists? |
| Hamiltonian Cycle | Hamiltonian cycle exists? |
| TSP (decision) | Tour of cost ≤ k exists? |
| Subset Sum | Subset summing to T exists? |

---

## Question 67: Differentiate between NP-Hard and NP-Complete problems.

### Answer

| Parameter | NP-Hard | NP-Complete |
| :--- | :--- | :--- |
| In NP? | May NOT be | Must be ✅ |
| Verifier | May not have poly-time | Has poly-time ✅ |
| Examples | TSP (optimization) | TSP (decision), SAT |
| Relationship | NP-Complete ⊆ NP-Hard | Proper subset |

```
ALL PROBLEMS: NP-Hard ⊃ NP ⊃ P
                NP-Complete = NP ∩ NP-Hard
```

---

## Question 68: Evaluate the relevance of P, NP, NP-Hard and NP-Complete in complexity.

### Answer

| Class | Definition | Example |
| :--- | :--- | :--- |
| P | Solvable in poly time | Sorting, Search |
| NP | Verifiable in poly time | SAT, TSP decision |
| NP-Hard | All NP reduces to it | TSP optimization |
| NP-Complete | In NP ∩ NP-Hard | Subset-Sum, SAT |

> These classes define the boundary between **what computers can efficiently solve** and **what they fundamentally cannot**.

---

# REMAINING SYLLABUS TOPICS

---

# SECTION 29: N-QUEENS

---

## Question 69: Explain how Backtracking solves the N-Queens Problem.

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

# SECTION 30: HAMILTONIAN CIRCUIT

---

## Question 70: Explain how Backtracking solves the Hamiltonian Circuit Problem.

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

# SECTION 31: LOWER BOUND ON SORTING

---

## Question 71: Explain the lower bound on sorting and its significance.

### Answer

**Theorem**: Any comparison-based sorting algorithm requires $\Omega(n\log n)$ comparisons in the worst case.

**Proof**: $n$ elements → $n!$ permutations → binary decision tree needs $\ge\log_2(n!)$ height.

Stirling: $\log_2(n!)\approx n\log_2 n=\Omega(n\log n)$.

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

# SECTION 32: POLYNOMIAL VS EXPONENTIAL

---

## Question 72: Differentiate between polynomial and exponential running time with examples.

### Answer

| Feature | Polynomial $O(n^k)$ | Exponential $O(c^n)$ |
| :--- | :--- | :--- |
| Growth | Power (manageable) | Explosive — doubles per step |
| Tractability | Feasible for large $n$ | Infeasible for moderate $n$ |
| Problem Class | P | NP-Hard typically |

**Polynomial**: $O(n)$ Linear Search, $O(n^2)$ Bubble Sort, $O(n^3)$ Matrix Multiply.

**Exponential**: $O(2^n)$ Subset generation ($n=50\to10^{15}$ ops), $O(n!)$ Brute TSP ($n=20\to2.4\times10^{18}$ ops).

| $n$ | $n^2$ | $2^n$ | $n!$ |
| :--- | :--- | :--- | :--- |
| 10 | 100 | 1,024 | 3.6M |
| 20 | 400 | 1M | $2.4\times10^{18}$ |
| 50 | 2,500 | $10^{15}$ | astronomical |

> **Practical Rule**: Polynomial algorithms are engineered for real-world use. Exponential algorithms are only practical for very small inputs ($n\le20$).

---

*End of DAA Exam Preparation Notes — All 72 Questions Covered*
