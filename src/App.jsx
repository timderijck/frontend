import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CoinCard from "./CoinCard.jsx";
import MarketFactors from './MarketFactors.jsx';
import CoinPage from './CoinPage.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoins() {
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h", {
          headers: { 'x-cg-demo-api-key': apiKey }
        });
        const data = await res.json();
        setCoins(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    }
    getCoins();
  }, []);

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='defaultbackground' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%', flex: 1 }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h2 className="koptekst" style={{ fontSize: '2rem', marginBottom: '20px' }}>Market Assets</h2>
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="normaaltekst"
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 20px',
              borderRadius: '8px',
              border: '2px solid #333',
              background: '#222',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{
            background: '#1a1a1a',
            border: '2px solid #333',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1.5fr 1fr 1fr 1.5fr',
              padding: '15px 20px', 
              background: '#252525',
              borderBottom: '2px solid #333',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              color: '#888',
              textTransform: 'uppercase'
            }}>
              <span>#</span>
              <span>Asset</span>
              <span>Price</span>
              <span>24h Change</span>
              <span style={{ textAlign: 'right' }}>7D Trend</span>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center' }} className="normaaltekst">
                Loading assets...
              </div>
            ) : (
              <div>
                {filteredCoins.map((coin, index) => (
                  <CoinCard key={coin.id} coin={coin} rank={index + 1} />
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <MarketFactors />
            <div style={{ padding: '30px', background: '#1a1a1a', border: '2px solid #333' }}>
              <h3 className="ranktekst" style={{ marginBottom: '20px' }}>Quick Stats</h3>
              <div className="normaaltekst" style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.9rem' }}>
                <p>Global Cap: <span style={{ color: '#837aff' }}>$2.45T</span></p>
                <p>BTC Dominance: <span style={{ color: '#837aff' }}>52.4%</span></p>
                <p>Volume (24h): <span style={{ color: '#837aff' }}>$84.2B</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </Router>
  )
}

export default App