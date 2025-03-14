import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

import Apply from './components/Apply/Apply';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Confirmation from './components/Confirmation/Confirmation';
import Menu from './components/Menu/Menu';
import Process from './components/Process/Process';
import SignIn from './components/SignIn/SignIn';
import Values from './components/Values/Values';

import AccessibilityStatement from './components/Policies/AccessibilityStatement';
import ApplicantPrivacyNotice from './components/Policies/ApplicantPrivacyNotice';
import PrivacyPolicy from './components/Policies/PrivacyPolicy';
import TermsOfUse from './components/Policies/TermsOfUse';
import References from './components/References/References';
import Settings from './components/Settings/Settings';

import { useSettings } from './contexts/SettingsContext';

import './App.css';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { settings } = useSettings();

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  useEffect(() => {
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      console.log('Added dark-mode:', document.documentElement.className);
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [settings.isDarkMode]);

  return (
    <Router>
      <Header onSettingsClick={openSettings} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/values" element={<Values />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/process" element={<Process />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />

          <Route path="/apply" element={<Apply />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="/privacynotice" element={<ApplicantPrivacyNotice />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </div>
      <Footer onSettingsClick={openSettings} />
      {isSettingsOpen && <Settings onClose={closeSettings} />}
    </Router>
  );
}

export default App;
