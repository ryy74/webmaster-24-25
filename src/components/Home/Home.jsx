import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

import { useLanguage } from '../../contexts/LanguageContext';
import useMenuItems from '../../consts/previewItems';

import farm from '../../assets/farm.jpg';
import homeBg from '../../assets/home-bg.jpg';
import produce from '../../assets/produce.jpg';
import sustainabilityBg from '../../assets/sustainability-bg.jpg';
import vegan from '../../assets/vegan.jpg';

import './Home.css';

function Home() {  
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredRef = useRef(null);
  const aboutRef = useRef(null);
  
  const menuItems = useMenuItems();
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <motion.div className="hero-section">
        <img src={homeBg} alt="" className="hero-background" />
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <motion.h1 
            className="hero__title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t('subTitle')}
          </motion.p>
          
          <motion.div className="hero-cta-container">
            <motion.a
              href="/menu"
              className="hero-cta primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(52, 152, 219, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('menuCTA')}</span>
              <FiArrowRight className="cta-icon" />
            </motion.a>
            
            <motion.a
              href="#about"
              className="hero-cta secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('learnMore')}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        id="about"
        className="about-section"
        ref={aboutRef}
      >
        <motion.div 
          className="about-image-grid"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src={farm} 
            alt="Farm" 
            className="about-image"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img 
            src={produce}
            alt="Fresh Salad" 
            className="about-image"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img 
            src={vegan} 
            alt="Vegan Burger" 
            className="about-image"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >         
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('aboutHeader')}
          </motion.h2>
          
          <motion.div 
            className="text-highlight"
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {t('aboutDesc')}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {t('aboutDesc2')}
          </motion.p>
          
          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">{t('organic')}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">{t('years')}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">{t('dishes')}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="sustainability-section"
        style={{ 
          backgroundImage: `url(${sustainabilityBg})`,
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 0
          }} 
        />
        <motion.div 
          className="sustainability-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('sustainabilityHeader')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {t('sustainabilityDesc')}
          </motion.p>
          
          <motion.div 
            className="eco-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="eco-stat">
              <div className="eco-stat-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8"/>
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#2ecc71" 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    strokeLinecap="round"
                    whileInView={{ strokeDashoffset: 60 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="eco-stat-value">80%</div>
              </div>
              <div className="eco-stat-label">{t('wasteSaved')}</div>
            </div>
            
            <div className="eco-stat">
              <div className="eco-stat-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8"/>
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#3498db" 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    strokeLinecap="round"
                    whileInView={{ strokeDashoffset: 120 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="eco-stat-value">60%</div>
              </div>
              <div className="eco-stat-label">{t('localSourcing')}</div>
            </div>
            
            <div className="eco-stat">
              <div className="eco-stat-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8"/>
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#f39c12" 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    strokeLinecap="round"
                    whileInView={{ strokeDashoffset: 30 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="eco-stat-value">90%</div>
              </div>
              <div className="eco-stat-label">{t('renewable')}</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="featured-section" ref={featuredRef}>
        <motion.div 
          className="section-badge gradient-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t('featuredHeader')}
        </motion.h2>
        
        <motion.div 
          className="text-highlight centered"
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        
        <motion.div 
          className="preview-items"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="preview-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.2 + (index * 0.1),
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="preview-badges">
                {item.isNew && <span className="badge new-badge">{t('new')}</span>}
                {item.isPopular && <span className="badge popular-badge">{t('popular')}</span>}
              </div>
              
              <div className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="preview-item-image"
                />
                <div className="preview-item-price">${item.price}</div>
              </div>
              
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          href="/menu"
          className="menu-redirect"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover="hover"
        >
          <span className="menu-redirect-text">{t('bannerLink')}</span>
          <motion.span
            className="menu-redirect-arrow"
            variants={{
              initial: { x: 0 },
              hover: { x: 5 },
            }}
          >
            <FiArrowRight size={20} />
          </motion.span>
        </motion.a>
      </div>

      <div className="testimonials-section">       
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t('testimonialsHeader')}
        </motion.h2>
        
        <motion.div 
          className="text-highlight centered"
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        
        <div className="testimonials-container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTestimonial}
              className="testimonial active"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-quote">"</div>
              <p>
                {activeTestimonial === 0 && t('testimonialsP1')}
                {activeTestimonial === 1 && t('testimonialsP2')}
                {activeTestimonial === 2 && t('testimonialsP3')}
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ 
                  backgroundColor: activeTestimonial === 0 ? '#3498db' : 
                                  activeTestimonial === 1 ? '#2ecc71' : '#e74c3c' 
                }}>
                  {activeTestimonial === 0 && 'JD'}
                  {activeTestimonial === 1 && 'SL'}
                  {activeTestimonial === 2 && 'MC'}
                </div>
                <div className="testimonial-info">
                  <span className="testimonial-name">
                    {activeTestimonial === 0 && t('testimonialsPer1')}
                    {activeTestimonial === 1 && t('testimonialsPer2')}
                    {activeTestimonial === 2 && t('testimonialsPer3')}
                  </span>
                  <div className="testimonial-stars">
                    ★★★★★
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="testimonial-dots">
            {[0, 1, 2].map(index => (
              <motion.button
                key={index}
                className={`testimonial-dot ${activeTestimonial === index ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        
        <motion.p 
          className="testimonial-disclaimer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {t('tDisclaimer')}
        </motion.p>
      </div>

      <motion.div 
        className="banner-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="banner-wave"
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9f9f9" fillOpacity="1" d="M0,192L80,181.3C160,171,320,149,480,154.7C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </motion.div>
        
        <div className="banner-content">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('bannerHeader')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('bannerP')}
          </motion.p>
          
          <motion.a 
            href="/signin" 
            className="banner-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCheckCircle className="cta-icon" />
            <span>{t('bannerLink')}</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;