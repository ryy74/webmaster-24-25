import React, { useState } from 'react';

import DetailPopup from './DetailPopup';

import menuItems from './Menu/menuItems.js'

import "./Menu.css";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Explore our delicious plant-based creations</p>
      </div>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card" onClick={() => setSelectedItem(item)}>
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