
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMarketAnalysis = async (stockSymbol: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 2-sentence professional market outlook for ${stockSymbol}. Focus on current trends, volatility and target price sentiment.`,
    });
    return response.text || "Market data analysis unavailable.";
  } catch (error) {
    return "Unable to generate AI insights.";
  }
};

export const runBacktestAnalysis = async (strategy: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Simulate a backtest for this strategy: "${strategy}". Provide a hypothetical win rate, max drawdown, and a 1-sentence summary of effectiveness over the last 5 years of S&P 500 data. Format: {winRate: string, drawdown: string, summary: string}`,
    });
    // This would normally be parsed as JSON, but for this mock we return a string
    return response.text || "Simulation complete: High volatility detected.";
  } catch {
    return "Backtest engine timeout.";
  }
};

export const getPortfolioOptimization = async (portfolioData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a diversification strategy for a $150k portfolio heavily weighted in NVDA and BTC to reduce VaR by 20%.`,
    });
    return response.text || "Reallocate 15% to defensive commodities like Gold.";
  } catch {
    return "Optimization engine offline.";
  }
};
