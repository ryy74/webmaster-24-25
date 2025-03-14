import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const storedAuth = localStorage.getItem('isSignedIn');

  const [isSignedIn, setIsSignedIn] = useState(storedAuth === 'true');

  useEffect(() => {
    localStorage.setItem('isSignedIn', isSignedIn);
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
