import React from 'react';

const Nav = () => {
  const navItems = [
    { label: 'MARKETS', active: true },
    { label: 'IMPACT', active: false },
    { label: 'NEWS', active: false }
  ];

  return (
    <nav className="normaaltekst" style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
      {navItems.map(item => (
        <span 
          key={item.label}
          style={{ 
            cursor: 'pointer', 
            fontWeight: item.active ? 'bold' : 'normal',
            opacity: item.active ? 1 : 0.6 
          }}
        >
          {item.label}
        </span>
      ))}
    </nav>
  );
};

export default Nav;
