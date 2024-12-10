import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

import Menu from './components/Menu/Menu';
import Process from './components/Process/Process';
import Values from './components/Values/Values';
import SignIn from './components/SignIn/SignIn';
import Cart from './components/Cart/Cart';

import AccessibilityStatement from './components/Policies/AccessibilityStatement';
import ApplicantPrivacyNotice from './components/Policies/ApplicantPrivacyNotice';
import CookiePolicy from './components/Policies/CookiePolicy';
import PrivacyPolicy from './components/Policies/PrivacyPolicy';
import TermsOfUse from './components/Policies/TermsOfUse';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/values" element={<Values />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/process" element={<Process />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/accessibility" element={<AccessibilityStatement />} />
            <Route path="/privacynotice" element={<ApplicantPrivacyNotice />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
