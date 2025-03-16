import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FiCheck,
  FiEdit3,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiX,
} from 'react-icons/fi';

import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './CustomizationPopup.css';

function CustomizationPopup({
  menuItem,
  onClose,
  onAddToCart,
  initialCustomizations = null,
  cartItemKey = null,
  isEditing = false,
}) {
  const { t } = useLanguage();
  const { addToCartWithCustomizations, updateCartItem } = useCart();
  const [quantity, setQuantity] = useState(
    initialCustomizations?.quantity || 1,
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    initialCustomizations?.specialInstructions || '',
  );
  const [includeUtensils, setIncludeUtensils] = useState(
    initialCustomizations?.includeUtensils !== undefined
      ? initialCustomizations.includeUtensils
      : true,
  );
  const [removedIngredients, setRemovedIngredients] = useState(
    initialCustomizations?.removedIngredients || [],
  );
  const [justAdded, setJustAdded] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const toggleIngredient = (ingredient) => {
    setRemovedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter((item) => item !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleAddOrUpdateCart = () => {
    const customizations = {
      specialInstructions: specialInstructions.trim(),
      includeUtensils,
      removedIngredients,
    };

    if (!isEditing) {
      customizations.quantity = quantity;
    }

    if (isEditing && cartItemKey) {
      updateCartItem(cartItemKey, customizations);
      setJustUpdated(true);
      onClose();

      setTimeout(() => {
        setJustUpdated(false);
      }, 300);
    } else {
      addToCartWithCustomizations(menuItem.id, { ...customizations, quantity });
      setJustAdded(true);

      setTimeout(() => {
        setJustAdded(false);
        onClose();
      }, 1000);
    }
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="customization-backdrop"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="customization-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="customization-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiX />
          </motion.button>

          <motion.div
            className="customization-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>
              {isEditing ? t('editCustomizations') : t('customize')}:{' '}
              {menuItem.name}
            </h2>
          </motion.div>

          <div className="customization-body">
            {!isEditing && (
              <motion.div
                className="customization-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3>{t('quantity')}</h3>
                <div className="quantity-selector">
                  <motion.button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiMinus />
                  </motion.button>
                  <span className="quantity-value">{quantity}</span>
                  <motion.button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiPlus />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {menuItem.ingredients && menuItem.ingredients.length > 0 && (
              <motion.div
                className="customization-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3>{t('removeIngredients')}</h3>
                <div className="ingredients-toggles">
                  {menuItem.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      className={`ingredient-toggle ${
                        removedIngredients.includes(ingredient) ? 'removed' : ''
                      }`}
                      onClick={() => toggleIngredient(ingredient)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <span className="ingredient-name">{ingredient}</span>
                      {removedIngredients.includes(ingredient) && (
                        <span className="removed-indicator">
                          <FiX />
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              className="customization-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>{t('specialInstructions')}</h3>
              <textarea
                className="special-instructions"
                placeholder={t('specialInstructionsPlaceholder')}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
              />
            </motion.div>

            <motion.div
              className="customization-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="utensils-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={includeUtensils}
                    onChange={() => setIncludeUtensils(!includeUtensils)}
                  />
                  <span className="toggle-custom"></span>
                  <span>{t('includeUtensils')}</span>
                </label>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="customization-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="cancel-button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('cancel')}
            </motion.button>
            <motion.button
              className={`add-to-cart-button ${justAdded || justUpdated ? 'added' : ''}`}
              onClick={handleAddOrUpdateCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={justAdded || justUpdated}
            >
              {justAdded ? (
                <>
                  <FiCheck className="icon" />
                  <span>{t('added')}</span>
                </>
              ) : justUpdated ? (
                <>
                  <FiCheck className="icon" />
                  <span>{t('updated')}</span>
                </>
              ) : isEditing ? (
                <>
                  <FiEdit3 className="icon" />
                  <span>{t('saveChanges')}</span>
                </>
              ) : (
                <>
                  <FiShoppingCart className="icon" />
                  <span>{t('addCart')}</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CustomizationPopup;
