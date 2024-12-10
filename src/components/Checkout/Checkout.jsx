import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAddress } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import menuItems from '../Menu/menuItems';
import './Checkout.css';
import {
  canadaProvinces,
  countries,
  mexicoStates,
  usStates,
} from './consts.js';

const REQUIRED_CARD_NUMBER_DISPLAY = '4112 8197 5823 2024';
const REQUIRED_CARD_NUMBER_NORMALIZED = '4112819758232024';
const REQUIRED_EXPIRATION = '06/27';
const REQUIRED_CVV = '074';

const formatAddressLists = (country) => {
  if (country === 'USA') return usStates;
  if (country === 'Canada') return canadaProvinces;
  if (country === 'Mexico') return mexicoStates;
  return [];
};

const Checkout = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { cart } = useCart();
  const { setAddress } = useAddress();
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('USA');
  const [state, setState] = useState('Washington');
  const [address, updateAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const itemsInCart = Object.keys(cart).filter((itemId) => cart[itemId] > 0);

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (itemsInCart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const totalPrice = itemsInCart.reduce((acc, id) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    return acc + item.price * cart[id];
  }, 0);

  const summaryItems = itemsInCart.map((id) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    const quantity = cart[id];
    const itemTotal = item.price * quantity;
    return (
      <div className="checkout-summary-item" key={id}>
        <span>
          {quantity} x {item.name}
        </span>
        <span>${itemTotal.toFixed(2)}</span>
      </div>
    );
  });

  const isUS = country === 'USA';
  const isWA = state === 'Washington';
  const isSupportedRegion = isUS && isWA;

  const taxRate = isSupportedRegion ? 0.085 : 0;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + taxAmount;

  const statesList = formatAddressLists(country);

  const handlePay = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isSupportedRegion) {
      return;
    }

    const normalizedCardNumber = cardNumber.replace(/\s+/g, '');

    if (
      normalizedCardNumber !== REQUIRED_CARD_NUMBER_NORMALIZED ||
      expiration !== REQUIRED_EXPIRATION ||
      cvv !== REQUIRED_CVV
    ) {
      setErrorMessage('Invalid card details.');
      return;
    }

    if (!zipCode || zipCode.length < 5) {
      setErrorMessage('Please enter a valid zip code.');
      return;
    }

    const fullAddress = `${address}, ${state}, ${country}, ${zipCode}`;
    setAddress(fullAddress);
    console.log('address set to:', fullAddress);

    navigate('/confirmation');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-inner">
        <div className="checkout-left">
          <h1>Checkout</h1>
          <p className="checkout-instructions">
            * For the TSA demonstration, please use:
            <br />
            Card Number: {REQUIRED_CARD_NUMBER_DISPLAY}
            <br />
            Expiration: {REQUIRED_EXPIRATION}
            <br />
            CVV: {REQUIRED_CVV}
          </p>
          <form className="payment-form">
            <h2>Payment Details</h2>
            <label>
              Card Number
              <br />
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </label>
            <label>
              Expiration (MM/YY)
              <br />
              <input
                type="text"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </label>
            <label>
              CVV
              <br />
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVC"
                required
              />
            </label>

            <h2>Address</h2>
            <label>
              Street Address
              <br />
              <input
                type="text"
                value={address}
                onChange={(e) => updateAddress(e.target.value)}
                placeholder="123 Main St"
                required
              />
            </label>
            <label>
              Zip Code
              <br />
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="12345"
                required
              />
            </label>
            <label>
              Country
              <br />
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState('');
                }}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              State/Province
              <br />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={statesList.length === 0}
              >
                {statesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>
        <div className="checkout-right">
          <h2>Your Order</h2>
          <div className="checkout-summary-list">{summaryItems}</div>
          {taxRate > 0 && (
            <div className="checkout-summary-item tax-line">
              <span>Tax (8.5%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
          )}
          <p className="checkout-total-price">
            Total: ${finalTotal.toFixed(2)}
          </p>
          {!isSupportedRegion && (
            <p className="region-error">
              We currently don't deliver outside of WA, USA.
            </p>
          )}
          {errorMessage && <p className="card-error">{errorMessage}</p>}
          {isSupportedRegion ? (
            <button className="pay-btn" onClick={handlePay}>
              Pay ${finalTotal.toFixed(2)}
            </button>
          ) : (
            <button className="pay-btn disabled" disabled>
              Unsupported Region
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
