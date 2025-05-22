import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  FiGift,
  FiKey,
} from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import useMenuItems from '../../consts/menuItems';
import { useAddress } from '../../contexts/AddressContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import {
  useCanadaProvinces,
  useCountries,
  useMexicoStates,
  useUSStates,
} from '../../consts/checkout';

import './Checkout.css';

const BASE_URL = 'https://webmaster-backend-production.up.railway.app';

const REQUIRED_CARD_NUMBER_DISPLAY = '4112 8197 5823 2024';
const REQUIRED_CARD_NUMBER_NORMALIZED = '4112819758232024';
const REQUIRED_EXPIRATION = '06/27';
const REQUIRED_CVV = '074';

function Checkout() {

  const { isSignedIn, user } = useAuth();
  const { cart }             = useCart();
  const { t }                = useLanguage();
  const { setAddress }       = useAddress();
  const navigate             = useNavigate();
  const menuItems            = useMenuItems();

  const canadaProvinces = useCanadaProvinces();
  const countries       = useCountries();
  const mexicoStates    = useMexicoStates();
  const usStates        = useUSStates();

  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv]               = useState('');
  const [country, setCountry]       = useState('USA');
  const [state, setState]           = useState('Washington');
  const [address, updateAddress]    = useState('');
  const [zipCode, setZipCode]       = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [pointsBalance, setPointsBalance] = useState(0);
  const [pointsInput,  setPointsInput]    = useState('');

  const [giftCode, setGiftCode] = useState('');
  const [giftBal,  setGiftBal]  = useState(null); 
  const [giftErr,  setGiftErr]  = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-User': user.username },
    })
      .then((r) => r.json())
      .then((d) => setPointsBalance(d.Profile.points ?? 0))
      .catch(() => setPointsBalance(0));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!giftCode.trim()) {
      setGiftBal(null);
      setGiftErr('');
      return;
    }
    const code = giftCode.trim().toUpperCase();
    const ctrl = new AbortController();

    fetch(`${BASE_URL}/rewards/giftcard/${code}`, {
      signal: ctrl.signal,
      credentials: 'include',
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        setGiftBal(d.remaining_cents);
        setGiftErr('');
      })
      .catch(() => {
        setGiftBal(null);
        setGiftErr(t('giftCardFail'));
      });

    return () => ctrl.abort();
    // eslint-disable-next-line
  }, [giftCode]);

  const cartItemKeys = Object.keys(cart).filter(
    (k) => cart[k].quantity && cart[k].quantity > 0,
  );

  if (!isSignedIn)            return <Navigate to="/signin" replace />;
  if (cartItemKeys.length===0) return <Navigate to="/cart"   replace />;

  const subtotal = cartItemKeys.reduce((acc, key) => {
    const c = cart[key];
    const m = menuItems.find((mi) => mi.id === c.itemId);
    return m ? acc + m.price * c.quantity : acc;
  }, 0);

  const isUS = country === 'USA';
  const isWA = state   === 'Washington';
  const taxRate   = isUS && isWA ? 0.085 : 0;
  const taxAmount = subtotal * taxRate;
  const orderTotalCents = Math.round((subtotal + taxAmount) * 100);

  const ptsRequested = Number(pointsInput) || 0;
  const ptsAllowed   = Math.min(ptsRequested, pointsBalance);
  const ptsMaxByCost = orderTotalCents;      
  const ptsCentsPrev = Math.min(
    Math.floor(ptsAllowed / 10),
    ptsMaxByCost,
  );

  const giftCardCentsPrev =
    giftBal != null
      ? Math.min(giftBal, orderTotalCents - ptsCentsPrev)
      : 0;

  const finalPreview =
    (orderTotalCents - ptsCentsPrev - giftCardCentsPrev) / 100;

  const statesList = (() => {
    if (country === 'USA')     return usStates;
    if (country === 'Canada')  return canadaProvinces;
    if (country === 'Mexico')  return mexicoStates;
    return [];
  })();

  const handlePay = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    let remainingCents = orderTotalCents;
    let giftDeductedCents = 0;

    if (giftCode.trim()) {
      const giftSpendCents = giftBal != null ? Math.min(remainingCents, giftBal) : remainingCents;

      try {
        const r = await fetch(`${BASE_URL}/rewards/giftcard/spend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User': user.username,
          },
          credentials: 'include',
          body: JSON.stringify({
            code: giftCode.trim().toUpperCase(),
            cents: giftSpendCents,
          }),
        });
        if (!r.ok) {
          const { detail } = await r.json();
          throw new Error(detail || t('giftCardFail'));
        }
        const { deducted_cents, remaining_cents } = await r.json();
        giftDeductedCents = deducted_cents;
        remainingCents    = remaining_cents;
      } catch (err) {
        setErrorMessage(err.message);
        setIsProcessing(false);
        return;
      }
    }

    const ptsNeeded   = remainingCents * 10;
    const ptsToSpend  = Math.min(
      ptsNeeded,
      Math.min(ptsRequested, pointsBalance),
    );
    const ptsCents    = Math.floor(ptsToSpend / 10);
    remainingCents   -= ptsCents;

    if (ptsToSpend > 0) {
      try {
        const r = await fetch(`${BASE_URL}/rewards/spend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User': user.username,
          },
          credentials: 'include',
          body: JSON.stringify({ points: ptsToSpend }),
        });
        if (!r.ok) {
          const { detail } = await r.json();
          throw new Error(detail || 'points spend failed');
        }
      } catch (err) {
        setErrorMessage(err.message);
        setIsProcessing(false);
        return;
      }
    }

    if (remainingCents > 0) {
      const norm = cardNumber.replace(/\s+/g, '');
      if (
        norm !== REQUIRED_CARD_NUMBER_NORMALIZED ||
        expiration !== REQUIRED_EXPIRATION ||
        cvv !== REQUIRED_CVV
      ) {
        setErrorMessage(t('invalidCard'));
        setIsProcessing(false);
        return;
      }
      await new Promise((res) => setTimeout(res, 800)); 
    }

    setAddress(`${address}, ${state}, ${country}, ${zipCode}`);

    navigate('/confirmation', {
      state: {
        subtotal,
        taxAmount,
        pointsSpent: ptsToSpend,
        giftCardDeducted: giftDeductedCents / 100,
        cardCharged: remainingCents / 100,
      },
    });
  };

  const formatCardNumber = (val) =>
    val
      .replace(/\s+/g, '')
      .replace(/[^0-9]/g, '')
      .match(/.{1,4}/g)
      ?.join(' ') || val;

  return (
    <motion.div className="checkout-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="checkout-inner" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {}
        <motion.div className="checkout-left">
          <h1>{t('checkout')}</h1>

          {}
          <motion.p className="checkout-instructions" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {t('disclaimer')}
            <br />
            {t('cardNumberD')} <span className="credential-value">{REQUIRED_CARD_NUMBER_DISPLAY}</span>
            <br />
            {t('expirationD')} <span className="credential-value">{REQUIRED_EXPIRATION}</span>
            <br />
            {t('sec')} <span className="credential-value">{REQUIRED_CVV}</span>
          </motion.p>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="payment-form" onSubmit={handlePay}>
            {}
            <div className="input-group">
              <label>{t('giftCardCode')}</label>
              <div className="input-wrapper">
                <FiKey className="input-icon" />
                <input
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                  placeholder="ABCD-1234-EFGH"
                />
              </div>
              {giftBal != null && (
                <small className="hint">
                  {t('balance')}: ${(giftBal / 100).toFixed(2)}
                </small>
              )}
              {giftErr && <small className="error-msg">{giftErr}</small>}
            </div>

            {}
            <div className="input-group">
              <label>{t('applyPoints')}</label>
              <div className="input-wrapper">
                <FiGift className="input-icon" />
                <input
                  type="number"
                  value={pointsInput}
                  onChange={(e) => setPointsInput(e.target.value.replace(/\D/g, ''))}
                  min="0"
                  max={pointsBalance}
                  placeholder={pointsBalance ? `0 - ${pointsBalance}` : ''}
                />
              </div>
              <small>{pointsBalance} {t('ptsAvail')}</small>
            </div>

            {}
            <h2>{t('paymentDetails')}</h2>
            <div className="input-group">
              <label>{t('cardNumber')}</label>
              <div className="input-wrapper">
                <FiCreditCard className="input-icon" />
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength="19"
                />
              </div>
            </div>
            <div className="input-group-row">
              <div className="input-group">
                <label>{t('expiration')}</label>
                <div className="input-wrapper">
                  <FiCalendar className="input-icon" />
                  <input
                    value={expiration}
                    onChange={(e) =>
                      setExpiration(
                        e.target.value
                          .replace(/[^\d]/g, '')
                          .replace(/^(\d{2})(\d)/, '$1/$2')
                          .slice(0, 5),
                      )
                    }
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div className="input-group">
                <label>{t('cvv')}</label>
                <div className="input-wrapper">
                  <FiShield className="input-icon" />
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>

            {}
            <h2>{t('address')}</h2>
            <div className="input-group">
              <label>{t('streetAddress')}</label>
              <div className="input-wrapper">
                <FiHome className="input-icon" />
                <input 
                  value={address} 
                  onChange={(e) => updateAddress(e.target.value)} 
                  placeholder={'400 NE 228th Ave'}
                />
              </div>
            </div>
            <div className="input-group">
              <label>{t('zipCode')}</label>
              <div className="input-wrapper">
                <FiMapPin className="input-icon" />
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder={98074}
                />
              </div>
            </div>
            <div className="input-group-row">
              <div className="input-group">
                <label>{t('country')}</label>
                <div className="input-wrapper">
                  <FiGlobe className="input-icon" />
                  <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>{t('sp')}</label>
                <div className="input-wrapper">
                  <FiMap className="input-icon" />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!statesList.length}
                  >
                    {statesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {}
            <button className="pay-btn" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <span className="processing-spinner" /> {t('processing')}
                </>
              ) : (
                <>
                  {t('pay')} ${finalPreview.toFixed(2)} <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {}
          <div className="return-to-menu">
            <Link to="/cart" className="menu-return-link">
              <FiArrowLeft /> {t('returnCart')}
            </Link>
          </div>
        </motion.div>

        {}
        <motion.div className="checkout-right">
          <div className="checkout-card">
            <h2>{t('yourOrder')}</h2>

            <div className="checkout-summary-list">
              {cartItemKeys.map((k) => {
                const c = cart[k];
                const m = menuItems.find((mi) => mi.id === c.itemId);
                const itemTotal = m.price * c.quantity;
                return (
                  <div key={k} className="checkout-summary-item">
                    <span>{c.quantity} × {m.name}</span>
                    <span>${itemTotal.toFixed(2)}</span>
                  </div>
                );
              })}

              {taxRate > 0 && (
                <div className="checkout-summary-item tax-line">
                  <span>{t('tax')}</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              )}

              {ptsCentsPrev > 0 && (
                <div className="checkout-summary-item discount-line">
                  <span>{t('pointsDiscount')}</span>
                  <span>- ${(ptsCentsPrev / 100).toFixed(2)}</span>
                </div>
              )}

              {giftCardCentsPrev > 0 && (
                <div className="checkout-summary-item discount-line">
                  <span>{t('giftCardApplied')}</span>
                  <span>- ${(giftCardCentsPrev / 100).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="checkout-total">
              <p>
                {t('cartTotal')}{' '}
                <span className="final-price">${finalPreview.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Checkout;