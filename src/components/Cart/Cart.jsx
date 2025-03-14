import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiShoppingCart,
} from 'react-icons/fi';
import { Link, Navigate } from 'react-router-dom';

import CartItem from './CartItem';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import useMenuItems from '../../consts/menuItems';

import './Cart.css';

function Cart() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { cart, updateCartQuantity, updateCartItem, removeFromCart } = useCart();
  const menuItems = useMenuItems();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  const cartItemKeys = Object.keys(cart);
  const isEmpty = cartItemKeys.length === 0;

  const cartItems = cartItemKeys
    .map((cartItemKey) => {
      const cartItem = cart[cartItemKey];
      const menuItem = menuItems.find((m) => m.id === cartItem.itemId);
      if (!menuItem) return null;
      
      return (
        <CartItem
          key={cartItemKey}
          item={menuItem}
          quantity={cartItem.quantity}
          customizations={cartItem}
          cartItemKey={cartItemKey}
          onChangeQuantity={(key, q) => updateCartQuantity(key, q)}
          onUpdateItem={(key, updates) => updateCartItem(key, updates)}
          onRemove={(key) => removeFromCart(key)}
        />
      );
    })
    .filter(Boolean);

  const totalPrice = cartItemKeys.reduce((acc, key) => {
    const cartItem = cart[key];
    const menuItem = menuItems.find((m) => m.id === cartItem.itemId);
    if (!menuItem) return acc;
    return acc + menuItem.price * cartItem.quantity;
  }, 0);

  const summaryItems = cartItemKeys.map((cartItemKey, index) => {
    const cartItem = cart[cartItemKey];
    const menuItem = menuItems.find((m) => m.id === cartItem.itemId);
    if (!menuItem) return null;
    
    const quantity = cartItem.quantity;
    const itemTotal = menuItem.price * quantity;

    let customizationDetails = [];
    if (cartItem.specialInstructions) {
      customizationDetails.push(`Special: ${cartItem.specialInstructions.slice(0, 15)}${cartItem.specialInstructions.length > 15 ? '...' : ''}`);
    }
    if (cartItem.removedIngredients && cartItem.removedIngredients.length > 0) {
      customizationDetails.push(`No: ${cartItem.removedIngredients.join(', ')}`);
    }
    if (cartItem.includeUtensils === false) {
      customizationDetails.push('No utensils');
    }

    return (
      <motion.div
        className="cart-summary-item"
        key={cartItemKey}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + index * 0.05 }}
      >
        <div className="cart-summary-item-details">
          <span className="cart-summary-item-name">
            {quantity} x {menuItem.name}
          </span>
          {customizationDetails.length > 0 && (
            <span className="cart-summary-item-customizations">
              {customizationDetails.join(' • ')}
            </span>
          )}
        </div>
        <span className="cart-summary-item-price">${itemTotal.toFixed(2)}</span>
      </motion.div>
    );
  }).filter(Boolean);

  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="cart-inner"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
      >
        <motion.div
          className={`cart-left ${isEmpty ? 'empty' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FiShoppingCart className="cart-icon" />
            {t('yourCart')}
          </motion.h1>

          <AnimatePresence>
            {isEmpty ? (
              <motion.div
                className="empty-cart-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="empty-cart-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <FiShoppingCart />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {t('emptyCart')}{' '}
                  <Link to="/menu" className="menu-link">
                    {t('menu')}
                  </Link>
                </motion.p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="cart-items-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <AnimatePresence>{cartItems}</AnimatePresence>
                </motion.div>
                <motion.div
                  className="cart-total"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.h2 whileHover={{ scale: 1.03 }}>
                    {t('cartTotal')}{' '}
                    <span className="price-highlight">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </motion.h2>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div
            className="return-to-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.97 }}>
              <Link to="/menu" className="menu-return-link">
                <FiArrowLeft className="return-icon" /> {t('returnMenu')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="cart-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="cart-summary-header"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h2>{t('yourOrder')}</motion.h2>
            <motion.div
              className="cart-time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FiClock className="clock-icon" /> {time.toLocaleTimeString()}
            </motion.div>
          </motion.div>

          <motion.div
            className="cart-summary-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence>{summaryItems}</AnimatePresence>
          </motion.div>

          <motion.p
            className="cart-total-price"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {t('orderTotal')}{' '}
            <span className="price-amount">${totalPrice.toFixed(2)}</span>
          </motion.p>

          <AnimatePresence>
            {isEmpty ? (
              <motion.button
                className="checkout-btn disabled"
                disabled
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {t('noCart')}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to="/checkout" className="checkout-btn">
                  {t('checkout')} <FiCheckCircle className="checkout-icon" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Cart;