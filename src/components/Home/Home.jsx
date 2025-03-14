import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

import useMenuItems from '../../consts/previewItems';
import { useLanguage } from '../../contexts/LanguageContext';

import './Home.css';

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredRef = useRef(null);
  const aboutRef = useRef(null);

  const menuItems = useMenuItems();
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 0,
      text: t('testimonialsP1'),
      initials: 'AJ',
      name: t('testimonialsPer1'),
      color: '#3498db',
    },
    {
      id: 1,
      text: t('testimonialsP2'),
      initials: 'MS',
      name: t('testimonialsPer2'),
      color: '#2ecc71',
    },
    {
      id: 2,
      text: t('testimonialsP3'),
      initials: 'DL',
      name: t('testimonialsPer3'),
      color: '#e74c3c',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <motion.div className="hero-section">
        <motion.img
          src="/assets/landing-1-hero.jpg"
          alt=""
          className="hero-background"
        />

        <motion.div
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div className="decorative-line left" />
        <motion.div className="decorative-line right" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t('title')}
          </motion.h1>

          <motion.div
            className="title-underline"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '80px', opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {t('subTitle')}
          </motion.p>

          <motion.div
            className="hero-cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.a
              href="/menu"
              className="hero-cta primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(52, 152, 219, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('menuCTA')}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              >
                <FiArrowRight className="cta-icon" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#about"
              className="hero-cta secondary"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                if (aboutRef.current) {
                  const yOffset = -60;
                  const y =
                    aboutRef.current.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              {t('learnMore')}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="corner-accent top-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.div
          className="corner-accent top-right"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        />
        <motion.div
          className="corner-accent bottom-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
        />
        <motion.div
          className="corner-accent bottom-right"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
        />
      </motion.div>

      <motion.section id="about" className="about-section" ref={aboutRef}>
        <div className="about-container">
          <motion.div
            className="about-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('aboutHeader')}
            </motion.h2>

            <motion.div
              className="text-highlight"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {t('aboutDesc')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {t('aboutDesc2')}
            </motion.p>

            <motion.div className="about-stats">
              {[
                { number: '100%', label: t('organic') },
                { number: '10+', label: t('years') },
                { number: '50+', label: t('dishes') },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <motion.span
                    className="stat-number"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: '100% 100%' }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-image-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-grid">
              {[
                {
                  src: '/assets/landing-2-about1.jpg',
                  alt: '',
                  span: true,
                },
                { src: '/assets/landing-3-about2.jpg', alt: '' },
                { src: '/assets/landing-4-about3.jpg', alt: '' },
              ].map((img, index) => (
                <motion.div
                  key={img.alt}
                  className={`image-wrapper ${img.span ? 'span-2' : ''}`}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <img src={img.src} alt={img.alt} className="about-image" />
                  <motion.div
                    className="image-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>{img.alt}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        className="sustainability-section"
        style={{
          backgroundImage: `url('/assets/landing-5-sustainability.jpg')`,
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
            zIndex: 0,
          }}
        />
        <motion.div
          className="sustainability-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
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
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="8"
                  />
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
                    transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="eco-stat-value">80%</div>
              </div>
              <div className="eco-stat-label">{t('wasteSaved')}</div>
            </div>

            <div className="eco-stat">
              <div className="eco-stat-ring">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="8"
                  />
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
                    transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="eco-stat-value">60%</div>
              </div>
              <div className="eco-stat-label">{t('localSourcing')}</div>
            </div>

            <div className="eco-stat">
              <div className="eco-stat-ring">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="8"
                  />
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
                    transition={{ delay: 1.4, duration: 1.5, ease: 'easeOut' }}
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
          whileInView={{ width: '120px' }}
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
                delay: 0.2 + index * 0.1,
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -10,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <motion.a
                href="/menu"
                className="image-container"
                whileHover="hover"
              >
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="preview-item-image"
                  variants={{
                    hover: { scale: 1.1, transition: { duration: 0.5 } },
                  }}
                />
                <motion.div
                  className="preview-item-overlay"
                  variants={{
                    hover: { opacity: 0.4, transition: { duration: 0.3 } },
                  }}
                  initial={{ opacity: 0 }}
                >
                  <motion.div
                    className="view-details"
                    variants={{
                      hover: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3, delay: 0.1 },
                      },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                  >
                    {t('viewDetails')}
                  </motion.div>
                </motion.div>
                <div className="preview-item-price">${item.price}</div>
              </motion.a>

              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="menu-link-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a href="/menu" className="menu-redirect" whileHover="hover">
            <motion.span
              className="menu-redirect-text"
              variants={{
                hover: {
                  backgroundPosition: '0 100%',
                  transition: { duration: 0.6 },
                },
              }}
            >
              {t('bannerLink')}
            </motion.span>
            <motion.div
              className="arrow-container"
              variants={{
                hover: {
                  x: 8,
                  transition: { type: 'spring', stiffness: 400, damping: 10 },
                },
              }}
            >
              <motion.span
                className="arrow-icon"
                initial={{ rotate: 0 }}
                variants={{
                  hover: {
                    rotate: [0, -10, 0, -10, 0],
                    transition: {
                      delay: 0.2,
                      duration: 0.6,
                      ease: 'easeInOut',
                    },
                  },
                }}
              >
                <FiArrowRight size={22} />
              </motion.span>
              <motion.span
                className="arrow-trail"
                variants={{
                  hover: {
                    width: '20px',
                    opacity: [0, 0.5, 0],
                    transition: {
                      delay: 0.2,
                      duration: 0.6,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    },
                  },
                }}
                initial={{ width: '0px', opacity: 0 }}
              />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      <section className="testimonials-section">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('testimonialsHeader')}
        </motion.h2>

        <motion.div
          className="testimonials-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="testimonial"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="testimonial-accent-line"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6 }}
              />

              <motion.div
                className="testimonial-quote"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                "
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {testimonials[activeTestimonial].text}
              </motion.p>

              <div className="testimonial-author">
                <motion.div
                  className="testimonial-avatar"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{
                    backgroundColor: testimonials[activeTestimonial].color,
                  }}
                >
                  {testimonials[activeTestimonial].initials}
                </motion.div>

                <motion.div
                  className="testimonial-info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="testimonial-name">
                    {testimonials[activeTestimonial].name}
                  </span>
                  <span className="testimonial-role">
                    {testimonials[activeTestimonial].role}
                  </span>
                  <motion.div
                    className="testimonial-stars"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    ★★★★★
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-navigation">
            <motion.button
              className="nav-button prev"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1,
                )
              }
              aria-label="Previous testimonial"
            >
              ‹
            </motion.button>
            <motion.button
              className="nav-button next"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1,
                )
              }
              aria-label="Next testimonial"
            >
              ›
            </motion.button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={index}
                className={`testimonial-dot ${activeTestimonial === index ? 'active' : ''}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          className="testimonial-disclaimer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {t('tDisclaimer')}
        </motion.p>
      </section>

      <motion.div
        className="banner-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="banner-blob" />
        <div className="banner-blob secondary" />
        <div className="banner-gradient-overlay" />

        <div className="banner-content">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('bannerHeader')}
          </motion.h2>

          <div className="banner-accent"></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('bannerP')}
          </motion.p>

          <motion.div
            className="banner-cta-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="/signin"
              className="banner-cta primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 15px 25px rgba(52, 152, 219, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiCheckCircle className="cta-icon" />
              <span>{t('bannerLink')}</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
