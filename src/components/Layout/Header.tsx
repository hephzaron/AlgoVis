import React from 'react';
import { Menu, Github, Brain } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
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
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Sorting</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Searching</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Data Structures</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Graphs</a>
        </nav>
        
        <a
          href="https://github.com"
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