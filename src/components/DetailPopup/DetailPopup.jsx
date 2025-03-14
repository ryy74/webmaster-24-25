import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiCheck, FiShoppingCart, FiX } from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './DetailPopup.css';

function DetailPopup({ menuItem, onClose }) {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(menuItem.id);
    setJustAdded(true);
    
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  useEffect(() => {
    const scrollY = window.scrollY;

    const bodyContent = document.createElement('div');
    bodyContent.style.position = 'fixed';
    bodyContent.style.width = '100%';
    bodyContent.style.top = `-${scrollY}px`;

    document.body.insertBefore(bodyContent, document.body.firstChild);
    while (document.body.childNodes.length > 1) {
      bodyContent.appendChild(document.body.childNodes[1]);
    }

    document.body.style.overflow = 'hidden';

    return () => {
      while (bodyContent.childNodes.length) {
        document.body.insertBefore(bodyContent.childNodes[0], bodyContent);
      }
      document.body.removeChild(bodyContent);
      document.body.style.overflow = 'unset';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="popup-backdrop"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="popup-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
        >
          <motion.button
            className="popup-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiX />
          </motion.button>

          <div className="popup-grid">
            <motion.div
              className="popup-left-column"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="popup-image-container"
                whileHover={{
                  boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
              >
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="popup-image"
                />
              </motion.div>

              {menuItem.nutritionalInfo && (
                <motion.div
                  className="popup-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>{t('nutritionInfo')}</h3>
                  <p>{menuItem.nutritionalInfo}</p>
                </motion.div>
              )}

              {menuItem.allergens && menuItem.allergens.length > 0 && (
                <motion.div
                  className="popup-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3>{t('allergens')}</h3>
                  <p>{menuItem.allergens.join(', ')}</p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="popup-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {menuItem.name}
              </motion.h2>

              <motion.div
                className="popup-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3>{t('desc')}</h3>
                <p>{menuItem.longDescription}</p>
              </motion.div>

              <motion.div
                className="popup-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3>{t('ingredients')}</h3>
                <ul className="ingredients-list">
                  {menuItem.ingredients &&
                    menuItem.ingredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                      >
                        {ingredient}
                      </motion.li>
                    ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {isSignedIn && (
            <motion.div
              className="popup-cart-button-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className={`popup-cart-button ${justAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {justAdded ? (
                  <>
                    <FiCheck className="icon" />
                    <span>{t('added')}</span>
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="icon" />
                    <span>{t('addCart')}</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DetailPopup;