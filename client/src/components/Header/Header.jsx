import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.scss';
import { useTranslation } from 'react-i18next';

const Header = ({ username, setIsLoggedIn }) => {
  const { firstName } = username;
  const { t } = useTranslation();
  return (
    <header>
      <div className="container">
        <div className="logo">InvestCafe</div>
        <div className="header-buttons">
          {username && (
            <div className="welcome-message">
              {firstName == 'BAR' || !firstName.indexOf('TABLE')
                ? firstName
                : `${t('header.welcome')}, ${firstName}!`}
            </div>
          )}
          <button
            onClick={() => {
              setIsLoggedIn((prev) => !prev);
              localStorage.clear('user');
            }}
            className="logout-button"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
