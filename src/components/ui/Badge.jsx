import React from 'react';

// De Badge is een klein gekleurd labeltje, bijvoorbeeld om aan te geven of iets positief of negatief is.
const Badge = ({ children, variant = 'positive', className = '' }) => {
  return (
    <span className={`normaaltekst font-9 ${variant} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
