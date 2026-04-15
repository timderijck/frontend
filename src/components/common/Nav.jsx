import React from 'react';

// De Nav component is het menuutje met linkjes bovenaan de pagina.
const Nav = () => {
  // Dit is een lijstje met alle knoppen in het menu
  const navItems = [
    { label: 'MARKETS', active: true },
    { label: 'IMPACT', active: false },
    { label: 'NEWS', active: false }
  ];

  return (
    <nav className="normaaltekst" style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
      {/* We gaan door het lijstje heen en maken voor elk item een tekstje */}
      {navItems.map(item => (
        <span 
          key={item.label}
          style={{ 
            cursor: 'pointer', 
            // Als het item actief is, maken we de tekst dikgedrukt
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
