import React from 'react';

// De Input is een tekstvak waar de gebruiker iets in kan typen, zoals een zoekterm.
const Input = ({ className = '', ...props }) => {
  return (
    <input 
      className={`normaaltekst search-input ${className}`}
      {...props}
    />
  );
};

export default Input;
