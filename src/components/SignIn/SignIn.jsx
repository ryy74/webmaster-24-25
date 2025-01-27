import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './SignIn.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isSignedIn, setIsSignedIn } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'tsajudges2024' && password === 'webmaster2425!') {
      setIsSignedIn(true);
      setError('');
    } else {
      setError(t('wrong'));
      setIsSignedIn(false);
    }
  };

  if (isSignedIn) {
    return (
      <div className="signin-page">
        <div className="signedin-container">
          <h1>{t('welcome')}</h1>
          <p>{t('success')}</p>
          <p>
            <Link to="/" className="nav-link">
              {t('home')}
            </Link>
            <Link to="/menu" className="nav-link">
              {t('menu')}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-left">
          <h1>{t('signIn')}</h1>
          {error && <div className="error-message">{error}</div>}
          <form className="signin-form" onSubmit={handleSubmit}>
            <label>
              {t('username')}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                required
              />
            </label>

            <label>
              {t('pw')}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </label>

            <button type="submit">{t('signIn')}</button>
          </form>
        </div>
        <div className="signin-right">
          <h2>{t('whySI')}</h2>
          <p>{t('whySIHelp')}</p>
          <p className="credentials">
            <strong>{t('usernameF')}</strong> tsajudges2024
            <br />
            <strong>{t('passwordF')}</strong> webmaster2425!
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
