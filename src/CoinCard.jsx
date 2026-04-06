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

function CoinCard({ coin, rank }) {
  const navigate = useNavigate();
  if (!coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? '#4caf50' : '#f44336';

  return (
    <div 
      onClick={() => navigate(`/coin/${coin.id}`)}
      style={{
        cursor: 'pointer', 
        display: 'grid',
        gridTemplateColumns: '50px 1.5fr 1fr 1fr 1.5fr',
        alignItems: 'center', 
        padding: '12px 20px',
        borderBottom: '1px solid #333',
        background: '#1a1a1a'
      }}
    >
      <span className="normaaltekst" style={{ opacity: 0.5 }}>{rank}</span>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={coin.image} alt="" style={{ width: '24px', height: '24px' }} />
        <span className="koptekst" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {coin.name} <span style={{ opacity: 0.5, fontWeight: 'normal', fontSize: '0.8rem' }}>{coin.symbol.toUpperCase()}</span>
        </span>
      </div>

      <div className="normaaltekst" style={{ fontWeight: 'bold' }}>
        ${coin.current_price.toLocaleString()}
      </div>

      <div className="normaaltekst" style={{ color }}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Sparkline data={coin.sparkline_in_7d?.price} color={color} />
      </div>
    </div>
  );
}

export default CoinCard;