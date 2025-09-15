const express = require('express');
const router = express.Router();

let providers = [
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

router.get('/', (req, res) => {
  res.json(providers);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const provider = providers.find(p => p.id === id);

  if (!provider) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  res.json(provider);
});

router.patch('/:id/reputation', (req, res) => {
  const { id } = req.params;
  const { reputation } = req.body;

  const provider = providers.find(p => p.id === id);

  if (!provider) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  if (typeof reputation !== 'number' || reputation < 0 || reputation > 100) {
    return res.status(400).json({ error: 'Invalid reputation value' });
  }

  provider.reputation = reputation;
  res.json(provider);
});

router.post('/', (req, res) => {
  const newProvider = {
    id: Date.now().toString(),
    ...req.body,
    totalSignals: 0,
    successRate: 0,
    isActive: true
  };

  providers.push(newProvider);
  res.status(201).json(newProvider);
});

module.exports = router;