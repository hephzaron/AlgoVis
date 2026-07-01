import { BSTNode } from '../../components/Visualizers/BSTVisualizer/types';
import { BSTBFSResult, BSTBFSStep } from './BFSForBSTTypes';

/**
 * Breadth-First Search (Level-Order Traversal) for Binary Search Tree
 * 
 * This class implements BFS algorithm to traverse a BST level-by-level,
 * from root to leaves, visiting all nodes at each level before proceeding
 * to the next level.
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the queue
 * 
 * The algorithm is divided into modular, single-responsibility methods:
 * - initialize: Sets up initial state
 * - processNode: Handles current node processing
 * - discoverChildren: Discovers and enqueues unvisited children
 * - recordStep: Tracks algorithm progress for visualization
 * 
 * This is also known as Level-Order Traversal of a BST.
 */
export class BFSForBST {
  /** Reference to the BST root node */
  private readonly root: BSTNode | null;

  /** 
   * Queue of nodes waiting to be processed.
   * BFS uses FIFO (First In First Out) order.
   * Stores node values for easier visualization.
   */
  private queue: number[];

  /** 
   * Set of node values that have been visited.
   * Prevents revisiting nodes and ensures each node is processed once.
   */
  private visited: Set<number>;

  /** 
   * Map storing the parent node value for each node in the BFS tree.
   * Used for path reconstruction from root to any node.
   */
  private parent: Map<number, number | null>;

  /** 
   * Array recording the order in which nodes were visited (level-order).
   * Useful for understanding BFS traversal order.
   */
  private visitOrder: number[];

  /** 
   * 2D array storing nodes grouped by their level in the tree.
   * Each sub-array contains nodes at that level.
   */
  private levels: number[][];

  /** 
   * Array of algorithm execution steps for visualization purposes.
   * Each step captures the state of the algorithm at different points.
   */
  private steps: BFSStep[];

  /**
   * Creates a new BFS algorithm instance for the given BST.
   * 
   * @param root - The root node of the BST (or null for empty tree)
   */
  constructor(root: BSTNode | null) {
    this.root = root;
    this.queue = [];
    this.visited = new Set();
    this.parent = new Map();
    this.visitOrder = [];
    this.levels = [];
    this.steps = [];
  }

  /**
   * Executes Breadth-First Search (Level-Order Traversal) on the BST.
   * 
   * This is the main entry point for the algorithm. It:
   * 1. Initializes all data structures
   * 2. Repeatedly dequeues and processes nodes
   * 3. Discovers and enqueues unvisited children
   * 4. Records visualization steps throughout
   * 5. Organizes nodes by level
   * 
   * @returns BSTBFSResult containing visit order, levels, parent map, and execution steps
   */
  public run(): BSTBFSResult {
    // Phase 1: Handle empty tree
    if (!this.root) {
      return {
        visitOrder: [],
        levels: [],
        parent: new Map(),
        steps: [],
      };
    }

    // Phase 2: Initialize algorithm state
    this.initialize();

    // Phase 3: Main algorithm loop
    // Continue while there are nodes in the queue
    while (this.queue.length > 0) {
      // Dequeue the next node value to process
      const currentValue = this.queue.shift()!;

      // Find the actual node from the tree
      const currentNode = this.findNode(this.root, currentValue);
      if (!currentNode) continue;

      // Phase 4: Process current node
      this.processNode(currentValue);

      // Phase 5: Discover and enqueue unvisited children
      this.discoverChildren(currentValue, currentNode);
    }

    // Organize nodes by level
    this.organizeByLevels();

    // Record final completion step
    this.recordStep('complete');

    // Return results with immutable copies to prevent external modifications
    return {
      visitOrder: [...this.visitOrder],
      levels: this.levels.map(level => [...level]),
      parent: new Map(this.parent),
      steps: [...this.steps],
    };
  }

