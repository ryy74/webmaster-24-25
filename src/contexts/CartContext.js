import { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
  cart: {},
  addItem: () => {},
  addToCart: () => {},
  addToCartWithCustomizations: () => {},
  updateCartQuantity: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});

  const generateCartItemKey = (itemId, custom = {}) => {
    if (!custom) return itemId;             
    const payload = JSON.stringify({
      specialInstructions: custom.specialInstructions || '',
      includeUtensils    : custom.includeUtensils,
      removedIngredients : custom.removedIngredients || [],
    });
    return `${itemId}_${btoa(payload)}`;
  };

  const addItem = (item) => {
    const key = item.cartItemKey ?? generateCartItemKey(item.itemId);
    const qty = item.quantity ?? 1;

    setCart(prev => ({
      ...prev,
      [key]: prev[key]
        ? { ...prev[key], quantity: prev[key].quantity + qty }
        : { ...item, quantity: qty },
    }));
    setCartCount(c => c + qty);
  };

  const addToCart = (itemId) => addToCartWithCustomizations(itemId, { quantity: 1 });

  const addToCartWithCustomizations = (itemId, custom = {}) => {
    const qty  = custom.quantity || 1;
    const key  = generateCartItemKey(itemId, custom);

    setCart(prev => {
      if (prev[key]) {
        return {
          ...prev,
          [key]: { ...prev[key], quantity: prev[key].quantity + qty },
        };
      }
      return {
        ...prev,
        [key]: {
          itemId,
          quantity   : qty,
          specialInstructions: custom.specialInstructions || '',
          includeUtensils    : custom.includeUtensils !== undefined ? custom.includeUtensils : true,
          removedIngredients : custom.removedIngredients || [],
          selectedIngredients: custom.selectedIngredients || [],
          price: custom.price,
          name: custom.name,
          description: custom.description,
          image: custom.image,
          time: custom.time,
          rewardRedemption: custom.rewardRedemption || false,
        },
      };
    });
    setCartCount(c => c + qty);
  };

  const updateCartQuantity = (key, quantity) => {
    setCart(prev => {
      if (!prev[key]) return prev;

      const diff = quantity - prev[key].quantity;
      let next   = { ...prev };

      if (quantity <= 0) {
        delete next[key];
      } else {
        next[key] = { ...prev[key], quantity };
      }
      setCartCount(c => c + diff);
      return next;
    });
  };

  const updateCartItem = (key, updates) => {
    setCart(prev => {
      if (!prev[key]) return prev;

      if (
        updates.quantity !== undefined &&
        updates.quantity !== prev[key].quantity
      ) {
        const diff = updates.quantity - prev[key].quantity;
        setCartCount(c => c + diff);
      }
      return { ...prev, [key]: { ...prev[key], ...updates } };
    });
  };

  const removeFromCart = (key) => {
    setCart(prev => {
      if (!prev[key]) return prev;
      const qty = prev[key].quantity;
      const next = { ...prev };
      delete next[key];
      setCartCount(c => c - qty);
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{
      cartCount, setCartCount, cart,
      addItem,
      addToCart, addToCartWithCustomizations,
      updateCartQuantity, updateCartItem,
      removeFromCart, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);