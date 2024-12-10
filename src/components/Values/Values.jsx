import { useEffect, useState } from 'react';

import community from '../../assets/Community.jpg';
import innovation from '../../assets/innovation.jpg';
import sustainability from '../../assets/Sustainability.jpg';

import './Values.css';

const Values = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const values = [
    {
      id: 1,
      title: 'Sustainability',
      subtitle: 'Nurturing Our Planet',
      description:
        'Our commitment to sustainability drives us to minimize our environmental impact in every aspect of what we do. We carefully source local, organic ingredients to support sustainable agriculture and reduce our carbon footprint while ensuring the highest quality for our customers.',
      stats: ['45% Carbon Reduction', '100% Eco Packaging', '0 Food Waste'],
      image: sustainability,
    },
    {
      id: 2,
      title: 'Community',
      subtitle: 'Growing Together',
      description:
        'At the heart of everything we do lies a commitment to building lasting connections. We take pride in supporting local farmers, partnering with them to bring fresh, high-quality products to our community.',
      stats: ['50+ Local Partners', '10K+ Members', '25 Community Events'],
      image: community,
    },
    {
      id: 3,
      title: 'Innovation',
      subtitle: 'Shaping Tomorrow',
      description:
        'Innovation drives everything we do as we constantly push boundaries to craft delicious, plant-based dishes that nourish both people and the planet. Our passion lies in blending creativity with sustainability.',
      stats: ['10+ Recipes Monthly', '3 R&D Labs', '24/7 Innovation'],
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
          <h1 className="main-heading">Our Core Values</h1>
          <p className="header-description">
            At Green Bites, our values guide every decision we make. We are
            dedicated to creating a better world for future generations through
            sustainable practices, community engagement, and constant
            innovation.
          </p>
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
