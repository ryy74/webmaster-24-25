import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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
} from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";

import useMenuItems from "../../consts/menuItems";
import { useAddress } from "../../contexts/AddressContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  useCanadaProvinces,
  useCountries,
  useMexicoStates,
  useUSStates,
} from "../../consts/checkout";

import "./Checkout.css";

const BASE = "https://webmaster.railway.internal";
const DEMO_NUM = "4112 8197 5823 2024";
const DEMO_RAW = "4112819758232024";
const DEMO_EXP = "06/27";
const DEMO_CVV = "074";

const normalizeGiftCode = (input) => {
  const raw = input.replace(/[^0-9A-Z]/gi, "").toUpperCase();
  if (raw.length <= 4) return raw;
  if (raw.length <= 8) return `${raw.slice(0, 4)}-${raw.slice(4)}`;
  if (raw.length <= 12)
    return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8)}`;
  if (raw.length === 14) return input.toUpperCase();
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
};

function Checkout() {
  const { isSignedIn, user } = useAuth();
  const { cart } = useCart();
  const { t } = useLanguage();
  const { setAddress } = useAddress();
  const navigate = useNavigate();
  const menuItems = useMenuItems();

  const usa = useUSStates();
  const ca = useCanadaProvinces();
  const mx = useMexicoStates();
  const countries = useCountries();

  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const [country, setCountry] = useState("USA");
  const [state, setState] = useState("Washington");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");

  const [giftCode, setGiftCode] = useState("");
  const [giftBal, setGiftBal] = useState(null);
  const [giftErr, setGiftErr] = useState("");
  const [giftLoading, setGiftLoading] = useState(false);

  const [pointsBal, setPointsBal] = useState(0);
  const [pointsIn, setPointsIn] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE}/users/me`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", "X-User": user.username },
    })
      .then((r) => r.json())
      .then((d) => setPointsBal(d.Profile.points ?? 0))
      .catch(() => setPointsBal(0));
  }, [user.username]);

  const lookupGiftCard = useCallback(
    (code) => {
      setGiftLoading(true);
      setGiftErr("");
      const ctrl = new AbortController();

      fetch(`${BASE}/rewards/giftcard/${encodeURIComponent(code)}`, {
        signal: ctrl.signal,
        credentials: "include",
        headers: { "X-User": user.username },
      })
        .then((r) => {
          if (r.status === 404) throw new Error("notfound");
          if (!r.ok) throw new Error();
          return r.json();
        })
        .then((d) => setGiftBal(d.remaining_c_cents))
        .catch((e) =>
          setGiftErr(
            e.message === "notfound"
              ? t("giftCardNotFound")
              : t("giftCardFail"),
          ),
        )
        .finally(() => setGiftLoading(false));

      return () => ctrl.abort();
    },
    [t, user.username],
  );

  useEffect(() => {
    const dashed = normalizeGiftCode(giftCode);
    if (dashed.length !== 14) {
      setGiftBal(null);
      setGiftErr("");
      setGiftLoading(false);
      return;
    }
    return lookupGiftCard(dashed);
  }, [giftCode, lookupGiftCard]);

  const keys = Object.keys(cart).filter((k) => cart[k].quantity > 0);
  if (!isSignedIn) return <Navigate to="/signin" replace />;
  if (keys.length === 0) return <Navigate to="/cart" replace />;

  const giftKeys = keys.filter((k) => cart[k].rewardId);
  const foodKeys = keys.filter((k) => !cart[k].rewardId);

  const foodSubtotal = foodKeys.reduce((s, k) => {
    const ci = cart[k];
    const mi = menuItems.find((m) => m.id === ci.itemId);
    const name = mi ? mi.name : ci.name;
    const price = ci.price ?? (mi ? mi.price : 0);
    return s + price * ci.quantity;
  }, 0);
  const giftSubtotal = giftKeys.reduce(
    (s, k) => s + cart[k].price * cart[k].quantity,
    0,
  );
  const subtotal = foodSubtotal + giftSubtotal;

  const taxRate = country === "USA" && state === "Washington" ? 0.085 : 0;
  const taxAmount = foodSubtotal * taxRate;
  const orderCents = Math.round((subtotal + taxAmount) * 100);

  const giftPreview = giftBal != null ? Math.min(giftBal, orderCents) : 0;

  const ptsReq = Math.min(Number(pointsIn) || 0, pointsBal);
  const ptsPreview = Math.min(
    Math.floor(ptsReq / 10),
    orderCents - giftPreview,
  );

  const remainingPrev = orderCents - giftPreview - ptsPreview;
  const cardNeeded = remainingPrev > 0;
  const finalPreview = remainingPrev / 100;

  const stateList =
    country === "USA"
      ? usa
      : country === "Canada"
        ? ca
        : country === "Mexico"
          ? mx
          : [];

  const fmtCard = (v) =>
    v
      .replace(/\s+/g, "")
      .replace(/[^0-9]/g, "")
      .match(/.{1,4}/g)
      ?.join(" ") || v;

  const handlePay = async (e) => {
    e.preventDefault();
    if (giftLoading) return;

    setError("");
    setBusy(true);

    let remaining = orderCents;

    const dashedGift = normalizeGiftCode(giftCode);
    const giftPlanned = dashedGift.length === 14 ? giftPreview : 0;
    remaining -= giftPlanned;

    const ptsPlanned = Math.min(remaining * 10, ptsReq);
    const ptsDiscountCents = Math.floor(ptsPlanned / 10);
    remaining -= ptsDiscountCents;

    const rawCard = cardNumber.replace(/\s+/g, "");
    const cardFieldsFilled =
      rawCard || expiration.trim() || cvv.trim() ? true : false;

    if (remaining > 0) {
      if (!cardFieldsFilled) {
        setError(t("insufficientBalance"));
        setBusy(false);
        return;
      }
      if (rawCard !== DEMO_RAW || expiration !== DEMO_EXP || cvv !== DEMO_CVV) {
        setError(t("invalidCard"));
        setBusy(false);
        return;
      }
    }

    if (ptsPlanned > 0) {
      try {
        const r = await fetch(`${BASE}/rewards/spend`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-User": user.username,
          },
          body: JSON.stringify({ points: ptsPlanned }),
        });
        if (!r.ok) {
          const { detail } = await r.json();
          throw new Error(detail || "points spend failed");
        }
      } catch (err) {
        setError(err.message);
        setBusy(false);
        return;
      }
    }

    if (giftPlanned > 0) {
      try {
        const r = await fetch(`${BASE}/rewards/giftcard/spend`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-User": user.username,
          },
          body: JSON.stringify({ code: dashedGift, cents: giftPlanned }),
        });
        if (!r.ok) {
          const { detail } = await r.json();
          throw new Error(detail || t("giftCardFail"));
        }
      } catch (err) {
        setError(err.message);
        setBusy(false);
        return;
      }
    }

    if (remaining > 0) {
      await new Promise((res) => setTimeout(res, 800));
    }

    setAddress(`${street}, ${state}, ${country}, ${zip}`);
    navigate("/confirmation", {
      state: {
        subtotal,
        taxAmount,
        giftCardDeducted: giftPlanned / 100,
        pointsSpent: ptsPlanned,
        cardCharged: remaining / 100,
      },
    });
    setBusy(false);
  };

  return (
    <motion.div
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="checkout-inner"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {}
        <motion.div className="checkout-left">
          <h1>{t("checkout")}</h1>

          <p className="checkout-instructions">
            {t("disclaimer")}
            <br />
            {t("cardNumberD")}{" "}
            <span className="credential-value">{DEMO_NUM}</span>
            <br />
            {t("expirationD")}{" "}
            <span className="credential-value">{DEMO_EXP}</span>
            <br />
            {t("sec")} <span className="credential-value">{DEMO_CVV}</span>
          </p>

          {error && <div className="error-message">{error}</div>}

          <form className="payment-form" onSubmit={handlePay}>
            {}
            <div className="input-group">
              <label>{t("giftCardCode")}</label>
              <div className="input-wrapper">
                <FiKey className="input-icon" />
                <input
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                  placeholder="ABCD-1234-EFGH"
                />
              </div>
              {giftLoading && <small className="hint">{t("checking")}</small>}
              {giftBal != null && !giftLoading && (
                <small className="hint">
                  {t("balance")}: ${(giftBal / 100).toFixed(2)}
                </small>
              )}
              {giftErr && <small className="error-msg">{giftErr}</small>}
            </div>

            {}
            <div className="input-group">
              <label>{t("applyPoints")}</label>
              <div className="input-wrapper">
                <FiGift className="input-icon" />
                <input
                  type="number"
                  min="0"
                  max={pointsBal}
                  value={pointsIn}
                  onChange={(e) =>
                    setPointsIn(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
              <small>
                {pointsBal} {t("ptsAvail")}
              </small>
            </div>

            {}
            <h2>{t("paymentDetails")}</h2>
            <div className="input-group">
              <label>{t("cardNumber")}</label>
              <div className="input-wrapper">
                <FiCreditCard className="input-icon" />
                <input
                  disabled={!cardNeeded}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(fmtCard(e.target.value))}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength="19"
                />
              </div>
            </div>
            <div className="input-group-row">
              <div className="input-group">
                <label>{t("expiration")}</label>
                <div className="input-wrapper">
                  <FiCalendar className="input-icon" />
                  <input
                    disabled={!cardNeeded}
                    value={expiration}
                    onChange={(e) =>
                      setExpiration(
                        e.target.value
                          .replace(/[^\d]/g, "")
                          .replace(/^(\d{2})(\d)/, "$1/$2")
                          .slice(0, 5),
                      )
                    }
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div className="input-group">
                <label>{t("cvv")}</label>
                <div className="input-wrapper">
                  <FiShield className="input-icon" />
                  <input
                    disabled={!cardNeeded}
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>

            {}
            <h2>{t("address")}</h2>
            <div className="input-group">
              <label>{t("streetAddress")}</label>
              <div className="input-wrapper">
                <FiHome className="input-icon" />
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder={"400 NE 228th Ave"}
                />
              </div>
            </div>
            <div className="input-group">
              <label>{t("zipCode")}</label>
              <div className="input-wrapper">
                <FiMapPin className="input-icon" />
                <input
                  value={zip}
                  onChange={(e) =>
                    setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                  placeholder={98074}
                />
              </div>
            </div>
            <div className="input-group-row">
              <div className="input-group">
                <label>{t("country")}</label>
                <div className="input-wrapper">
                  <FiGlobe className="input-icon" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                <label>{t("sp")}</label>
                <div className="input-wrapper">
                  <FiMap className="input-icon" />
                  <select
                    value={state}
                    disabled={!stateList.length}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {stateList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {}
            <button
              className="pay-btn"
              disabled={busy || (giftCode && giftLoading)}
            >
              {busy ? (
                <>
                  <span className="processing-spinner" /> {t("processing")}
                </>
              ) : (
                <>
                  {t("pay")} ${finalPreview.toFixed(2)} <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="return-to-menu">
            <Link to="/cart" className="menu-return-link">
              <FiArrowLeft /> {t("returnCart")}
            </Link>
          </div>
        </motion.div>

        {}
        <motion.div className="checkout-right">
          <div className="checkout-card">
            <h2>{t("yourOrder")}</h2>

            <div className="checkout-summary-list">
              {foodKeys.map((k) => {
                const ci = cart[k];
                const mi = menuItems.find((m) => m.id === ci.itemId);
                const name = mi ? mi.name : ci.name;
                const price = ci.price ?? (mi ? mi.price : 0);
                return (
                  <div key={k} className="checkout-summary-item">
                    <span>
                      {ci.quantity} × {name}
                    </span>
                    <span>${(price * ci.quantity).toFixed(2)}</span>
                  </div>
                );
              })}

              {taxRate > 0 && foodSubtotal > 0 && (
                <div className="checkout-summary-item tax-line">
                  <span>{t("tax")}</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              )}

              {giftKeys.length > 0 && (
                <>
                  <hr className="section-divider" />
                  <p className="section-label">{t("giftCards")}</p>
                  {giftKeys.map((k) => {
                    const gi = cart[k];
                    return (
                      <div key={k} className="checkout-summary-item">
                        <span>{gi.name}</span>
                        <span>${(gi.price * gi.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {giftPreview > 0 && (
                <div className="checkout-summary-item discount-line">
                  <span>{t("giftCardApplied")}</span>
                  <span>- ${(giftPreview / 100).toFixed(2)}</span>
                </div>
              )}
              {ptsPreview > 0 && (
                <div className="checkout-summary-item discount-line">
                  <span>{t("pointsDiscount")}</span>
                  <span>- ${(ptsPreview / 100).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="checkout-total">
              <p>
                {t("cartTotal")}{" "}
                <span className="final-price">${finalPreview.toFixed(2)}</span>
              </p>
              {giftSubtotal > 0 && (
                <small className="sub-note">{t("includesGiftCards")}</small>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Checkout;
