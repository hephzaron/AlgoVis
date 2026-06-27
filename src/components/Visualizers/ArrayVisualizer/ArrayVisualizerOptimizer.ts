
/**
 * Configuration for array visualization
 */
export interface ArrayVisualizationConfig {
  /** Maximum number of elements to display per row */
  elementsPerRow?: number;
  /** Size of each element box in pixels */
  elementSize?: number;
  /** Padding between elements in pixels */
  elementPadding?: number;
  /** Maximum height for the array container */
  maxHeight?: number;
}

/**
 * Array element styling information
 */
export interface ArrayElementStyle {
  /** Width of the element in pixels */
  width: number;
  /** Height of the element in pixels */
  height: number;
  /** Font size for the element text */
  fontSize: number;
  /** Background color based on state */
  backgroundColor: string;
  /** Border color based on state */
  borderColor: string;
  /** Additional CSS classes */
  className: string;
}

/**
 * Calculates element size based on array length
 */
export function calculateElementSize(
  arrayLength: number,
  config: ArrayVisualizationConfig = {}
): number {
  const {
    elementsPerRow = 10,
    elementSize = 60,
    elementPadding = 8,
    maxHeight = 400,
  } = config;

  // Calculate available width
  const availableWidth = window.innerWidth - 80; // Account for padding
  const maxElementsPerRow = Math.min(elementsPerRow, arrayLength || 10);
  
  // Calculate size based on width constraints
  const widthBasedSize = (availableWidth - (maxElementsPerRow + 1) * elementPadding) / maxElementsPerRow;
  
  // Calculate size based on height constraints
  const rows = Math.ceil(arrayLength / maxElementsPerRow);
  const heightBasedSize = (maxHeight - (rows + 1) * elementPadding) / rows;
  
  // Take the minimum and clamp
  const optimalSize = Math.min(widthBasedSize, heightBasedSize, elementSize);
  return Math.max(30, Math.min(80, optimalSize));
}

/**
 * Calculates font size based on element size
 */
export function calculateArrayFontSize(elementSize: number): number {
  return Math.max(10, Math.round(elementSize * 0.45));
}

/**
 * Gets the style for an array element
 */
export function getArrayElementStyle(
  value: any,
  index: number,
  highlightIndices: number[],
  elementSize: number
): ArrayElementStyle {
  const isHighlighted = highlightIndices.includes(index);
  const isEmpty = value === undefined || value === null;
  
  return {
    width: elementSize,
    height: elementSize,
    fontSize: calculateArrayFontSize(elementSize),
    backgroundColor: isHighlighted 
      ? 'bg-yellow-400' 
      : isEmpty 
        ? 'bg-gray-200' 
        : index === 0 
          ? 'bg-purple-500' 
          : index % 2 === 0 
            ? 'bg-blue-500' 
            : 'bg-blue-600',
    borderColor: isHighlighted 
      ? 'border-yellow-600' 
      : isEmpty 
        ? 'border-gray-300' 
        : 'border-blue-700',
    className: `transition-all duration-300 ${isHighlighted ? 'scale-110' : ''}`,
  };
}

/**
 * Calculates array layout information
 */
export function calculateArrayLayout(
  arrayLength: number,
  elementSize: number,
  config: ArrayVisualizationConfig = {}
): {
  elementsPerRow: number;
  rows: number;
  containerHeight: number;
} {
  const { elementsPerRow = 10, elementPadding = 8 } = config;
  
  const perRow = Math.min(elementsPerRow, arrayLength || 10);
  const rows = Math.ceil(arrayLength / perRow);
  const containerHeight = rows * (elementSize + elementPadding) + elementPadding * 2;
  
  return {
    elementsPerRow: perRow,
    rows: rows,
    containerHeight: Math.max(100, containerHeight),
  };
}

/**
 * Generates a unique key for an array element
 */
export function getArrayElementKey(index: number): string {
  return `array-element-${index}`;
}

/**
 * Formats a value for display
 */
export function formatArrayValue(value: any): string {
  if (value === undefined || value === null) return '∅';
  if (typeof value === 'string') return value.length > 4 ? value.substring(0, 4) + '…' : value;
  if (typeof value === 'number') return value.toString();
  return String(value);
}

/**
 * Gets the display status of an array index
 */
export function getIndexStatus(
  index: number,
  arrayLength: number,
  capacity: number
): 'valid' | 'empty' | 'undefined' {
  if (index < arrayLength) return 'valid';
  if (index < capacity) return 'empty';
  return 'undefined';
}

/**
 * Generates index labels for visualization
 */
export function generateIndexLabels(
  arrayLength: number,
  elementsPerRow: number
): number[] {
  const labels: number[] = [];
  for (let i = 0; i < arrayLength; i++) {
    labels.push(i);
  }
  return labels;
}