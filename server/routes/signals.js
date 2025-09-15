const express = require('express');
const router = express.Router();

let signals = [];

router.get('/', (req, res) => {
  res.json(signals.sort((a, b) => b.timestamp - a.timestamp));
});

router.get('/provider/:providerId', (req, res) => {
  const { providerId } = req.params;
  const providerSignals = signals.filter(signal => signal.provider === providerId);
  res.json(providerSignals.sort((a, b) => b.timestamp - a.timestamp));
});

router.post('/', (req, res) => {
  const signal = {
    id: Date.now().toString(),
    ...req.body,
    timestamp: Date.now()
  };

  signals.push(signal);

  if (signals.length > 1000) {
    signals = signals.slice(-1000);
  }

  res.status(201).json(signal);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = signals.findIndex(signal => signal.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Signal not found' });
  }

  signals.splice(index, 1);
  res.status(204).send();
});

module.exports = router;