import React from 'react';
import Card from '../ui/Card';

// De QuickStats laat een paar belangrijke getallen over de hele cryptomarkt zien.
const QuickStats = () => {
  return (
    <Card title="Quick Stats">
      <div className="normaaltekst flex-column gap-15 font-9">
        {/* De totale waarde van alle crypto in de wereld */}
        <p>Global Cap: <span className="accent-text">$2.45T</span></p>
        {/* Hoeveel procent van de markt uit Bitcoin bestaat */}
        <p>BTC Dominance: <span className="accent-text">52.4%</span></p>
        {/* Hoeveel er in totaal gehandeld is in de laatste 24 uur */}
        <p>Volume (24h): <span className="accent-text">$84.2B</span></p>
        <p className="dim font-75 mt-10">Data updated live from CoinGecko</p>
      </div>
    </Card>
  );
};

export default QuickStats;
