import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const savedSettings = localStorage.getItem('settings');
  const initialSettings = savedSettings ? JSON.parse(savedSettings) : { isDarkMode: false };

  const [settings, setSettings] = useState(initialSettings);

  const toggleDarkMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isDarkMode: !prevSettings.isDarkMode,
    }));
  };

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
