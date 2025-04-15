import React, { useState } from 'react';
import { SignalProvider, UserSubscription } from '../types';
import ProviderCard from './ProviderCard';

interface ProviderListProps {
  providers: SignalProvider[];
}

const ProviderList: React.FC<ProviderListProps> = ({ providers }) => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);

  const isSubscribed = (providerId: string): boolean => {
    return subscriptions.some(sub => sub.providerId === providerId && sub.isSubscribed);
  };

  const handleSubscribe = (providerId: string) => {
    setSubscriptions(prev => {
      const existing = prev.find(sub => sub.providerId === providerId);
      if (existing) {
        return prev.map(sub =>
          sub.providerId === providerId
            ? { ...sub, isSubscribed: true, subscriptionDate: Date.now() }
            : sub
        );
      } else {
        return [...prev, {
          providerId,
          isSubscribed: true,
          subscriptionDate: Date.now()
        }];
      }
    });
  };

  const handleUnsubscribe = (providerId: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.providerId === providerId
          ? { ...sub, isSubscribed: false }
          : sub
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signal Providers</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {providers.map(provider => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            isSubscribed={isSubscribed(provider.id)}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
          />
        ))}
      </div>
    </div>
  );
};

export default ProviderList;