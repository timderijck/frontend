import './coinstyling.css'

function MarketFactors() {
  const factors = [
    { title: "Inflation & Interest Rates", desc: "Central bank decisions on interest rates can shift capital between crypto and traditional assets.", icon: "📈" },
    { title: "Regulation & Legal News", desc: "New laws or government bans in major markets like the US or China often cause rapid price swings.", icon: "⚖️" },
    { title: "Market Sentiment & FOMO", desc: "Social media trends and Fear Of Missing Out (FOMO) can drive speculative bubbles.", icon: "💬" },
    { title: "Technological Upgrades", desc: "Network upgrades (like Ethereum's Merge) or security vulnerabilities directly affect trust and value.", icon: "💻" },
    { title: "Institutional Adoption", desc: "Large companies like Tesla or MicroStrategy buying crypto signals long-term stability.", icon: "🏢" }
  ];

  return (
    <div className="outerliststyling flex" style={{flexDirection: 'column', padding: '20px', gap: '15px', width: '100%', boxSizing: 'border-box'}}>
      <h1 className="ranktekst center" style={{marginBottom: '10px'}}>Market Impact Factors</h1>
      {factors.map((factor, index) => (
        <div key={index} style={{borderBottom: '1px solid #444', paddingBottom: '10px'}}>
          <h3 className="normaaltekst" style={{color: 'rgb(131, 122, 255)', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span>{factor.icon}</span> {factor.title}
          </h3>
          <p className="normaaltekst" style={{fontSize: '0.8rem', marginTop: '5px', opacity: 0.8, fontWeight: '300'}}>
            {factor.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MarketFactors;