import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './coinstyling.css'

function Sparkline({ data, color }) {
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  if (!data || data.length === 0) return null;

  const width = 120;
  const height = 40;
  // Use last 48 points for a bit more detail, or all if less
  const sparkData = data.slice(-48); 
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = (max - min) || 1;

  const points = sparkData.map((val, i) => {
    const x = (i / (sparkData.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return { x, y, val };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Calculate index based on mouseX
    let index = Math.round((mouseX / width) * (sparkData.length - 1));
    index = Math.max(0, Math.min(index, sparkData.length - 1));
    
    setHoverData({
      x: points[index].x,
      y: points[index].y,
      price: sparkData[index].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    });
  };

  return (
    <div 
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverData(null)}
    >
      <svg 
        ref={svgRef}
        width={width} 
        height={height} 
        style={{ overflow: 'visible' }}
      >
        <polyline 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylinePoints} 
        />
        {hoverData && (
          <>
            <line x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx={hoverData.x} cy={hoverData.y} r="4" fill="white" stroke={color} strokeWidth="2" />
          </>
        )}
      </svg>
      {hoverData && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#333',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          pointerEvents: 'none',
          marginBottom: '5px',
          border: '1px solid #555',
          zIndex: 100,
          whiteSpace: 'nowrap'
        }}>
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
  const color = isPositive ? '#4caf50' : '#f44336';

  const handleFavClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite(coin.id);
  };

  // Functie om prijzen netjes te tonen, ook voor zeer kleine bedragen
  const formatPrice = (price) => {
    if (price >= 1) return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 0.01) return price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    return price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 8 });
  };

  return (
    <div 
      onClick={() => navigate(`/coin/${coin.id}`)}
      style={{
        cursor: 'pointer', 
        display: 'grid',
        gridTemplateColumns: '50px 1.5fr 1fr 1fr 1.5fr 50px',
        alignItems: 'center', 
        padding: '12px 20px',
        borderBottom: '1px solid #333',
        background: '#1a1a1a',
        gap: '10px'
      }}
    >
      <span className="normaaltekst" style={{ opacity: 0.5 }}>{rank}</span>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <img src={coin.image} alt="" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
        <span className="koptekst" style={{ fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {coin.name} <span style={{ opacity: 0.5, fontWeight: 'normal', fontSize: '0.75rem' }}>{coin.symbol.toUpperCase()}</span>
        </span>
      </div>

      <div className="normaaltekst" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
        ${formatPrice(coin.current_price)}
      </div>

      <div className="normaaltekst" style={{ color, fontSize: '0.9rem' }}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Sparkline data={coin.sparkline_in_7d?.price} color={color} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleFavClick}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1.2rem',
            color: isFavorite ? '#ffd700' : '#444',
            padding: '5px'
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}

export default CoinCard;