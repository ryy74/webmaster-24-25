import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
