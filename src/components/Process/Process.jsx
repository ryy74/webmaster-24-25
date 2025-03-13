import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

import { useLanguage } from '../../contexts/LanguageContext';

import './Process.css';

function Process() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  const processes = [
    {
      id: 'farming',
      title: 'Harvested at Peak Freshness',
      description:
        'The quality of a dish is directly tied to the freshness of its ingredients. That is why we work closely with our farming partners to ensure that all produce, dairy, and proteins are harvested at their peak. By selecting ingredients at the height of ripeness, we preserve their natural flavor, texture, and nutritional value. Once harvested, our ingredients are swiftly transported to our kitchen, reducing storage time and eliminating the need for artificial preservatives.',
      image: '/assets/farmingImg.jpg',
    },
    {
      id: 'processing',
      title: 'Minimal Handling, Maximum Quality',
      description: 'We believe that the best ingredients require minimal intervention. Once our fresh produce and proteins arrive, they undergo careful washing, trimming, and portioning to ensure consistency and quality. Unlike mass-produced food that relies on heavy processing, our approach maintains the integrity of each ingredient. We do not use artificial additives, preservatives, or unnecessary modifications—only natural, high-quality components prepared with care. Every step is designed to enhance the ingredient\'s natural appeal while upholding the high standards of our kitchen. This commitment to minimal processing ensures that every dish we serve reflects the true essence of farm-fresh cuisine.',
      image: '/assets/processingImg.jpg',
    },
    {
      id: 'cooking',
      title: 'Expert Culinary Craftsmanship',
      description:
        'Once our ingredients are prepared, they are transformed by our team of skilled chefs into thoughtfully curated dishes. Our culinary philosophy emphasizes precision, balance, and respect for natural flavors. Through time-honored techniques such as slow roasting, delicate seasoning, and precision cooking, we bring out the best in every ingredient. Whether it\'s a vibrant seasonal salad, a carefully seared protein, or a comforting, slow-simmered dish, our meals are designed to highlight both taste and nutrition. Our chefs approach each dish with artistry and expertise, ensuring that every plate is as visually appealing as it is delicious.',
      image: '/assets/cookingImg.jpg',
    },
    {
      id: 'delivery',
      title: 'Sustainable Packaging & Thoughtful Delivery',
      description:
        'Our responsibility to the environment extends beyond ingredient sourcing and food preparation. We are committed to using sustainable packaging and environmentally conscious delivery methods to reduce our ecological footprint. Our meals are packaged in 100% compostable containers made from renewable materials, ensuring that waste is minimized. Additionally, our delivery system is designed with sustainability in mind, utilizing carbon-neutral routes and innovative cooling technology to maintain freshness without excess energy consumption. By prioritizing eco-friendly solutions, we ensure that our commitment to sustainability remains consistent from farm to table.',
      image: '/assets/deliveryImg.png',
    },
    {
      id: 'meal',
      title: 'A Refined Dining Experience Rooted in Freshness',
      description:
        'At the heart of our philosophy is a dedication to delivering an exceptional dining experience centered on fresh, responsibly sourced ingredients. Every meal we serve is a testament to our passion for quality, sustainability, and expert craftsmanship. From the way our ingredients are grown and harvested to the thoughtful preparation and presentation of each dish, we take pride in creating meals that nourish both the body and the soul. Our farm-to-table approach not only enhances the flavor of our dishes but also fosters a deeper connection between food, nature, and the community we serve.',
      image: '/assets/mealImg.jpg', // change
    },
  ];

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="process-wrapper">
      <motion.div
        className="process-hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="process-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
          }}
        >
          {t('processHTitle')}
        </motion.h1>
        <motion.p
          className="process-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('processHDesc')}
        </motion.p>
      </motion.div>

      <motion.div
        className="process-timeline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {processes.map((process, index) => (
          <motion.div
            key={process.id}
            className="process-step"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: visible ? 1 : 0,
              y: visible ? 0 : 50
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2 * index,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <div className={`step-content ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <motion.div 
                className="step-image-container"
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.img
                  src={process.image}
                  alt={process.title}
                  className="step-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="image-overlay"></div>
              </motion.div>

              <div className="step-text">
                <motion.h2
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {process.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {process.description}
                </motion.p>
              </div>
            </div>

            {index < processes.length - 1 && (
              <motion.div 
                className="step-connector"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.8 + index * 0.2,
                  type: "spring"
                }}
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <ChevronDown className="connector-icon" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="background-elements">
        <div className="bg-line" />
        <motion.div 
          className="bg-circle circle-1"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="bg-circle circle-2"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="bg-circle circle-3"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </div>
  );
}

export default Process;