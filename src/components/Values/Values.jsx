import { useEffect, useState } from 'react';

import { useLanguage } from '../../contexts/LanguageContext';

import community from '../../assets/Community.jpg';
import innovation from '../../assets/innovation.jpg';
import sustainability from '../../assets/Sustainability.jpg';

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
      image: sustainability,
    },
    {
      id: 2,
      title: t('valueT2'),
      subtitle: t('valueS2'),
      description: t('valueC2'),
      stats: [t('valueSt2_1'), t('valueSt2_2'), t('valueSt2_3')],
      image: community,
    },
    {
      id: 3,
      title: t('valueT3'),
      subtitle: t('valueS3'),
      description: t('valueC3'),
      stats: [t('valueSt3_1'), t('valueSt3_2'), t('valueSt3_3')],
      image: innovation,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="values-container">
      <div className="content-wrapper">
        <div className="values-header">
          <h1 className="main-heading">{t('valueHeader')}</h1>
          <p className="header-description">{t('valueSub')}</p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div
              key={value.id}
              className={`value-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
              style={{
                transform: `translateY(${Math.max(0, (scrollPosition - 400 * index) * 0.1)}px)`,
                opacity: Math.min(
                  1,
                  Math.max(0.2, 1 - (scrollPosition - 400 * index) * 0.001),
                ),
              }}
            >
              <div className="image-container">
                <div className="image-glow"></div>
                <img
                  src={value.image}
                  alt={value.title}
                  className="value-image"
                />
              </div>

              <div className="card-content">
                <div className="title-group">
                  <h3 className="value-subtitle">{value.subtitle}</h3>
                  <h2 className="value-title">{value.title}</h2>
                </div>

                <p className="value-description">{value.description}</p>

                <div className="stats-grid">
                  {value.stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                      <p className="stat-text">{stat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="corner-decoration"></div>
    </div>
  );
};

export default Values;
