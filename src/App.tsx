import React, { useState } from 'react';
import SignalList from './components/SignalList';
import ProviderList from './components/ProviderList';
import WalletConnect from './components/WalletConnect';
import { TradingSignal, SignalProvider } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'signals' | 'providers'>('signals');

  const mockSignals: TradingSignal[] = [
    {
      id: '1',
      symbol: 'BTC/USDT',
      action: 'BUY',
      price: 43500,
      timestamp: Date.now() - 3600000,
      provider: 'CryptoMaster',
      confidence: 85,
      targetPrice: 45000,
      stopLoss: 42000
    },
    {
      id: '2',
      symbol: 'ETH/USDT',
      action: 'SELL',
      price: 2650,
      timestamp: Date.now() - 1800000,
      provider: 'TradingBot Pro',
      confidence: 72
    }
  ];

  const mockProviders: SignalProvider[] = [
    {
      id: '1',
      name: 'CryptoMaster',
      reputation: 87,
      totalSignals: 1250,
      successRate: 73,
      isActive: true
    },
    {
      id: '2',
      name: 'TradingBot Pro',
      reputation: 62,
      totalSignals: 890,
      successRate: 68,
      isActive: true
    },
    {
      id: '3',
      name: 'AI Trader',
      reputation: 91,
      totalSignals: 2100,
      successRate: 81,
      isActive: false
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2196F3', color: 'white', padding: '20px', textAlign: 'center', position: 'relative' }}>
        <WalletConnect />
        <h1>SignalSync</h1>
        <p>Decentralized Crypto Trading Signals</p>
        <nav style={{ marginTop: '20px' }}>
          <button
            onClick={() => setActiveTab('signals')}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: activeTab === 'signals' ? '#fff' : 'transparent',
              color: activeTab === 'signals' ? '#2196F3' : '#fff',
              cursor: 'pointer'
            }}
          >
            Signals
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: activeTab === 'providers' ? '#fff' : 'transparent',
              color: activeTab === 'providers' ? '#2196F3' : '#fff',
              cursor: 'pointer'
            }}
          >
            Providers
          </button>
        </nav>
      </header>
      {activeTab === 'signals' ? (
        <SignalList signals={mockSignals} />
      ) : (
        <ProviderList providers={mockProviders} />
      )}
    </div>
  );
}

export default App;