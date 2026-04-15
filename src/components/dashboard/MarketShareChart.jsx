import React from 'react';
import Card from '../ui/Card';

// De MarketShareChart tekent een taartdiagram van de top 10 grootste munten.
const MarketShareChart = ({ coins }) => {
  // We pakken de top 10 munten voor dit diagram
  const top10 = coins.slice(0, 10);
  // We tellen de totale waarde van deze 10 munten bij elkaar op
  const totalMarketCap = top10.reduce((acc, coin) => acc + coin.market_cap, 0);

  let cumulativePercent = 0;

  // De kleuren die we gebruiken voor de verschillende taartpunten
  const colors = [
    '#f3ba2f', '#627eea', '#16161d', '#26a17b', '#0033ad', 
    '#8247e5', '#345d9d', '#e84142', '#2775ca', '#f0b90b'
  ];

  // Dit is een moeilijk stukje wiskunde om uit te rekenen waar een taartpunt moet beginnen en eindigen
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <Card title="Top 10 Market Share" style={{ alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Hier tekenen we het taartdiagram met SVG */}
        <svg viewBox="-1 -1 2 2" style={{ width: '150px', height: '150px', transform: 'rotate(-90deg)' }}>
          {top10.map((coin, i) => {
            const percent = coin.market_cap / totalMarketCap; // Hoe groot is dit stukje van de taart?
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;
            
            // De 'd' is de instructie voor de computer om de vorm van de taartpunt te tekenen
            const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
            
            return <path key={coin.id} d={pathData} fill={colors[i % colors.length]} />;
          })}
        </svg>

        {/* De legenda naast de taart met de namen en percentages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {top10.map((coin, i) => (
            <div key={coin.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }} className="normaaltekst">
              <div style={{ width: '10px', height: '10px', background: colors[i % colors.length] }}></div>
              <span>{coin.symbol.toUpperCase()} ({( (coin.market_cap / totalMarketCap) * 100).toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MarketShareChart;
