import { useState, useRef } from 'react';

const Sparkline = ({ data, color, width = 120, height = 40, showTooltip = false }) => {
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  if (!data?.length) return null;

  // Use last 48 points by default if it's a small sparkline, or all if specified
  const sparkData = data.length > 50 && width < 200 ? data.slice(-48) : data; 
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
    if (!showTooltip) return;
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
        {/* For larger sparklines, we might want a filled area (gradient) */}
        {width > 300 && (
           <>
             <defs>
               <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                 <stop offset="100%" stopColor={color} stopOpacity="0" />
               </linearGradient>
             </defs>
             <path 
               d={`M0,${height} L${polylinePoints} L${width},${height} Z`} 
               fill={`url(#grad-${color})`} 
             />
           </>
        )}
        <polyline fill="none" stroke={color} strokeWidth={width > 300 ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />
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
};

export default Sparkline;
