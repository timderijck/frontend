import { useState, useEffect } from "react";
import './coinstyling.css';

function TinySparkline({ data, color }) {
  if (!data || data.length === 0) return null;
  const width = 60;
  const height = 20;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.slice(-24).map((val, i) => { // show last 24 points for the tiny one
    const x = (i / 23) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{marginRight: '10px'}}>
      <polyline fill="none" stroke={color} strokeWidth="1" points={points} />
    </svg>
  );
}

function List({ onSelectCoin }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function getCoins() {
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': apiKey
        }
      };

      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h", options);
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    }
    getCoins();
  }, []);

  return (
    <div className="outerliststyling flex" style={{flexDirection: 'column', width: 'auto', minWidth: '400px'}}>
        <h1 className="ranktekst center">Market Overview</h1>
        <div style={{width: '100%', maxHeight: '600px', overflowY: 'auto'}}>
          {coins.map((coin, index) => (
            <div 
              key={coin.id} 
              className="normaaltekst coin-row" 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '10px', 
                borderBottom: '1px solid #444',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#3d3d3d'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => onSelectCoin(coin)}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '120px'}}>
                <span style={{width: '20px', fontSize: '0.8rem', opacity: 0.7}}>{index + 1}</span>
                <img src={coin.image} alt={coin.name} style={{width: '24px', height: '24px'}} />
                <span style={{fontWeight: 'bold'}}>{coin.symbol.toUpperCase()}</span>
              </div>
              
              <TinySparkline 
                data={coin.sparkline_in_7d?.price} 
                color={coin.price_change_percentage_24h >= 0 ? '#4caf50' : '#f44336'} 
              />

              <div style={{textAlign: 'right', minWidth: '80px'}}>
                <div style={{fontSize: '0.9rem'}}>${coin.current_price.toLocaleString()}</div>
                <div style={{color: coin.price_change_percentage_24h >= 0 ? '#4caf50' : '#f44336', fontSize: '0.75rem'}}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default List;