import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCreditCard,
  FiGlobe,
  FiHome,
  FiMap,
  FiMapPin,
  FiShield,
} from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import useMenuItems from '../../consts/menuItems';

import { useAddress } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext.js';

import {
  useCanadaProvinces,
  useCountries,
  useMexicoStates,
  useUSStates,
} from '../../consts/checkout.js';

import './Checkout.css';

const REQUIRED_CARD_NUMBER_DISPLAY = '4112 8197 5823 2024';
const REQUIRED_CARD_NUMBER_NORMALIZED = '4112819758232024';
const REQUIRED_EXPIRATION = '06/27';
const REQUIRED_CVV = '074';

function Checkout() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('USA');
  const [state, setState] = useState('Washington');
  const [address, updateAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { cart } = useCart();
  const { t } = useLanguage();
  const { setAddress } = useAddress();
  const menuItems = useMenuItems();

  const canadaProvinces = useCanadaProvinces();
  const countries = useCountries();
  const mexicoStates = useMexicoStates();
  const usStates = useUSStates();

  function formatAddressLists(countryVal) {
    if (countryVal === 'USA') return usStates;
    if (countryVal === 'Canada') return canadaProvinces;
    if (countryVal === 'Mexico') return mexicoStates;
    return [];
  }

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);

    const newStateList = formatAddressLists(newCountry);
    if (newStateList.length > 0) {
      setState(newStateList[0]);
    } else {
      setState('');
    }
  };

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

  const summaryItems = itemsInCart.map((id, index) => {
    const item = menuItems.find((m) => m.id === parseInt(id));
    const quantity = cart[id];
    const itemTotal = item.price * quantity;

    return (
      <motion.div
        className="checkout-summary-item"
        key={id}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 + index * 0.1 }}
      >
        <span>
          {quantity} x {item.name}
        </span>
        <span>${itemTotal.toFixed(2)}</span>
      </motion.div>
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
    setIsProcessing(true);

    if (!isSupportedRegion) {
      setIsProcessing(false);
      return;
    }

    const normalizedCardNumber = cardNumber.replace(/\s+/g, '');

    setTimeout(() => {
      if (
        normalizedCardNumber !== REQUIRED_CARD_NUMBER_NORMALIZED ||
        expiration !== REQUIRED_EXPIRATION ||
        cvv !== REQUIRED_CVV
      ) {
        setErrorMessage('Invalid card details.');
        setIsProcessing(false);
        return;
      }

      if (!zipCode || zipCode.length < 5) {
        setErrorMessage('Please enter a valid zip code.');
        setIsProcessing(false);
        return;
      }

      const fullAddress = `${address}, ${state}, ${country}, ${zipCode}`;
      setAddress(fullAddress);

      navigate('/confirmation');
    }, 1500);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, '');

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    setExpiration(value);
  };

  return (
    <motion.div
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="checkout-inner"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <motion.div
          className="checkout-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t('checkout')}
          </motion.h1>

          <motion.p
            className="checkout-instructions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('disclaimer')}
            <br />
            {t('cardNumberD')}{' '}
            <span className="credential-value">
              {REQUIRED_CARD_NUMBER_DISPLAY}
            </span>
            <br />
            {t('expirationD')}{' '}
            <span className="credential-value">{REQUIRED_EXPIRATION}</span>
            <br />
            {t('sec')} <span className="credential-value">{REQUIRED_CVV}</span>
          </motion.p>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                className="error-message"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            className="payment-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('paymentDetails')}
            </motion.h2>

            <motion.div
              className="input-group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="cardNumber">{t('cardNumber')}</label>
              <div className="input-wrapper">
                <FiCreditCard className="input-icon" />
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength="19"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="input-group-row"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="input-group">
                <label htmlFor="expiration">{t('expiration')}</label>
                <div className="input-wrapper">
                  <FiCalendar className="input-icon" />
                  <input
                    id="expiration"
                    type="text"
                    value={expiration}
                    onChange={handleExpirationChange}
                    placeholder={t('expHolder')}
                    maxLength="5"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="cvv">{t('cvv')}</label>
                <div className="input-wrapper">
                  <FiShield className="input-icon" />
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                    }
                    placeholder={t('cvc')}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {t('address')}
            </motion.h2>

            <motion.div
              className="input-group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <label htmlFor="streetAddress">{t('streetAddress')}</label>
              <div className="input-wrapper">
                <FiHome className="input-icon" />
                <input
                  id="streetAddress"
                  type="text"
                  value={address}
                  onChange={(e) => updateAddress(e.target.value)}
                  placeholder={t('saHolder')}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="input-group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <label htmlFor="zipCode">{t('zipCode')}</label>
              <div className="input-wrapper">
                <FiMapPin className="input-icon" />
                <input
                  id="zipCode"
                  type="text"
                  value={zipCode}
                  onChange={(e) =>
                    setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))
                  }
                  placeholder="12345"
                  maxLength="5"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="input-group-row"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="input-group">
                <label htmlFor="country">{t('country')}</label>
                <div className="input-wrapper">
                  <FiGlobe className="input-icon" />
                  <select
                    id="country"
                    value={country}
                    onChange={handleCountryChange}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="state">{t('sp')}</label>
                <div className="input-wrapper">
                  <FiMap className="input-icon" />
                  <select
                    id="state"
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
                </div>
              </div>
            </motion.div>
          </motion.form>

          <motion.div
            className="return-to-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.97 }}>
              <Link to="/cart" className="menu-return-link">
                <FiArrowLeft className="return-icon" /> {t('returnCart')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="checkout-right"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="checkout-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h2
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('yourOrder')}
            </motion.h2>

            <div className="checkout-summary-list">
              {summaryItems}

              {taxRate > 0 && (
                <motion.div
                  className="checkout-summary-item tax-line"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + summaryItems.length * 0.1,
                  }}
                >
                  <span>{t('tax')}</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </motion.div>
              )}
            </div>

            <motion.div
              className="checkout-total"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2 + (summaryItems.length + 1) * 0.1,
              }}
            >
              <p className="checkout-total-price">
                {t('cartTotal')}{' '}
                <span className="final-price">${finalTotal.toFixed(2)}</span>
              </p>
            </motion.div>

            {!isSupportedRegion && (
              <motion.p
                className="region-error"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {t('regionError')}
              </motion.p>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {isSupportedRegion ? (
                <motion.button
                  className={`pay-btn ${isProcessing ? t('processing') : ''}`}
                  onClick={handlePay}
                  disabled={isProcessing}
                  whileHover={{
                    scale: isProcessing ? 1 : 1.03,
                    boxShadow: isProcessing
                      ? 'none'
                      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  }}
                  whileTap={{ scale: isProcessing ? 1 : 0.97 }}
                >
                  {isProcessing ? (
                    <span className="processing-text">
                      <span className="processing-spinner"></span>
                      {t('processing')}
                    </span>
                  ) : (
                    <>
                      {t('pay')} ${finalTotal.toFixed(2)}
                      <FiArrowRight className="btn-icon" />
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button className="pay-btn disabled" disabled>
                  {t('unsupportedRegion')}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Checkout;
