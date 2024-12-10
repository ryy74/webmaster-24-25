import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

import deliveryImg from '../../assets/deliveryImg.png';
import farmingImg from '../../assets/farmingImg.jpg';
import mealImg from '../../assets/mealImg.jpg';
import processingImg from '../../assets/processingImg.jpg';

import './Process.css';

const Process = () => {
  const processes = [
    {
      id: 'farming',
      title: 'Ethical Farming Practices',
      description:
        'Our network of local farmers employs sustainable, eco-friendly practices that minimize environmental impact while maximizing nutrition and flavor. We carefully select each partner based on their commitment to organic farming methods and soil health.',
      image: farmingImg,
    },
    {
      id: 'processing',
      title: 'Quick and Clean Processing',
      description:
        'Within hours of harvest, our ingredients are carefully processed in our state-of-the-art facilities. This rapid timeline ensures maximum nutrient retention and the freshest possible flavors in every meal we prepare.',
      image: processingImg,
    },
    {
      id: 'delivery',
      title: 'Eco-Friendly Packaging & Delivery',
      description:
        "We've revolutionized our delivery process with 100% compostable packaging and carbon-neutral delivery routes. Our innovative cooling technology keeps food fresh while minimizing environmental impact.",
      image: deliveryImg,
    },
    {
      id: 'meal',
      title: 'Fresh, Delicious Meals',
      description:
        "The culmination of our process results in nutritious, chef-crafted meals that don't just taste good – they're good for you and the planet. Each dish is thoughtfully created to provide a perfect balance of flavors and nutrients.",
      image: mealImg,
    },
  ];

  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('.process-step').forEach((step) => {
      observerRef.current.observe(step);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="process-container">
      <div className="hero">
        <div className="hero-content">
          <h1>From Farm to Your Table</h1>
          <p>
            Experience the journey of your food from local farms to your plate.
            We maintain the highest standards of quality and sustainability at
            every step, ensuring you get the most delicious and nutritious meals
            possible.
          </p>
        </div>
      </div>

      <div className="process-timeline">
        {processes.map((process, index) => (
          <div key={process.id} className="process-step">
            <div className="step-content">
              <div className="step-image-container">
                <img
                  src={process.image}
                  alt={process.title}
                  className="step-image"
                />
                <div className="image-overlay"></div>
              </div>

              <div className="step-text">
                <h2>{process.title}</h2>
                <p>{process.description}</p>
              </div>
            </div>

            {index < processes.length - 1 && (
              <div className="step-connector">
                <ChevronDown className="connector-icon" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="background-elements">
        <div className="bg-line"></div>
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Process;
