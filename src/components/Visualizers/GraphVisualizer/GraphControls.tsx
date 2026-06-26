
import React, { RefObject } from 'react';
import { Plus, Minus, Link, GitBranch, Trash2 } from 'lucide-react';
import { GraphLayoutSlider } from './GraphLayoutSlider';

interface GraphControlsProps {
  nodeId: string;
  nodeValue: string;
  fromId: string;
  toId: string;
  nodeIdRef: RefObject<HTMLInputElement>;
  nodeValueRef: RefObject<HTMLInputElement>;
  fromIdRef: RefObject<HTMLInputElement>;
  toIdRef: RefObject<HTMLInputElement>;
  layoutSpread: number;
  onNodeIdChange: (value: string) => void;
  onNodeValueChange: (value: string) => void;
  onFromIdChange: (value: string) => void;
  onToIdChange: (value: string) => void;
  onAddNode: () => void;
  onRemoveNode: () => void;
  onAddEdge: () => void;
  onRemoveEdge: () => void;
  onRunLayout: () => void;
  onLayoutSpreadChange: (value: number) => void;
  onClear: () => void;
  onNodeIdKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onNodeValueKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFromIdKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onToIdKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  nodeId,
  nodeValue,
  fromId,
  toId,
  nodeIdRef,
  nodeValueRef,
  fromIdRef,
  toIdRef,
  layoutSpread,
  onNodeIdChange,
  onNodeValueChange,
  onFromIdChange,
  onToIdChange,
  onAddNode,
  onRemoveNode,
  onAddEdge,
  onRemoveEdge,
  onRunLayout,
  onLayoutSpreadChange,
  onClear,
  onNodeIdKeyPress,
  onNodeValueKeyPress,
  onFromIdKeyPress,
  onToIdKeyPress
}) => {
  return (
    <>
      {/* Node Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          ref={nodeIdRef}
          type="text"
          value={nodeId}
          onChange={(e) => onNodeIdChange(e.target.value)}
          onKeyDown={onNodeIdKeyPress}
          placeholder="Node ID"
          className="flex-1 min-w-[100px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={nodeValueRef}
          type="number"
          value={nodeValue}
          onChange={(e) => onNodeValueChange(e.target.value)}
          onKeyDown={onNodeValueKeyPress}
          placeholder="Value"
          className="flex-1 min-w-[100px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={onAddNode} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Node
        </button>
        <button onClick={onRemoveNode} className="btn-secondary flex items-center gap-2">
          <Minus size={18} /> Remove Node
        </button>
      </div>

      {/* Edge Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          ref={fromIdRef}
          type="text"
          value={fromId}
          onChange={(e) => onFromIdChange(e.target.value)}
          onKeyDown={onFromIdKeyPress}
          placeholder="From ID"
          className="flex-1 min-w-[100px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={toIdRef}
          type="text"
          value={toId}
          onChange={(e) => onToIdChange(e.target.value)}
          onKeyDown={onToIdKeyPress}
          placeholder="To ID"
          className="flex-1 min-w-[100px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={onAddEdge} className="btn-primary flex items-center gap-2">
          <Link size={18} /> Add Edge
        </button>
        <button onClick={onRemoveEdge} className="btn-secondary flex items-center gap-2">
          <Link size={18} /> Remove Edge
        </button>
      </div>

      {/* Layout Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button onClick={onRunLayout} className="btn-primary flex items-center gap-2">
          <GitBranch size={18} /> Re-layout
        </button>
        
        {/* Slider Control*/}
        <div className="flex-1 min-w-[200px]">
          <GraphLayoutSlider
            value={layoutSpread}
            onChange={onLayoutSpreadChange}
            min={0}
            max={100}
            step={1}
            disabled={false}
          />
        </div>
        
        <button onClick={onClear} className="btn-secondary flex items-center gap-2">
          <Trash2 size={18} /> Clear
        </button>
      </div>
    </>
  );
};