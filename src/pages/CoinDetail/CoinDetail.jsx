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

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);

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
        console.error("Error fetching detailed coin data:", err);
      }
    }
    fetchCoinData();
  }, [id]);

  if (!coin) return <div className="normaaltekst coin-page-container p-40">Loading {id}...</div>;

  const md = coin.market_data;
  const isPositive = md.price_change_percentage_24h >= 0;
  const color = isPositive ? 'var(--positive)' : 'var(--negative)';

  return (
    <div className="defaultbackground flex-column">
      <Header />
      <main className="coin-page-container dashboard-container flex-1">
        <Button variant="back" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </Button>

        <div className="flex-column gap-30">
          <header className="coin-detail-header flex justify-between align-center flex-wrap gap-20">
            <div className="flex align-center gap-20">
              <img src={coin.image.large} className="coin-icon-large" alt={coin.name} />
              <div>
                <h1 className="koptekst font-2rem no-margin">{coin.name}</h1>
                <p className="ranktekst accent-text font-9">Rank #{coin.market_cap_rank}</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="koptekst font-2rem no-margin">${formatPrice(md.current_price.usd)}</h2>
              <Badge variant={isPositive ? 'positive' : 'negative'} className="font-1rem">
                {formatPercentage(md.price_change_percentage_24h)} (24h)
              </Badge>
            </div>
          </header>

          <div className="stats-grid">
            <Card title="Market Stats">
              <div className="flex-column">
                <StatItem label="Market Cap" value={`$${md.market_cap.usd.toLocaleString()}`} />
                <StatItem label="24h High" value={`$${formatPrice(md.high_24h.usd)}`} className="positive" />
                <StatItem label="24h Low" value={`$${formatPrice(md.low_24h.usd)}`} className="negative" />
                <StatItem label="Supply" value={`${md.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`} />
              </div>
            </Card>

            <Card title="7-Day Price Trend">
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
            <Card title="Asset Details">
              <div className="flex-column gap-8">
                <StatItem 
                  label="Total Supply" 
                  value={md.total_supply ? md.total_supply.toLocaleString() : 'N/A'} 
                />
                <StatItem 
                  label="Max Supply" 
                  value={md.max_supply ? md.max_supply.toLocaleString() : 'N/A'} 
                />
                <StatItem 
                  label="All Time High" 
                  value={`$${formatPrice(md.ath.usd)}`} 
                  className="positive" 
                />
                <StatItem 
                  label="All Time Low" 
                  value={`$${formatPrice(md.atl.usd)}`} 
                  className="negative" 
                />
                <StatItem 
                  label="24h Change" 
                  value={formatPercentage(md.price_change_percentage_24h)} 
                  className={md.price_change_percentage_24h >= 0 ? 'positive' : 'negative'} 
                />
                <StatItem 
                  label="7d Change" 
                  value={formatPercentage(md.price_change_percentage_7d)} 
                  className={md.price_change_percentage_7d >= 0 ? 'positive' : 'negative'} 
                />
                <StatItem 
                  label="30d Change" 
                  value={formatPercentage(md.price_change_percentage_30d)} 
                  className={md.price_change_percentage_30d >= 0 ? 'positive' : 'negative'} 
                />
              </div>
            </Card>

            <section className="description-box flex-column">
              <h2 className="ranktekst mb-20 font-9" style={{ fontSize: '1.3rem' }}>Description</h2>
              <div 
                className="normaaltekst font-9 dim" 
                dangerouslySetInnerHTML={{ __html: coin.description.en || "No description available for this asset." }}
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
