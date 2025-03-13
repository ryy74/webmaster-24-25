import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

import { useLanguage } from '../../contexts/LanguageContext';

import './Process.css';

function Process() {
  const [visible, setVisible] = useState(false);
  const [activeProcess, setActiveProcess] = useState(null);

  const showcaseRef = useRef(null);
  const processIndexRef = useRef(0);

  const { t } = useLanguage();
  
  const processes = [
    {
      id: 'farming',
      title: t('processT1'),
      description: t('processD1'),
      image: '/assets/farmingImg.jpg',
    },
    {
      id: 'processing',
      title: t('processT2'),
      description: t('processD2'),
      image: '/assets/processingImg.jpg',
    },
    {
      id: 'cooking',
      title: t('processT3'),
      description: t('processD3'),
      image: '/assets/cookingImg.jpg',
    },
    {
      id: 'delivery',
      title: t('processT4'),
      description: t('processD4'),
      image: '/assets/deliveryImg.png',
    },
    {
      id: 'meal',
      title: t('processT5'),
      description: t('processD5'),
      image: '/assets/mealImg.jpg',
    },
  ];

  useEffect(() => {
    setVisible(true);
    setActiveProcess(processes[0].id);
    processIndexRef.current = 0;
    // eslint-disable-next-line
  }, []);

  const handleProcessClick = (id) => {
    const newIndex = processes.findIndex(process => process.id === id);
    processIndexRef.current = newIndex;
    setActiveProcess(id);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    
    const currentIndex = processIndexRef.current;
    
    const isScrollingDown = e.deltaY > 0;
    
    let newIndex;
    if (isScrollingDown) {
      newIndex = Math.min(currentIndex + 1, processes.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (newIndex !== currentIndex) {
      processIndexRef.current = newIndex;
      setActiveProcess(processes[newIndex].id);
    }
  };

  useEffect(() => {
    const showcaseElement = showcaseRef.current;
    
    if (showcaseElement) {
      const handleWheel = (e) => handleScroll(e);
      showcaseElement.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        showcaseElement.removeEventListener('wheel', handleWheel);
      };
    }
    // eslint-disable-next-line
  }, []);

  const currentIndex = processes.findIndex(process => process.id === activeProcess);

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

      <div className="process-content-container">
        <motion.div 
          className="process-navigation"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {processes.map((process, index) => (
            <motion.div
              key={process.id}
              className={`process-nav-item ${activeProcess === process.id ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              onClick={() => handleProcessClick(process.id)}
              whileHover={{ x: 5 }}
            >
              <div className="process-nav-content">
                <span className="process-nav-number">{index + 1}</span>
                <span className="process-nav-title">{process.title}</span>
                <ChevronRight className="process-nav-icon" />
              </div>
              {index < processes.length - 1 && (
                <div className="process-nav-connector"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="process-showcase"
          ref={showcaseRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="process-detail-container">
            {processes.map((process, index) => {
              let positionClass = '';
              if (index === currentIndex) {
                positionClass = 'position-current';
              } else if (index < currentIndex) {
                positionClass = 'position-prev';
              } else {
                positionClass = 'position-next';
              }

              return (
                <motion.div
                  key={process.id}
                  className={`process-detail ${positionClass} ${activeProcess === process.id ? 'active' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeProcess === process.id ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                >
                  <motion.div 
                    className="detail-image-container"
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    <motion.img
                      src={process.image}
                      alt={process.title}
                      className="detail-image"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="image-overlay"></div>
                  </motion.div>
                  
                  <div className="detail-content">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {process.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {process.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="process-mobile-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {processes.map((process, index) => (
          <motion.div
            key={process.id}
            className="mobile-process-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: visible ? 1 : 0,
              y: visible ? 0 : 30
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2 * index,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <div className="mobile-process-header" onClick={() => handleProcessClick(process.id)}>
              <div className="mobile-process-number">{index + 1}</div>
              <h3 className="mobile-process-title">{process.title}</h3>
              <ChevronDown className={`mobile-process-icon ${activeProcess === process.id ? 'active' : ''}`} />
            </div>
            
            <motion.div
              className="mobile-process-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: activeProcess === process.id ? 'auto' : 0,
                opacity: activeProcess === process.id ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <img src={process.image} alt={process.title} className="mobile-process-image" />
              <p className="mobile-process-description">{process.description}</p>
            </motion.div>
            
            {index < processes.length - 1 && (
              <div className="mobile-process-connector"></div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="background-elements">
        <div className="bg-line"></div>
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