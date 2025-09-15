# SignalSync

A decentralized crypto trading signals aggregation platform built with React, Express, and Solidity.

## Features

- **Signal Aggregation**: Collects trading signals from multiple sources including Binance trends and CoinGecko
- **Provider System**: Rate and subscribe to different signal providers
- **Web3 Integration**: Connect wallet for decentralized subscriptions via smart contracts
- **Real-time Updates**: Live signal feeds updated every 5 minutes
- **Provider Ratings**: Reputation system based on signal performance

## Tech Stack

### Frontend
- React 18 with TypeScript
- Web3.js for blockchain interaction
- Responsive UI with inline styles

### Backend
- Express.js server
- Axios for external API calls
- Node-cron for scheduled signal aggregation
- RESTful API design

### Smart Contracts
- Solidity 0.8.19
- Provider registration and reputation tracking
- Subscription management on-chain

## Getting Started

### Prerequisites
- Node.js 16+
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd SignalSync
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend (in another terminal)
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## API Endpoints

### Signals
- `GET /api/signals` - Get all signals
- `POST /api/signals` - Submit new signal
- `GET /api/signals/provider/:id` - Get signals by provider

### Providers
- `GET /api/providers` - Get all providers
- `GET /api/providers/:id` - Get specific provider
- `PATCH /api/providers/:id/reputation` - Update provider reputation

### Subscriptions
- `GET /api/subscriptions` - Get user subscriptions
- `POST /api/subscriptions/:providerId` - Subscribe to provider
- `DELETE /api/subscriptions/:providerId` - Unsubscribe from provider

## Signal Sources

- **Binance API**: Top gaining cryptocurrencies (>5% daily gain)
- **CoinGecko API**: Trending cryptocurrencies
- **Mock Signals**: Simulated trading signals for testing

## Development

The project uses a microservice architecture with separate frontend and backend services. The smart contract handles decentralized subscription management.

## License

Private project - All rights reserved