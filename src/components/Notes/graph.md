<h1>
  <img src="https://img.icons8.com/fluency/48/share.png" width="30" style="vertical-align:middle;"/>
  Graph
</h1>

A **Graph** is a **non-linear data structure** consisting of a set of **vertices (nodes)** connected by **edges (links)**. Graphs are one of the most versatile data structures and are widely used to model relationships, networks, and interconnected systems.

Unlike trees, graphs can contain **cycles**, **multiple paths**, and **disconnected components**, making them suitable for representing complex real-world relationships.

---

## Overview

A graph is defined as:

- **Vertices (V)** – The individual entities or objects.
- **Edges (E)** – The connections between vertices.

Graphs can represent relationships such as:

- Cities connected by roads
- Users connected in a social network
- Web pages connected by hyperlinks
- Computers connected in a network
- Dependencies between software packages

Graphs may be:

- **Directed (Digraph)** – Edges have a direction.
- **Undirected** – Edges have no direction.
- **Weighted** – Edges store weights or costs.
- **Unweighted** – All edges are considered equal.

---

## Example Structure

### Undirected Graph

```text
      A
     / \
    B---C
     \
      D
```

Edges:

- A — B
- A — C
- B — C
- B — D

---

### Directed Graph

```text
A ───▶ B
│      │
│      ▼
└────▶ C
```

Edges:

- A → B
- A → C
- B → C

---

## Key Properties

- **Non-Linear Structure** – Data is organized as interconnected nodes.
- **Flexible Connections** – A vertex can connect to multiple vertices.
- **Supports Cycles** – Vertices may form loops.
- **Directed or Undirected** – Connections may have direction.
- **Weighted or Unweighted** – Edges may store costs, distances, or capacities.
- **Dynamic Size** – Vertices and edges can be added or removed.

---

## Common Representations

### Adjacency Matrix

Stores graph connections in a **2D matrix**.

Example:

```text
    A B C D

A   0 1 1 0
B   1 0 1 1
C   1 1 0 0
D   0 1 0 0
```

**Advantages**

- O(1) edge lookup
- Simple implementation

**Disadvantages**

- O(V²) space complexity

---

### Adjacency List

Stores a list of neighbors for each vertex.

```text
A → B → C

B → A → C → D

C → A → B

D → B
```

**Advantages**

- O(V + E) space
- Efficient for sparse graphs

**Disadvantages**

- Slower edge lookup

---

## Time Complexity

### Adjacency List

| Operation | Time Complexity |
|-----------|-----------------|
| **Add Vertex** | O(1) |
| **Add Edge** | O(1) |
| **Remove Edge** | O(1) |
| **Remove Vertex** | O(V + E) |
| **Search Vertex** | O(V) |
| **DFS Traversal** | O(V + E) |
| **BFS Traversal** | O(V + E) |

---

### Adjacency Matrix

| Operation | Time Complexity |
|-----------|-----------------|
| **Add Edge** | O(1) |
| **Remove Edge** | O(1) |
| **Check Edge** | O(1) |
| **DFS/BFS** | O(V²) |
| **Space** | O(V²) |

---

## Space Complexity

| Representation | Complexity |
|---------------|------------|
| **Adjacency Matrix** | O(V²) |
| **Adjacency List** | O(V + E) |

---

## Graph Traversal

### Breadth-First Search (BFS)

Visits vertices level by level using a **Queue**.

Example order:

```text
A → B → C → D
```

Used for:

- Shortest path (unweighted graphs)
- Network broadcasting
- Web crawling

---

### Depth-First Search (DFS)

Explores as far as possible before backtracking using a **Stack** or recursion.

Example order:

```text
A → B → D → C
```

Used for:

- Path finding
- Cycle detection
- Topological sorting
- Connected components

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Models Complex Relationships** – Represents interconnected data naturally.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Highly Flexible** – Supports arbitrary connections between nodes.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Traversal Algorithms** – BFS and DFS solve many graph problems efficiently.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Supports Weighted Networks** – Ideal for shortest-path and routing problems.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Scalable** – Suitable for representing millions of connected entities.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Complex Implementation** – More difficult than linear data structures.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Memory Intensive** – Dense graphs require significant memory.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Traversal Can Be Expensive** – Large graphs may require visiting many vertices.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Cycle Handling** – Algorithms must often track visited vertices to avoid infinite loops.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Social Networks** – Model friendships and followers.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Navigation Systems** – Represent roads and transportation networks.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Computer Networks** – Model routers and communication links.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dependency Management** – Represent software or task dependencies.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Recommendation Systems** – Connect users with products or content.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/share.png" width="20" style="vertical-align:middle;"> **Social Media** – Friendships, followers, and connections.

<img src="https://img.icons8.com/fluency/20/worldwide-location.png" width="20" style="vertical-align:middle;"> **GPS Navigation** – Compute optimal routes between locations.

<img src="https://img.icons8.com/fluency/20/network.png" width="20" style="vertical-align:middle;"> **Computer Networks** – Internet routing and communication.

<img src="https://img.icons8.com/fluency/20/artificial-intelligence.png" width="20" style="vertical-align:middle;"> **Artificial Intelligence** – Knowledge graphs and reasoning systems.

<img src="https://img.icons8.com/fluency/20/workflow.png" width="20" style="vertical-align:middle;"> **Project Scheduling** – Task dependency graphs.

<img src="https://img.icons8.com/fluency/20/combo-chart.png" width="20" style="vertical-align:middle;"> **Fraud Detection** – Analyze relationships between transactions and entities.

---

## Comparison of Graph Representations

| Feature | Adjacency Matrix | Adjacency List |
|----------|------------------|----------------|
| Space | O(V²) | O(V + E) |
| Edge Lookup | O(1) | O(degree) |
| Add Edge | O(1) | O(1) |
| Sparse Graphs | Poor | Excellent |
| Dense Graphs | Excellent | Good |
| Memory Efficiency | Low | High |

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Use an **Adjacency List** for sparse graphs because it requires significantly less memory. For dense graphs where edge lookups are frequent, an **Adjacency Matrix** offers constant-time edge access at the cost of higher space usage.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">