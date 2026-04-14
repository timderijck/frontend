import React from 'react';
import CoinCard from './CoinCard';

const AssetsTable = ({ coins, loading, search, favorites, toggleFavorite }) => {
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const favCoins = filteredCoins.filter(c => favorites.includes(c.id));
  const otherCoins = filteredCoins.filter(c => !favorites.includes(c.id) || search);

  return (
    <section className="assets-table">
      <div className="table-row table-header">
        <span>#</span>
        <span>Asset</span>
        <span>Price</span>
        <span>24h Change</span>
        <span className="text-right">7D Trend</span>
        <span className="text-center">Fav</span>
      </div>

      {loading ? (
        <div className="normaaltekst text-center p-40">
          Loading assets...
        </div>
      ) : (
        <>
          {favorites.length > 0 && !search && (
            <div className="favorites-separator">
              {favCoins.map(coin => (
                <CoinCard 
                  key={coin.id} 
                  coin={coin} 
                  rank={coins.findIndex(c => c.id === coin.id) + 1} 
                  isFavorite={true}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
          {otherCoins.map(coin => (
            <CoinCard 
              key={coin.id} 
              coin={coin} 
              rank={coins.findIndex(c => c.id === coin.id) + 1} 
              isFavorite={favorites.includes(coin.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default AssetsTable;
