import "./Menu.css";

import React from 'react';
import './Home.css'; // Make sure you import the correct path for Home.css
import tacos from "../assets/vegan-tacos.jpg";
import salad from "../assets/vegan-salad.jpg";
import burrito from "../assets/vegan-burrito.jpg";
import burger from "../assets/vegan-burger.jpg";
import bbowl from "../assets/vegan-bbowl.jpg";
import curry from "../assets/Vegan-curry.jpg";
import kabob from "../assets/Vegan-kabob.jpg";
import lasagna from "../assets/Vegan-lasagna.jpg";
import masala from "../assets/Vegan-masala.jpg";
import mc from "../assets/Vegan-mc.jpg";
import pizza from "../assets/Vegan-pizza.jpg";
import quesadillas from "../assets/Vegan-quesadillas.jpg";
import soup from "../assets/Vegan-soup.jpg";
import staco from "../assets/Vegan-staco.jpg";
import sushi from "../assets/Vegan-sushi.jpg";

const Home = () => {
  // Menu items with images and descriptions
  const menuItems = [
    { id: 1, name: 'Vegan Tacos', description: 'Delicious plant-based tacos with fresh veggies and salsa.', image: tacos },
    { id: 2, name: 'Vegetarian Burrito', description: 'A hearty burrito packed with rice, beans, and guacamole.', image: burrito },
    { id: 3, name: 'Vegan Salad', description: 'A fresh salad with mixed greens, chickpeas, and tahini dressing.', image: salad },
    { id: 4, name: 'Vegan Burger', description: 'A delicious vegan patty with lettuce, tomato, and a smoky sauce.', image: burger }, 
    { id: 5, name: 'Vegan Pizza', description: 'A crispy thin crust topped with marinara, vegan cheese, mushrooms, and spinach.', image: pizza },
    { id: 6, name: 'Vegan Mac and Cheese', description: 'Creamy, cheesy, and comforting made from cashews, nutritional yeast, and turmeric.', image: mc },
    { id: 7, name: 'Vegetarian Lasagna', description: 'Layers of noodles, ricotta, spinach, and marinara sauce.', image: lasagna},
    { id: 8, name: 'Chickpea Curry', description: 'A warm, aromatic curry made with chickpeas, coconut milk, and a blend of spices.', image: curry},
    { id: 9, name: 'Vegan Burrito Bowl', description: 'A bowl of rice, black beans, corn, guacamole, and salsa.', image: bbowl},
    { id: 10, name: 'Grilled Veggie Skewers', description: 'Skewers of marinated zucchini, bell peppers, onions, and mushrooms, grilled to perfection.', image:  kabob},
    { id: 11, name: 'Vegan Stir-fry', description: 'A mix of fresh vegetables stir-fried in a savory soy-based sauce, served over jasmine rice.', image:  quesadillas},
    { id: 12, name: 'Vegetarian Sushi Rolls', description: 'Sushi rolls with avocado, cucumber, and pickled radish, served with soy sauce and wasabi.', image: sushi },
    { id: 13, name: 'Sweet Potato Tacos', description: 'Soft tortillas filled with roasted sweet potatoes, black beans, avocado, and a tangy slaw.', image: staco},
    { id: 14, name: 'Vegan Quesadilla', description: 'A crispy tortilla filled with vegan cheese, beans, and sautéed vegetables.', image: quesadillas},
    { id: 15, name: 'Lentil Soup', description: 'A hearty soup made with lentils, carrots, celery, and tomatoes, seasoned with cumin and garlic.', image: soup },
    { id: 16, name: 'Cauliflower Tikka Masala', description: 'Roasted cauliflower in a rich, flavorful tomato-based sauce with garam masala and spices.', image: masala }
  ];

  return (
    <div className="menu-home-container">
      <div className="menu-home-background"></div>
      <div className="menu-home-content">
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
