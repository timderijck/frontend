import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sparkline from '../../components/common/Sparkline';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import StatItem from '../../components/ui/StatItem';
import { formatPrice, formatPercentage } from '../../utils/formatters';

// Deze pagina laat alle details zien van één specifieke munt waar je op hebt geklikt.
const CoinDetail = () => {
  // We halen de 'id' (naam van de munt) uit de link in de browserbalk
  const { id } = useParams();
  const navigate = useNavigate();
  // Hier bewaren we alle gegevens van deze ene munt
  const [coin, setCoin] = useState(null);

  // Deze functie haalt de extra uitgebreide details van de munt op van internet.
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
        console.error("Fout bij het ophalen van de munt-gegevens:", err);
      }
    }
    fetchCoinData();
  }, [id]);

  // Als de computer nog bezig is met het ophalen van de gegevens, laten we dit zien.
  if (!coin) return <div className="normaaltekst coin-page-container p-40">Gegevens van {id} laden...</div>;

  // We maken een kortere naam voor de marktgegevens zodat we minder hoeven te typen
  const md = coin.market_data;
  // We kijken of de prijs omhoog (positief) of omlaag (negatief) is gegaan
  const isPositive = md.price_change_percentage_24h >= 0;
  const color = isPositive ? 'var(--positive)' : 'var(--negative)';

  return (
    <div className="defaultbackground flex-column">
      <Header />
      <main className="coin-page-container dashboard-container flex-1">
        {/* Knop om terug te gaan naar het overzicht */}
        <Button variant="back" onClick={() => navigate('/')}>
          ← Terug naar het Dashboard
        </Button>

        <div className="flex-column gap-30">
          {/* De bovenkant met de naam, het logo en de huidige prijs */}
          <header className="coin-detail-header flex justify-between align-center flex-wrap gap-20">
            <div className="flex align-center gap-20">
              <img src={coin.image.large} className="coin-icon-large" alt={coin.name} />
              <div>
                <h1 className="koptekst font-2rem no-margin">{coin.name}</h1>
                <p className="ranktekst accent-text font-9">Nummer #{coin.market_cap_rank} op de markt</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="koptekst font-2rem no-margin">${formatPrice(md.current_price.usd)}</h2>
              <Badge variant={isPositive ? 'positive' : 'negative'} className="font-1rem">
                {formatPercentage(md.price_change_percentage_24h)} (laatste 24u)
              </Badge>
            </div>
          </header>

          <div className="stats-grid">
            {/* Een blokje met belangrijke cijfers over de waarde en voorraad */}
            <Card title="Markt Statistieken">
              <div className="flex-column">
                <StatItem label="Totale Marktwaarde" value={`$${md.market_cap.usd.toLocaleString()}`} />
                <StatItem label="Hoogste 24u" value={`$${formatPrice(md.high_24h.usd)}`} className="positive" />
                <StatItem label="Laagste 24u" value={`$${formatPrice(md.low_24h.usd)}`} className="negative" />
                <StatItem label="Aantal munten in omloop" value={`${md.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`} />
              </div>
            </Card>

            {/* Een grotere grafiek van de prijs in de afgelopen 7 dagen */}
            <Card title="Prijsverloop (7 dagen)">
              <div className="graph-container flex align-center justify-center flex-1">
                <Sparkline 
                  data={md.sparkline_7d?.price} 
                  color={color} 
                  width={600} 
                  height={150} 
                  showTooltip={true} 
                />
              </div>
            </Card>
          </div>

          <div className="stats-grid grid-1-2">
            {/* Nog meer details over records en prijsveranderingen */}
            <Card title="Extra Details">
              <div className="flex-column gap-8">
                <StatItem 
                  label="Totale voorraad" 
                  value={md.total_supply ? md.total_supply.toLocaleString() : 'Niet bekend'} 
                />
                <StatItem 
                  label="Maximale voorraad" 
                  value={md.max_supply ? md.max_supply.toLocaleString() : 'Geen limiet'} 
                />
                <StatItem 
                  label="Hoogste prijs ooit" 
                  value={`$${formatPrice(md.ath.usd)}`} 
                  className="positive" 
                />
                <StatItem 
                  label="Laagste prijs ooit" 
                  value={`$${formatPrice(md.atl.usd)}`} 
                  className="negative" 
                />
                <StatItem 
                  label="Verandering 24u" 
                  value={formatPercentage(md.price_change_percentage_24h)} 
                  className={md.price_change_percentage_24h >= 0 ? 'positive' : 'negative'} 
                />
                <StatItem 
                  label="Verandering 7d" 
                  value={formatPercentage(md.price_change_percentage_7d)} 
                  className={md.price_change_percentage_7d >= 0 ? 'positive' : 'negative'} 
                />
                <StatItem 
                  label="Verandering 30d" 
                  value={formatPercentage(md.price_change_percentage_30d)} 
                  className={md.price_change_percentage_30d >= 0 ? 'positive' : 'negative'} 
                />
              </div>
            </Card>

            {/* Een tekstvak met uitleg over wat de munt precies is en doet */}
            <section className="description-box flex-column">
              <h2 className="ranktekst mb-20 font-9" style={{ fontSize: '1.3rem' }}>Over deze munt</h2>
              <div 
                className="normaaltekst font-9 dim" 
                // We gebruiken dangerouslySetInnerHTML omdat de tekst van de API HTML-codes bevat (zoals linkjes)
                dangerouslySetInnerHTML={{ __html: coin.description.en || "Geen beschrijving beschikbaar." }}
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoinDetail;
