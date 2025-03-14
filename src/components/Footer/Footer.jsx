import { Link } from 'react-router-dom';
import { FiFileText } from 'react-icons/fi';
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
          <Link to="/apply" className="footer-link">
            {t('apply')}
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
      <div className="footer-right">
        <Link to="/references" className="references-link">
          <FiFileText className="references-icon" />
          <span>References</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;