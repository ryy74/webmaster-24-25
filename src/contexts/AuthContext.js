import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isSignedIn: false,
  user: null,
  setIsSignedIn: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem('auth');
  const initial = stored ? JSON.parse(stored) : { isSignedIn: false, user: null };

  const [isSignedIn, setIsSignedIn] = useState(initial.isSignedIn);
  const [user, setUser] = useState(initial.user);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify({ isSignedIn, user }));
  }, [isSignedIn, user]);

  return (
    <AuthContext.Provider value={{ isSignedIn, user, setIsSignedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);