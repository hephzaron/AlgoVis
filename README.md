# Algo-Vis

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-000000)

<br />

## Algo-Vis

Algo-Vis is an interactive algorithm visualization application designed to help students, educators, and developers understand how algorithms behave in real time. It combines animation, step-by-step execution, live code highlighting, and runtime statistics in a single responsive interface.

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Repository:** [github.com/hephzaron](https://github.com/hephzaron)
- **Portfolio:** [https://hephzaron.github.io/portfolio/](https://hephzaron.github.io/portfolio/)

---

## Overview

Algo-Vis highlights the inner workings of algorithms instead of only showing final results. Each visualizer includes:

- step-by-step animation
- highlighted source code lines
- runtime stats for comparisons, swaps, and time
- responsive layout with side-by-side visualization and stats

### How it works

1. **Choose an algorithm** from sorting, searching, compression, or data structures.
2. **Generate an input array** or choose the target value.
3. **Run the visualization** with play/pause, step, and speed controls.
4. **Follow the highlighted code** while the algorithm updates the visual array, stack, queue, or tree.
5. **Compare the metrics** in the stats panel to understand cost and behavior.

### Illustration

![Algorithm Illustration](https://placehold.co/1200x500?text=Algo-Vis+visualization+preview&font=roboto)

> The app is built for people who learn best by seeing algorithms move and by matching code to visual state.

---

## Algorithms Included

### Sorting

Sorting algorithms are visualized with vertical bars and active-line code highlighting:

- **Merge Sort** — demonstrates divide-and-conquer sorting with merging of sorted subarrays.
- **Quick Sort** — shows pivot selection, partitioning, and recursive sorting of segments.
- **Insertion Sort** — visualizes gradual insertion of each value into a sorted prefix.
- **Bubble Sort** — animates repeated pairwise comparisons and adjacent swaps.
- **Selection Sort** — highlights selection of the minimum element for each position.
- **Heap Sort** — displays heap construction and repeated extraction of the max element.

### Searching

Searching visualizers show the comparison path and selection outcomes:

- **Linear Search** — scans each element until the target is found.
- **Binary Search** — splits a sorted array to cut the search space in half.

### Compression

- **Huffman Coding** — builds a prefix tree from symbol frequencies and generates binary codes.

### Data Structures

- **Stack** — pushes and pops values to show LIFO behavior.
- **Queue** — enqueues and dequeues values to show FIFO behavior.
- **Binary Search Tree** — inserts nodes and shows traversal logic for search trees.

---

## Why Algo-Vis?

Algo-Vis is designed for learners who want to:

- **See algorithm flow** instead of static pseudocode.
- **Watch runtime state** update with each step.
- **Trace code execution** with highlighted lines.
- **Compare different techniques** in one interface.

---

## Screenshots

![Sorting Visualizer](https://placehold.co/900x320?text=Sorting+Visualizer+Screenshot&font=roboto)

![Searching Visualizer](https://placehold.co/900x320?text=Searching+Visualizer+Screenshot&font=roboto)

> Replace the placeholder images with actual app screenshots once available.

---

## Installation

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite, typically `http://localhost:5173`.

---

## Project structure

- `src/components` — UI components and visualizer pages
- `src/algorithms` — generator-based algorithm implementations
- `src/data/algorithmCode.ts` — stored code snippets used for highlighting
- `src/hooks` — custom React hooks for animation and state
- `src/utils` — utility helpers like random array generation

---

## Architecture

Algo-Vis is organized into a clean UI layer and an algorithm execution layer.

- `src/App.tsx` holds the top-level app layout, module selection, and visualizer routing.
- `Header` and `Sidebar` manage navigation between sorting, searching, structures, graphs, and compression.
- Each visualizer component (for example, `SortingVisualizer.tsx` and `SearchingVisualizer.tsx`) renders:
  - the main animation canvas
  - playback controls via `Controls.tsx`
  - runtime stats panels
  - the `CodePanel.tsx` with active-line highlighting.
- Algorithm logic lives in `src/algorithms`, where each function yields a sequence of `AlgorithmStep` objects.
- The visualizer components consume those steps, update `currentStep`, and map step metadata to UI state.
- `src/data/algorithmCode.ts` supplies the source code strings used by `CodePanel` so the app can highlight the current operation in sync with the animation.

This separation makes it easy to add new algorithms without changing the visualization shell.

---

## Development

1. Clone the repo:

```bash
git clone https://github.com/hephzaron/Algo-Vis.git
cd Algo-Vis
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Open the app in the browser.

---

## Contribution

Contributions are welcome. Good first steps include:

- adding new algorithm visualizers
- improving mobile responsiveness
- adding unit tests for generator logic
- adding actual screenshot content and documentation

---

## License

MIT

