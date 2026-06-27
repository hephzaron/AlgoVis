<h1>
  <img src="https://img.icons8.com/fluency/48/data-configuration.png" width="32" align="center"/>
  Array
</h1>

An **Array** is a linear data structure that stores elements in **contiguous memory locations**, allowing fast access to elements using their index.

## Key Properties

- **Fixed Indexing**: Access elements using an index (0-based in most languages)
- **Contiguous Memory**: Elements are stored next to each other in memory
- **Fast Random Access**: Retrieve any element in constant time
- **Homogeneous Data**: Typically stores elements of the same data type

## Time Complexity

| Operation | Time |
|-----------|------|
| **Access** | O(1) |
| **Search** | O(n) |
| **Insert (End)** | O(1)* |
| **Insert (Middle)** | O(n) |
| **Delete (End)** | O(1) |
| **Delete (Middle)** | O(n) |

> **\*** Amortized O(1) for dynamic arrays (e.g., `std::vector`, `ArrayList`, Python `list`).

## When to Use

<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Fast indexed access** - Retrieve elements instantly by position  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Storing sequential data** - Numbers, strings, objects, etc.  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Matrices and tables** - 2D and multidimensional arrays  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Buffers** - Audio, video, and network packet storage  
<img src="https://img.icons8.com/fluency/20/checkmark.png" width="20" style="vertical-align:middle;"> **Dynamic programming** - Efficient memoization and tabulation  

## Real-World Applications

<img src="https://img.icons8.com/fluency/20/bank-building.png" width="20" style="vertical-align:middle;"> Banking Systems - Store customer transaction history **Banking Systems** - Store customer transaction history  
<img src="https://img.icons8.com/fluency/20/controller.png" width="20" style="vertical-align:middle;">  **Game Development** - Manage player inventory and game maps  
<img src="https://img.icons8.com/fluency/20/combo-chart.png" width="20" style="vertical-align:middle;"> **Data Analytics** - Store datasets for fast processing  
<img src="https://img.icons8.com/fluency/20/picture.png" width="20" style="vertical-align:middle;"> **Image Processing** - Pixels are stored as 2D arrays  
<img src="https://img.icons8.com/fluency/20/video.png" width="20" style="vertical-align:middle;"> **Media Streaming** - Audio and video frames are stored in arrays  
<img src="https://img.icons8.com/fluency/20/smartphone-tablet.png" width="20" style="vertical-align:middle;"> **Mobile Apps** - Display lists of contacts, messages, and notifications  

> <img src="https://img.icons8.com/fluency/20/idea.png" width="20" style="vertical-align:middle;"> **Tip:** Arrays provide O(1) indexed access but O(n) insertion in the middle.

---

<em>Happy learning! </em><img src="https://img.icons8.com/fluency/20/graduation-cap.png"
     width="20"
     style="vertical-align:middle;"> 