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

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 1) return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 });
  };

  return (
    <div className="defaultbackground" style={{minHeight: '100vh', padding: '40px'}}>
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>
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

        <div style={{display: 'flex', gap: '30px', flexDirection: 'column'}}>
          {/* Header Row */}
          <div className="outercoinstyling flex" style={{width: '100%', padding: '30px', boxSizing: 'border-box', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
              <img src={coin.image.large} style={{width: '60px'}} alt={coin.name} />
              <div>
                <h1 className="koptekst" style={{fontSize: '2rem', margin: 0}}>{coin.name}</h1>
                <p className="ranktekst" style={{color: '#837aff', fontSize: '0.9rem'}}>Rank #{coin.market_cap_rank}</p>
              </div>
            </div>
            <div style={{textAlign: 'right'}}>
              <h2 className="koptekst" style={{fontSize: '2rem', margin: 0}}>${formatPrice(md.current_price.usd)}</h2>
              <p className="normaaltekst" style={{color, fontSize: '1rem'}}>{md.price_change_percentage_24h.toFixed(2)}% (24h)</p>
            </div>
          </div>

          {/* Stats and Graph Row */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            {/* Stats Card */}
            <div className="outerliststyling flex" style={{flexDirection: 'column', padding: '25px', boxSizing: 'border-box'}}>
              <h3 className="ranktekst" style={{marginBottom: '15px', fontSize: '1.2rem'}}>Market Stats</h3>
              <div className="normaaltekst" style={{display: 'flex', flexDirection: 'column', gap: '15px', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '8px', fontSize: '0.9rem'}}>
                  <span>Market Cap</span>
                  <span style={{fontWeight: 'bold'}}>${md.market_cap.usd.toLocaleString()}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '8px', fontSize: '0.9rem'}}>
                  <span>24h High</span>
                  <span style={{color: '#4caf50'}}>${formatPrice(md.high_24h.usd)}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '8px', fontSize: '0.9rem'}}>
                  <span>24h Low</span>
                  <span style={{color: '#f44336'}}>${formatPrice(md.low_24h.usd)}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '8px', fontSize: '0.9rem'}}>
                  <span>Supply</span>
                  <span>{md.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Graph Card */}
            <div className="outerliststyling flex" style={{padding: '25px', flexDirection: 'column'}}>
              <h3 className="ranktekst" style={{marginBottom: '15px', fontSize: '1.2rem'}}>7-Day Price Trend</h3>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="100%" height={100} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`M0,${height} L${points} L${width},${height} Z`} fill="url(#gradient)" />
                  <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
                </svg>
              </div>
            </div>
          </div>

          {/* Details and Description Side-by-Side */}
          <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
            {/* Asset Details Column (Scale 1) */}
            <div className="outerliststyling flex" style={{flex: '1', minWidth: '300px', flexDirection: 'column', padding: '25px', boxSizing: 'border-box'}}>
              <h2 className="ranktekst" style={{marginBottom: '20px', fontSize: '1.2rem'}}>Asset Details</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                 {Object.entries(md).slice(0, 15).map(([key, value]) => {
                   if (key === 'id' || typeof value === 'object' || value === null || value === "") return null;
                   return (
                     <div key={key} style={{padding: '8px 0', borderBottom: '1px solid #333'}}>
                       <div className="normaaltekst" style={{fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase'}}>{key.replace(/_/g, ' ')}</div>
                       <div className="normaaltekst" style={{fontSize: '0.85rem', wordBreak: 'break-all'}}>{value.toString()}</div>
                     </div>
                   );
                 })}
                 <div style={{padding: '8px 0', borderBottom: '1px solid #333'}}>
                    <div className="normaaltekst" style={{fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase'}}>Volume (24h)</div>
                    <div className="normaaltekst" style={{fontSize: '0.85rem'}}>${md.total_volume.usd.toLocaleString()}</div>
                 </div>
              </div>
            </div>

            {/* Description Column (Scale 2) */}
            <div className="outerliststyling flex" style={{flex: '2', minWidth: '400px', flexDirection: 'column', padding: '30px', boxSizing: 'border-box'}}>
              <h2 className="ranktekst" style={{marginBottom: '20px', fontSize: '1.3rem'}}>Description</h2>
              <div 
                className="normaaltekst" 
                style={{fontSize: '0.95rem', lineHeight: '1.7', opacity: 0.85}}
                dangerouslySetInnerHTML={{ __html: coin.description.en || "No description available for this asset." }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinPage;