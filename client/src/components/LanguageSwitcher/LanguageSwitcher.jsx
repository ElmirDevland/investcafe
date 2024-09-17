import './LanguageSwitcher.scss';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'az', label: 'AZ' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const filteredLanguages = languages.filter(
    (lang) => lang.code !== currentLanguage
  );

  return (
    <div className="language-selector">
      <button className="language-button">
        {currentLanguage.toUpperCase()}
      </button>
      <div className="language-dropdown">
        {filteredLanguages.map((lang) => (
          <button key={lang.code} onClick={() => changeLanguage(lang.code)}>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
