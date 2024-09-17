import './AboutUs.scss';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>{t('about.title')}</h2>
        <p>{t('about.info')}</p>
      </div>
    </section>
  );
};

export default AboutUs;
