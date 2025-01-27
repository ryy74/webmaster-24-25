import { useEffect } from 'react';

import { useLanguage } from '../../contexts/LanguageContext';

import './DetailPopup.css';

function DetailPopup({ menuItem, onClose }) {
  const { t } = useLanguage();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const scrollY = window.scrollY;

    const bodyContent = document.createElement('div');
    bodyContent.style.position = 'fixed';
    bodyContent.style.width = '100%';
    bodyContent.style.top = `-${scrollY}px`;

    document.body.insertBefore(bodyContent, document.body.firstChild);
    while (document.body.childNodes.length > 1) {
      bodyContent.appendChild(document.body.childNodes[1]);
    }

    document.body.style.overflow = 'hidden';

    return () => {
      while (bodyContent.childNodes.length) {
        document.body.insertBefore(bodyContent.childNodes[0], bodyContent);
      }
      document.body.removeChild(bodyContent);
      document.body.style.overflow = 'unset';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="popup-backdrop" onClick={handleBackdropClick}>
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>

        <div className="popup-grid">
          <div className="popup-left-column">
            <div className="popup-image-container">
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="popup-image"
              />
            </div>

            {menuItem.nutritionalInfo && (
              <div className="popup-section">
                <h3>{t('nutritionInfo')}</h3>
                <p>{menuItem.nutritionalInfo}</p>
              </div>
            )}

            {menuItem.allergens && menuItem.allergens.length > 0 && (
              <div className="popup-section">
                <h3>{t('allergens')}</h3>
                <p>{menuItem.allergens.join(', ')}</p>
              </div>
            )}
          </div>

          <div className="popup-details">
            <h2>{menuItem.name}</h2>

            <div className="popup-section">
              <h3>{t('desc')}</h3>
              <p>{menuItem.longDescription}</p>
            </div>

            <div className="popup-section">
              <h3>{t('ingredients')}</h3>
              <ul className="ingredients-list">
                {menuItem.ingredients &&
                  menuItem.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;
