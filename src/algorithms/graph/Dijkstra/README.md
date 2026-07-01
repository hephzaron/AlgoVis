# Dijkstra's Shortest Path Algorithm

## Overview

This directory contains a fully-implemented, modular Dijkstra's shortest path algorithm with comprehensive comments and clear separation of concerns.

## Files

- **Dijkstra.ts** - Main algorithm implementation
- **types.ts** - Type definitions for results and steps
- **README.md** - This file

## Algorithm Characteristics

- **Time Complexity**: O((V + E) log V) using min-heap priority queue
- **Space Complexity**: O(V) for storing distances and previous nodes
- **Input**: Weighted graph with non-negative edge weights
- **Output**: Shortest distances from source to all nodes, path reconstruction map, and visualization steps

## Usage Example

```typescript
import { Dijkstra } from './algorithms/graph/Dijkstra/Dijkstra';
import { Graph } from './components/Visualizers/GraphVisualizer';

// Create a graph
const graph = new Graph<string>();
graph.addNode('A', 'A');
graph.addNode('B', 'B');
graph.addNode('C', 'C');

// Add weighted edges
graph.addEdge('A', 'B', 4);
graph.addEdge('B', 'C', 2);
graph.addEdge('A', 'C', 10);

// Run Dijkstra from node 'A'
const dijkstra = new Dijkstra(graph);
const result = dijkstra.run('A');

// Access results
console.log(result.distances);  // Map of shortest distances
console.log(result.previous);   // Map for path reconstruction
console.log(result.steps);      // All algorithm steps for visualization
```

## Architecture

### Modular Design with Single Responsibility

1. **initialize()**
   - Prepares algorithm state before execution
   - Responsibility: Initial setup

2. **run()**
   - Main algorithm orchestration
   - Responsibility: Coordinate algorithm phases

3. **visitNode()**
   - Marks a node as permanently processed
   - Responsibility: Visit tracking

4. **relaxEdges()**
   - Discovers and updates shortest paths to neighbors
   - Responsibility: Edge relaxation and distance updates

5. **recordStep()**
   - Captures algorithm state for visualization
   - Responsibility: Step recording for replay

### Key Implementation Details

#### Priority Queue
Uses a min-heap (Heap<T> with type='min') to efficiently select the next unvisited node with minimum distance:
```typescript
private priorityQueue: Heap<any>;
```

#### Distance Tracking
Maps store shortest distances and previous nodes for path reconstruction:
```typescript
private distances: Map<string, number>;      // Source to each node
private previous: Map<string, string | null>; // Path reconstruction
```

#### Visited Set
Ensures each node is processed exactly once:
```typescript
private visited: Set<string>;
```

#### Visualization Support
Comprehensive step recording for algorithm visualization:
```typescript
private steps: DijkstraStep[];
```

## Algorithm Flow

1. **Initialization**
   - Set all distances to Infinity except source (0)
   - Add source to priority queue
   - Record 'start' step

2. **Main Loop**
   - Extract minimum-distance unvisited node from priority queue
   - Mark as visited
   - For each unvisited neighbor:
     - Calculate candidate distance through current node
     - If shorter than known distance, update and add to queue
   - Record 'relax' and 'update' steps

3. **Termination**
   - Continue until priority queue is empty
   - Record 'complete' step
   - Return results

## Type Definitions

### DijkstraResult
```typescript
{
  distances: Map<string, number>;           // Shortest distance to each node
  previous: Map<string, string | null>;     // Previous node for path reconstruction
  steps: DijkstraStep[];                    // All algorithm execution steps
}
```

### DijkstraStep
```typescript
{
  type: 'start' | 'visit' | 'relax' | 'update' | 'complete';
  current?: string;                         // Current node being processed
  neighbor?: string;                        // Neighbor being examined
  edgeWeight?: number;                      // Edge weight
  oldDistance?: number;                     // Distance before update
  newDistance?: number;                     // Distance after update
  distances: Map<string, number>;           // Snapshot of all distances
  previous: Map<string, string | null>;     // Snapshot of all previous nodes
  visited: Set<string>;                     // Snapshot of visited nodes
}
```

## Comments and Documentation

- **Class-level**: Algorithm overview, complexity analysis, and design patterns
- **Method-level**: JSDoc with parameters, return types, and behavior descriptions
- **Inline**: Key algorithm decisions and important implementation details
- **Type definitions**: Comprehensive property descriptions and usage context

## Data Structures Used

### From Codebase
- **Graph<T>** - The graph being analyzed (undirected, weighted)
- **GraphNodeInterface<T>** - Graph nodes with ID and neighbors
- **Heap<T>** - Min-heap for priority queue (with usePriority: true)

### Local
- **PriorityQueueItem** - Internal interface for heap items containing nodeId and distance
- **Map** - For distances and previous nodes
- **Set** - For visited nodes
- **Array** - For step recording
