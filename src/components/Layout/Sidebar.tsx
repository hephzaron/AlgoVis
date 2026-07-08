/**
 * Collapsible sidebar menu for module and algorithm selection.
 */
import { X, ChevronRight, ArrowRightLeft, Search, Database, Network, FileCode } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: string;
  onModuleChange: (module: string) => void;
  activeAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
}

const modules = [
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    icon: ArrowRightLeft,
    algorithms: [
      { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
      { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
      { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
      { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
      { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)' },
      { id: 'heap', name: 'Heap Sort', complexity: 'O(n log n)' },
    ]
  },
  {
    id: 'searching',
    name: 'Searching Algorithms',
    icon: Search,
    algorithms: [
      { id: 'linear', name: 'Linear Search', complexity: 'O(n)' },
      { id: 'binary', name: 'Binary Search', complexity: 'O(log n)' },
    ]
  },
  {
    id: 'structures',
    name: 'Data Structures',
    icon: Database,
    algorithms: [
      { id: 'array', name: 'Array', complexity: 'O(1)' },
      { id: 'stack', name: 'Stack', complexity: 'O(1)' },
      { id: 'queue', name: 'Queue', complexity: 'O(1)' },
      { id: 'bst', name: 'Binary Search Tree', complexity: 'O(log n)' },
      { id: 'hash', name: 'Hash Table', complexity: 'O(1)' },
      { id: 'linkedList', name: 'Linked List', complexity: 'O(n)' },
      { id: 'graph', name: 'Graph', complexity: 'O(V + E)' },
      { id: 'heap', name: 'Heap', complexity: 'O(log n)' },
    ]
  },
  {
    id: 'graphAlgorithms',
    name: 'Graph Algorithms',
    icon: Network,
    algorithms: [
      { id: 'dijkstra', name: "Dijkstra's", complexity: 'O(V²)' },
      { id: 'bfs', name: 'Breadth-First Search', complexity: 'O(V+E)' },
      { id: 'bst-bfs', name: 'BFS on BST', complexity: 'O(n)' },
      { id: 'dfs', name: 'Depth-First Search', complexity: 'O(V+E)' },
    ]
  },
  {
    id: 'compression',
    name: 'Compression',
    icon: FileCode,
    algorithms: [
      { id: 'huffman', name: 'Huffman Coding', complexity: 'O(n log n)' },
    ]
  }
];

export default function Sidebar({
  isOpen,
  onClose,
  activeModule,
  onModuleChange,
  activeAlgorithm,
  onAlgorithmChange
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100%-4rem)] w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300
        lg:top-0 lg:h-full lg:translate-x-0 lg:relative lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div key={module.id}>
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    activeModule === module.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium">{module.name}</span>
                  </div>
                  <ChevronRight size={16} className={activeModule === module.id ? 'rotate-90' : ''} />
                </button>
                
                {activeModule === module.id && (
                  <div className="ml-4 mt-2 space-y-1">
                    {module.algorithms.map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => onAlgorithmChange(algo.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                          activeAlgorithm === algo.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{algo.name}</span>
                          <span className="text-xs text-slate-400 font-mono">{algo.complexity}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}