import React, { useState, useCallback, useRef, useEffect } from 'react';
import CodePanel from '../../UI/CodePanel';
import { dataStructureCode } from '../../../data/dataStructureCode';
import { BinarySearchTree } from './BST';
import { BSTCanvas } from './BSTCanvas';
import { BSTControls } from './BSTControls';
import { BSTSearchResult } from './BSTSearchResult';
import { getFunctionLines } from '../../../utils/helpers';
import { BSTVisualizerProps } from './types';
import { InfoHint } from '../../Info/InfoHint';
import { InfoButton } from '../../Info/InfoButton';

/**
 * Visual component for interacting with a Binary Search Tree.
 * Supports insert, delete, search, and reset operations.
 * 
 * @component
 * @param {BSTVisualizerProps} props - Component props
 * @returns {JSX.Element} Rendered BST visualizer
 */
export default function BSTVisualizer({ 
  className = '',
  initialValues = []
}: BSTVisualizerProps) {
  const [bst] = useState(() => {
    const tree = new BinarySearchTree();
    // Initialize with provided values
    initialValues.forEach(value => {
      tree.insert(value);
    });
    return tree;
  });
  
  const [tree, setTree] = useState(bst.getTree());
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [viewBox, setViewBox] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  /**
   * Recomputes the SVG layout positions for the current tree.
   */
  const updateTree = useCallback(() => {
    const treeData = bst.getTree();
    if (treeData) {
      // Calculate positions using ViewOptimizer
      bst.calculatePositions(800, 500);
      // Get the viewBox from ViewOptimizer
      const newViewBox = bst.getViewBox(800, 500);
      setViewBox(newViewBox);
    }
    setTree(treeData);
  }, [bst]);

  /**
   * Scrolls to the root node using ViewOptimizer.
   */
  const scrollToRoot = useCallback(() => {
    if (!containerRef.current || !tree) return;
    const container = containerRef.current;
    const scrollPos = bst.getRootScrollPosition(
      container.clientWidth,
      container.clientHeight
    );
    container.scrollLeft = scrollPos.scrollLeft;
    container.scrollTop = scrollPos.scrollTop;
  }, [bst, tree]);

  /**
   * Handles insertion of the current input value into the BST.
   */
  const handleInsert = useCallback(() => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newNode = bst.insert(value);
    if (newNode) {
      setHighlightedNode(value);
      setActiveLines(getFunctionLines(dataStructureCode.bst, 'insert', 8));
      setTimeout(() => {
        setHighlightedNode(null);
        setActiveLines([]);
      }, 1000);
    }
    updateTree();
    setInputValue('');
    setSearchResult(null);
    inputRef.current?.focus();
  }, [bst, inputValue, updateTree]);
  
  /**
   * Handles deletion for the current input value from the BST.
   */
  const handleDelete = useCallback(() => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const deleted = bst.delete(value);
    if (deleted) {
      setSearchResult(`Deleted: ${value}`);
    } else {
      setSearchResult(`Not found: ${value}`);
    }
    updateTree();
    setActiveLines(getFunctionLines(dataStructureCode.bst, 'delete', 10));
    setTimeout(() => {
      setActiveLines([]);
      setSearchResult(null);
    }, 1000);
    setInputValue('');
    inputRef.current?.focus();
  }, [bst, inputValue, updateTree]);
  
  /**
   * Handles searching the BST for the current input value.
   */
  const handleSearch = useCallback(() => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const found = bst.search(value);
    if (found) {
      setSearchResult(`Found: ${value}`);
      setHighlightedNode(value);
      setActiveLines(getFunctionLines(dataStructureCode.bst, 'contains', 7));
      setTimeout(() => {
        setHighlightedNode(null);
        setActiveLines([]);
      }, 1500);
    } else {
      setSearchResult(`Not found: ${value}`);
      setActiveLines(getFunctionLines(dataStructureCode.bst, 'contains', 7));
      setTimeout(() => {
        setActiveLines([]);
        setSearchResult(null);
      }, 1500);
    }
    inputRef.current?.focus();
  }, [bst, inputValue]);
  
  /**
   * Handles resetting the tree.
   */
  const handleReset = useCallback(() => {
    bst.clear();
    updateTree();
    setInputValue('');
    setSearchResult(null);
    setHighlightedNode(null);
    setActiveLines([]);
    inputRef.current?.focus();
  }, [bst, updateTree]);

  /**
   * Handles keyboard events on the input field.
   */
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInsert();
    }
  }, [handleInsert]);

  // Initial tree render
  useEffect(() => {
    updateTree();
  }, [updateTree]);

  // Scroll to root after updates
  useEffect(() => {
    if (tree) {
      setTimeout(scrollToRoot, 150);
    }
  }, [tree, scrollToRoot]);


  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <InfoHint position="left" duration={4000} repeatDelay={4000} 
              isHovered={isHovered}/>
          </div>
          <InfoButton noteFile="bst.md" title="Binary Search Tree" />
        </div>
      <h2 className="text-2xl font-bold mb-4">Binary Search Tree</h2>
      
      <BSTControls
        inputValue={inputValue}
        inputRef={inputRef}
        onInputChange={setInputValue}
        onInsert={handleInsert}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onReset={handleReset}
        onKeyPress={handleKeyPress}
      />
      
      <BSTSearchResult searchResult={searchResult} />
      
      <BSTCanvas
        tree={tree}
        highlightedNode={highlightedNode}
        searchResult={searchResult}
        viewBox={viewBox}
        onScrollToRoot={scrollToRoot}
      />

      <div className="mt-6">
        <CodePanel title="BST" code={dataStructureCode.bst} activeLines={activeLines} />
      </div>
    </div>
  );
}