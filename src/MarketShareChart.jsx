import React from 'react';

function MarketShareChart({ coins }) {
  // Pak de top 10 voor het marktaandeel
  const top10 = coins.slice(0, 10);
  const totalMarketCap = top10.reduce((acc, coin) => acc + coin.market_cap, 0);

  let cumulativePercent = 0;

  // Kleuren voor de segmenten
  const colors = [
    '#f3ba2f', '#627eea', '#16161d', '#26a17b', '#0033ad', 
    '#8247e5', '#345d9d', '#e84142', '#2775ca', '#f0b90b'
  ];

  // Helper om coördinaten te berekenen voor SVG arc
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div style={{
      background: '#1a1a1a', 
      border: '2px solid #333', 
      padding: '20px', 
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h3 className="ranktekst" style={{ marginBottom: '20px' }}>Top 10 Market Share</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg viewBox="-1 -1 2 2" style={{ width: '150px', height: '150px', transform: 'rotate(-90deg)' }}>
          {top10.map((coin, i) => {
            const percent = coin.market_cap / totalMarketCap;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;
            const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
            
            return <path key={coin.id} d={pathData} fill={colors[i % colors.length]} />;
          })}
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {top10.map((coin, i) => (
            <div key={coin.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }} className="normaaltekst">
              <div style={{ width: '10px', height: '10px', background: colors[i % colors.length] }}></div>
              <span>{coin.symbol.toUpperCase()} ({( (coin.market_cap / totalMarketCap) * 100).toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketShareChart;