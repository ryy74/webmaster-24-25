import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiChevronRight, FiClock, FiMapPin, FiShoppingBag } from "react-icons/fi";
import { Link, Navigate, useLocation } from "react-router-dom";

import useMenuItems from "../../consts/menuItems";
import { useAddress } from "../../contexts/AddressContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useLanguage } from "../../contexts/LanguageContext";

import "./Confirmation.css";

const API = "https://webmaster-production.up.railway.app";

export default function Confirmation() {
  const { isSignedIn, user } = useAuth();
  const { cart, clearCart } = useCart();
  const { address } = useAddress();
  const { t } = useLanguage();
  const menuItems = useMenuItems();
  const location = useLocation();

  /* —— freeze a snapshot so UI survives clearCart() —— */
  const [initialCart] = useState(() => ({ ...cart }));

  const entries = Object.entries(initialCart).filter(([, ci]) => ci.quantity > 0);
  const foodKeys = entries.filter(([, ci]) => !ci.rewardId).map(([k]) => k);
  const giftKeys = entries.filter(([, ci]) => ci.rewardId).map(([k]) => k);

  const foodItems = foodKeys.map((k) => {
    const ci = initialCart[k];
    const mi = menuItems.find((m) => m.id === ci.itemId);
    return { key: k, name: mi?.name || "", qty: ci.quantity, price: mi?.price || 0 };
  });
  const giftItems = giftKeys.map((k) => {
    const gi = initialCart[k];
    return { key: k, name: gi.name, qty: gi.quantity, price: gi.price };
  });

  const foodSubtotal = foodItems.reduce((s, it) => s + it.price * it.qty, 0);
  const giftSubtotal = giftItems.reduce((s, it) => s + it.price * it.qty, 0);

  const navState = location.state || {};
  const taxAmount =
    navState.taxAmount != null ? navState.taxAmount : (navState.taxRate || 0) * foodSubtotal;

  const grandTotal = foodSubtotal + giftSubtotal + taxAmount;
  const pointsEarned = Math.floor(foodSubtotal * 100);

  const [eta, setEta] = useState(null);
  const [codes, setCodes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function process() {
      try {
        /* ——— 1) record the order ——— */
        await fetch(`${API}/orders`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-User": user.username,
          },
          body: JSON.stringify({
            items_json: JSON.stringify([...foodItems, ...giftItems]),
            subtotal: grandTotal.toFixed(2),
          }),
        });
      } catch (e) {
        console.error(e);
      }

      /* ——— 2) create gift‑card codes ——— */
      const created = {};
      for (const gi of giftItems) {
        for (let i = 0; i < gi.qty; i++) {
          try {
            const res = await fetch(`${API}/rewards/giftcard/create`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "X-User": user.username,
              },
              body: JSON.stringify({ cents: gi.price * 100 }),
            });
            if (res.ok) {
              const { code } = await res.json();
              created[`${gi.key}-${i}`] = code;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
      if (isActive) setCodes(created);

      /* ——— 3) simulate delivery eta & clear cart ——— */
      const d = new Date();
      d.setMinutes(d.getMinutes() + 15 + Math.floor(Math.random() * 31));
      if (isActive) {
        setEta(d);
        setLoading(false);
        clearCart();
      }
    }

    process();
    return () => {
      isActive = false;
    };
  }, [user.username]);

  /* ——— redirects ——— */
  if (!isSignedIn) return <Navigate to="/signin" replace />;
  if (!loading && entries.length === 0) return <Navigate to="/cart" replace />;

  const etaStr = eta ? eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <motion.div className="confirmation-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            >
              <FiClock className="loading-icon" />
            </motion.div>
            <p>{t("processing")}…</p>
          </motion.div>
        ) : (
          <motion.div className="confirmation-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <h1>{t("orderConfirmed")}</h1>

            <div className="address-container">
              <FiMapPin /> {address}
            </div>

            <div className="order-summary-container">
              <div className="order-summary-header">
                <FiShoppingBag />
                <h2>{t("yourOrder")}</h2>
              </div>

              <div className="confirmation-summary-list">
                {[...foodItems, ...giftItems].map((it, idx) => (
                  <motion.div
                    key={idx}
                    className="confirmation-summary-item"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                  >
                    <span>
                      {it.qty} × {it.name}
                    </span>
                    <span>${(it.price * it.qty).toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>

              <div className="order-breakdown">
                <div className="breakdown-row">
                  <span>{t("subtotal")}</span>
                  <span>${foodSubtotal.toFixed(2)}</span>
                </div>
                {taxAmount > 0 && (
                  <div className="breakdown-row">
                    <span>{t("tax")}</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                )}
                {giftSubtotal > 0 && (
                  <div className="breakdown-row">
                    <span>{t("giftCards")}</span>
                    <span>${giftSubtotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="breakdown-row total-row">
                  <span>{t("total")}</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="confirmation-points-earned">
                {t("pointsEarned")}: {pointsEarned}
              </p>
            </div>

            {giftSubtotal > 0 && (
              <div className="giftcodes-container">
                <h3>{t("yourGiftCodes")}</h3>
                {giftItems.map((gi) =>
                  Array.from({ length: gi.qty }).map((_, idx) => {
                    const key = `${gi.key}-${idx}`;
                    return (
                      <div key={key} className="gc-row">
                        <span>{gi.name}:</span> <code>{codes[key] || t("generating")}</code>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            <div className="delivery-time-container">
              <FiClock /> {t("estDelivery")} {etaStr}
            </div>

            <p className="thanks">{t("orderThanks")}</p>

            <Link to="/menu" className="back-to-menu">
              {t("returnMenu")} <FiChevronRight />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
