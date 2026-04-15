import React from 'react';

// StatItem laat twee tekstjes naast of onder elkaar zien, zoals een naam en een getal.
const StatItem = ({ label, value, className = '', labelClassName = '' }) => {
  return (
    <div className="stat-item">
      {/* Het label (bijvoorbeeld: "Huidige prijs") */}
      <span className={`normaaltekst dim font-9 ${labelClassName}`}>{label}</span>
      {/* De waarde (bijvoorbeeld: "$50.000") */}
      <span className={`normaaltekst bold font-9 ${className}`}>{value}</span>
    </div>
  );
};

export default StatItem;
