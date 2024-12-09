import React from 'react';
import './Home.css';
import tacos from "../assets/vegan-tacos.jpg";
import salad from "../assets/vegan-salad.jpg";
import burrito from "../assets/vegan-burrito.jpg";
import burger from "../assets/vegan-burger.jpg";


const Home = () => {
  // Example menu items (replace with your local image paths)
  const menuItems = [
    { id: 1, name: 'Vegan Tacos', description: 'Delicious plant-based tacos with fresh veggies and salsa.', image: tacos },
    { id: 2, name: 'Vegetarian Burrito', description: 'A hearty burrito packed with rice, beans, and guacamole.', image: burrito },
    { id: 3, name: 'Vegan Salad', description: 'A fresh salad with mixed greens, chickpeas, and tahini dressing.', image: salad },
    { id: 4, name: 'Vegan Burger', description: 'A delicious vegan patty with lettuce, tomato, and a smoky sauce.', image: burger },
  ];

  return (
    <div className="home-container">
      <div className="home-background"></div>
      <div className="home-content">
        <h1>Welcome to Green Bites!</h1>
        <p>Fresh, sustainable, and delicious vegan and vegetarian meals.</p>

        {/* Menu Section */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
