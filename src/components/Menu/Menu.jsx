import { useState } from 'react';

import DetailPopup from '../DetailPopup/DetailPopup';
import menuItems from './menuItems.js';

import './Menu.css';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Menu</h1>
        <p className="menu-subtitle">
          Explore our creations -- please take note of which are vegan and which
          are vegetarian.
        </p>
      </div>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="menu-card-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="menu-card-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
        {selectedItem && (
          <DetailPopup
            menuItem={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
