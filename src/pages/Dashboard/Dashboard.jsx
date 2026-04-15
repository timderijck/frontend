import { useState, useEffect, useCallback } from 'react';
import MarketFactors from '../../components/dashboard/MarketFactors';
import MarketShareChart from '../../components/dashboard/MarketShareChart';
import AssetsTable from '../../components/dashboard/AssetsTable';
import QuickStats from '../../components/dashboard/QuickStats';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchCoins = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&t=${Date.now()}`, {
        headers: { 'x-cg-demo-api-key': apiKey }
      });
      const data = await res.json();
      setCoins(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

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
          <div className="flex-1">
            <h2 className="koptekst font-2rem">Market Assets</h2>
            <div className="flex align-center gap-20 flex-wrap">
              <Input 
                placeholder="Search assets..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
                variant="secondary" 
                onClick={() => fetchCoins(true)} 
                disabled={refreshing}
                style={{ marginTop: '15px', minWidth: '140px' }}
              >
                {refreshing ? 'Updating...' : '↻ Refresh Data'}
              </Button>
            </div>
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
