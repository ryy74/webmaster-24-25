import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiGlobe, FiMoon, FiSun } from 'react-icons/fi';

import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';

import './Settings.css';

function Settings({ onClose }) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const { t, language, setLanguage } = useLanguage();
  const { settings, toggleDarkMode } = useSettings();
  const isDarkMode = settings.isDarkMode;

  const languageDropdownRef = useRef(null);
  const popupRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ch', name: '中文（简体）' },
    { code: 'tw', name: '中文（繁體）' },
    { code: 'jp', name: '日本語' },
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleLanguageClickOutside = (e) => {
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(e.target)
    ) {
      setShowLanguageDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleLanguageClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleLanguageClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsidePopup = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutsidePopup);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePopup);
    };
  }, [onClose]);

  const getCurrentLanguageName = () => {
    const lang = languages.find((l) => l.code === language);
    return lang ? lang.name : 'English';
  };

  useEffect(() => {
    console.log(isDarkMode);
  }, [isDarkMode]);

  return (
    <motion.div className="settings-overlay">
      <motion.div
        className="settings-popup"
        ref={popupRef}
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        <motion.h2
          className="settings-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {t('siteSettings')}
        </motion.h2>

        <motion.div
          className="settings-row"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="setting-label">
            <span>{t('darkMode')}</span>
            <small>{isDarkMode ? t('on') : t('off')}</small>
          </div>
          <motion.button
            className={`toggle-button ${isDarkMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="toggle-icon"
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? <FiMoon /> : <FiSun />}
            </motion.div>
            <div className="toggle-slider">
              <motion.div
                className="toggle-circle"
                animate={{
                  x: isDarkMode ? '24px' : 0,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.2,
                  ease: [0.32, 0, 0.67, 1],
                }}
              />
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          className="settings-row"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          ref={languageDropdownRef}
        >
          <div className="setting-label">
            <span>{t('language')}</span>
            <small>{getCurrentLanguageName()}</small>
          </div>
          <motion.div className="language-dropdown-container">
            <motion.button
              className="language-dropdown-button"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGlobe />
              <span>{getCurrentLanguageName()}</span>
              <motion.div
                animate={{ rotate: showLanguageDropdown ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div
                  className="language-dropdown"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {languages.map((lang) => (
                    <motion.div
                      key={lang.code}
                      className={`language-option ${language === lang.code ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && (
                        <motion.div
                          className="active-indicator"
                          layoutId="activeLanguageIndicator"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
