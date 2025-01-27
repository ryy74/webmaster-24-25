import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import useMenuItems from '../../consts/menuItems.js';
import DetailPopup from '../DetailPopup/DetailPopup';

import './Menu.css';

function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [justAddedMap, setJustAddedMap] = useState({});

  const { isSignedIn } = useAuth();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const menuItems = useMenuItems();

  const handleAddToCart = (e, itemId) => {
    e.stopPropagation();
    addToCart(itemId);

    setJustAddedMap((prev) => ({ ...prev, [itemId]: true }));

    setTimeout(() => {
      setJustAddedMap((prev) => ({ ...prev, [itemId]: false }));
    }, 2000);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">{t('menu')}</h1>
        <h6 className="menu-subtitle">{t('menuSub')}</h6>
        {!isSignedIn && (
          <p className="menu-tooltip">
            {t('menuTooltip')}
          </p>
        )}
      </div>
      <div className="menu-grid">
        {menuItems.map((item) => {
          const justAdded = justAddedMap[item.id];
          return (
            <div
              key={item.id}
              className="menu-card"
              onClick={() => setSelectedItem(item)}
            >
              <div className="menu-card-image">
                <img src={item.image} alt={item.name} />
                <div className="menu-card-price">${item.price}</div>
              </div>
              <div className="menu-card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {isSignedIn &&
                  (!justAdded ? (
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, item.id)}
                    >
                      {t('addCart')}
                    </button>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, item.id)}
                    >
                      {t('added')}
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
        {selectedItem && (
          <DetailPopup
            menuItem={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Menu;
