import { createContext, useContext, useState } from 'react';

const AddressContext = createContext({
  address: '',
  setAddress: () => {},
});

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState('');

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
