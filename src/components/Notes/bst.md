<h1>
  <img src="https://img.icons8.com/fluency/48/tree-structure.png" width="30" style="vertical-align:middle;"/>
  Binary Search Tree (BST)
</h1>

A **Binary Search Tree (BST)** is a **hierarchical, non-linear data structure** in which each node contains at most **two children**. The tree follows a special ordering property that enables efficient searching, insertion, and deletion of elements.

For every node in a BST:

- All values in the **left subtree** are **less than** the node's value.
- All values in the **right subtree** are **greater than** the node's value.
- Both left and right subtrees are themselves Binary Search Trees.

This ordered structure allows many operations to be performed efficiently.

---

## Overview

A Binary Search Tree organizes data hierarchically rather than sequentially. Unlike arrays or linked lists, a BST dynamically maintains sorted order while supporting efficient searching, insertion, and deletion.

Each node typically contains:

- A data value
- A pointer/reference to the left child
- A pointer/reference to the right child

The root node is the topmost node, while nodes without children are called **leaf nodes**.

---

## Example Structure

```text
        50
       /  \
     30    70
    / \    / \
  20  40 60  80
```

- Root: **50**
- Left subtree contains values smaller than 50.
- Right subtree contains values greater than 50.

---

## Key Properties

- **Hierarchical Structure** – Data is organized as a tree rather than sequentially.
- **Binary Tree** – Every node has at most two children.
- **Ordered Structure** – Left child < Parent < Right child.
- **Recursive Nature** – Every subtree is also a Binary Search Tree.
- **Dynamic Size** – Nodes can be inserted or removed without resizing.
- **Efficient Searching** – Average search complexity is **O(log n)**.

---

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| **Search** | O(log n) | O(n) |
| **Insert** | O(log n) | O(n) |
| **Delete** | O(log n) | O(n) |
| **Find Minimum** | O(log n) | O(n) |
| **Find Maximum** | O(log n) | O(n) |
| **Traversal** | O(n) | O(n) |

> **Note:** The worst case occurs when the tree becomes **skewed**, behaving like a linked list.

---

## Space Complexity

| Property | Complexity |
|----------|------------|
| **Storage** | O(n) |
| **Recursive Traversal** | O(h) |

Where **h** is the height of the tree.

---

## Common Traversals

| Traversal | Order |
|-----------|-------|
| **Inorder** | Left → Root → Right |
| **Preorder** | Root → Left → Right |
| **Postorder** | Left → Right → Root |
| **Level Order** | Top → Bottom (Breadth-First) |

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Searching** – Average lookup time is **O(log n)**.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Maintains Sorted Order** – Inorder traversal always produces sorted data.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dynamic Structure** – No fixed size limitation.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Insertions and Deletions** – Average O(log n) performance.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Supports Range Queries** – Efficiently retrieves values within a specified range.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Worst-Case Performance** – Operations degrade to O(n) if the tree becomes unbalanced.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Additional Memory** – Each node stores child pointers.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **More Complex Implementation** – Harder to implement than arrays or linked lists.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Balancing May Be Required** – Self-balancing trees (AVL, Red-Black) are often preferred for guaranteed performance.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Frequent Searching** – When searching is performed often.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dynamic Sorted Data** – Maintain sorted elements while allowing insertions and deletions.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Range Queries** – Efficiently retrieve values within intervals.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Symbol Tables** – Store key-value pairs with ordered keys.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Database Indexing** – Foundation for many indexing structures.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/database.png" width="20" style="vertical-align:middle;"> **Database Indexing** – Organize records for fast retrieval.

<img src="https://img.icons8.com/fluency/20/folder-invoices.png" width="20" style="vertical-align:middle;"> **File Systems** – Efficiently manage directory structures.

<img src="https://img.icons8.com/fluency/20/search.png" width="20" style="vertical-align:middle;"> **Search Engines** – Organize searchable information.

<img src="https://img.icons8.com/fluency/20/combo-chart.png" width="20" style="vertical-align:middle;"> **Data Analytics** – Maintain ordered datasets for analysis.

<img src="https://img.icons8.com/fluency/20/artificial-intelligence.png" width="20" style="vertical-align:middle;"> **Artificial Intelligence** – Decision-making and search algorithms.

<img src="https://img.icons8.com/fluency/20/code.png" width="20" style="vertical-align:middle;"> **Compiler Design** – Symbol tables and syntax tree processing.

---

## Comparison with Arrays

| Feature | Binary Search Tree | Array |
|-----------|-------------------|-------|
| Search | O(log n)* | O(n) |
| Access by Index | Not Supported | O(1) |
| Insert | O(log n)* | O(n) |
| Delete | O(log n)* | O(n) |
| Sorted Traversal | O(n) | Requires Sorting |
| Dynamic Size | Yes | Static/Dynamic |

> **\*** Average case for a balanced Binary Search Tree.

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Binary Search Trees provide efficient searching, insertion, and deletion by maintaining data in sorted order. However, if the tree becomes unbalanced, performance can degrade to **O(n)**. Self-balancing trees such as **AVL Trees** and **Red-Black Trees** solve this problem by maintaining logarithmic height.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">