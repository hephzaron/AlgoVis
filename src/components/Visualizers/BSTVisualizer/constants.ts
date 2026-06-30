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