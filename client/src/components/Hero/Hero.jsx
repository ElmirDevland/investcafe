import './Hero.scss';
import { useTranslation } from 'react-i18next';

const Greeting = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </div>
    </section>
  );
};

export default Greeting;
