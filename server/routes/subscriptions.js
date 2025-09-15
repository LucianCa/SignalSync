const express = require('express');
const router = express.Router();

let subscriptions = new Map();

router.get('/', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userSubscriptions = subscriptions.get(userId) || [];
  res.json(userSubscriptions);
});

router.post('/:providerId', (req, res) => {
  const { providerId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  let userSubscriptions = subscriptions.get(userId) || [];

  if (!userSubscriptions.includes(providerId)) {
    userSubscriptions.push(providerId);
    subscriptions.set(userId, userSubscriptions);
  }

  res.status(201).json({ providerId, subscribed: true });
});

router.delete('/:providerId', (req, res) => {
  const { providerId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  let userSubscriptions = subscriptions.get(userId) || [];
  const index = userSubscriptions.indexOf(providerId);

  if (index > -1) {
    userSubscriptions.splice(index, 1);
    subscriptions.set(userId, userSubscriptions);
  }

  res.status(200).json({ providerId, subscribed: false });
});

module.exports = router;