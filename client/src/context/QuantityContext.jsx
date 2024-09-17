import { createContext, useState } from 'react';

export const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);

  const quantityHandler = (value) => {
    setQuantity((qty) => qty + value);
  };
  return (
    <QuantityContext.Provider
      value={{ quantity, setQuantity, quantityHandler }}
    >
      {children}
    </QuantityContext.Provider>
  );
};
