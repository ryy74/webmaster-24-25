import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import menuItems from '../../consts/menuItems';

import { useAddress } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './Confirmation.css';

function Confirmation() {
  const { isSignedIn } = useAuth();
  const { cart, clearCart } = useCart();
  const { address, setAddress: setGlobalAddress } = useAddress();
  const { t } = useLanguage();

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

  useEffect(() => {
    setSavedAddress(address);
    const randomMinutes = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    const now = new Date();
    now.setMinutes(now.getMinutes() + randomMinutes);
    setDeliveryTime(now);

    clearCart();
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

  const deliveryTimeString = deliveryTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1>{t('orderConfirmed')}</h1>
        <p className="delivery-address">
          {t('deliverTo')} {savedAddress}
        </p>

        <h2>{t('yourOrder')}</h2>
        <div className="confirmation-summary-list">
          {savedSummaryItems.map((item) => (
            <div className="confirmation-summary-item" key={item.id}>
              <span>
                {item.quantity} x {item.name}
              </span>
              <span>${item.itemTotal.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <p className="confirmation-total-price">
          {t('cartTotal')} ${savedTotalPrice.toFixed(2)}
        </p>
        <p className="estimated-time">
          {t('estDelivery')} {deliveryTimeString}
        </p>
        <p className="thanks">{t('orderThanks')}</p>
        <Link to="/menu" className="back-to-menu">
          {t('returnMenu')}
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
