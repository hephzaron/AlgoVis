<h1>
  <img src="https://img.icons8.com/fluency/48/data-configuration.png" width="30" style="vertical-align:middle;"/>
  Array
</h1>

An **Array** is a **linear data structure** that stores elements in **contiguous memory locations**. Each element is identified by an **index**, allowing direct access to any element in **constant time**. Arrays are one of the most fundamental data structures and serve as the building block for many advanced algorithms and data structures.

---

## Overview

An array stores multiple values of the **same data type** under a single variable name. Since elements are stored consecutively in memory, arrays provide excellent cache performance and fast indexed access.

Arrays can be:

- **Static Arrays** – Fixed size after creation (e.g., C arrays)
- **Dynamic Arrays** – Automatically resize when needed (e.g., C++ `std::vector`, Java `ArrayList`, Python `list`)

---

## Key Properties

- **Indexed Access** – Elements are accessed using an index (typically starting from 0)
- **Contiguous Memory** – Consecutive storage improves cache locality and performance
- **Constant-Time Access** – Retrieve any element in **O(1)** time
- **Homogeneous Elements** – Stores values of the same data type
- **Fixed Logical Order** – Elements maintain their insertion order
- **Resizable (Dynamic Arrays)** – Some implementations automatically expand when capacity is exceeded

---

## Time Complexity

| Operation | Time Complexity |
|-----------|-----------------|
| **Access** | O(1) |
| **Search** | O(n) |
| **Update** | O(1) |
| **Insert (End)** | O(1)* |
| **Insert (Beginning)** | O(n) |
| **Insert (Middle)** | O(n) |
| **Delete (End)** | O(1) |
| **Delete (Beginning)** | O(n) |
| **Delete (Middle)** | O(n) |

> **\*** Amortized **O(1)** for dynamic arrays such as **`std::vector`**, **`ArrayList`**, and Python **`list`**.

---

## Advantages

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fast Random Access** – Retrieve any element instantly using its index.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Memory Efficient** – Minimal overhead compared to linked structures.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Cache Friendly** – Contiguous storage improves CPU cache utilization.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Simple Implementation** – Easy to understand and use in most programming languages.

---

## Limitations

<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Expensive Insertions** – Inserting in the middle requires shifting elements.  
<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Expensive Deletions** – Removing elements also requires shifting.  
<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Fixed Capacity** – Static arrays cannot grow after creation.  
<img src="https://img.icons8.com/fluency/20/high-priority.png" width="20" style="vertical-align:middle;"> **Linear Search** – Finding an element in an unsorted array requires O(n) time.

---

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fast Indexed Access** – Retrieve elements instantly by position.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Sequential Data Storage** – Store numbers, strings, objects, or records.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Matrices & Tables** – Represent 2D and multidimensional data.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Buffers** – Temporary storage for audio, video, and network packets.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dynamic Programming** – Store intermediate results efficiently.

---

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/bank-building.png" width="20" style="vertical-align:middle;"> **Banking Systems** – Store customer balances, transactions, and account records.  
<img src="https://img.icons8.com/fluency/20/controller.png" width="20" style="vertical-align:middle;"> **Game Development** – Represent game boards, maps, player inventories, and object collections.  
<img src="https://img.icons8.com/fluency/20/combo-chart.png" width="20" style="vertical-align:middle;"> **Data Analytics** – Store datasets for sorting, filtering, and statistical analysis.  
<img src="https://img.icons8.com/fluency/20/picture.png" width="20" style="vertical-align:middle;"> **Image Processing** – Store pixels as one-dimensional or two-dimensional arrays.  
<img src="https://img.icons8.com/fluency/20/video.png" width="20" style="vertical-align:middle;"> **Media Streaming** – Buffer audio samples and video frames before playback.  
<img src="https://img.icons8.com/fluency/20/smartphone-tablet.png" width="20" style="vertical-align:middle;"> **Mobile Applications** – Display contacts, notifications, chat messages, and other ordered collections.

---

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;">
> *Tip:* Arrays provide *O(1)* indexed access, making them ideal for read-heavy workloads. However, inserting or deleting elements in the middle requires shifting subsequent elements, resulting in *O(n)* time complexity.

---

<em>Happy learning!</em>
<img src="https://img.icons8.com/fluency/20/graduation-cap.png" width="20" style="vertical-align:middle;">

