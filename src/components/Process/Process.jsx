import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { useLanguage } from '../../contexts/LanguageContext';

import './Process.css';

function Process() {
  const observerRef = useRef(null);

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
      id: 'delivery',
      title: t('processT3'),
      description: t('processD3'),
      image: '/assets/deliveryImg.png',
    },
    {
      id: 'meal',
      title: t('processT4'),
      description: t('processD4'),
      image: '/assets/mealImg.jpg',
    },
  ];

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
          <h1>{t('processHTitle')}</h1>
          <p>{t('processHDesc')}</p>
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
        <div className="bg-line" />
        <div className="bg-circle circle-1" />
        <div className="bg-circle circle-2" />
        <div className="bg-circle circle-3" />
      </div>
    </div>
  );
}

export default Process;
