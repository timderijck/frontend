import { useNavigate } from 'react-router-dom';
import Sparkline from '../common/Sparkline';
import { formatPrice, formatPercentage } from '../../utils/formatters';

const CoinCard = ({ coin, rank, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();
  if (!coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? 'var(--positive)' : 'var(--negative)';

  return (
    <div className="table-row coin-card" onClick={() => navigate(`/coin/${coin.id}`)}>
      <span className="normaaltekst dim font-75">{rank}</span>
      
      <div className="coin-info-cell">
        <img src={coin.image} alt="" className="coin-icon" />
        <span className="koptekst font-9">
          {coin.name} <span className="dim font-75" style={{ fontWeight: 'normal' }}>{coin.symbol.toUpperCase()}</span>
        </span>
      </div>

      <div className="normaaltekst bold font-9">
        ${formatPrice(coin.current_price)}
      </div>

      <div className={`normaaltekst font-9 ${isPositive ? 'positive' : 'negative'}`}>
        {formatPercentage(coin.price_change_percentage_24h)}
      </div>

      <div className="flex justify-end">
        <Sparkline data={coin.sparkline_in_7d?.price} color={color} showTooltip={true} />
      </div>

      <div className="text-center">
        <button 
          className={`fav-btn ${isFavorite ? 'fav-active' : 'fav-inactive'}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default CoinCard;
