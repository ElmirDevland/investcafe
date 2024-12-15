import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.scss';

const Header = ({ username, setIsLoggedIn }) => {
  return (
    <header>
      <div className="container">
        <div className="logo">InvestCafe</div>
        <div className="header-buttons">
          <div className="welcome-message">{username.login}</div>
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
