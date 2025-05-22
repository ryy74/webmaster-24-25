import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiGift,
  FiShoppingCart,
} from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";

import CartItem from "./CartItem";

import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useLanguage } from "../../contexts/LanguageContext";
import useMenuItems from "../../consts/menuItems";

import "./Cart.css";

function Cart() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { cart, updateCartQuantity, updateCartItem, removeFromCart } =
    useCart();
  const menuItems = useMenuItems();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(id);
  }, []);

  if (!isSignedIn) return <Navigate to="/signin" replace />;

  const keys = Object.keys(cart);
  const empty = keys.length === 0;

  const isGiftCard = (id) => typeof id === "string" && id.startsWith("gc-");

  const cartRows = keys
    .map((key) => {
      const ci = cart[key];

      if (!isGiftCard(ci.itemId)) {
        const mi = menuItems.find((m) => m.id === ci.itemId);
        if (!mi) return null;
        return (
          <CartItem
            key={key}
            item={mi}
            quantity={ci.quantity}
            customizations={ci}
            cartItemKey={key}
            onChangeQuantity={updateCartQuantity}
            onUpdateItem={updateCartItem}
            onRemove={removeFromCart}
          />
        );
      }

      return (
        <motion.div
          key={key}
          className="cart-gc-row"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="cart-gc-info">
            <FiGift className="gc-icon" />
            <span>{ci.name}</span>
          </div>
          <span className="cart-gc-price">
            ${(ci.price * ci.quantity).toFixed(2)}
          </span>
        </motion.div>
      );
    })
    .filter(Boolean);

  const total = keys.reduce((sum, k) => {
    const ci = cart[k];

    if (isGiftCard(ci.itemId)) {
      return sum + ci.price * ci.quantity;
    }

    const mi = menuItems.find((m) => m.id === ci.itemId);
    return mi ? sum + mi.price * ci.quantity : sum;
  }, 0);

  const summaryRows = keys
    .map((key, idx) => {
      const ci = cart[key];

      if (isGiftCard(ci.itemId)) {
        return (
          <motion.div
            key={key}
            className="cart-summary-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <span className="cart-summary-item-name">
              {ci.quantity} × {ci.name}
            </span>
            <span className="cart-summary-item-price">
              ${(ci.price * ci.quantity).toFixed(2)}
            </span>
          </motion.div>
        );
      }

      const mi = menuItems.find((m) => m.id === ci.itemId);
      if (!mi) return null;

      const details = [];
      if (ci.specialInstructions) {
        const txt = ci.specialInstructions;
        details.push(
          `${t("special")}: ${txt.length > 18 ? txt.slice(0, 15) + "…" : txt}`,
        );
      }
      if (ci.removedIngredients?.length) {
        details.push(`${t("no")}: ${ci.removedIngredients.join(", ")}`);
      }
      if (ci.includeUtensils === false) details.push(t("noUtensils"));

      return (
        <motion.div
          key={key}
          className="cart-summary-item"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + idx * 0.05 }}
        >
          <div className="cart-summary-item-details">
            <span className="cart-summary-item-name">
              {ci.quantity} × {mi.name}
            </span>
            {details.length > 0 && (
              <span className="cart-summary-item-customizations">
                {details.join(" • ")}
              </span>
            )}
          </div>
          <span className="cart-summary-item-price">
            ${(mi.price * ci.quantity).toFixed(2)}
          </span>
        </motion.div>
      );
    })
    .filter(Boolean);

  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="cart-inner"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {}
        <motion.div
          className={`cart-left ${empty ? "empty" : ""}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FiShoppingCart className="cart-icon" /> {t("yourCart")}
          </motion.h1>

          {}
          <AnimatePresence>
            {empty ? (
              <motion.div
                className="empty-cart-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="empty-cart-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <FiShoppingCart />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {t("emptyCart")}{" "}
                  <Link to="/menu" className="menu-link">
                    {t("menu")}
                  </Link>
                </motion.p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="cart-items-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <AnimatePresence>{cartRows}</AnimatePresence>
                </motion.div>

                <motion.div
                  className="cart-total"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.h2 whileHover={{ scale: 1.03 }}>
                    {t("cartTotal")}{" "}
                    <span className="price-highlight">${total.toFixed(2)}</span>
                  </motion.h2>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div
            className="return-to-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.97 }}>
              <Link to="/menu" className="menu-return-link">
                <FiArrowLeft className="return-icon" /> {t("returnMenu")}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {}
        <motion.div
          className="cart-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="cart-summary-header"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h2>{t("yourOrder")}</motion.h2>
            <motion.div
              className="cart-time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FiClock className="clock-icon" /> {now.toLocaleTimeString()}
            </motion.div>
          </motion.div>

          <motion.div
            className="cart-summary-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence>{summaryRows}</AnimatePresence>
          </motion.div>

          <motion.p
            className="cart-total-price"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {t("orderTotal")}{" "}
            <span className="price-amount">${total.toFixed(2)}</span>
          </motion.p>

          <AnimatePresence>
            {empty ? (
              <motion.button
                className="checkout-btn disabled"
                disabled
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {t("noCart")}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to="/checkout" className="checkout-btn">
                  {t("checkout")} <FiCheckCircle className="checkout-icon" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
