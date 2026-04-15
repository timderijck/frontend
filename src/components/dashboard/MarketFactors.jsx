import Card from '../ui/Card';

// De MarketFactors laat een lijstje zien met dingen die invloed hebben op de cryptomarkt.
const MarketFactors = () => {
  // Dit zijn de verschillende onderwerpen die we willen laten zien
  const factors = [
    { title: "Inflation & Interest Rates", desc: "Beslissingen van centrale banken over rente beïnvloeden of mensen crypto kopen.", icon: "📈" },
    { title: "Regulation & Legal News", desc: "Nieuwe wetten of verboden in grote landen zorgen vaak voor snelle prijsveranderingen.", icon: "⚖️" },
    { title: "Market Sentiment & FOMO", desc: "Trends op sociale media kunnen bubbels veroorzaken omdat mensen bang zijn om iets te missen.", icon: "💬" },
    { title: "Technological Upgrades", desc: "Verbeteringen aan het netwerk (zoals bij Ethereum) maken een munt meer waard.", icon: "💻" },
    { title: "Institutional Adoption", desc: "Als grote bedrijven zoals Tesla crypto kopen, geeft dat vertrouwen voor de lange termijn.", icon: "🏢" }
  ];

  return (
    <Card title="Market Impact Factors" className="outerliststyling" style={{ padding: '20px', gap: '15px', width: '100%', boxSizing: 'border-box' }}>
      {/* We gaan door het lijstje heen en maken voor elk onderwerp een blokje tekst */}
      {factors.map((factor, index) => (
        <div key={index} style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          <h3 className="normaaltekst" style={{ color: 'rgb(131, 122, 255)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{factor.icon}</span> {factor.title}
          </h3>
          <p className="normaaltekst" style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.8, fontWeight: '300' }}>
            {factor.desc}
          </p>
        </div>
      ))}
    </Card>
  );
};

export default MarketFactors;
