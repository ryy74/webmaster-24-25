import React from 'react';
import sustainability from '../../assets/Sustainability.jpg';
import community from '../../assets/Community.jpg';
import innovation from '../../assets/innovation.jpg';
import './Values.css';
const Values = () => {
  const values = [
    {
      id: 1,
      title: 'Sustainability',
      description:
        'Our commitment to sustainability drives us to minimize our environmental impact in every aspect of what we do. We carefully source local, organic ingredients to support sustainable agriculture and reduce our carbon footprint while ensuring the highest quality for our customers. In addition, we prioritize the use of eco-friendly packaging, striving to eliminate waste and protect our planet for future generations. By combining these efforts, we aim to create a business that not only delivers exceptional products but also champions environmental responsibility, paving the way for a healthier, greener future.',
      image: sustainability,
    },
    {
      id: 2,
      title: 'Community',
      description:
        'At the heart of everything we do lies a commitment to building lasting connections. We take pride in supporting local farmers, partnering with them to bring fresh, high-quality products to our community. Beyond that, we strive to foster meaningful, long-term relationships with our customers, creating a sense of trust, loyalty, and shared purpose. By bridging the gap between the fields and the families we serve, we aim to strengthen not just our food systems but also the bonds that unite us as a community, ensuring that every interaction reflects our dedication to care, quality, and connection.',
      image: community,
    },
    {
      id: 3,
      title: 'Innovation',
      description:
        'Innovation drives everything we do as we constantly push boundaries to craft delicious, plant-based dishes that nourish both people and the planet. Our passion lies in blending creativity with sustainability, ensuring that every meal we create is not only bursting with flavor but also thoughtfully designed to promote health and well-being. By prioritizing environmentally friendly practices and wholesome ingredients, we aim to make a positive impact—one dish at a time—on both the lives of our customers and the future of our planet. Through continuous improvement and dedication, we aspire to set new standards for healthy, sustainable dining experiences.',
      image: innovation,
    },
  ];

  return (
    <div className="values-container">
      <h1 className="values-heading">Our Core Values</h1>
      <p className="values-intro">
        At Green Bites, our values guide every decision we make. We are dedicated to creating a better world for future generations.
      </p>
      <div className="values-grid">
        {values.map((value) => (
          <div key={value.id} className="value-card">
            <img src={value.image} alt={value.title} className="value-image" />
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
