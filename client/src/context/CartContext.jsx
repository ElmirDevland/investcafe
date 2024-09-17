import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (drink) => {
    const itemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.itemKey === drink.itemKey &&
        cartItem.comment === drink.comment &&
        JSON.stringify(cartItem.options) === JSON.stringify(drink.options)
    );

    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + drink.quantity,
      };
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, drink]);
    }
  };

  const updateCartItem = (drink, value) => {
    const updateItem = cart.find((item) => item.name === drink.name);
    const updatedItem = updateItem
      ? cart.map((item) =>
          item === updateItem
            ? { ...item, quantity: drink.quantity + value }
            : item
        )
      : [...cart];

    setCart(updatedItem);
  };

  const removeFromCart = (drinkId) => {
    setCart(cart.filter((drink) => drink.id !== drinkId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => {
    document.body.style.overflow = 'hidden';
    setShowCart(true);
  };
  const closeCart = () => {
    document.body.style.overflow = '';
    setShowCart(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        showCart,
        closeCart,
        openCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
