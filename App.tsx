
import React, { useState, useEffect } from 'react';
import { Stock, ViewType } from './types';
import { INITIAL_STOCKS, MOCK_NEWS } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Markets from './components/Markets';
import Portfolio from './components/Portfolio';
import NewsSection from './components/NewsSection';
import Analytics from './components/Analytics';
import EducationHub from './components/EducationHub';
import BacktestTool from './components/BacktestTool';
import StockDetail from './components/StockDetail';
import TradeModal from './components/TradeModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        const vol = stock.exchange === 'Crypto' ? 0.01 : 0.003;
        const changeFactor = 1 + (Math.random() * vol * 2 - vol);
        const newPrice = stock.price * changeFactor;
        return {
          ...stock,
          price: parseFloat(newPrice.toFixed(2)),
          bid: parseFloat((newPrice * 0.9995).toFixed(2)),
          ask: parseFloat((newPrice * 1.0005).toFixed(2)),
          history: [...stock.history.slice(1), { time: new Date().toLocaleTimeString(), price: newPrice }]
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (selectedStock && !isTradeModalOpen) {
      return <StockDetail stock={selectedStock} onClose={() => setSelectedStock(null)} onTrade={() => setIsTradeModalOpen(true)} />;
    }

    switch (currentView) {
      case 'dashboard': return <Dashboard stocks={stocks} onSelect={setSelectedStock} />;
      case 'markets': return <Markets stocks={stocks} onSelect={setSelectedStock} />;
      case 'portfolio': return <Portfolio stocks={stocks} />;
      case 'news': return <NewsSection news={MOCK_NEWS} />;
      case 'analytics': return <Analytics stocks={stocks} />;
      case 'education': return <EducationHub />;
      case 'backtest': return <BacktestTool />;
      case 'account': return <div className="p-8 text-center text-slate-400">Zenith Pro Account Profile</div>;
      default: return <Dashboard stocks={stocks} onSelect={setSelectedStock} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pb-20 md:pb-0 font-sans">
      <Header onSearch={setSelectedStock} stocks={stocks} />
      <main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>
      <BottomNav activeView={currentView} setView={setCurrentView} />
      {isTradeModalOpen && selectedStock && (
        <TradeModal stock={selectedStock} onClose={() => setIsTradeModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
