import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './coinstyling.css';

function CoinPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    async function fetchCoinData() {
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true&localization=false&market_data=true`, {
          headers: { 'x-cg-demo-api-key': apiKey }
        });
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error("Error fetching detailed coin data:", err);
      }
    }
    fetchCoinData();
  }, [id]);

  if (!coin) return <div className="normaaltekst" style={{padding: '40px'}}>Loading {id}...</div>;

  const md = coin.market_data;
  const isPositive = md.price_change_percentage_24h >= 0;
  const color = isPositive ? '#4caf50' : '#f44336';

  // Detail Sparkline
  const width = 600;
  const height = 150;
  const sparklineData = md.sparkline_7d?.price || [];
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const points = sparklineData.map((val, i) => {
    const x = (i / (sparklineData.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="defaultbackground" style={{minHeight: '100vh', padding: '40px'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <button 
          onClick={() => navigate('/')}
          className="normaaltekst"
          style={{
            background: '#2d2d2d', border: '1px solid #837aff', padding: '12px 25px', 
            borderRadius: '12px', cursor: 'pointer', marginBottom: '40px', color: 'white'
          }}
        >
          ← Back to Dashboard
        </button>

        <div style={{display: 'flex', gap: '40px', flexDirection: 'column'}}>
          {/* Header Row */}
          <div className="outercoinstyling flex" style={{width: '100%', padding: '40px', boxSizing: 'border-box', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
              <img src={coin.image.large} style={{width: '100px'}} alt={coin.name} />
              <div>
                <h1 className="koptekst" style={{fontSize: '3rem', margin: 0}}>{coin.name}</h1>
                <p className="ranktekst" style={{color: '#837aff'}}>Rank #{coin.market_cap_rank}</p>
              </div>
            </div>
            <div style={{textAlign: 'right'}}>
              <h2 className="koptekst" style={{fontSize: '2.5rem', margin: 0}}>${md.current_price.usd.toLocaleString()}</h2>
              <p className="normaaltekst" style={{color, fontSize: '1.2rem'}}>{md.price_change_percentage_24h.toFixed(2)}% (24h)</p>
            </div>
          </div>

          {/* Stats and Graph Row */}
          <div style={{display: 'flex', gap: '40px'}}>
            {/* Stats Card */}
            <div className="outerliststyling flex" style={{flexDirection: 'column', width: '400px', padding: '30px', boxSizing: 'border-box'}}>
              <h3 className="ranktekst" style={{marginBottom: '20px'}}>Market Stats</h3>
              <div className="normaaltekst" style={{display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: '10px'}}>
                  <span>Market Cap</span>
                  <span style={{fontWeight: 'bold'}}>${md.market_cap.usd.toLocaleString()}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: '10px'}}>
                  <span>24h High</span>
                  <span style={{color: '#4caf50'}}>${md.high_24h.usd.toLocaleString()}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: '10px'}}>
                  <span>24h Low</span>
                  <span style={{color: '#f44336'}}>${md.low_24h.usd.toLocaleString()}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: '10px'}}>
                  <span>Circulating Supply</span>
                  <span>{md.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Graph Card */}
            <div className="outerliststyling flex" style={{flex: 1, padding: '30px', flexDirection: 'column'}}>
              <h3 className="ranktekst" style={{marginBottom: '20px'}}>7-Day Price Trend</h3>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M0,${height} L${points} L${width},${height} Z`}
                    fill="url(#gradient)"
                  />
                  <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Description Row */}
          <div className="outerliststyling flex" style={{flexDirection: 'column', padding: '40px'}}>
            <h2 className="ranktekst" style={{marginBottom: '20px'}}>Description</h2>
            <div 
              className="normaaltekst" 
              style={{fontSize: '1rem', lineHeight: '1.8', opacity: 0.9}}
              dangerouslySetInnerHTML={{ __html: coin.description.en || "No description available." }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinPage;