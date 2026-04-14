import React from 'react';

const Badge = ({ children, variant = 'positive', className = '' }) => {
  return (
    <span className={`normaaltekst font-9 ${variant} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
