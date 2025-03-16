import { createContext, useContext, useState } from 'react';

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
  cart: {},
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

  const generateCartItemKey = (itemId, customizations) => {
    if (!customizations) return itemId;
    const customizationString = JSON.stringify({
      specialInstructions: customizations.specialInstructions || '',
      includeUtensils: customizations.includeUtensils,
      removedIngredients: customizations.removedIngredients || [],
    });
    return `${itemId}_${btoa(customizationString)}`;
  };

  const addToCart = (itemId) => {
    addToCartWithCustomizations(itemId, { quantity: 1 });
  };

  const addToCartWithCustomizations = (itemId, customizations = {}) => {
    const quantity = customizations.quantity || 1;
    const cartItemKey = generateCartItemKey(itemId, customizations);

    setCart((prevCart) => {
      if (prevCart[cartItemKey]) {
        const updatedItem = {
          ...prevCart[cartItemKey],
          quantity: prevCart[cartItemKey].quantity + quantity,
        };
        return { ...prevCart, [cartItemKey]: updatedItem };
      } else {
        return {
          ...prevCart,
          [cartItemKey]: {
            itemId,
            quantity,
            specialInstructions: customizations.specialInstructions || '',
            includeUtensils:
              customizations.includeUtensils !== undefined
                ? customizations.includeUtensils
                : true,
            removedIngredients: customizations.removedIngredients || [],
          },
        };
      }
    });

    setCartCount((prevCount) => prevCount + quantity);
  };

  const updateCartQuantity = (cartItemKey, quantity) => {
    setCart((prevCart) => {
      if (!prevCart[cartItemKey]) return prevCart;

      const oldQuantity = prevCart[cartItemKey].quantity;
      const diff = quantity - oldQuantity;

      if (quantity <= 0) {
        const updatedCart = { ...prevCart };
        delete updatedCart[cartItemKey];
        setCartCount((prevCount) => prevCount + diff);
        return updatedCart;
      }

      const updatedCart = {
        ...prevCart,
        [cartItemKey]: {
          ...prevCart[cartItemKey],
          quantity,
        },
      };

      setCartCount((prevCount) => prevCount + diff);
      return updatedCart;
    });
  };

  const updateCartItem = (cartItemKey, updates) => {
    setCart((prevCart) => {
      if (!prevCart[cartItemKey]) return prevCart;

      if (
        updates.quantity !== undefined &&
        updates.quantity !== prevCart[cartItemKey].quantity
      ) {
        const diff = updates.quantity - prevCart[cartItemKey].quantity;
        setCartCount((prevCount) => prevCount + diff);
      }

      return {
        ...prevCart,
        [cartItemKey]: {
          ...prevCart[cartItemKey],
          ...updates,
        },
      };
    });
  };

  const removeFromCart = (cartItemKey) => {
    setCart((prevCart) => {
      if (!(cartItemKey in prevCart)) return prevCart;

      const removedQuantity = prevCart[cartItemKey].quantity;
      const updatedCart = { ...prevCart };
      delete updatedCart[cartItemKey];

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
        addToCartWithCustomizations,
        updateCartQuantity,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
