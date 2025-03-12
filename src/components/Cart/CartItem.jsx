import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

import './CartItem.css';

function CartItem({ item, quantity, onChangeQuantity, onRemove }) {
  return (
    <motion.div 
      className="cart-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
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
          onClick={() => onRemove(item.id)}
          title="Remove Item"
          whileHover={{ scale: 1.1, color: "#e74c3c" }}
          whileTap={{ scale: 0.9 }}
        >
          <FiTrash2 />
        </motion.button>
        
        <div className="cart-item-quantity-controls">
          <motion.button 
            className="quantity-btn decrease"
            onClick={() => onChangeQuantity(item.id, Math.max(0, quantity - 1))}
            disabled={quantity <= 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMinus />
          </motion.button>
          
          <motion.select
            className="cart-item-quantity"
            value={quantity}
            onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value))}
            whileFocus={{ boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.3)" }}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </motion.select>
          
          <motion.button 
            className="quantity-btn increase"
            onClick={() => onChangeQuantity(item.id, quantity + 1)}
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
    </motion.div>
  );
}

export default CartItem;