import React from 'react';

// De Button component is een knop waar je op kunt klikken.
const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = "btn normaaltekst";
  // We hebben verschillende soorten knoppen (kleuren en vormen)
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    back: "back-btn"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
