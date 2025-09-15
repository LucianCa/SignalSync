import React, { useState } from 'react';

interface FilterOptions {
  symbol: string;
  action: 'ALL' | 'BUY' | 'SELL';
  minConfidence: number;
  provider: string;
}

interface SignalFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  providers: string[];
}

const SignalFilter: React.FC<SignalFilterProps> = ({ onFilterChange, providers }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    symbol: '',
    action: 'ALL',
    minConfidence: 0,
    provider: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      symbol: '',
      action: 'ALL' as const,
      minConfidence: 0,
      provider: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '15px',
      margin: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#2196F3',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {isExpanded && (
        <div style={{ marginTop: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Symbol:
              </label>
              <input
                type="text"
                placeholder="e.g., BTC/USDT"
                value={filters.symbol}
                onChange={(e) => handleFilterChange('symbol', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Action:
              </label>
              <select
                value={filters.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="ALL">All</option>
                <option value="BUY">Buy</option>
                <option value="SELL">Sell</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Min Confidence: {filters.minConfidence}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minConfidence}
                onChange={(e) => handleFilterChange('minConfidence', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Provider:
              </label>
              <select
                value={filters.provider}
                onChange={(e) => handleFilterChange('provider', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="">All Providers</option>
                {providers.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '15px', textAlign: 'right' }}>
            <button
              onClick={clearFilters}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#F44336',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalFilter;