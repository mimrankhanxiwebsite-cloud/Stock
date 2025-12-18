
import { Stock, NewsItem, GlobalIndex } from './types';

const generateHistory = (base: number, length: number = 20) => 
  Array.from({ length }, (_, i) => ({ 
    time: `${i}:00`, 
    price: base + Math.random() * (base * 0.05) 
  }));

export const INITIAL_STOCKS: Stock[] = [
  {
    symbol: 'NVDA', name: 'NVIDIA Corporation', price: 135.58, change: 2.45, changePercent: 1.84,
    volume: '245.2M', marketCap: '3.34T', exchange: 'NASDAQ', sector: 'Technology',
    history: generateHistory(130), bid: 135.55, ask: 135.61, peRatio: 74.2, eps: 1.80, dividendYield: 0.02
  },
  {
    symbol: 'AAPL', name: 'Apple Inc.', price: 228.12, change: -1.22, changePercent: -0.53,
    volume: '54.8M', marketCap: '3.49T', exchange: 'NASDAQ', sector: 'Technology',
    history: generateHistory(220), bid: 228.10, ask: 228.15, peRatio: 33.1, eps: 6.57, dividendYield: 0.44
  },
  {
    symbol: 'BTC', name: 'Bitcoin', price: 64205.12, change: 1204.50, changePercent: 1.91,
    volume: '34.2B', marketCap: '1.26T', exchange: 'Crypto', sector: 'Web3',
    history: generateHistory(63000), bid: 64200.0, ask: 64210.0, peRatio: 0, eps: 0, dividendYield: 0
  },
  {
    symbol: 'GOLD', name: 'Spot Gold', price: 2342.10, change: 15.40, changePercent: 0.66,
    volume: '1.2M', marketCap: '14T', exchange: 'COMEX', sector: 'Commodities',
    history: generateHistory(2300), bid: 2341.50, ask: 2342.50, peRatio: 0, eps: 0, dividendYield: 0
  },
  {
    symbol: 'STRIPE', name: 'Stripe Inc.', price: 24.50, change: 0, changePercent: 0,
    volume: '0', marketCap: '65B', exchange: 'NASDAQ', sector: 'Fintech',
    history: generateHistory(24, 5), bid: 0, ask: 0, peRatio: 0, eps: 0, dividendYield: 0,
    isIPO: true, ipoDate: 'Oct 2024'
  }
];

export const GLOBAL_INDICES: GlobalIndex[] = [
  { name: 'S&P 500', value: 5633.22, changePercent: 0.12 },
  { name: 'NASDAQ', value: 17882.10, changePercent: -0.34 },
  { name: 'FTSE 100', value: 8214.50, changePercent: 0.82 },
  { name: 'NIKKEI 225', value: 38240.22, changePercent: 1.15 }
];

export const SECTORS = [
  { name: 'Technology', performance: 2.4, status: 'Bullish' },
  { name: 'Energy', performance: -1.2, status: 'Bearish' },
  { name: 'Finance', performance: 0.8, status: 'Neutral' },
  { name: 'Healthcare', performance: 1.5, status: 'Bullish' },
  { name: 'Web3', performance: 4.2, status: 'Volatility' }
];

export const EDUCATIONAL_MODULES = [
  { id: '1', title: 'Introduction to Options Greeks', level: 'Intermediate', duration: '15 min' },
  { id: '2', title: 'Mastering Fibonacci Retracements', level: 'Advanced', duration: '25 min' },
  { id: '3', title: 'Risk Management for Day Traders', level: 'Beginner', duration: '10 min' }
];

// Mock news data for the news section
export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Hits All-Time High on AI Infrastructure Demand',
    summary: 'Data center revenue continues to surprise analysts as global demand for Blackwell chips remains