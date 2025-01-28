import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

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
import Settings from './components/Settings/Settings';

import Providers from './Providers';

import './App.css';

const App = () => {
  return (
    <Providers>
      <Router>
        <Header />
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

            <Route path="/accessibility" element={<AccessibilityStatement />} />
            <Route path="/privacynotice" element={<ApplicantPrivacyNotice />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Providers>
  );
};

export default App;
