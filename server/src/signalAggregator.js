const axios = require('axios');
const cron = require('node-cron');

class SignalAggregator {
  constructor() {
    this.providers = [
      {
        id: 'binance-signals',
        url: 'https://api.binance.com/api/v3/ticker/price',
        active: true
      },
      {
        id: 'coingecko-trends',
        url: 'https://api.coingecko.com/api/v3/search/trending',
        active: true
      }
    ];
    this.signals = [];
  }

  async fetchBinanceTrend() {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
      const topGainers = response.data
        .filter(ticker => parseFloat(ticker.priceChangePercent) > 5)
        .sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
        .slice(0, 3);

      return topGainers.map(ticker => ({
        id: `binance_${ticker.symbol}_${Date.now()}`,
        symbol: ticker.symbol,
        action: 'BUY',
        price: parseFloat(ticker.lastPrice),
        timestamp: Date.now(),
        provider: 'Binance Trends',
        confidence: Math.min(85, Math.floor(parseFloat(ticker.priceChangePercent) * 3 + 60)),
        metadata: {
          priceChange: ticker.priceChangePercent,
          volume: ticker.volume
        }
      }));
    } catch (error) {
      console.error('Error fetching Binance trends:', error.message);
      return [];
    }
  }

  async fetchCoinGeckoTrending() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      const trending = response.data.coins.slice(0, 2);

      return trending.map(coin => ({
        id: `coingecko_${coin.item.symbol}_${Date.now()}`,
        symbol: `${coin.item.symbol.toUpperCase()}/USDT`,
        action: 'BUY',
        price: 0,
        timestamp: Date.now(),
        provider: 'CoinGecko Trending',
        confidence: 70,
        metadata: {
          rank: coin.item.market_cap_rank,
          name: coin.item.name
        }
      }));
    } catch (error) {
      console.error('Error fetching CoinGecko trends:', error.message);
      return [];
    }
  }

  generateMockSignals() {
    const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'SOL/USDT'];
    const actions = ['BUY', 'SELL'];
    const providers = ['AI Predictor', 'Technical Analysis Bot', 'Sentiment Analyzer'];

    const signal = {
      id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      price: Math.floor(Math.random() * 100000) / 100,
      timestamp: Date.now(),
      provider: providers[Math.floor(Math.random() * providers.length)],
      confidence: Math.floor(Math.random() * 40) + 60,
      targetPrice: Math.floor(Math.random() * 100000) / 100,
      stopLoss: Math.floor(Math.random() * 100000) / 100
    };

    return [signal];
  }

  async aggregateSignals() {
    console.log('Starting signal aggregation...');

    try {
      const [binanceSignals, geckoSignals, mockSignals] = await Promise.all([
        this.fetchBinanceTrend(),
        this.fetchCoinGeckoTrending(),
        Promise.resolve(this.generateMockSignals())
      ]);

      const allSignals = [...binanceSignals, ...geckoSignals, ...mockSignals];

      for (const signal of allSignals) {
        try {
          await axios.post('http://localhost:3001/api/signals', signal);
          console.log(`Posted signal: ${signal.symbol} ${signal.action}`);
        } catch (error) {
          console.error('Error posting signal:', error.message);
        }
      }

      console.log(`Aggregated ${allSignals.length} signals`);
    } catch (error) {
      console.error('Error in signal aggregation:', error.message);
    }
  }

  startScheduled() {
    cron.schedule('*/5 * * * *', () => {
      this.aggregateSignals();
    });

    console.log('Signal aggregator started - running every 5 minutes');

    this.aggregateSignals();
  }
}

module.exports = SignalAggregator;