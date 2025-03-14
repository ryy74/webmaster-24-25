import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiShoppingBag,
} from 'react-icons/fi';
import { Link, Navigate } from 'react-router-dom';

import useMenuItems from '../../consts/menuItems';
import { useAddress } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './Confirmation.css';

function Confirmation() {
  const { isSignedIn } = useAuth();
  const { cart, clearCart } = useCart();
  const { address } = useAddress();
  const { t } = useLanguage();
  const menuItems = useMenuItems();

  const itemsInCart = Object.keys(cart).filter((itemId) => cart[itemId] > 0);

  const totalPrice = itemsInCart.reduce((acc, id) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    return acc + item.price * cart[id];
  }, 0);

  const summaryItems = itemsInCart.map((id) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    const quantity = cart[id];
    const itemTotal = item.price * quantity;
    return { id, name: item.name, quantity, itemTotal };
  });

  const [savedAddress, setSavedAddress] = useState('');
  const [savedSummaryItems] = useState(summaryItems);
  const [savedTotalPrice] = useState(totalPrice);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clearCart();
    setSavedAddress(address);
    const randomMinutes = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    const now = new Date();
    now.setMinutes(now.getMinutes() + randomMinutes);

    setTimeout(() => {
      setDeliveryTime(now);
      setIsLoading(false);
    }, 800);

    clearCart();
    // eslint-disable-next-line
  }, []);

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (!savedSummaryItems.length && !deliveryTime) {
    return <Navigate to="/cart" replace />;
  }

  const deliveryTimeString = deliveryTime
    ? deliveryTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <motion.div
      className="confirmation-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            >
              <FiClock className="loading-icon" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('processing')}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="confirmation-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
          >
            <motion.div
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              <FiCheckCircle />
            </motion.div>

            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('orderConfirmed')}
            </motion.h1>

            <motion.div
              className="address-container"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FiMapPin className="address-icon" />
              <p className="delivery-address">
                {t('deliverTo')} {savedAddress}
              </p>
            </motion.div>

            <motion.div
              className="order-summary-container"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="order-summary-header">
                <FiShoppingBag className="order-icon" />
                <h2>{t('yourOrder')}</h2>
              </div>

              <div className="confirmation-summary-list">
                {savedSummaryItems.map((item, index) => (
                  <motion.div
                    className="confirmation-summary-item"
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>${item.itemTotal.toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="confirmation-total-price"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + savedSummaryItems.length * 0.1 }}
              >
                {t('cartTotal')} ${savedTotalPrice.toFixed(2)}
              </motion.p>
            </motion.div>

            <motion.div
              className="delivery-time-container"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + savedSummaryItems.length * 0.1 }}
            >
              <FiClock className="time-icon" />
              <p className="estimated-time">
                {t('estDelivery')} {deliveryTimeString}
              </p>
            </motion.div>

            <motion.p
              className="thanks"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + savedSummaryItems.length * 0.1 }}
            >
              {t('orderThanks')}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 + savedSummaryItems.length * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/menu" className="back-to-menu">
                  {t('returnMenu')}
                  <FiChevronRight className="menu-icon" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Confirmation;
