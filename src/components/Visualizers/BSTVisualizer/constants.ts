// components/Visualizers/BSTVisualizer/constants.ts

import { NodeColorMap } from './types';

/**
 * Node color mapping based on state.
 */
export const nodeColors: NodeColorMap = {
  default: '#3b82f6',
  highlighted: '#f59e0b',
  found: '#22c55e',
  notFound: '#ef4444'
};

/**
 * Default canvas dimensions.
 */
export const CANVAS_CONFIG = {
  width: 800,
  height: 500,
  nodeRadius: 25,
  defaultX: 400,
  defaultY: 60,
  levelHeight: 80
};

/**
 * Helper to find the line numbers for a function in the BST code.
 */
export function getFunctionLines(code: string, fnName: string, bodyLines = 1): number[] {
  const lines = code.split('\n');
  const result: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`def ${fnName}(`)) {
      result.push(i + 1);
      for (let j = 1; j <= bodyLines && i + j < lines.length; j++) {
        if (lines[i + j].trim() !== '') result.push(i + j + 1);
      }
      break;
    }
  }
  return result;
}

/**
 * Gets the color for a node based on its state.
 */
export function getNodeColor(
  nodeValue: number,
  highlightedNode: number | null,
  searchResult: string | null
): string {
  if (highlightedNode === nodeValue) {
    if (searchResult?.includes('Found')) {
      return nodeColors.found;
    }
    if (searchResult?.includes('Not found')) {
      return nodeColors.notFound;
    }
    return nodeColors.highlighted;
  }
  return nodeColors.default;
}