import { useNavigate } from 'react-router-dom';
import Sparkline from '../common/Sparkline';
import { formatPrice, formatPercentage } from '../../utils/formatters';

// De CoinCard is één rij in de tabel met alle info over een specifieke munt.
const CoinCard = ({ coin, rank, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();
  if (!coin) return null;

  // We kijken of de prijs omhoog of omlaag is gegaan voor de kleur
  const isPositive = coin.price_change_percentage_24h >= 0;
  const color = isPositive ? 'var(--positive)' : 'var(--negative)';

  return (
    // Als je op de rij klikt, ga je naar de detailpagina van die munt
    <div className="table-row coin-card" onClick={() => navigate(`/coin/${coin.id}`)}>
      <span className="normaaltekst dim font-75">{rank}</span>
      
      {/* Naam en plaatje van de munt */}
      <div className="coin-info-cell">
        <img src={coin.image} alt="" className="coin-icon" />
        <span className="koptekst font-9">
          {coin.name} <span className="dim font-75" style={{ fontWeight: 'normal' }}>{coin.symbol.toUpperCase()}</span>
        </span>
      </div>

      {/* De huidige prijs, netjes opgemaakt */}
      <div className="normaaltekst bold font-9">
        ${formatPrice(coin.current_price)}
      </div>

      {/* Hoeveel de prijs is veranderd in de laatste 24 uur */}
      <div className={`normaaltekst font-9 ${isPositive ? 'positive' : 'negative'}`}>
        {formatPercentage(coin.price_change_percentage_24h)}
      </div>

      {/* Het kleine grafiekje van de afgelopen 7 dagen */}
      <div className="flex justify-end">
        <Sparkline data={coin.sparkline_in_7d?.price} color={color} showTooltip={true} />
      </div>

      {/* De ster-knop om een munt favoriet te maken */}
      <div className="text-center">
        <button 
          className={`fav-btn ${isFavorite ? 'fav-active' : 'fav-inactive'}`}
          onClick={(e) => { 
            e.stopPropagation(); // Zorgt dat je niet naar de detailpagina gaat als je op de ster klikt
            toggleFavorite(coin.id); 
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default CoinCard;
