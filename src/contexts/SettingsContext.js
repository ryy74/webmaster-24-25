import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    isDarkMode: false,
  });

  const toggleDarkMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isDarkMode: !prevSettings.isDarkMode,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
