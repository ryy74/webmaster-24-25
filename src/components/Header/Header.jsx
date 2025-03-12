import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import settings from '../../assets/settings.svg';

import './Header.css';

function Header({ onSettingsClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 878);

  const { isSignedIn } = useAuth();
  const { cartCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      const currentlyDesktop = window.innerWidth > 878;
      if (currentlyDesktop && !isDesktop) {
        setIsMenuOpen(false);
      }
      setIsDesktop(currentlyDesktop);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

  const closeDropdown = () => {
    setIsMenuOpen(false);
  };

  const renderLinks = () => {
    return (
      <>
        <Link to="/menu" className="header-link" onClick={closeDropdown}>
          {t('menu')}
        </Link>
        <Link to="/values" className="header-link" onClick={closeDropdown}>
          {t('values')}
        </Link>
        <Link to="/process" className="header-link" onClick={closeDropdown}>
          {t('process')}
        </Link>
        {isSignedIn && (
          <>
            <Link
              to="/cart"
              className="header-link cart-link"
              onClick={closeDropdown}
            >
              {t('cart')} ({cartCount})
            </Link>
            <Link to="/" className="header-link" onClick={closeDropdown}>
              {t('signOut')}
            </Link>
          </>
        )}
        {!isSignedIn && (
          <Link to="/signin" className="header-link" onClick={closeDropdown}>
            {t('signIn')}
          </Link>
        )}
        {isDesktop ? (
          <button
            className="settings-link"
            onClick={() => {
              closeDropdown();
              onSettingsClick();
            }}
          >
            <img src={settings} className="settings-icon" alt="Settings" />
          </button>
        ) : (
          <button
            className="header-link"
            onClick={() => {
              closeDropdown();
              onSettingsClick();
            }}
          >
            {t('settings')}
          </button>
        )}
      </>
    );
  };

  return (
    <header className="app-header">
      <div className="left-header">
        <Link to="/" className="header-title" onClick={closeDropdown}>
          Green Bites
        </Link>
      </div>
      <div className="right-header">
        {isDesktop ? (
          <nav className="nav-links">{renderLinks()}</nav>
        ) : (
          <>
            <div
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="bar bar1" />
              <span className="bar bar2" />
              <span className="bar bar3" />
            </div>
            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              {renderLinks()}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
