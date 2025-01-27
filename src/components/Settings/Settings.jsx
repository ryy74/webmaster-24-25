import { useState } from 'react';

import { useLanguage } from '../../contexts/LanguageContext';

import './Settings.css';

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>{t('siteSettings')}</h2>

        <div className="setting-row">
          <span>{t('darkMode')}</span>
          <button
            className={`toggle ${isDarkMode ? 'active' : ''}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className="toggle-circle" />
          </button>
        </div>

        <div className="setting-row">
          <span>{t('language')}</span>
          <select
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ch">中文（简体）</option>
            <option value="tw">中文（繁體）</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;
