import React from 'react';
import CoinCard from './CoinCard';

// De AssetsTable laat een lijst zien van alle cryptomunten.
const AssetsTable = ({ coins, loading, search, favorites, toggleFavorite, error }) => {
  // Hier filteren we de munten op basis van wat je in de zoekbalk typt
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // We splitsen de lijst op in favorieten en de rest
  const favCoins = filteredCoins.filter(c => favorites.includes(c.id));
  const otherCoins = filteredCoins.filter(c => !favorites.includes(c.id) || search);

  return (
    <section className="assets-table">
      {/* De bovenste rij van de tabel met de namen van de kolommen */}
      <div className="table-row table-header">
        <span>#</span>
        <span>Asset</span>
        <span>Price</span>
        <span>24h Change</span>
        <span className="text-right">7D Trend</span>
        <span className="text-center">Fav</span>
      </div>

      {/* Als de data nog wordt opgehaald, laten we een laadtekst zien */}
      {loading ? (
        <div className="normaaltekst text-center p-40">
          Loading assets...
        </div>
      ) : error ? (
        // Als er een fout is opgetreden (bijv. API limiet), laten we dat hier zien
        <div className="normaaltekst text-center p-40" style={{ color: 'var(--negative)' }}>
          ⚠️ {error}
        </div>
      ) : (
        <>
          {/* Als je favorieten hebt en niet aan het zoeken bent, laten we die bovenaan zien */}
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
          {/* Hier laten we alle andere munten zien (of alles als je zoekt) */}
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
