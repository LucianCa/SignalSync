import React from 'react';
import { SignalProvider } from '../types';

interface ProviderCardProps {
  provider: SignalProvider;
  isSubscribed: boolean;
  onSubscribe: (providerId: string) => void;
  onUnsubscribe: (providerId: string) => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  isSubscribed,
  onSubscribe,
  onUnsubscribe
}) => {
  const handleSubscriptionToggle = () => {
    if (isSubscribed) {
      onUnsubscribe(provider.id);
    } else {
      onSubscribe(provider.id);
    }
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 80) return '#4CAF50';
    if (reputation >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '300px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0 }}>{provider.name}</h3>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: provider.isActive ? '#4CAF50' : '#999'
          }}
          title={provider.isActive ? 'Active' : 'Inactive'}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Reputation:</span>
          <span style={{ color: getReputationColor(provider.reputation), fontWeight: 'bold' }}>
            {provider.reputation}/100
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Success Rate:</span>
          <span>{provider.successRate}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Total Signals:</span>
          <span>{provider.totalSignals}</span>
        </div>
      </div>

      <button
        onClick={handleSubscriptionToggle}
        style={{
          width: '100%',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: isSubscribed ? '#F44336' : '#2196F3',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
};

export default ProviderCard;