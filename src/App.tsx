/**
 * Main application component for Algo-Vis.
 * Manages the current selected module, the active algorithm,
 * and renders the matching visualizer screen.
 */
import { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import SortingVisualizer from './components/Visualizers/SortingVisualizer';
import SearchingVisualizer from './components/Visualizers/SearchingVisualizer.tsx';
import StackVisualizer from './components/Visualizers/StackVisualizer';
import QueueVisualizer from './components/Visualizers/QueueVisualizer';
import BSTVisualizer from './components/Visualizers/BSTVisualizer';
import HuffmanVisualizer from './components/Visualizers/HuffmanVisualizer';
import { SortingAlgorithm, SearchingAlgorithm } from './types';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('sorting');
  const [activeAlgorithm, setActiveAlgorithm] = useState<SortingAlgorithm | SearchingAlgorithm | string>('quick');

  /**
   * Switches the current top-level module and resets
   * the active algorithm to a default for that module.
   */
  const handleModuleChange = (module: string) => {
    setActiveModule(module);
    switch (module) {
      case 'sorting':
        setActiveAlgorithm('quick');
        break;
      case 'searching':
        setActiveAlgorithm('linear');
        break;
      case 'structures':
        setActiveAlgorithm('stack');
        break;
      case 'compression':
        setActiveAlgorithm('huffman');
        break;
      default:
        setActiveAlgorithm('quick');
    }
  };
  
  /**
   * Renders the visualizer that corresponds to the selected module.
   */
  const renderVisualizer = () => {
    switch (activeModule) {
      case 'sorting':
        return <SortingVisualizer algorithm={activeAlgorithm as SortingAlgorithm} />;
      case 'searching':
        return <SearchingVisualizer algorithm={activeAlgorithm as SearchingAlgorithm} />;
      case 'structures':
        switch (activeAlgorithm) {
          case 'stack':
            return <StackVisualizer />;
          case 'queue':
            return <QueueVisualizer />;
          case 'bst':
            return <BSTVisualizer />;
          default:
            return <div className="card text-center py-20">Coming soon...</div>;
        }
      case 'compression':
        return <HuffmanVisualizer />;
      default:
        return (
          <div className="card text-center py-20">
            <p className="text-slate-500">More visualizers coming soon...</p>
            <p className="text-sm text-slate-400 mt-2">Check back for updates!</p>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onNavigate={handleModuleChange}
        activeModule={activeModule}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeModule={activeModule}
            onModuleChange={handleModuleChange}
            activeAlgorithm={activeAlgorithm}
            onAlgorithmChange={(algo) => setActiveAlgorithm(algo)}
          />
          
          <main className="flex-1 min-w-0">
            {renderVisualizer()}
          </main>
        </div>
      </div>
      
      <footer className="border-t border-slate-200 mt-12 py-6 text-center text-slate-500 text-sm">
        <p>Algo-Vis | Interactive Algorithm Visualizer</p>
        <p className="mt-1">Built with React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;