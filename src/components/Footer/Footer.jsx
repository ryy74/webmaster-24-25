import { Link } from 'react-router-dom';

import { useLanguage } from '../../contexts/LanguageContext';

import './Footer.css';

function Footer({ onSettingsClick }) {
  const { t } = useLanguage();

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
    </footer>
  );
}

export default Footer;
