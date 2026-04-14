import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input 
      className={`normaaltekst search-input ${className}`}
      {...props}
    />
  );
};

export default Input;
