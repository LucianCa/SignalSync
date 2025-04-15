export interface TradingSignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL';
  price: number;
  timestamp: number;
  provider: string;
  confidence: number;
  targetPrice?: number;
  stopLoss?: number;
}

export interface SignalProvider {
  id: string;
  name: string;
  reputation: number;
  totalSignals: number;
  successRate: number;
  isActive: boolean;
}

export interface UserSubscription {
  providerId: string;
  isSubscribed: boolean;
  subscriptionDate: number;
}