
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  exchange: string;
  sector: string;
  history: Array<{ time: string; price: number }>;
  bid: number;
  ask: number;
  peRatio: number;
  eps: number;
  dividendYield: number;
  isIPO?: boolean;
  ipoDate?: string;
}

export interface OptionContract {
  strike: number;
  type: 'call' | 'put';
  bid: number;
  ask: number;
  last: number;
  volatility: number;
  greeks: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
}

export interface GlobalIndex {
  name: string;
  value: number;
  changePercent: number;
}

export type OrderType = 'Market' | 'Limit' | 'Stop-Limit' | 'Trailing Stop' | 'Bracket';

export type ViewType = 'dashboard' | 'markets' | 'portfolio' | 'news' | 'analytics' | 'education' | 'account' | 'backtest';
