import { useState, useEffect } from 'react';
import MarketFactors from '../../components/dashboard/MarketFactors';
import MarketShareChart from '../../components/dashboard/MarketShareChart';
import AssetsTable from '../../components/dashboard/AssetsTable';
import QuickStats from '../../components/dashboard/QuickStats';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Input from '../../components/ui/Input';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function getCoins() {
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h", {
          headers: { 'x-cg-demo-api-key': apiKey }
        });
        const data = await res.json();
        setCoins(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    }
    getCoins();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className='defaultbackground flex-column'>
      <Header />
      
      <main className="dashboard-container flex-1">
        <header className="dashboard-header">
          <div>
            <h2 className="koptekst font-2rem">Market Assets</h2>
            <Input 
              placeholder="Search assets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <p className="normaaltekst dim font-75">
            Showing top 100 products by market cap
          </p>
        </header>
        
        <AssetsTable 
          coins={coins} 
          loading={loading} 
          search={search} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
        />

        <section className="stats-grid">
          <MarketShareChart coins={coins} />
          <MarketFactors />
          <QuickStats />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
