import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LoginForm.scss';

const LoginForm = ({ onLogin }) => {
  const { t } = useTranslation();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://investcafe-backend.vercel.app/login',
        {
          login,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify({ login }));
        onLogin();
      }
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-text">
        <h1>{t('loginPage.welcome')}</h1>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <input
              type="text"
              id="first-name"
              className="form-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Login"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="last-name"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            disabled={!login || !password || loading}
            className="submit-button"
            type="submit"
          >
            {loading ? 'Loading...' : t('loginPage.enter')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
