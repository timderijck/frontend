import React from 'react';

const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = "btn normaaltekst";
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
