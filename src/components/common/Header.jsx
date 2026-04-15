import React from 'react';
import Logo from './Logo';
import Nav from './Nav';

// De Header is de bovenkant van de website die op elke pagina hetzelfde blijft.
const Header = () => {
  return (
    <header style={{
      padding: '15px 30px',
      borderBottom: '2px solid #333',
      display: 'flex',
      justifyContent: 'space-between', // Zorgt dat het logo links staat en de navigatie rechts
      alignItems: 'center',
      background: '#1a1a1a',
      position: 'sticky', // Blijft bovenin staan als je naar beneden scrollt
      top: 0,
      zIndex: 1000
    }}>
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
