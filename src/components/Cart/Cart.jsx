import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import menuItems from '../../consts/menuItems';
import CartItem from './CartItem';

import './Cart.css';

function Cart() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { cart, updateCartQuantity, removeFromCart } = useCart();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  const itemsInCart = Object.keys(cart).filter((itemId) => cart[itemId] > 0);

  const cartItems = itemsInCart
    .map((id) => {
      const item = menuItems.find((m) => m.id === parseInt(id));
      if (!item) return null;

      const quantity = cart[id];
      return (
        <CartItem
          key={id}
          item={item}
          quantity={quantity}
          onChangeQuantity={(itemId, q) => updateCartQuantity(itemId, q)}
          onRemove={(itemId) => removeFromCart(itemId)}
        />
      );
    })
    .filter(Boolean);

  const totalPrice = itemsInCart.reduce((acc, id) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    return acc + item.price * cart[id];
  }, 0);

  const summaryItems = itemsInCart.map((id) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    const quantity = cart[id];
    const itemTotal = item.price * quantity;
    return (
      <div className="cart-summary-item" key={id}>
        <span>
          {quantity} x {item.name}
        </span>
        <span>${itemTotal.toFixed(2)}</span>
      </div>
    );
  });

  const isEmpty = cartItems.length === 0;

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <div className={`cart-left ${isEmpty ? 'empty' : ''}`}>
          <h1>{t('yourCart')}</h1>
          {isEmpty ? (
            <p>
              {t('emptyCart')}{' '}
              <Link to="/menu" className="menu-link">
                {t('menu')}
              </Link>
            </p>
          ) : (
            <>
              {cartItems}
              <div className="cart-total">
                <h2>
                  {t('cartTotal')} ${totalPrice.toFixed(2)}
                </h2>
              </div>
            </>
          )}
          <div className="return-to-menu">
            <Link to="/menu" className="menu-return-link">
              {t('returnMenu')}
            </Link>
          </div>
        </div>
        <div className="cart-right">
          <h2>{t('yourOrder')}</h2>
          <p className="cart-time">{time.toLocaleTimeString()}</p>
          <div className="cart-summary-list">{summaryItems}</div>
          <p className="cart-total-price">
            {t('orderTotal')} ${totalPrice.toFixed(2)}
          </p>
          {isEmpty ? (
            <button className="checkout-btn disabled" disabled>
              {t('noCart')}
            </button>
          ) : (
            <Link to="/checkout" className="checkout-btn">
              {t('checkout')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
