import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Sparkline({ data, color }) {
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  if (!data?.length) return null;

  const width = 120, height = 40;
  const sparkData = data.slice(-48); 
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = (max - min) || 1;

  const points = sparkData.map((val, i) => ({
    x: (i / (sparkData.length - 1)) * width,
    y: height - ((val - min) / range) * height,
    val
  }));

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const handleMouseMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const index = Math.max(0, Math.min(sparkData.length - 1, Math.round(((e.clientX - rect.left) / width) * (sparkData.length - 1))));
    
    setHoverData({
      x: points[index].x,
      y: points[index].y,
      price: sparkData[index].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    });
  };

  return (
    <div className="sparkline-container flex align-center" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverData(null)}>
      <svg ref={svgRef} width={width} height={height} className="sparkline-svg">
        <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />
        {hoverData && (
          <>
            <line x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx={hoverData.x} cy={hoverData.y} r="4" fill="white" stroke={color} strokeWidth="2" />
          </>
        )}
      </svg>
      {hoverData && (
        <div className="tooltip">
          ${hoverData.price}
        </div>
      )}
    </div>
  );
}

function CoinCard({ coin, rank, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();
  if (!coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? 'var(--positive)' : 'var(--negative)';

  const formatPrice = (price) => {
    const options = price >= 1 ? { min: 2, max: 2 } : price >= 0.01 ? { min: 4, max: 4 } : { min: 6, max: 8 };
    return price.toLocaleString(undefined, { minimumFractionDigits: options.min, maximumFractionDigits: options.max });
  };

  return (
    <div className="table-row coin-card" onClick={() => navigate(`/coin/${coin.id}`)}>
      <span className="normaaltekst dim font-75">{rank}</span>
      
      <div className="coin-info-cell">
        <img src={coin.image} alt="" className="coin-icon" />
        <span className="koptekst font-9">
          {coin.name} <span className="dim font-75" style={{ fontWeight: 'normal' }}>{coin.symbol.toUpperCase()}</span>
        </span>
      </div>

      <div className="normaaltekst bold font-9">
        ${formatPrice(coin.current_price)}
      </div>

      <div className={`normaaltekst font-9 ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </div>

      <div className="flex justify-end">
        <Sparkline data={coin.sparkline_in_7d?.price} color={color} />
      </div>

      <div className="text-center">
        <button 
          className={`fav-btn ${isFavorite ? 'fav-active' : 'fav-inactive'}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}

export default CoinCard;