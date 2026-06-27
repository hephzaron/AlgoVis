<h1>
  <img src="https://img.icons8.com/fluency/48/layers.png" width="30" style="vertical-align:middle;"/>
  Stack
</h1>

A **Stack** is a **linear data structure** that follows the **Last In, First Out (LIFO)** principle. This means the **last element inserted into the stack is the first element removed**.

Think of a stack as a pile of books or plates—new items are placed on the top, and items are removed from the top. Because all insertions and deletions occur at one end, stack operations are highly efficient.

---

## Overview

A stack stores elements in a sequential order while restricting insertion and deletion to a single end called the **Top**.

The two primary operations are:

- **Push** – Insert an element onto the top of the stack.
- **Pop** – Remove the top element from the stack.

Additional operations include:

- **Peek (Top)** – View the top element without removing it.
- **isEmpty** – Check whether the stack contains any elements.
- **Size** – Determine the number of stored elements.

Stacks can be implemented using:

- **Arrays**
- **Linked Lists**

---

## Example Structure

```text
        Top
         │
      +-----+
      | 40  |
      +-----+
      | 30  |
      +-----+
      | 20  |
      +-----+
      | 10  |
      +-----+
```

### Push Operation

```text
Before

Top
 │
40
30
20
10

Push(50)

After

Top
 │
50
40
30
20
10
```

---

### Pop Operation

```text
Before

Top
 │
50
40
30
20
10

Pop()

After

Top
 │
40
30
20
10
```

---

## Key Properties

- **Linear Structure** – Elements are stored sequentially.
- **LIFO Principle** – The last inserted element is removed first.
- **Single Access Point** – Insertions and deletions occur only at the top.
- **Efficient Operations** – Push and Pop execute in constant time.
- **Dynamic Size** – Stack size changes as elements are added or removed.
- **Simple Implementation** – Can be implemented using arrays or linked lists.

---

## Time Complexity

| Operation | Time Complexity |
|-----------|-----------------|
| **Push** | O(1) |
| **Pop** | O(1) |
| **Peek (Top)** | O(1) |
| **Search** | O(n) |
| **isEmpty** | O(1) |
| **Size** | O(1) |

---

## Space Complexity

| Property | Complexity |
|----------|------------|
| **Storage** | O(n) |
| **Extra Space** | O(1) |

---

## Common Operations

### Push

Adds an element to the top of the stack.

```text
Stack

30
20
10

Push(40)

40
30
20
10
```

---

### Pop

Removes the top element.

```text
Stack

40
30
20
10

Pop()

30
20
10
```

---

### Peek

Returns the top element without removing it.

```text
Top = 30
```

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fast Insertions and Deletions** – Push and Pop operations run in **O(1)** time.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Simple Implementation** – Easy to implement using arrays or linked lists.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Memory Efficient** – Requires minimal overhead.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Supports Recursion** – Used by the call stack during function execution.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Backtracking Support** – Easily reverses previously performed operations.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Limited Access** – Only the top element can be accessed directly.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Linear Search** – Finding a specific element requires **O(n)** time.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **No Random Access** – Elements cannot be accessed by index.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Overflow (Static Implementation)** – Fixed-size array implementations may become full.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Function Calls** – Manage function execution and recursion.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Undo/Redo Features** – Reverse user actions in applications.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Expression Evaluation** – Convert and evaluate mathematical expressions.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Backtracking Algorithms** – Solve maze, Sudoku, and graph traversal problems.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Syntax Parsing** – Validate balanced parentheses and compiler parsing.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/code.png" width="20" style="vertical-align:middle;"> **Compiler Design** – Manage function calls and syntax parsing.

<img src="https://img.icons8.com/fluency/20/undo.png" width="20" style="vertical-align:middle;"> **Text Editors** – Implement Undo and Redo functionality.

<img src="https://img.icons8.com/fluency/20/web.png" width="20" style="vertical-align:middle;"> **Web Browsers** – Store browsing history for the Back button.

<img src="https://img.icons8.com/fluency/20/calculator.png" width="20" style="vertical-align:middle;"> **Expression Evaluation** – Evaluate postfix and prefix expressions.

<img src="https://img.icons8.com/fluency/20/artificial-intelligence.png" width="20" style="vertical-align:middle;"> **Artificial Intelligence** – Support depth-first search (DFS) and backtracking.

<img src="https://img.icons8.com/fluency/20/database.png" width="20" style="vertical-align:middle;"> **Database Systems** – Maintain transaction rollback operations.

---

## Comparison with Queue

| Feature | Stack | Queue |
|----------|-------|-------|
| Principle | LIFO | FIFO |
| Insert | Top | Rear |
| Delete | Top | Front |
| Primary Operations | Push, Pop | Enqueue, Dequeue |
| Typical Use | Undo, Recursion | Scheduling, Buffering |

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Stacks are ideal whenever the **most recently added item should be processed first**. Their **LIFO** behavior makes them essential for recursion, undo/redo systems, expression evaluation, and backtracking algorithms.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">