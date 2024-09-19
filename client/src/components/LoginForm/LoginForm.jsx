import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LoginForm.scss';

const LoginForm = ({ onLogin }) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const validateName = (name) => {
    const hasDigits = /\d/.test(name);
    const hasMinimumLetters = name.replace(/[^a-zA-Z]/g, '').length >= 3;

    if (hasDigits) {
      return t('loginPage.hasDigits');
    }

    if (!hasMinimumLetters) {
      return t('loginPage.minLetters');
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstNameError = validateName(firstName);
    const lastNameError = validateName(lastName);

    if (firstNameError || lastNameError) {
      setError(firstNameError || lastNameError);
      return;
    }

    localStorage.setItem('user', JSON.stringify({ firstName, lastName }));
    setError('');

    onLogin();
  };

  return (
    <div className="login-page">
      <div className="welcome-text">
        <h1>{t('loginPage.welcome')}</h1>
        <p>{t('loginPage.message')}</p>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="first-name" className="form-label">
              {t('loginPage.firstName')}
            </label>
            <input
              type="text"
              id="first-name"
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name" className="form-label">
              {t('loginPage.lastName')}
            </label>
            <input
              type="text"
              id="last-name"
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <button type="submit" className="submit-button">
            {t('loginPage.enter')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
