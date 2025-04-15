import axios from 'axios';
import { TradingSignal, SignalProvider } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const signalService = {
  async getSignals(): Promise<TradingSignal[]> {
    try {
      const response = await api.get('/signals');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch signals:', error);
      return [];
    }
  },

  async getSignalsByProvider(providerId: string): Promise<TradingSignal[]> {
    try {
      const response = await api.get(`/signals/provider/${providerId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch provider signals:', error);
      return [];
    }
  },

  async submitSignal(signal: Omit<TradingSignal, 'id' | 'timestamp'>): Promise<boolean> {
    try {
      await api.post('/signals', {
        ...signal,
        timestamp: Date.now()
      });
      return true;
    } catch (error) {
      console.error('Failed to submit signal:', error);
      return false;
    }
  }
};

export const providerService = {
  async getProviders(): Promise<SignalProvider[]> {
    try {
      const response = await api.get('/providers');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch providers:', error);
      return [];
    }
  },

  async getProviderById(id: string): Promise<SignalProvider | null> {
    try {
      const response = await api.get(`/providers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch provider:', error);
      return null;
    }
  },

  async updateProviderReputation(id: string, reputation: number): Promise<boolean> {
    try {
      await api.patch(`/providers/${id}/reputation`, { reputation });
      return true;
    } catch (error) {
      console.error('Failed to update provider reputation:', error);
      return false;
    }
  }
};

export const subscriptionService = {
  async subscribe(providerId: string): Promise<boolean> {
    try {
      await api.post(`/subscriptions/${providerId}`);
      return true;
    } catch (error) {
      console.error('Failed to subscribe:', error);
      return false;
    }
  },

  async unsubscribe(providerId: string): Promise<boolean> {
    try {
      await api.delete(`/subscriptions/${providerId}`);
      return true;
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      return false;
    }
  },

  async getSubscriptions(): Promise<string[]> {
    try {
      const response = await api.get('/subscriptions');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
      return [];
    }
  }
};