import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiLock, FiUser, FiMail, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './SignIn.css';

const BASE_URL = 'https://webmaster-backend-production.up.railway.app';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { isSignedIn, setIsSignedIn, setUser } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(`login failed ${res.status}`);
        const userData = await res.json();
        setUser(userData);
        setIsSignedIn(true);
    } catch (err) {
      setError(t('wrong'));
      console.error(err);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          password, 
          email: email || `${username}@example.com` 
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.detail || `Signup failed ${res.status}`);
        return;
      }
      await handleLogin({ preventDefault: () => {} });
    } catch (err) {
      setError(t('signupError'));
      console.error(err);
    }
  }

  function navigateHome() {
    navigate('/');
  }

  function navigateMenu() {
    navigate('/menu');
  }

  function toggleMode() {
    setIsSignUpMode(!isSignUpMode);
    setError('');
    setUsername('');
    setPassword('');
    setEmail('');
  }

  if (isSignedIn) {
    return (
      <motion.div className="signin-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.div className="signedin-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <motion.div className="success-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}>
            <FiCheckCircle />
          </motion.div>

          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            {t('welcome')}
          </motion.h1>

          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            {t('success')}
          </motion.p>

          <motion.div className="s-nav-buttons" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <motion.button className="s-nav-button home-button" onClick={navigateHome} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {t('home')}
            </motion.button>
            <motion.button className="s-nav-button menu-button" onClick={navigateMenu} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {t('menu')}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="signin-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div className={`signin-container ${isSignUpMode ? 'signup-mode' : ''}`} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
        <motion.div className="signin-left" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            {isSignUpMode ? t('signUp') : t('signIn')}
          </motion.h1>

          <motion.p className="auth-subtitle" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
            {isSignUpMode ? t('signUpPrompt') : t('loginPrompt')}
          </motion.p>

          <AnimatePresence>
            {error && (
              <motion.div className="error-message" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form className="signin-form" onSubmit={isSignUpMode ? handleSignup : handleLogin} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <motion.div className="input-group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <label htmlFor="username">{t('username')}</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input 
                  id="username" 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder={t('usernameF')} 
                  ref={inputRef} 
                  required 
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {isSignUpMode && (
                <motion.div 
                  className="input-group" 
                  initial={{ height: 0, opacity: 0, y: -20 }} 
                  animate={{ height: 'auto', opacity: 1, y: 0 }} 
                  exit={{ height: 0, opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <FiMail className="input-icon" />
                    <input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="your.email@example.com" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="input-group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <label htmlFor="password">{t('pw')}</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder={t('passwordF')} 
                  required 
                />
                <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? t('hide') : t('show')}
                </div>
              </div>
            </motion.div>

            <motion.div className="s-button-group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <motion.button 
                type="submit" 
                className={`auth-button primary ${isSignUpMode ? 'signup' : 'signin'}`}
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
              >
                {isSignUpMode ? (
                  <>
                    <FiUserPlus className="auth-icon" />
                    {t('signUp')}
                  </>
                ) : (
                  <>
                    <FiArrowRight className="auth-icon" />
                    {t('signIn')}
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.div className="auth-switch" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              <span className="switch-text">
                {isSignUpMode ? t('alreadyAccount') : t('noAccount')}
              </span>
              <button type="button" className="switch-button" onClick={toggleMode}>
                {isSignUpMode ? t('signIn') : t('signUp')}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        <motion.div className="signin-right" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            {isSignUpMode ? 'Join Our Community' : t('whySI')}
          </motion.h2>

          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            {isSignUpMode 
              ? t('createReason')
              : t('whySIHelp')
            }
          </motion.p>

          <AnimatePresence mode="wait">
            {!isSignUpMode && (
              <motion.div 
                className="credentials-card" 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3>{t('demoCred')}</h3>
                <div className="credential-item">
                  <span className="credential-label">{t('usernameF')}</span>
                  <span className="credential-value">tsajudges2024</span>
                </div>
                <div className="credential-item">
                  <span className="credential-label">{t('passwordF')}</span>
                  <span className="credential-value">webmaster2425!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isSignUpMode && (
            <motion.div 
              className="signup-benefits"
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.6 }}
            >
              <div className="benefit-item">
                <FiCheckCircle className="benefit-icon" />
                <span>{t('cReason1')}</span>
              </div>
              <div className="benefit-item">
                <FiCheckCircle className="benefit-icon" />
                <span>{t('cReason2')}</span>
              </div>
              <div className="benefit-item">
                <FiCheckCircle className="benefit-icon" />
                <span>{t('cReason3')}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SignInPage;