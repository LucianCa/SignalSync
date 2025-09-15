import React, { useState } from 'react';
import { TradingSignal } from '../types';
import SignalFilter from './SignalFilter';

interface SignalListProps {
  signals: TradingSignal[];
}

const SignalList: React.FC<SignalListProps> = ({ signals }) => {
  const [filteredSignals, setFilteredSignals] = useState<TradingSignal[]>(signals);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActionColor = (action: string) => {
    return action === 'BUY' ? '#4CAF50' : '#F44336';
  };

  const handleFilterChange = (filters: any) => {
    let filtered = signals;

    if (filters.symbol) {
      filtered = filtered.filter(signal =>
        signal.symbol.toLowerCase().includes(filters.symbol.toLowerCase())
      );
    }

    if (filters.action !== 'ALL') {
      filtered = filtered.filter(signal => signal.action === filters.action);
    }

    if (filters.minConfidence > 0) {
      filtered = filtered.filter(signal => signal.confidence >= filters.minConfidence);
    }

    if (filters.provider) {
      filtered = filtered.filter(signal =>
        signal.provider.toLowerCase().includes(filters.provider.toLowerCase())
      );
    }

    setFilteredSignals(filtered);
  };

  const uniqueProviders = Array.from(new Set(signals.map(signal => signal.provider)));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trading Signals</h2>
      <SignalFilter onFilterChange={handleFilterChange} providers={uniqueProviders} />
      {filteredSignals.length === 0 ? (
        <p>No signals match your filters</p>
      ) : (
        <div>
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                margin: '10px 0',
                backgroundColor: '#fff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{signal.symbol}</h3>
                <span
                  style={{
                    color: getActionColor(signal.action),
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  {signal.action}
                </span>
              </div>
              <p>Price: ${signal.price}</p>
              <p>Provider: {signal.provider}</p>
              <p>Confidence: {signal.confidence}%</p>
              {signal.targetPrice && <p>Target: ${signal.targetPrice}</p>}
              {signal.stopLoss && <p>Stop Loss: ${signal.stopLoss}</p>}
              <p style={{ fontSize: '12px', color: '#666' }}>
                {formatTime(signal.timestamp)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignalList;