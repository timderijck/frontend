import React from 'react';

const StatItem = ({ label, value, className = '', labelClassName = '' }) => {
  return (
    <div className="stat-item">
      <span className={`normaaltekst dim font-9 ${labelClassName}`}>{label}</span>
      <span className={`normaaltekst bold font-9 ${className}`}>{value}</span>
    </div>
  );
};

export default StatItem;
