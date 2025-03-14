import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

import './Values.css';

const Values = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { t } = useLanguage();

  const values = [
    {
      id: 1,
      title: t('valueT1'),
      subtitle: t('valueS1'),
      description: t('valueC1'),
      stats: [t('valueSt1_1'), t('valueSt1_2'), t('valueSt1_3')],
      image: '/assets/values-1.jpg',
    },
    {
      id: 2,
      title: t('valueT2'),
      subtitle: t('valueS2'),
      description: t('valueC2'),
      stats: [t('valueSt2_1'), t('valueSt2_2'), t('valueSt2_3')],
      image: '/assets/values-2.jpg',
    },
    {
      id: 3,
      title: t('valueT3'),
      subtitle: t('valueS3'),
      description: t('valueC3'),
      stats: [t('valueSt3_1'), t('valueSt3_2'), t('valueSt3_3')],
      image: '/assets/values-3.jpg',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="values-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="content-wrapper">
        <motion.div className="values-header" variants={itemVariants}>
          <h1 className="main-heading">{t('valueHeader')}</h1>
          <p className="header-description">{t('valueSub')}</p>
        </motion.div>

        <div className="values-grid">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className={`value-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              style={{
                opacity: Math.min(
                  1,
                  Math.max(0.3, 1 - (scrollPosition - 400 * index) * 0.001),
                ),
              }}
            >
              <motion.div
                className="v-image-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="image-glow"></div>
                <img
                  src={value.image}
                  alt={value.title}
                  className="value-image"
                />
              </motion.div>

              <div className="card-content">
                <motion.div
                  className="title-group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="value-subtitle">{value.subtitle}</h3>
                  <h2 className="value-title">{value.title}</h2>
                </motion.div>

                <motion.p
                  className="value-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {value.description}
                </motion.p>

                <motion.div
                  className="stats-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {value.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="stat-card"
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <p className="stat-text">{stat}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="corner-decoration" />
    </motion.div>
  );
};

export default Values;
