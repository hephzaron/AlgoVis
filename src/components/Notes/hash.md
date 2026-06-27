<h1>
  <img src="https://img.icons8.com/fluency/48/key.png" width="30" style="vertical-align:middle;"/>
  Hash Table
</h1>

A **Hash Table** is a **non-linear data structure** that stores data in **key–value pairs** and provides extremely fast access using a technique called **hashing**. It maps a key to a specific index in an underlying array using a **hash function**.

Hash tables are widely used when fast insertion, deletion, and lookup operations are required.

---

## Overview

A hash table works by converting a **key** into an **index** using a **hash function**. The value is then stored at that index in an array.

Each entry in a hash table is typically stored as:

- **Key** → Identifier used for lookup
- **Value** → Data associated with the key

Example:

```text
Key → "John"   Value → 85
Key → "Mary"   Value → 92
Key → "Alex"   Value → 78
```

Internally, the hash function maps these keys to array indices.

---

## Example Structure

```text
Index   Data
----------------
0       (empty)
1       ("Alex", 78)
2       ("Mary", 92)
3       (empty)
4       ("John", 85)
```

---

## Hash Function Example

```text
hash(key) = key % table_size
```

Example:

```text
key = 15
table_size = 7

15 % 7 = 1 → store at index 1
```

---

## Key Properties

- **Key–Value Storage** – Data is stored as pairs.
- **Fast Lookup** – Average-case access is extremely fast.
- **Hash Function Dependency** – Performance depends on hash function quality.
- **Direct Indexing** – Keys are mapped to array positions.
- **Collision Handling Required** – Multiple keys may map to the same index.
- **Dynamic or Static Size** – Depends on implementation.

---

## Collision Handling Techniques

### 1. Chaining

Each index contains a list of elements.

```text
Index 2 → (Mary, 92) → (John, 88)
```

### 2. Open Addressing

Finds another empty slot using probing.

- Linear Probing
- Quadratic Probing
- Double Hashing

---

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| **Search** | O(1) | O(n) |
| **Insert** | O(1) | O(n) |
| **Delete** | O(1) | O(n) |

> Worst case occurs when many collisions degrade performance.

---

## Space Complexity

| Property | Complexity |
|----------|------------|
| **Storage** | O(n) |
| **Extra Space** | O(n) (for collision handling) |

---

## Key Operations

### Insert

1. Compute hash of the key.
2. Find index using hash function.
3. Store key–value pair at that index.
4. Handle collision if needed.

---

### Search

1. Compute hash of key.
2. Go to index.
3. Retrieve value or traverse collision chain.

---

### Delete

1. Compute hash of key.
2. Locate element.
3. Remove and adjust collision structure.

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Extremely Fast Lookup** – Average O(1) access time.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient Insertion and Deletion** – Fast updates.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Flexible Key Types** – Supports strings, numbers, and objects (language dependent).

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Widely Supported** – Built into most programming languages.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Efficient for Large Datasets** – Scales well with proper hashing.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Collisions Reduce Performance** – Poor hashing leads to O(n).

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **No Ordering** – Elements are not stored in sorted order.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Extra Memory Usage** – Collision handling increases space overhead.

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Complex Implementation** – Requires careful hash design.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fast Lookup Requirements** – When quick search is critical.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Database Indexing** – Efficient key-based retrieval.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Caching Systems** – Store frequently accessed data.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Duplicate Detection** – Quickly check if an item exists.

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Symbol Tables** – Used in compilers and interpreters.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/search.png" width="20" style="vertical-align:middle;"> **Search Engines** – Fast indexing and retrieval.

<img src="https://img.icons8.com/fluency/20/database.png" width="20" style="vertical-align:middle;"> **Databases** – Indexing records for fast access.

<img src="https://img.icons8.com/fluency/20/cloud.png" width="20" style="vertical-align:middle;"> **Caching Systems** – Redis, Memcached use hash tables.

<img src="https://img.icons8.com/fluency/20/code.png" width="20" style="vertical-align:middle;"> **Compilers** – Symbol tables for variable storage.

<img src="https://img.icons8.com/fluency/20/shield.png" width="20" style="vertical-align:middle;"> **Security Systems** – Password hashing and lookup tables.

<img src="https://img.icons8.com/fluency/20/network.png" width="20" style="vertical-align:middle;"> **Networking** – Routing tables and IP lookup.

---

## Comparison with Array

| Feature | Hash Table | Array |
|----------|-----------|-------|
| Access | O(1) average | O(1) |
| Search | O(1) average | O(n) |
| Ordering | No | Yes |
| Key Type | Flexible | Index only |
| Memory Usage | Higher | Lower |
| Use Case | Fast lookup | Sequential storage |

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> **Tip:** Hash tables are ideal when you need **fast key-based access**. However, performance depends heavily on the quality of the hash function and collision handling strategy.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">