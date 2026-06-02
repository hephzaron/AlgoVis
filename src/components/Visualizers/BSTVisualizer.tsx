import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search, RotateCcw } from 'lucide-react';
import { BSTNode } from '../../types';

/**
 * Simple binary search tree implementation for visualization.
 * Supports insert, delete, search, and exposes the tree root.
 */
class BinarySearchTree {
  root: BSTNode | null = null;
  
  /**
   * Inserts a new value into the BST.
   * @param value The value to insert.
   * @returns The created node or null for duplicates.
   */
  insert(value: number): BSTNode | null {
    const newNode: BSTNode = { value, left: null, right: null, x: 0, y: 0 };
    
    if (!this.root) {
      this.root = newNode;
      return this.root;
    }
    
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return newNode;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return newNode;
        }
        current = current.right;
      } else {
        return null; // Duplicate
      }
    }
  }
  
  /**
   * Deletes a value from the BST if present.
   * @param value The value to delete.
   * @returns True when deletion occurred.
   */
  delete(value: number): boolean {
    const deleteNode = (node: BSTNode | null, val: number): BSTNode | null => {
      if (!node) return null;
      
      if (val < node.value) {
        node.left = deleteNode(node.left, val);
      } else if (val > node.value) {
        node.right = deleteNode(node.right, val);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        
        let minNode = node.right;
        while (minNode.left) minNode = minNode.left;
        node.value = minNode.value;
        node.right = deleteNode(node.right, minNode.value);
      }
      return node;
    };
    
    const newRoot = deleteNode(this.root, value);
    if (newRoot !== this.root) {
      this.root = newRoot;
      return true;
    }
    return newRoot !== null;
  }
  
  /**
   * Searches the BST for the given value.
   * @param value The value to search for.
   * @returns The found node or null.
   */
  search(value: number): BSTNode | null {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return null;
  }
  
  /**
   * Returns the current BST root node.
   */
  getTree(): BSTNode | null {
    return this.root;
  }
}

export default function BSTVisualizer() {
  const [bst] = useState(() => new BinarySearchTree());
  const [tree, setTree] = useState<BSTNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  
  /**
   * Recomputes the SVG layout positions for the current tree.
   */
  const updateTree = useCallback(() => {
    const treeData = bst.getTree();
    if (treeData) {
      // Calculate positions for nodes (simple layout)
      const calculatePositions = (node: BSTNode | null, x: number, y: number, level: number) => {
        if (!node) return;
        node.x = x;
        node.y = y;
        const offset = 100 / (level + 1);
        calculatePositions(node.left, x - offset, y + 80, level + 1);
        calculatePositions(node.right, x + offset, y + 80, level + 1);
      };
      calculatePositions(treeData, 400, 60, 1);
    }
    setTree(treeData);
  }, [bst]);
  
  /**
   * Handles insertion of the current input value into the BST.
   */
  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newNode = bst.insert(value);
    if (newNode) {
      setHighlightedNode(value);
      setTimeout(() => setHighlightedNode(null), 1000);
    }
    updateTree();
    setInputValue('');
    setSearchResult(null);
  };
  
  /**
   * Handles deletion for the current input value from the BST.
   */
  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    bst.delete(value);
    updateTree();
    setInputValue('');
    setSearchResult(null);
  };
  
  /**
   * Handles searching the BST for the current input value.
   */
  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const found = bst.search(value);
    if (found) {
      setSearchResult(`Found: ${value}`);
      setHighlightedNode(value);
      setTimeout(() => setHighlightedNode(null), 1500);
    } else {
      setSearchResult(`Not found: ${value}`);
    }
  };
  
  const handleReset = () => {
    location.reload(); // Simple reset
  };
  
  const renderNode = (node: BSTNode | null): JSX.Element | null => {
    if (!node) return null;
    
    return (
      <g key={node.value}>
        {/* Lines to children */}
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        )}
        
        {/* Node circle */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="25"
          fill={highlightedNode === node.value ? '#f59e0b' : '#3b82f6'}
          stroke="#fff"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        
        {/* Node value */}
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontWeight="bold"
          fontSize="14"
        >
          {node.value}
        </text>
        
        {renderNode(node.left)}
        {renderNode(node.right)}
      </g>
    );
  };
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Binary Search Tree</h2>
      
      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          placeholder="Enter value"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button onClick={handleInsert} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Insert
        </button>
        <button onClick={handleDelete} className="btn-secondary flex items-center gap-2">
          <Trash2 size={18} /> Delete
        </button>
        <button onClick={handleSearch} className="btn-secondary flex items-center gap-2">
          <Search size={18} /> Search
        </button>
        <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={18} /> Reset
        </button>
      </div>
      
      {/* Search result */}
      {searchResult && (
        <div className={`mb-4 p-3 rounded-xl text-center ${
          searchResult.includes('Found') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {searchResult}
        </div>
      )}
      
      {/* Visualization Area */}
      <div className="h-[500px] bg-slate-50 rounded-xl overflow-hidden relative">
        <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
          {tree && renderNode(tree)}
        </svg>
        
        {!tree && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Tree is empty. Insert values to begin.
          </div>
        )}
      </div>
    </div>
  );
}