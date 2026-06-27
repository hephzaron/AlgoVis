<h1>
  <img src="https://img.icons8.com/fluency/48/link.png" width="30" style="vertical-align:middle;"/>
  Linked List
</h1>

A **Linked List** is a **linear, non-contiguous data structure** made up of a sequence of elements called **nodes**, where each node contains:

- **Data**
- A **reference (pointer)** to the next node (and possibly the previous node)

Unlike arrays, linked lists do not store elements in contiguous memory locations. Instead, elements are connected using pointers, forming a chain-like structure.

---

## Overview

A linked list is designed to provide **efficient insertion and deletion** operations compared to arrays.

Each node typically contains:

```text
[ Data | Next ]
```

Where:

- **Data** → The value stored in the node
- **Next** → Pointer to the next node in the sequence

The first node is called the **Head**, and the last node points to **NULL**.

---

## Types of Linked Lists

### 1. Singly Linked List

Each node points to the next node only.

```text
Head → A → B → C → D → NULL
```

---

### 2. Doubly Linked List

Each node has two pointers: next and previous.

```text
NULL ← A ⇄ B ⇄ C ⇄ D → NULL
```

---

### 3. Circular Linked List

The last node points back to the first node.

```text
A → B → C → D
↑           ↓
└───────────┘
```

---

## Node Structure Example

```text
struct Node {
    int data;
    Node* next;
};
```

For doubly linked lists:

```text
struct Node {
    int data;
    Node* prev;
    Node* next;
};
```

---

## Key Properties

- **Dynamic Size** – Grows and shrinks at runtime.
- **Non-Contiguous Memory** – Nodes are stored anywhere in memory.
- **Pointer-Based Structure** – Nodes are connected via references.
- **Efficient Insert/Delete** – Especially at the beginning or middle (if node reference is known).
- **Sequential Access** – Must traverse from head to access elements.
- **Flexible Structure** – Easily modified without memory reallocation.

---

## Time Complexity

### Singly Linked List

| Operation | Time Complexity |
|-----------|-----------------|
| **Access (Index)** | O(n) |
| **Search** | O(n) |
| **Insert (Head)** | O(1) |
| **Insert (Tail)** | O(n) |
| **Insert (Middle)** | O(n) |
| **Delete (Head)** | O(1) |
| **Delete (Tail)** | O(n) |
| **Delete (Middle)** | O(n) |

---

## Space Complexity

| Property | Complexity |
|----------|------------|
| **Storage** | O(n) |
| **Extra Space** | O(n) (due to pointers) |

---

## Common Operations

### Insert at Head

```text
Before:
Head → A → B → C

Insert X:

After:
Head → X → A → B → C
```

---

### Insert at Tail

```text
Before:
A → B → C → NULL

Insert D:

After:
A → B → C → D → NULL
```

---

### Delete Node

```text
Before:
A → B → C → D

Delete B:

After:
A → C → D
```

---

### Traversal

```text
Start at Head:
A → B → C → D → NULL
```

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dynamic Memory Allocation** – Grows without predefined size limits.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Insertions/Deletions** – No shifting required.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **No Memory Wastage** – Allocates memory as needed.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Flexible Structure** – Easy to grow and shrink.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Ideal for Dynamic Data** – Useful when size is unknown.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **No Random Access** – Must traverse sequentially.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Slow Searching** – O(n) time complexity.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Extra Memory Usage** – Requires pointer storage.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Poor Cache Performance** – Non-contiguous memory reduces efficiency.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dynamic Data Size** – When size is unknown or frequently changing.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Frequent Insert/Delete** – Especially at the beginning.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Implementation of Other Structures** – Stacks, queues, and adjacency lists.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Memory-Constrained Scenarios** – When dynamic allocation is preferred.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/music.png" width="20" style="vertical-align:middle;"> **Music Playlists** – Songs linked sequentially.

<img src="https://img.icons8.com/fluency/20/web.png" width="20" style="vertical-align:middle;"> **Web Browsers** – Navigation history (forward/backward).

<img src="https://img.icons8.com/fluency/20/task.png" width="20" style="vertical-align:middle;"> **Operating Systems** – Process scheduling queues.

<img src="https://img.icons8.com/fluency/20/file.png" width="20" style="vertical-align:middle;"> **File Systems** – Dynamic file allocation.

<img src="https://img.icons8.com/fluency/20/artificial-intelligence.png" width="20" style="vertical-align:middle;"> **AI Systems** – Graph adjacency lists and dynamic structures.

<img src="https://img.icons8.com/fluency/20/database.png" width="20" style="vertical-align:middle;"> **Memory Management** – Free lists in dynamic memory allocation.

---

## Comparison with Array

| Feature | Linked List | Array |
|----------|-------------|-------|
| Memory Layout | Non-contiguous | Contiguous |
| Access Time | O(n) | O(1) |
| Insert/Delete | O(1)* | O(n) |
| Memory Usage | Higher | Lower |
| Cache Performance | Poor | Excellent |
| Size | Dynamic | Fixed/Dynamic |

> **\*** O(1) only if node reference is known.

---

## Comparison with ArrayList (Dynamic Array)

| Feature | Linked List | ArrayList |
|----------|-------------|-----------|
| Insert at End | O(1) | O(1) amortized |
| Random Access | O(n) | O(1) |
| Memory Overhead | High | Low |
| Cache Efficiency | Low | High |

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Linked Lists excel when you need **frequent insertions and deletions**, especially at the beginning or middle of a sequence. However, if you require fast access by index, arrays or dynamic arrays are better choices.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">