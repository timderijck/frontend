import { useState, useEffect, useCallback } from 'react';
import MarketFactors from '../../components/dashboard/MarketFactors';
import MarketShareChart from '../../components/dashboard/MarketShareChart';
import AssetsTable from '../../components/dashboard/AssetsTable';
import QuickStats from '../../components/dashboard/QuickStats';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// Dit is de hoofdpagina van het dashboard waar je alle munten ziet.
const Dashboard = () => {
  // Hier bewaren we de lijst met munten die we van internet halen
  const [coins, setCoins] = useState([]);
  // Hier bewaren we wat de gebruiker in de zoekbalk typt
  const [search, setSearch] = useState('');
  // Hier houden we bij of we nog aan het wachten zijn op de gegevens
  const [loading, setLoading] = useState(true);
  // Hier houden we bij of we de lijst handig aan het verversen zijn
  const [refreshing, setRefreshing] = useState(false);
  // Hier houden we bij of er een fout is opgetreden bij het laden
  const [error, setError] = useState(null);
  
  // Hier laden we de opgeslagen favorieten uit het geheugen van je browser (localStorage).
  // Zo blijven je sterretjes staan als je de pagina ververst.
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Deze functie haalt alle muntgegevens op van de CoinGecko server (de API).
  const fetchCoins = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true); // Laat zien dat we aan het verversen zijn
    else setLoading(true); // Laat het laadscherm zien bij de eerste keer
    setError(null); // We beginnen met een schone lei (geen foutmeldingen)

    const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
    try {
      // We vragen de top 100 munten op en zetten er een uniek getal (Date.now) bij zodat de browser de data niet 'onthoudt' maar echt nieuw ophaalt.
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&t=${Date.now()}`, {
        headers: { 'x-cg-demo-api-key': apiKey }
      });

      // Als de server boos is (bijvoorbeeld als we te vaak hebben gevraagd)
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Wacht even... we hebben te vaak gegevens gevraagd van de server (limiet bereikt). Probeer het over een minuutje weer!");
        }
        throw new Error("Er ging iets mis bij het ophalen van de gegevens van de server.");
      }

      const data = await res.json();
      
      // We checken of we echt een lijst hebben gekregen en slaan die op
      if (Array.isArray(data)) {
        setCoins(data);
      } else {
        throw new Error("De server stuurde gegevens terug die we niet begrijpen.");
      }
    } catch (error) {
      console.error("Er ging iets mis bij het ophalen van de munten:", error);
      setError(error.message); // Sla de foutmelding op om aan de gebruiker te laten zien
      setCoins([]); // Maak de lijst leeg als het niet gelukt is
    } finally {
      // We zijn klaar met laden, dus de laadschermen mogen weg
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Dit zorgt ervoor dat de munten automatisch worden opgehaald zodra je de website opent.
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  // Dit slaat je lijstje met favorieten op in je browser zodra je een sterretje aan- of uitzet.
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Deze functie zet een munt in of uit je favorietenlijst als je op het sterretje klikt.
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className='defaultbackground flex-column'>
      {/* De bovenbalk */}
      <Header />
      
      <main className="dashboard-container flex-1">
        <header className="dashboard-header">
          <div className="flex-1">
            <h2 className="koptekst font-2rem">Market Assets</h2>
            <div className="flex align-center gap-20 flex-wrap">
              {/* De zoekbalk waar je kunt typen */}
              <Input 
                placeholder="Zoek een munt..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* De knop om de gegevens handmatig te verversen */}
              <Button 
                variant="secondary" 
                onClick={() => fetchCoins(true)} 
                disabled={refreshing}
                style={{ marginTop: '15px', minWidth: '140px' }}
              >
                {refreshing ? 'Bijwerken...' : '↻ Ververs Gegevens'}
              </Button>
            </div>
          </div>
          <p className="normaaltekst dim font-75">
            Hieronder zie je de top 100 grootste cryptomunten
          </p>
        </header>
        
        {/* De grote tabel met alle munten erin */}
        <AssetsTable 
          coins={coins} 
          loading={loading} 
          search={search} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
          error={error}
        />

        {/* De extra blokjes onder de tabel met statistieken en uitleg */}
        <section className="stats-grid">
          <MarketShareChart coins={coins} />
          <MarketFactors />
          <QuickStats />
        </section>
      </main>

      {/* De onderbalk */}
      <Footer />
    </div>
  );
};

export default Dashboard;
