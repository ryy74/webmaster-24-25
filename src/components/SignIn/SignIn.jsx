import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import './SignIn.css';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { isSignedIn, setIsSignedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'tsajudges2024' && password === 'webmaster2425!') {
      setIsSignedIn(true);
      setError('');
    } else {
      setError('Wrong password.');
      setIsSignedIn(false);
    }
  };

  if (isSignedIn) {
    return (
      <div className="signin-page">
        <div className="signedin-container">
          <h1>Welcome!</h1>
          <p>You are now signed in.</p>
          <p>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/menu" className="nav-link">
              Menu
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
          <h1>Sign In</h1>
          {error && <div className="error-message">{error}</div>}
          <form className="signin-form" onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </label>

            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="signin-right">
          <h2>Why Sign In?</h2>
          <p>
            Sign in to order items, view pricing, add products to your cart,
            manage your rewards points, and more. By signing in, you’ll have
            access to all the features and benefits our platform provides for a
            personalized shopping experience.
          </p>
          <p className="credentials">
            <strong>Username:</strong> tsajudges2024
            <br />
            <strong>Password:</strong> webmaster2425!
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
