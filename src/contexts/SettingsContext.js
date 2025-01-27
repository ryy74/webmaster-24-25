import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
  });

  const toggleDarkMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      darkMode: !prevSettings.darkMode,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
