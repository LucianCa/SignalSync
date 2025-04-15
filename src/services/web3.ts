import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class Web3Service {
  private web3: Web3 | null = null;
  private account: string | null = null;

  async connect(): Promise<string | null> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        this.web3 = new Web3(window.ethereum);

        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const accounts = await this.web3.eth.getAccounts();
        this.account = accounts[0];

        return this.account;
      } catch (error) {
        console.error('Failed to connect to wallet:', error);
        return null;
      }
    } else {
      console.error('No Web3 provider found');
      return null;
    }
  }

  async disconnect(): Promise<void> {
    this.web3 = null;
    this.account = null;
  }

  getAccount(): string | null {
    return this.account;
  }

  isConnected(): boolean {
    return this.web3 !== null && this.account !== null;
  }

  async getBalance(): Promise<string | null> {
    if (!this.web3 || !this.account) return null;

    try {
      const balance = await this.web3.eth.getBalance(this.account);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Failed to get balance:', error);
      return null;
    }
  }

  async getNetworkId(): Promise<number | null> {
    if (!this.web3) return null;

    try {
      const networkId = await this.web3.eth.net.getId();
      return Number(networkId);
    } catch (error) {
      console.error('Failed to get network ID:', error);
      return null;
    }
  }

  async switchToNetwork(chainId: string): Promise<boolean> {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      return true;
    } catch (error) {
      console.error('Failed to switch network:', error);
      return false;
    }
  }
}

export const web3Service = new Web3Service();