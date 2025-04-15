import React from 'react';
import { TradingSignal } from '../types';

interface SignalListProps {
  signals: TradingSignal[];
}

const SignalList: React.FC<SignalListProps> = ({ signals }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActionColor = (action: string) => {
    return action === 'BUY' ? '#4CAF50' : '#F44336';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trading Signals</h2>
      {signals.length === 0 ? (
        <p>No signals available</p>
      ) : (
        <div>
          {signals.map((signal) => (
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