  /**
   * Initializes algorithm state before execution.
   * 
   * Sets up:
   * - Root node in queue and visited
   * - Root node as parent null (it's the root of the tree)
   * - Records the start step for visualization
   * 
   */
  private initialize(): void {
    // Clear all data structures for a fresh start
    this.queue = [];
    this.visited.clear();
    this.parent.clear();
    this.visitOrder = [];
    this.levels = [];
    this.steps = [];

    if (!this.root) return;

    // Add root node to queue and mark as visited
    this.queue.push(this.root.value);
    this.visited.add(this.root.value);

    // Root has no parent (it's the root of the BST)
    this.parent.set(this.root.value, null);

    // Record initialization step for visualization
    this.recordStep('start', this.root.value);
  }

  /**
   * Finds a node in the BST by its value
   * 
   * @param node - Current node being searched
   * @param value - Value to find
   * @returns The found BSTNode or null
   */
  private findNode(node: BSTNode | null, value: number): BSTNode | null {
    if (!node) return null;
    if (node.value === value) return node;
    if (value < node.value) return this.findNode(node.left, value);
    return this.findNode(node.right, value);
  }

  /**
   * Processes a node that was dequeued.
   * 
   * Mark it as visited and record it in the visit order.
   * This is called when a node moves from queue to active processing.
   * 
   * @param value - The value of the node being processed
   */
  private processNode(value: number): void {
    // Record that this node is being visited
    this.visitOrder.push(value);

    // Record visit step for visualization
    this.recordStep('visit', value);
  }

  /**
   * Discovers and enqueues all unvisited children of a node.
   * 
   * For each child (left and right) of the current node:
   * 1. Check if it has been visited before
   * 2. If not visited, mark as visited, set parent, and enqueue
   * 3. Record discovery step for visualization
   * 
   * This is where BFS explores outward, one level at a time.
   * 
   * @param currentValue - The value of the current node
   * @param currentNode - The current BSTNode object
   */
  private discoverChildren(currentValue: number, currentNode: BSTNode): void {
    // Check left child
    if (currentNode.left && !this.visited.has(currentNode.left.value)) {
      this.visited.add(currentNode.left.value);
      this.parent.set(currentNode.left.value, currentValue);
      this.queue.push(currentNode.left.value);
      this.recordStep('discover', currentValue, currentNode.left.value);
    }

    // Check right child
    if (currentNode.right && !this.visited.has(currentNode.right.value)) {
      this.visited.add(currentNode.right.value);
      this.parent.set(currentNode.right.value, currentValue);
      this.queue.push(currentNode.right.value);
      this.recordStep('discover', currentValue, currentNode.right.value);
    }
  }

  /**
   * Organizes visited nodes by their level in the tree.
   * 
   * Uses the parent map to determine each node's depth from root.
   */
  private organizeByLevels(): void {
    const levelMap = new Map<number, number[]>();
    
    // Calculate level for each visited node
    this.visitOrder.forEach(value => {
      let level = 0;
      let current: number | null = value;
      
      // Walk up the tree using parent map to find level
      while (current !== null) {
        const parent = this.parent.get(current);
        if (parent === null) break; // Reached root
        level++;
        current = parent;
      }
      
      if (!levelMap.has(level)) {
        levelMap.set(level, []);
      }
      levelMap.get(level)!.push(value);
    });

    // Convert to 2D array
    for (let i = 0; i < levelMap.size; i++) {
      this.levels.push(levelMap.get(i) || []);
    }
  }

  /**
   * Records an algorithm execution step for visualization purposes.
   * 
   * Each step captures a snapshot of the algorithm state at key points:
   * - 'start': Algorithm initialization
   * - 'visit': Node being processed
   * - 'discover': Child being discovered and enqueued
   * - 'complete': Algorithm finished
   * 
   * The step includes immutable copies of the current queue, visited set,
   * and parent map, allowing the visualization to replay the algorithm's progress.
   * 
   * @param type - The type of step (indicates what just happened)
   * @param current - Optional: value of the current node being processed
   * @param discovered - Optional: value of the child being discovered
   */
  private recordStep(
    type: 'start' | 'visit' | 'discover' | 'complete',
    current?: number,
    discovered?: number
  ): void {
    // Create a new step with immutable copies of current state
    this.steps.push({
      type,
      current,
      discovered,
      // Create copies to preserve state at this moment
      visited: Array.from(this.visited),
      queue: [...this.queue],
      parent: new Map(this.parent),
    });
  }
}
