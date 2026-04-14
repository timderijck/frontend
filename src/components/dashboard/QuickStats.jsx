import React from 'react';
import Card from '../ui/Card';

const QuickStats = () => {
  return (
    <Card title="Quick Stats">
      <div className="normaaltekst flex-column gap-15 font-9">
        <p>Global Cap: <span className="accent-text">$2.45T</span></p>
        <p>BTC Dominance: <span className="accent-text">52.4%</span></p>
        <p>Volume (24h): <span className="accent-text">$84.2B</span></p>
        <p className="dim font-75 mt-10">Data updated live from CoinGecko</p>
      </div>
    </Card>
  );
};

export default QuickStats;
