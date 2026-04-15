// deze functie maakt van een getal een mooie dollar prijs met komma's en punten
export const formatPrice = (price) => {
  if (price === null || price === undefined) return 'N/A';
  const options = price >= 1 ? { min: 2, max: 2 } : price >= 0.01 ? { min: 4, max: 4 } : { min: 6, max: 8 };
  return price.toLocaleString(undefined, { 
    minimumFractionDigits: options.min, 
    maximumFractionDigits: options.max 
  });
};

// deze functie rekent het percentage uit en zet er een plus of min voor
export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '0.00%';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};
