import { useState } from 'react';
import './LoginForm.scss';

const LoginForm = ({ onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setError('Please fill in all fields');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ firstName, lastName }));
    setError('');

    onLogin();
  };

  return (
    <div className="login-page">
      <div className="welcome-text">
        <h1>InvestCafe-yə xoş gəlmisiniz.</h1>
        <p>Davam etmək üçün, lütfən, aşağıdaki məlumatları doldurun.</p>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="first-name" className="form-label">
              First Name
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
              Last Name
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
