import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FiAlignLeft,
  FiArrowDown,
  FiArrowUp,
  FiCheck,
  FiShoppingCart,
  FiSliders,
  FiFilter,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import DetailPopup from '../DetailPopup/DetailPopup';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import useMenuItems from '../../consts/menuItems.js';

import './Menu.css';

function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [justAddedMap, setJustAddedMap] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
  });

  const menuRef = useRef(null);
  const sortRef = useRef(null);
  const filterRef = useRef(null);

  const navigate = useNavigate();

  const { isSignedIn } = useAuth();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const menuItems = useMenuItems();

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'other'];

  const categoryMap = {
    all: 'all',
    breakfast: 'b',
    lunch: 'l',
    dinner: 'd',
    other: 'o',
  };

  const sortOptions = [
    { id: 'default', label: t('default'), icon: <FiAlignLeft /> },
    { id: 'priceAsc', label: t('priceLowToHigh'), icon: <FiArrowUp /> },
    { id: 'priceDesc', label: t('priceHighToLow'), icon: <FiArrowDown /> },
    { id: 'nameAsc', label: t('nameAZ'), icon: <FiAlignLeft /> },
    { id: 'nameDesc', label: t('nameZA'), icon: <FiAlignLeft /> },
  ];

  const handleAddToCart = (e, itemId) => {
    e.stopPropagation();
    addToCart(itemId);

    setJustAddedMap((prev) => ({ ...prev, [itemId]: true }));

    setTimeout(() => {
      setJustAddedMap((prev) => ({ ...prev, [itemId]: false }));
    }, 2000);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    if (showFilterDropdown) setShowFilterDropdown(false);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
    if (showSortDropdown) setShowSortDropdown(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const handleDietaryFilterChange = (filterType) => {
    setDietaryFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const clearDietaryFilters = () => {
    setDietaryFilters({
      vegetarian: false,
      vegan: false,
    });
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleClickOutside = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target)) {
      setShowSortDropdown(false);
    }
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setShowFilterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const catMatch =
      activeCategory === 'all' || item.category === categoryMap[activeCategory];

    const searchMatch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    let dietaryMatch = true;
    if (dietaryFilters.vegetarian && item.type !== 't' && item.type !== 'n') {
      dietaryMatch = false;
    }
    if (dietaryFilters.vegan && item.type !== 'n') {
      dietaryMatch = false;
    }

    return catMatch && searchMatch && dietaryMatch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const activeDietaryFiltersCount = Object.values(dietaryFilters).filter(
    Boolean
  ).length;

  return (
    <div className="menu-wrapper" ref={menuRef}>
      <motion.div
        className="menu-hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="menu-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
          }}
        >
          {t('menu')}
        </motion.h1>
        <motion.h6
          className="menu-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('menuSub')}
        </motion.h6>

        {!isSignedIn && (
          <motion.button
            className="sign-in-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSignIn}
          >
            {t('menuTooltip')}
          </motion.button>
        )}

        <div className="menu-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder={t('searchMenu')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <motion.div
            className="category-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                className={`category-tab ${
                  activeCategory === cat ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(cat)}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="menu-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="menu-options-bar">
          <div className="results-count">
            {filteredItems.length}{' '}
            {filteredItems.length === 1 ? t('item') : t('items')}
          </div>

          <div className="options-controls">
            <div className="filter-container" ref={filterRef}>
              <motion.button
                className={`filter-icon-button ${
                  activeDietaryFiltersCount > 0 ? 'active' : ''
                }`}
                onClick={toggleFilterDropdown}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={t('filterOptions')}
              >
                <FiFilter />
                {activeDietaryFiltersCount > 0 && (
                  <span className="filter-badge">{activeDietaryFiltersCount}</span>
                )}
              </motion.button>

              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div
                    className="filter-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="filter-dropdown-header">{t('dietaryPreferences')}</div>
                    <div
                      className={`filter-option ${
                        dietaryFilters.vegetarian ? 'active' : ''
                      }`}
                      onClick={() => handleDietaryFilterChange('vegetarian')}
                    >
                      <span>{t('vegetarian')}</span>
                      {dietaryFilters.vegetarian && (
                        <FiCheck className="filter-check" />
                      )}
                    </div>
                    <div
                      className={`filter-option ${
                        dietaryFilters.vegan ? 'active' : ''
                      }`}
                      onClick={() => handleDietaryFilterChange('vegan')}
                    >
                      <span>{t('vegan')}</span>
                      {dietaryFilters.vegan && <FiCheck className="filter-check" />}
                    </div>
                    {activeDietaryFiltersCount > 0 && (
                      <button
                        className="clear-filters-button"
                        onClick={clearDietaryFilters}
                      >
                        {t('clearFilters')}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="sort-container" ref={sortRef}>
              <motion.button
                className="sort-icon-button"
                onClick={toggleSortDropdown}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={t('sortOptions')}
              >
                <FiSliders />
              </motion.button>

              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    className="sort-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="sort-dropdown-header">{t('sortBy')}</div>
                    {sortOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        className={`sort-option ${
                          sortOption === option.id ? 'active' : ''
                        }`}
                        onClick={() => handleSortChange(option.id)}
                        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                      >
                        <span className="sort-option-icon">{option.icon}</span>
                        <span>{option.label}</span>
                        {sortOption === option.id && (
                          <motion.div
                            className="active-indicator"
                            layoutId="activeIndicator"
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div className="menu-grid">
          {sortedItems.map((item) => {
            const justAdded = justAddedMap[item.id];
            return (
              <motion.div
                key={item.id}
                className="menu-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                onClick={() => setSelectedItem(item)}
                layout={false}
              >
                <div className="menu-card-content">
                  <div className="menu-card-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-card-image"
                    />
                    <div className="menu-card-badges">
                      {item.isNew && (
                        <span className="badge new-badge">{t('new')}</span>
                      )}
                      {item.isPopular && (
                        <span className="badge popular-badge">
                          {t('popular')}
                        </span>
                      )}
                      {item.type === 'n' && (
                        <span className="badge vegan-badge">{t('vegan')}</span>
                      )}
                      {item.type === 't' && (
                        <span className="badge vegetarian-badge">{t('vegetarian')}</span>
                      )}
                    </div>
                    <div className="menu-card-price">${item.price}</div>
                  </div>

                  <div className="menu-card-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                    {isSignedIn && (
                      <motion.button
                        className={`cart-button ${justAdded ? 'added' : ''}`}
                        onClick={(e) => handleAddToCart(e, item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {justAdded ? (
                          <>
                            <FiCheck className="icon" />
                            <span>{t('added')}</span>
                          </>
                        ) : (
                          <>
                            <FiShoppingCart className="icon" />
                            <span>{t('addCart')}</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {sortedItems.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>{t('noResults')}</h3>
            <p>{t('tryDifferentSearch')}</p>
          </motion.div>
        )}
      </motion.div>

      {selectedItem && (
        <DetailPopup
          menuItem={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default Menu;