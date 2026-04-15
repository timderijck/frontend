import React from 'react';

// De Card is een blokje met een randje eromheen waar we andere informatie in zetten.
const Card = ({ children, className = '', title, ...props }) => {
  return (
    <div className={`card flex-column ${className}`} {...props}>
      {/* Als er een titel is opgegeven, laten we die bovenaan het kaartje zien */}
      {title && <h3 className="ranktekst mb-15 font-9" style={{ fontSize: '1.2rem' }}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
