import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';

import './Footer.css';

function Footer({ onSettingsClick }) {
  const [showPopup, setShowPopup] = useState(false);

  const { t } = useLanguage();

  const handleSocialClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <footer className="app-footer">
      <div className="footer-left">
        <p>{t('copyright')}</p>
      </div>
      <div className="footer-content">
        <div className="links-container">
          <Link to="/accessibility" className="footer-link">
            {t('accessibility')}
          </Link>
          <Link to="/terms" className="footer-link">
            {t('tou')}
          </Link>
          <Link to="/privacy" className="footer-link">
            {t('privacy')}
          </Link>
          <Link to="/privacynotice" className="footer-link">
            {t('apn')}
          </Link>
          <button
            className="footer-link"
            onClick={() => {
              onSettingsClick();
            }}
          >
            {t('settings')}
          </button>
        </div>
      </div>
      <div className="footer-socials">
        <div className="social-icons">
          <a
            href="instagram.com"
            className="social-link"
            aria-label="Instagram"
            onClick={handleSocialClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="facebook.com"
            className="social-link"
            aria-label="Facebook"
            onClick={handleSocialClick}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675,0H1.325C0.593,0,0,0.594,0,1.325v21.351C0,23.406,0.593,24,1.325,24H12.82V14.708H9.692V11.08h3.128V8.414 c0-2.771,1.692-4.28,4.163-4.28c1.183,0,2.197,0.088,2.491,0.128v2.89h-1.709c-1.34,0-1.6,0.637-1.6,1.569V11.08h3.2l-0.538,3.628 h-2.662V24h5.235C23.407,24,24,23.406,24,22.676V1.325C24,0.594,23.407,0,22.675,0z" />
            </svg>
          </a>
        </div>
      </div>
      {showPopup && <div className="social-popup">{t('comingSoon')}</div>}
    </footer>
  );
}

export default Footer;
