import { AddressProvider } from './contexts/AddressContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SettingsProvider } from './contexts/SettingsContext';

const Providers = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SettingsProvider>
          <CartProvider>
            <AddressProvider>{children}</AddressProvider>
          </CartProvider>
        </SettingsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Providers;
