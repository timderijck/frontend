import React from 'react';
import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
  return (
    <header style={{
      padding: '15px 30px',
      borderBottom: '2px solid #333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#1a1a1a',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
