// components/GraphVisualizer/constants.ts

import { LayoutConfig, NodeColorMap } from './types';

/**
 * Default layout configuration with improved settings.
 */
export const defaultLayoutConfig: LayoutConfig = {
  iterations: 100,           // More iterations for better layout
  springConstant: 0.05,      // Lower spring constant for less overlap
  repulsionConstant: 200,    // Higher repulsion to spread nodes
  canvasWidth: 750,
  canvasHeight: 550,
  margin: 50
};

/**
 * Node color mapping based on degree.
 */
export const nodeColors: NodeColorMap = {
  high: 'bg-red-500',
  medium: 'bg-orange-500',
  low: 'bg-blue-500',
  selected: 'ring-4 ring-yellow-500 scale-110 bg-purple-600'
};

/**
 * Gets the appropriate color for a node based on its degree.
 * @param {string} nodeId - The node ID.
 * @param {string | null} selectedNodeId - The currently selected node ID.
 * @param {number} degree - The node's degree.
 * @returns {string} CSS class string for styling.
 */
export function getNodeColorClass(
  nodeId: string, 
  selectedNodeId: string | null, 
  degree: number
): string {
  if (nodeId === selectedNodeId) return nodeColors.selected;
  if (degree > 3) return nodeColors.high;
  if (degree > 1) return nodeColors.medium;
  return nodeColors.low;
}

/**
 * Helper to find the line numbers for a function in the graph code.
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