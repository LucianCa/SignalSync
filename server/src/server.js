const express = require('express');
const cors = require('cors');
const SignalAggregator = require('./signalAggregator');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const aggregator = new SignalAggregator();

const signalsRouter = require('../routes/signals');
const providersRouter = require('../routes/providers');
const subscriptionsRouter = require('../routes/subscriptions');

app.use('/api/signals', signalsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`SignalSync server running on port ${PORT}`);

  setTimeout(() => {
    aggregator.startScheduled();
  }, 2000);
});