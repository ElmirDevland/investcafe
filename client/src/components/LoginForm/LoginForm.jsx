import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LoginForm.scss';
import Users from '../../../users.json';

const LoginForm = ({ onLogin }) => {
  const { t } = useTranslation();

  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const user = Users.find(
    (user) => user.username === login && user.password === password
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      setError('');
      localStorage.setItem('user', JSON.stringify({ login }));
      onLogin();
    }
    if (!user) {
      setError('Invalid username or password');
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
            disabled={!login || !password}
            type="submit"
            className="submit-button"
          >
            {t('loginPage.enter')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
