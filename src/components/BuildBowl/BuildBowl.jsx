import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import spinachImg from '../../assets/spinach.png';
import kaleImg from '../../assets/kale.png';
import tofuImg from '../../assets/tofu.png';
import chickpeasImg from '../../assets/chickpeas.png';
import avocadoImg from '../../assets/avocado.png';
import tomatoeImg from '../../assets/tomatoe.png';
import quinoaImg from '../../assets/quinoa.png';
import brownriceImg from '../../assets/brownrice.png';
import './BuildBowl.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const BuildBowl = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [budget, setBudget] = useState(15);
  const [maxBudget, setMaxBudget] = useState(15);
  const [time, setTime] = useState(0);
  const [budgetLocked, setBudgetLocked] = useState(false);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const bowlRef = useRef(null);
  const ingredientsRef = useRef([]);
  const navigate = useNavigate();
  const { addToCartWithCustomizations } = useCart();

  const ingredients = [
    { id: 1, name: 'Quinoa', price: 3, time: 2, category: 'base', color: '#f4d03f' },
    { id: 2, name: 'Brown Rice', price: 2, time: 2, category: 'base', color: '#8b4513' },
    { id: 3, name: 'Kale', price: 2, time: 1, category: 'greens', color: '#2ecc71' },
    { id: 4, name: 'Spinach', price: 2, time: 1, category: 'greens', color: '#27ae60' },
    { id: 5, name: 'Tofu', price: 4, time: 3, category: 'protein', color: '#ecf0f1' },
    { id: 6, name: 'Chickpeas', price: 3, time: 2, category: 'protein', color: '#f39c12' },
    { id: 7, name: 'Avocado', price: 3, time: 1, category: 'toppings', color: '#16a085' },
    { id: 8, name: 'Tomatoes', price: 2, time: 1, category: 'toppings', color: '#e74c3c' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 0); // Move camera above the bowl
    camera.lookAt(0, 0, 0); // Point camera at the center
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Remove old bowl if exists
    if (bowlRef.current) {
      scene.remove(bowlRef.current);
    }

    // Determine base selection
    const baseNames = selectedIngredients.filter(i => i.category === 'base').map(i => i.name);
    let bowlMaterial;
    if (baseNames.length === 1) {
      // Only one base selected
      const texture = new THREE.TextureLoader().load(
        baseNames[0] === 'Quinoa' ? quinoaImg : brownriceImg
      );
      bowlMaterial = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.1, roughness: 0.5 });
    } else if (baseNames.length === 2) {
      // Both bases selected: split bowl
      // Create a canvas to split the images
      const size = 1024;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const img1 = new window.Image();
      const img2 = new window.Image();
      let loaded = 0;
      img1.onload = img2.onload = () => {
        loaded++;
        if (loaded === 2) {
          ctx.drawImage(img1, 0, 0, size / 2, size);
          ctx.drawImage(img2, size / 2, 0, size / 2, size);
          const texture = new THREE.CanvasTexture(canvas);
          bowlRef.current.material.map = texture;
          bowlRef.current.material.needsUpdate = true;
        }
      };
      img1.src = quinoaImg;
      img2.src = brownriceImg;
      // Use a placeholder material until loaded
      bowlMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.1, roughness: 0.5 });
    } else {
      // No base selected
      bowlMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.1, roughness: 0.5 });
    }
    const bowlGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
    const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
    scene.add(bowl);
    bowlRef.current = bowl;

    // Add non-base ingredient spheres as children of the bowl
    ingredientsRef.current = [];
    selectedIngredients.forEach((ingredient, idx) => {
      if (ingredient.category !== 'base') {
        let textureMap = null;
        switch (ingredient.name) {
          case 'Spinach': textureMap = spinachImg; break;
          case 'Kale': textureMap = kaleImg; break;
          case 'Tofu': textureMap = tofuImg; break;
          case 'Chickpeas': textureMap = chickpeasImg; break;
          case 'Avocado': textureMap = avocadoImg; break;
          case 'Tomatoes': textureMap = tomatoeImg; break;
        }
        let material;
        if (textureMap) {
          const texture = new THREE.TextureLoader().load(textureMap);
          material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.1, roughness: 0.5 });
        } else {
          material = new THREE.MeshStandardMaterial({ color: ingredient.color, metalness: 0.1, roughness: 0.5 });
        }
        // Make balls bigger (radius 0.35)
        const geometry = new THREE.SphereGeometry(0.35, 32, 32);
        const mesh = new THREE.Mesh(geometry, material);
        // Position sphere above bowl
        const angle = (idx * Math.PI * 2) / 5;
        mesh.position.set(
          Math.sin(angle) * 0.8,
          0.3,
          Math.cos(angle) * 0.8
        );
        bowl.add(mesh); // Attach to bowl so it spins together
        ingredientsRef.current.push(mesh);
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      bowl.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, [selectedIngredients]);

  const addIngredient = (ingredient) => {
    if (!budgetLocked) return;

    // Prevent adding the same base more than once
    if (
      ingredient.category === 'base' &&
      selectedIngredients.some(i => i.name === ingredient.name)
    ) {
      return;
    }

    if (budget >= ingredient.price && (budget - ingredient.price) >= 0) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setBudget(budget - ingredient.price);
      setTime(time + ingredient.time);
      // No need to add balls here, handled in useEffect
    }
  };

  const removeIngredient = (index) => {
    const ingredient = selectedIngredients[index];
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
    setBudget(budget + ingredient.price);
    setTime(time - ingredient.time);
    // No need to remove balls here, handled in useEffect
  };

  return (
    <div className="build-bowl-container">
      <div className="game-ui">
        <div className="stats">
          <div className="stat" style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="max-budget-input" style={{ fontWeight: 'bold', fontSize: '1.05rem', marginRight: '0.3rem' }}>
              Budget: $
            </label>
            {budgetLocked ? (
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem' }}>{budget}</span>
            ) : (
              <>
                <input
                  id="max-budget-input"
                  type="number"
                  min="1"
                  value={String(maxBudget ?? 0)}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setMaxBudget(val);
                    setBudget(val);
                  }}
                  placeholder="e.g. 20"
                  style={{
                    width: '70px',
                    fontSize: '1rem',
                    padding: '0.2rem',
                    borderRadius: '6px',
                    border: '1.2px solid #bbb',
                    textAlign: 'center',
                    outline: 'none',
                    marginLeft: '0.2rem',
                  }}
                />
                <button
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.2rem 0.7rem',
                    fontSize: '1rem',
                    borderRadius: '6px',
                    border: '1.2px solid #bbb',
                    background: '#4CAF50',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                  onClick={() => setBudgetLocked(true)}
                >
                  Enter
                </button>
              </>
            )}
          </div>
          <div className="stat">
            <span>Time: {time} mins</span>
          </div>
        </div>
        
        <div className="ingredients-panel">
          <h3>Available Ingredients</h3>
          <div className="ingredients-grid">
            {ingredients.map((ingredient) => (
              <motion.button
                key={ingredient.id}
                className="ingredient-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addIngredient(ingredient)}
                disabled={budget < ingredient.price}
                style={{ borderColor: ingredient.color }}
              >
                {ingredient.name}
                <span className="price">${ingredient.price}</span>
                <span className="time">{ingredient.time}m</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="selected-ingredients">
          <h3>Your Bowl</h3>
          <div className="selected-list">
            {selectedIngredients.map((ingredient, index) => (
              <motion.div
                key={index}
                className="selected-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {ingredient.name}
                <button onClick={() => removeIngredient(index)}>×</button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          className="order-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={selectedIngredients.length === 0 || budget < 0}
          onClick={() => {
            // Calculate total price as sum of selected ingredient prices
            const totalPrice = selectedIngredients.reduce((sum, i) => sum + i.price, 0);
            // Add custom bowl to cart
            addToCartWithCustomizations('custom-bowl', {
              quantity: 1,
              name: 'Custom Bowl',
              price: totalPrice,
              description: 'A bowl you built yourself!',
              image: '/assets/bowl-placeholder.png',
              selectedIngredients: selectedIngredients.map(i => i.name),
              time,
            });
            navigate('/cart');
          }}
        >
          Place Order
        </motion.button>
      </div>

      <div className="canvas-container" ref={containerRef} />
    </div>
  );
};

export default BuildBowl;
