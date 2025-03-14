import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiAlertTriangle, FiMinus, FiPlus, FiTrash2, FiEdit3 } from 'react-icons/fi';

import CustomizationPopup from '../CustomizationPopup/CustomizationPopup';

import { useLanguage } from '../../contexts/LanguageContext';

import './CartItem.css';

function CartItem({ item, quantity, cartItemKey, customizations, onChangeQuantity, onUpdateItem, onRemove }) {
  const [showWarning, setShowWarning] = useState(false);
  const [showCustomizationPopup, setShowCustomizationPopup] = useState(false);

  const { t } = useLanguage();

  const handleQuantityChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');

    if (newValue === '' || parseInt(newValue) === 0) {
      setShowWarning(true);
    } else {
      onChangeQuantity(cartItemKey, parseInt(newValue));
    }
  };

  const handleEditClick = () => {
    setShowCustomizationPopup(true);
  };

  const handleCustomizationPopupClose = () => {
    setShowCustomizationPopup(false);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      setShowWarning(true);
    } else {
      onChangeQuantity(cartItemKey, quantity - 1);
    }
  };

  const handleConfirmRemove = () => {
    onRemove(cartItemKey);
    setShowWarning(false);
  };

  const handleCancelRemove = () => {
    setShowWarning(false);
  };

  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
      layout
    >
      <div className="cart-item-left">
        <motion.img
          className="cart-item-image"
          src={item.image}
          alt={item.name}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <div className="cart-item-details">
          <motion.h3
            className="cart-item-name"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {item.name}
          </motion.h3>
          <motion.p
            className="cart-item-description"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {item.description}
          </motion.p>
          
          {(customizations?.specialInstructions || 
            customizations?.removedIngredients?.length > 0 || 
            customizations?.includeUtensils !== undefined) && (
            <motion.div 
              className="cart-item-customizations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {customizations.specialInstructions && (
                <p className="customization-item">
                  <span className="customization-label">{t('specialInstructions')}: </span> 
                  {customizations.specialInstructions}
                </p>
              )}
              
              {customizations.removedIngredients?.length > 0 && (
                <p className="customization-item">
                  <span className="customization-label">{t('removedIngredients')}: </span> 
                  {customizations.removedIngredients.join(', ')}
                </p>
              )}
              
              {customizations.includeUtensils !== undefined && (
                <p className="customization-item">
                  <span className="customization-label">{t('utensils')}: </span> 
                  {customizations.includeUtensils ? t('included') : t('notIncluded')}
                </p>
              )}
              
              <button 
                className="edit-customizations-btn"
                onClick={handleEditClick}
              >
                <FiEdit3 /> {t('edit')}
              </button>

              {showCustomizationPopup && (
                <CustomizationPopup
                  menuItem={item}
                  initialCustomizations={customizations}
                  cartItemKey={cartItemKey}
                  isEditing={true}
                  onClose={handleCustomizationPopupClose}
                  onSave={(updatedCustomizations) => {
                    onUpdateItem(cartItemKey, updatedCustomizations);
                    handleCustomizationPopupClose();
                  }}
                />
              )}
            </motion.div>
          )}
          
          <motion.p
            className="cart-item-price-single"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ${item.price.toFixed(2)} each
          </motion.p>
        </div>
      </div>
      <div className="cart-item-right">
        <motion.button
          className="cart-item-remove"
          onClick={() => setShowWarning(true)}
          title="Remove Item"
          whileHover={{ scale: 1.1, color: '#e74c3c' }}
          whileTap={{ scale: 0.9 }}
        >
          <FiTrash2 />
        </motion.button>

        <div className="cart-item-quantity-controls">
          <motion.button
            className="quantity-btn decrease"
            onClick={handleDecrease}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMinus />
          </motion.button>

          <motion.input
            type="text"
            className="cart-item-quantity"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={() => {
              if (!quantity) {
                onChangeQuantity(cartItemKey, 1);
              }
            }}
            whileFocus={{ boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.3)' }}
          />

          <motion.button
            className="quantity-btn increase"
            onClick={() => onChangeQuantity(cartItemKey, quantity + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiPlus />
          </motion.button>
        </div>

        <motion.p
          className="cart-item-price"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ${(item.price * quantity).toFixed(2)}
        </motion.p>
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="warning-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancelRemove}
          >
            <motion.div
              className="warning-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="warning-icon"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <FiAlertTriangle size={24} />
              </motion.div>
              <motion.h4
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {t('removeConfirm')}
              </motion.h4>
              <motion.div
                className="warning-buttons"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  className="warning-button cancel"
                  onClick={handleCancelRemove}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cancel')}
                </motion.button>
                <motion.button
                  className="warning-button confirm"
                  onClick={handleConfirmRemove}
                  whileHover={{ scale: 1.05, backgroundColor: '#c0392b' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('remove')}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CartItem;