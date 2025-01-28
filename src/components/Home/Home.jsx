import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useLanguage } from '../../contexts/LanguageContext';

import farm from '../../assets/farm.jpg';
import homeBg from '../../assets/home-bg.jpg';
import produce from '../../assets/produce.jpg';
import sustainabilityBg from '../../assets/sustainability-bg.jpg';
import vegan from '../../assets/vegan.jpg';

import useMenuItems from '../../consts/previewItems';

import './Home.css';

function AnimatedTitle({ text }) {
  const words = useMemo(() => 
    text.split(' ').map(word => ({
      word,
      characters: Array.from(word)
    })), 
    [text]
  );
  
  return (
    <h1 className="hero__title">
      {words.map((wordObj, wordIndex) => (
        <span
          key={wordIndex}
          className="hero__title-word"
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            marginRight: '0.3em',
          }}
        >
          {wordObj.characters.map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="hero__title-char"
              style={{ display: 'inline-block' }}
              initial={{ 
                opacity: 0,
                scale: 3,
                filter: "blur(10px)",
                z: 100
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                z: 0
              }}
              transition={{
                duration: 0.8,
                delay: (wordIndex * wordObj.characters.length + charIndex) * 0.04,
                type: "spring",
                damping: 12,
                stiffness: 75
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Home() {
  const { t } = useLanguage();

  const menuItems = useMenuItems();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay" />
        <img
          src={homeBg}
          alt="Green Bites Background"
          className="hero-background"
        />
        <div className="hero-content">
          <AnimatedTitle text={t('title')} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: "easeOut"
            }}
          >
            {t('subTitle')}
          </motion.p>
          
          <motion.a
            href="/menu"
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#698451"
            }}
          >
            {t('menuCTA')}
          </motion.a>
        </div>
      </div>

      <div className="about-section">
        <div className="about-image-grid">
          <img src={farm} alt="Farm" className="about-image" />
          <img src={produce} alt="Fresh Salad" className="about-image" />
          <img src={vegan} alt="Vegan Burger" className="about-image" />
        </div>
        <div className="about-content">
          <h2>{t('aboutHeader')}</h2>
          <p>
            {t('aboutDesc')}
          </p>
          <p>
            {t('aboutDesc2')}
          </p>
        </div>
      </div>

      <div
        className="sustainability-section"
        style={{ backgroundImage: `url(${sustainabilityBg})` }}
      >
        <div className="sustainability-content">
          <h2>{t('sustainabilityHeader')}</h2>
          <p>
            {t('sustainabilityDesc')}
          </p>
        </div>
      </div>

      <div className="featured-section">
        <h2 className="section-heading">{t('featuredHeader')}</h2>
        <div className="preview-items">
          {menuItems.map((item) => (
            <div key={item.id} className="preview-item">
              <div className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="preview-item-image"
                />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <motion.button
          className="menu-redirect"
          whileHover="hover"
          initial="initial"
        >
          <span className="menu-redirect-text">{t('menu')}</span>
          <motion.span
            className="menu-redirect-arrow"
            variants={{
              initial: { x: 0 },
              hover: { x: 5 },
            }}
          >
            <ArrowRight size={20} />
          </motion.span>
        </motion.button>
      </div>

      <div className="testimonials-section">
        <h2>{t('testimonialsHeader')}</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>
              {t('testimonialsP1')}
            </p>
            <span>{t('testimonialsPer1')}</span>
          </div>
          <div className="testimonial">
            <p>
              {t('testimonialsP2')}
            </p>
            <span>{t('testimonialsPer2')}</span>
          </div>
          <div className="testimonial">
            <p>
              {t('testimonialsP3')}
            </p>
            <span>{t('testimonialsPer3')}</span>
          </div>
        </div>
        <p className="testimonial-disclaimer">
          {t('tDisclaimer')}
        </p>
      </div>

      <div className="banner-section">
        <h2>{t('bannerHeader')}</h2>
        <p>
          {t('bannerP')}
        </p>
        <a href="/signin" className="banner-cta">
          {t('bannerLink')}
        </a>
      </div>
    </div>
  );
}

export default Home;
