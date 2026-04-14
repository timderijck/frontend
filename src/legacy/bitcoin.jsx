import './coinstyling.css'

function Sparkline({ data, color }) {
  if (!data || data.length === 0) return null;
  
  const width = 100;
  const height = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function CoinDetail({ coin }) {
  if (!coin) {
    return (
      <div className="outercoinstyling flex" style={{flexDirection: 'column', textAlign: 'center'}}>
        <h1 className="koptekst">Select a coin</h1>
        <p className="normaaltekst">Click on a coin in the list to see more details.</p>
      </div>
    );
  }

  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? '#4caf50' : '#f44336';

  return (
    <div className="outercoinstyling flex" style={{flexDirection: 'column', width: '400px', minHeight: '400px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px'}}>
        <img src={coin.image} className="coinimages" alt={coin.name} />
        <h1 className="koptekst" style={{margin: 0}}>{coin.name} ({coin.symbol.toUpperCase()})</h1>
      </div>

      <div className="coininfo normaaltekst" style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '15px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Current Price:</span>
          <span style={{fontWeight: 'bold'}}>${coin.current_price.toLocaleString()}</span>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>24h Change:</span>
          <span style={{color}}>{coin.price_change_percentage_24h?.toFixed(2)}%</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>24h High:</span>
          <span style={{color: '#4caf50'}}>${coin.high_24h?.toLocaleString()}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>24h Low:</span>
          <span style={{color: '#f44336'}}>${coin.low_24h?.toLocaleString()}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Market Cap:</span>
          <span>${coin.market_cap?.toLocaleString()}</span>
        </div>

        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <p style={{fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px'}}>7-Day Trend</p>
          <div style={{background: '#1a1a1a', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'center'}}>
            <Sparkline data={coin.sparkline_in_7d?.price} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;