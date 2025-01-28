// Menu.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import useMenuItems from '../../consts/menuItems.js';
import DetailPopup from '../DetailPopup/DetailPopup';
import './Menu.css';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="category-filter">
    <button
      onClick={() => onCategoryChange('all')}
      className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
    >
      All Items
    </button>
    {categories.map(category => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
      >
        {category}
      </button>
    ))}
  </div>
);

const MenuCard = ({ item, isSignedIn, justAdded, onAddToCart, onClick }) => (
  <div className="menu-card" style={{ gridRow: `span ${Math.floor(Math.random() * 2) + 1}` }}>
    <div className="menu-card-image" onClick={onClick}>
      <img src={item.image} alt={item.name} />
      <div className="image-overlay" />
    </div>
    
    <div className="menu-card-content">
      <div className="menu-card-header">
        <h3>{item.name}</h3>
        <span className="price">${item.price}</span>
      </div>
      
      <p>{item.description}</p>
      
      {isSignedIn && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(e, item.id);
          }}
          className={`add-cart-btn ${justAdded ? 'added' : ''}`}
        >
          <span className="btn-icon">{justAdded ? '✓' : '+'}</span>
          {justAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      )}
    </div>
  </div>
);

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [justAddedMap, setJustAddedMap] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { isSignedIn } = useAuth();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const menuItems = useMenuItems();

  const categories = [...new Set(menuItems.map(item => item.category))];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleAddToCart = (e, itemId) => {
    e.stopPropagation();
    addToCart(itemId);
    setJustAddedMap(prev => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      setJustAddedMap(prev => ({ ...prev, [itemId]: false }));
    }, 2000);
  };

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="menu-wrapper">
      <header className={`menu-header ${isHeaderVisible ? '' : 'hidden'}`}>
        <div className="header-content">
          <div className="header-text">
            <h1>{t('menu')}</h1>
            <p>{t('menuSub')}</p>
          </div>
          
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </header>

      <main className="menu-main">
        {!isSignedIn && (
          <div className="sign-in-notice">
            {t('menuTooltip')}
          </div>
        )}

        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuCard
              key={item.id}
              item={item}
              isSignedIn={isSignedIn}
              justAdded={justAddedMap[item.id]}
              onAddToCart={handleAddToCart}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </main>

      {selectedItem && (
        <DetailPopup
          menuItem={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Menu;