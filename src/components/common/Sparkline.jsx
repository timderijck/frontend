import { useState, useRef } from 'react';

// De Sparkline component tekent een klein grafiekje zonder assen.
const Sparkline = ({ data, color, width = 120, height = 40, showTooltip = false }) => {
  // Hier houden we bij waar de muis is voor het tekstwolkje met de prijs
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  // Als er geen gegevens zijn, tekenen we niks
  if (!data?.length) return null;

  // We pakken de laatste 48 punten om het grafiekje niet te druk te maken
  const sparkData = data.length > 50 && width < 200 ? data.slice(-48) : data; 
  
  // We zoeken de laagste en hoogste prijs om te weten hoe hoog de grafiek moet zijn
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = (max - min) || 1; // Het verschil tussen hoog en laag

  // Hier rekenen we voor elk punt uit waar het precies op het scherm moet komen
  const points = sparkData.map((val, i) => ({
    x: (i / (sparkData.length - 1)) * width, // De plek van links naar rechts
    y: height - ((val - min) / range) * height, // De plek van boven naar beneden
    val
  }));

  // We maken een lange lijst met coördinaten voor de lijn van de grafiek
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  // Deze functie rekent uit welk prijspunt het dichtst bij je muis zit
  const handleMouseMove = (e) => {
    if (!showTooltip) return;
    const rect = svgRef.current.getBoundingClientRect();
    const index = Math.max(0, Math.min(sparkData.length - 1, Math.round(((e.clientX - rect.left) / rect.width) * (sparkData.length - 1))));
    
    setHoverData({
      x: points[index].x,
      y: points[index].y,
      price: sparkData[index].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    });
  };

  return (
    <div 
      className="sparkline-container flex align-center" 
      style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height, maxWidth: '100%' }}
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => setHoverData(null)}
    >
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${width} ${height}`} 
        preserveAspectRatio="none"
        className="sparkline-svg"
      >
        {/* Als het een groot grafiekje is, tekenen we een gekleurd vlak eronder */}
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
        {/* De gekleurde lijn van de grafiek zelf */}
        <polyline fill="none" stroke={color} strokeWidth={width > 300 ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />
        
        {/* Als je met de muis over de grafiek gaat, tekenen we een wit lijntje en een stipje */}
        {hoverData && (
          <>
            <line x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx={hoverData.x} cy={hoverData.y} r="4" fill="white" stroke={color} strokeWidth="2" />
          </>
        )}
      </svg>
      {/* Het tekstwolkje met de prijs dat verschijnt bij je muis */}
      {hoverData && (
        <div className="tooltip">
          ${hoverData.price}
        </div>
      )}
    </div>
  );
};

export default Sparkline;
