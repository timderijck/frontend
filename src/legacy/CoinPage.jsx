import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  if (!coin) return <div className="normaaltekst coin-page-container p-40">Loading {id}...</div>;

  const md = coin.market_data;
  const isPositive = md.price_change_percentage_24h >= 0;
  const color = isPositive ? 'var(--positive)' : 'var(--negative)';

  const sparklineData = md.sparkline_7d?.price || [];
  const min = Math.min(...sparklineData), max = Math.max(...sparklineData), range = max - min || 1;
  const points = sparklineData.map((val, i) => `${(i / (sparklineData.length - 1)) * 600},${150 - ((val - min) / range) * 150}`).join(' ');

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return price.toLocaleString(undefined, { minimumFractionDigits: price >= 1 ? 2 : 4, maximumFractionDigits: price >= 1 ? 2 : 8 });
  };

  return (
    <div className="defaultbackground flex-column">
      <main className="coin-page-container dashboard-container flex-1">
        <button onClick={() => navigate('/')} className="back-btn normaaltekst">
          ← Back to Dashboard
        </button>

        <div className="flex-column gap-30">
          <header className="coin-detail-header flex justify-between align-center flex-wrap gap-20">
            <div className="flex align-center gap-20">
              <img src={coin.image.large} className="coin-icon-large" alt={coin.name} />
              <div>
                <h1 className="koptekst font-2rem no-margin">{coin.name}</h1>
                <p className="ranktekst accent-text font-9">Rank #{coin.market_cap_rank}</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="koptekst font-2rem no-margin">${formatPrice(md.current_price.usd)}</h2>
              <p className={`normaaltekst font-1rem ${isPositive ? 'positive' : 'negative'}`}>
                {md.price_change_percentage_24h.toFixed(2)}% (24h)
              </p>
            </div>
          </header>

          <div className="stats-grid">
            <section className="card flex-column">
              <h3 className="ranktekst mb-15 font-9" style={{ fontSize: '1.2rem' }}>Market Stats</h3>
              <div className="flex-column">
                {[
                  { label: 'Market Cap', value: `$${md.market_cap.usd.toLocaleString()}`, className: '' },
                  { label: '24h High', value: `$${formatPrice(md.high_24h.usd)}`, className: 'positive' },
                  { label: '24h Low', value: `$${formatPrice(md.low_24h.usd)}`, className: 'negative' },
                  { label: 'Supply', value: `${md.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`, className: '' }
                ].map((item, idx) => (
                  <div key={idx} className="stat-item">
                    <span className="normaaltekst dim font-9">{item.label}</span>
                    <span className={`normaaltekst bold font-9 ${item.className}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card flex-column">
              <h3 className="ranktekst mb-15 font-9" style={{ fontSize: '1.2rem' }}>7-Day Price Trend</h3>
              <div className="graph-container flex align-center justify-center flex-1">
                <svg width="100%" height={100} viewBox="0 0 600 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`M0,150 L${points} L600,150 Z`} fill="url(#gradient)" />
                  <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
                </svg>
              </div>
            </section>
          </div>

          <div className="stats-grid grid-1-2">
            <section className="card flex-column">
              <h2 className="ranktekst mb-20 font-9" style={{ fontSize: '1.2rem' }}>Asset Details</h2>
              <div className="flex-column gap-8">
                 {Object.entries(md).slice(0, 10).map(([key, value]) => {
                   if (key === 'id' || typeof value === 'object' || value === null || value === "") return null;
                   return (
                     <div key={key} className="stat-item flex-column" style={{ alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                       <span className="normaaltekst dim font-75 uppercase">{key.replace(/_/g, ' ')}</span>
                       <span className="normaaltekst font-9 break-all">{value.toString()}</span>
                     </div>
                   );
                 })}
              </div>
            </section>

            <section className="description-box flex-column">
              <h2 className="ranktekst mb-20 font-9" style={{ fontSize: '1.3rem' }}>Description</h2>
              <div 
                className="normaaltekst font-9 dim" 
                dangerouslySetInnerHTML={{ __html: coin.description.en || "No description available for this asset." }}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoinPage;