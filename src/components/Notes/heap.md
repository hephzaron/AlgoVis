<h1>
  <img src="https://img.icons8.com/fluency/48/database.png" width="30" style="vertical-align:middle;"/>
  Heap
</h1>

A **Heap** is a **specialized tree-based, non-linear data structure** that satisfies the **Heap Property**. It is commonly implemented as a **Complete Binary Tree** and is widely used to efficiently retrieve the **minimum** or **maximum** element.

Unlike a Binary Search Tree (BST), a heap does **not** maintain sorted order. Instead, it guarantees that the root node always contains either the smallest or largest element, depending on the heap type.

---

## Overview

A heap is a **Complete Binary Tree**, meaning all levels are completely filled except possibly the last level, which is filled from **left to right**.

There are two main types of heaps:

- **Max Heap** – The parent node is greater than or equal to its children.
- **Min Heap** – The parent node is less than or equal to its children.

Heaps are typically implemented using an **array**, eliminating the need for pointers.

---

## Example Structure

### Max Heap

```text
          90
        /    \
      70      60
     /  \    /  \
   40   30  20  10
```

Every parent is **greater than or equal** to its children.

---

### Min Heap

```text
          10
        /    \
      20      30
     /  \    /  \
   40   50  60  70
```

Every parent is **less than or equal** to its children.

---

## Array Representation

Since heaps are complete binary trees, they can be efficiently stored in an array.

Example:

```text
Heap

          90
        /    \
      70      60
     /  \    /  \
   40   30  20  10
```

Stored as:

```text
Index : 0   1   2   3   4   5   6

Value : 90 70 60 40 30 20 10
```

For a node at index **i**:

- Left Child = **2i + 1**
- Right Child = **2i + 2**
- Parent = **(i − 1) / 2**

---

## Key Properties

- **Complete Binary Tree** – Filled level by level from left to right.
- **Heap Property** – Parent node is always larger (Max Heap) or smaller (Min Heap) than its children.
- **Array-Based Implementation** – Efficient storage without pointers.
- **Fast Root Access** – The maximum or minimum element is always at the root.
- **Dynamic Structure** – Supports efficient insertion and deletion.

---

## Time Complexity

| Operation | Time Complexity |
|-----------|-----------------|
| **Peek (Min/Max)** | O(1) |
| **Insert** | O(log n) |
| **Delete Root** | O(log n) |
| **Heapify** | O(log n) |
| **Build Heap** | O(n) |
| **Search** | O(n) |

> **Note:** Searching is **O(n)** because heaps only enforce the heap property, not complete ordering.

---

## Space Complexity

| Property | Complexity |
|----------|------------|
| **Storage** | O(n) |
| **Extra Space** | O(1) |

---

## Common Operations

### Insert

1. Add the new element to the end of the heap.
2. Perform **Heapify-Up (Bubble-Up)** until the heap property is restored.

---

### Delete Root

1. Replace the root with the last element.
2. Remove the last element.
3. Perform **Heapify-Down (Bubble-Down)** to restore the heap property.

---

### Peek

Return the root element without removing it.

- Max Heap → Largest element
- Min Heap → Smallest element

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fast Priority Access** – Retrieve the minimum or maximum element in **O(1)** time.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Insertions and Deletions** – Both operations take **O(log n)** time.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Memory Efficient** – Array implementation eliminates pointer overhead.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Foundation of Priority Queues** – Ideal for scheduling and resource management.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Supports Heap Sort** – Enables an efficient comparison-based sorting algorithm.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Slow Searching** – Finding arbitrary elements requires **O(n)** time.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Not Fully Sorted** – Only the root is guaranteed to be the minimum or maximum.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Limited Traversal Benefits** – Traversing a heap does not produce sorted output.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Less Flexible** – Not suitable when frequent ordered searches are required.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Priority Queues** – Manage tasks based on priority.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Scheduling Algorithms** – CPU scheduling, process management, and event simulation.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Graph Algorithms** – Dijkstra's and Prim's algorithms.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Heap Sort** – Efficient in-place sorting.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Real-Time Systems** – Manage high-priority events efficiently.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/task.png" width="20" style="vertical-align:middle;"> **Operating Systems** – CPU process scheduling.

<img src="https://img.icons8.com/fluency/20/network.png" width="20" style="vertical-align:middle;"> **Network Routing** – Shortest-path algorithms.

<img src="https://img.icons8.com/fluency/20/artificial-intelligence.png" width="20" style="vertical-align:middle;"> **Artificial Intelligence** – Best-first and A* search algorithms.

<img src="https://img.icons8.com/fluency/20/database.png" width="20" style="vertical-align:middle;"> **Database Systems** – Priority-based query execution.

<img src="https://img.icons8.com/fluency/20/calendar.png" width="20" style="vertical-align:middle;"> **Event Simulation** – Manage upcoming events in chronological order.

<img src="https://img.icons8.com/fluency/20/sorting-arrows-horizontal.png" width="20" style="vertical-align:middle;"> **Sorting Algorithms** – Heap Sort implementation.

---

## Comparison with Binary Search Tree

| Feature | Heap | Binary Search Tree |
|----------|------|--------------------|
| Root Element | Min or Max | Arbitrary |
| Search | O(n) | O(log n)* |
| Insert | O(log n) | O(log n)* |
| Delete Root | O(log n) | O(log n)* |
| Sorted Traversal | No | Yes (Inorder) |
| Primary Use | Priority Queue | Searching & Ordered Data |

> **\*** Average case for a balanced BST.

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Heaps are optimized for efficiently accessing the **highest-priority element**, not for maintaining sorted data. If your application frequently needs the smallest or largest element, a heap is often a better choice than a Binary Search Tree.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">