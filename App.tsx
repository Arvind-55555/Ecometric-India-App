import React, { useState } from 'react';
import { ViewState } from './types';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CalculatorComp } from './components/Calculator';
import { AiAdvisor } from './components/AiAdvisor';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.CALCULATOR:
        return <CalculatorComp />;
      case ViewState.AI_ADVISOR:
        return <AiAdvisor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="animate-in fade-in duration-500 slide-in-from-bottom-4">
        {renderView()}
      </main>
    </div>
  );
}

export default App;