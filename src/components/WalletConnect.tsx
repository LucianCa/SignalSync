import React, { useState, useEffect } from 'react';
import { web3Service } from '../services/web3';

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const currentAccount = web3Service.getAccount();
    if (currentAccount) {
      setAccount(currentAccount);
      const userBalance = await web3Service.getBalance();
      setBalance(userBalance);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const connectedAccount = await web3Service.connect();
      if (connectedAccount) {
        setAccount(connectedAccount);
        const userBalance = await web3Service.getBalance();
        setBalance(userBalance);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await web3Service.disconnect();
    setAccount(null);
    setBalance(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(4);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      padding: '15px',
      color: 'white'
    }}>
      {account ? (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Connected: {formatAddress(account)}</strong>
          </div>
          {balance && (
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Balance: {formatBalance(balance)} ETH
            </div>
          )}
          <button
            onClick={handleDisconnect}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#F44336',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;