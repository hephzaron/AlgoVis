<h1>
  <img src="https://img.icons8.com/fluency/48/serial-tasks.png" width="30" style="vertical-align:middle;"/>
  Queue
</h1>

A **Queue** is a **linear data structure** that follows the **First In, First Out (FIFO)** principle. This means the **first element inserted into the queue is the first element removed**.

Think of a queue as people waiting in line at a ticket counter or supermarket checkout—the first person to join the line is the first to be served. Because insertions and deletions occur at opposite ends, queues are ideal for scheduling, buffering, and resource management.

---

## Overview

A queue stores elements in sequential order while allowing:

- **Insertion** at the **Rear (Back)**
- **Deletion** from the **Front**

The primary operations are:

- **Enqueue** – Insert an element at the rear.
- **Dequeue** – Remove an element from the front.

Additional operations include:

- **Front (Peek)** – View the first element without removing it.
- **Rear** – View the last element.
- **isEmpty** – Check whether the queue is empty.
- **Size** – Determine the number of elements.

Queues can be implemented using:

- **Arrays**
- **Linked Lists**
- **Circular Arrays**

---

## Example Structure

```text
Front                          Rear
 │                               │
 ▼                               ▼

+-----+-----+-----+-----+
| 10  | 20  | 30  | 40  |
+-----+-----+-----+-----+
```

The next element removed will be **10**.

---

### Enqueue Operation

```text
Before

Front                Rear
 │                     │

10 → 20 → 30

Enqueue(40)

After

Front                     Rear
 │                          │

10 → 20 → 30 → 40
```

---

### Dequeue Operation

```text
Before

Front                     Rear
 │                          │

10 → 20 → 30 → 40

Dequeue()

After

Front                Rear
 │                     │

20 → 30 → 40
```

---

## Key Properties

- **Linear Structure** – Elements are arranged sequentially.
- **FIFO Principle** – The first inserted element is removed first.
- **Two Access Points** – Insertions occur at the rear, deletions at the front.
- **Efficient Operations** – Enqueue and Dequeue execute in constant time.
- **Dynamic Size** – Queue size changes as elements are added or removed.
- **Multiple Variants** – Includes Circular Queue, Priority Queue, and Deque.

---

## Time Complexity

| Operation | Time Complexity |
|-----------|-----------------|
| **Enqueue** | O(1) |
| **Dequeue** | O(1) |
| **Front (Peek)** | O(1) |
| **Rear** | O(1) |
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

### Enqueue

Adds an element to the rear of the queue.

```text
Queue

Front

10 → 20 → 30

Enqueue(40)

Front

10 → 20 → 30 → 40

                     Rear
```

---

### Dequeue

Removes the element at the front.

```text
Queue

Front

10 → 20 → 30 → 40

Dequeue()

Front

20 → 30 → 40

               Rear
```

---

### Front (Peek)

Returns the front element without removing it.

```text
Front = 20
```

---

### Rear

Returns the last element without removing it.

```text
Rear = 40
```

---

## Types of Queues

### Simple Queue

Follows the standard FIFO principle.

---

### Circular Queue

The last position connects back to the first position, allowing efficient reuse of available space.

---

### Priority Queue

Each element has an associated priority. Higher-priority elements are processed before lower-priority ones.

---

### Double-Ended Queue (Deque)

Supports insertion and deletion at **both the front and rear**.

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Processing** – Enqueue and Dequeue operations execute in **O(1)** time.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fair Scheduling** – Elements are processed in arrival order.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Simple Implementation** – Easy to implement using arrays or linked lists.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Supports Asynchronous Processing** – Useful for buffering and task management.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Scalable** – Widely used in operating systems, networking, and distributed systems.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Limited Access** – Only the front and rear elements are directly accessible.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Linear Search** – Finding an element requires **O(n)** time.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **No Random Access** – Elements cannot be accessed by index.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Overflow (Static Queue)** – Fixed-size array implementations may become full.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Task Scheduling** – Execute tasks in arrival order.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **CPU Scheduling** – Manage processes waiting for execution.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Breadth-First Search (BFS)** – Traverse graphs and trees level by level.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Buffer Management** – Handle data streams in networking and multimedia.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Producer–Consumer Systems** – Coordinate asynchronous processes.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/print.png" width="20" style="vertical-align:middle;"> **Printer Spooling** – Print jobs are processed in the order they arrive.

<img src="https://img.icons8.com/fluency/20/task.png" width="20" style="vertical-align:middle;"> **Operating Systems** – CPU scheduling and process management.

<img src="https://img.icons8.com/fluency/20/network.png" width="20" style="vertical-align:middle;"> **Network Routers** – Buffer incoming packets before transmission.

<img src="https://img.icons8.com/fluency/20/video.png" width="20" style="vertical-align:middle;"> **Media Streaming** – Buffer audio and video data for smooth playback.

<img src="https://img.icons8.com/fluency/20/artificial-intelligence.png" width="20" style="vertical-align:middle;"> **Graph Algorithms** – Breadth-First Search (BFS).

<img src="https://img.icons8.com/fluency/20/cloud.png" width="20" style="vertical-align:middle;"> **Cloud Computing** – Manage job queues and message brokers.

---

## Comparison with Stack

| Feature | Queue | Stack |
|----------|-------|-------|
| Principle | FIFO | LIFO |
| Insert | Rear | Top |
| Delete | Front | Top |
| Primary Operations | Enqueue, Dequeue | Push, Pop |
| Typical Use | Scheduling, Buffering | Undo, Recursion |

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Queues are ideal whenever **items should be processed in the order they arrive**. Their **FIFO** behavior makes them essential for scheduling algorithms, buffering, networking, breadth-first search (BFS), and producer–consumer systems.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">