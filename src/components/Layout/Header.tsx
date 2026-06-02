/**
 * Header bar containing logo, navigation buttons, and external links.
 */
import React from 'react';
import { Menu, Github, Brain } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onNavigate: (module: string) => void;
  activeModule: string;
}

export default function Header({ onMenuClick, onNavigate, activeModule }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Brain className="text-blue-600" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Algo-Vis
            </span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate('sorting')}
            className={`text-slate-600 transition-colors ${activeModule === 'sorting' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
          >
            Sorting
          </button>
          <button
            type="button"
            onClick={() => onNavigate('searching')}
            className={`text-slate-600 transition-colors ${activeModule === 'searching' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
          >
            Searching
          </button>
          <button
            type="button"
            onClick={() => onNavigate('structures')}
            className={`text-slate-600 transition-colors ${activeModule === 'structures' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
          >
            Data Structures
          </button>
          <button
            type="button"
            onClick={() => onNavigate('graphs')}
            className={`text-slate-600 transition-colors ${activeModule === 'graphs' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
          >
            Graphs
          </button>
          <button
            type="button"
            onClick={() => onNavigate('compression')}
            className={`text-slate-600 transition-colors ${activeModule === 'compression' ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
          >
            Compression
          </button>
        </nav>
        
        <a
          href="https://github.com/hephzaron"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Github size={22} className="text-slate-600" />
        </a>
      </div>
    </header>
  );
}