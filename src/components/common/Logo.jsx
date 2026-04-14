import React from 'react';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <img src="/src/assets/img/stocks.png" style={{ height: '30px' }} alt="Logo" />
      <h1 className="koptekst" style={{ fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>
        FINANCE <span style={{ color: '#837aff' }}>DASHBOARD</span>
      </h1>
    </div>
  );
};

export default Logo;
