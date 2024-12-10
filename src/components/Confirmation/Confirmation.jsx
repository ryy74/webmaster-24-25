import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAddress } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import menuItems from '../Menu/menuItems';
import './Confirmation.css';
import { clear } from '@testing-library/user-event/dist/clear';

const Confirmation = () => {
  const { isSignedIn } = useAuth();
  const { cart, clearCart } = useCart();
  const { address, setAddress: setGlobalAddress } = useAddress(); 


  const itemsInCart = Object.keys(cart).filter(itemId => cart[itemId] > 0);

  const totalPrice = itemsInCart.reduce((acc, id) => {
    const item = menuItems.find(m => m.id === parseInt(id));
    return acc + (item.price * cart[id]);
  }, 0);

  const summaryItems = itemsInCart.map((id) => {
    const item = menuItems.find(m => m.id === parseInt(id));
    const quantity = cart[id];
    const itemTotal = item.price * quantity;
    return { id, name: item.name, quantity, itemTotal };
  });

  const [savedAddress, setSavedAddress] = useState('');
  const [savedSummaryItems] = useState(summaryItems);
  const [savedTotalPrice] = useState(totalPrice);
  const [deliveryTime, setDeliveryTime] = useState(null);

  useEffect(() => {
    setSavedAddress(address);
    const randomMinutes = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    const now = new Date();
    now.setMinutes(now.getMinutes() + randomMinutes);
    setDeliveryTime(now);
  }, [address]);

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (itemsInCart.length === 0 && !deliveryTime) {
    return <Navigate to="/cart" replace />;
  }

  if (!deliveryTime) {
    return <div>Loading...</div>;
  }

  const deliveryTimeString = deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  clearCart();
  setGlobalAddress('');

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1>Order Confirmed!</h1>
        <p className="delivery-address">Delivering to: {savedAddress}</p>
        
        <h2>Your Order</h2>
        <div className="confirmation-summary-list">
          {savedSummaryItems.map((item) => (
            <div className="confirmation-summary-item" key={item.id}>
              <span>{item.quantity} x {item.name}</span>
              <span>${item.itemTotal.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <p className="confirmation-total-price">Total: ${savedTotalPrice.toFixed(2)}</p>
        <p className="estimated-time">Estimated Delivery: {deliveryTimeString}</p>
        <p className="thanks">Thanks for ordering!</p>
        <Link to="/menu" className="back-to-menu">Back to Menu</Link>
      </div>
    </div>
  );
};

export default Confirmation;
