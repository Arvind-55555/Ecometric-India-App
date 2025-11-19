import React from 'react';
import { ViewState } from '../types';
import { Trash2, Calculator, BrainCircuit, Leaf } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItemClass = (view: ViewState) => 
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-medium ${
      currentView === view 
        ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200' 
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600">
          <Leaf className="w-6 h-6" />
          <span className="text-lg font-bold tracking-tight text-slate-900">EcoMetric<span className="text-emerald-600">India</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <button 
            onClick={() => setView(ViewState.DASHBOARD)} 
            className={navItemClass(ViewState.DASHBOARD)}
          >
            <Trash2 className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button 
            onClick={() => setView(ViewState.CALCULATOR)} 
            className={navItemClass(ViewState.CALCULATOR)}
          >
            <Calculator className="w-4 h-4" />
            <span>Estimator</span>
          </button>
          <button 
            onClick={() => setView(ViewState.AI_ADVISOR)} 
            className={navItemClass(ViewState.AI_ADVISOR)}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Insights</span>
          </button>
        </nav>

        <div className="md:hidden">
          {/* Mobile menu toggle could go here */}
          <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-500">v1.0</span>
        </div>
      </div>
    </header>
  );
};