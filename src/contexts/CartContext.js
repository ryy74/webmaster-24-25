import { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
  cart: {},
  addToCart: () => {},
  updateCartQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});

  const addToCart = (itemId) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[itemId] || 0) + 1;
      return { ...prevCart, [itemId]: newQuantity };
    });
    setCartCount((prevCount) => prevCount + 1);
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      const oldQuantity = prevCart[itemId] || 0;
      const diff = quantity - oldQuantity;
      const updatedCart = { ...prevCart, [itemId]: quantity };
      if (quantity === 0) {
        delete updatedCart[itemId];
      }
      setCartCount((prevCount) => prevCount + diff);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      if (!(itemId in prevCart)) return prevCart;
      const removedQuantity = prevCart[itemId];
      const updatedCart = { ...prevCart };
      delete updatedCart[itemId];
      setCartCount((prevCount) => prevCount - removedQuantity);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
