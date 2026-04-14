import React from 'react';

const Card = ({ children, className = '', title, ...props }) => {
  return (
    <div className={`card flex-column ${className}`} {...props}>
      {title && <h3 className="ranktekst mb-15 font-9" style={{ fontSize: '1.2rem' }}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
