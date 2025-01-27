import { useLanguage } from '../../contexts/LanguageContext';

import './Policies.css';

function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="policy-container">
      <h1>{t('privacy')}</h1>
      <h3>{t('apnTitle1')}</h3>
      <p>{t('privacyContent1')}</p>
      <h3>{t('privacyTitle2')}</h3>
      <p>{t('privacyContent2')}</p>
      <h3>{t('privacyTitle3')}</h3>
      <p>{t('privacyContent3')}</p>
      <h3>{t('privacyTitle4')}</h3>
      <p>
        {t('privacyContent4_1')}
        <a href="mailto:privacy@greenbites.com"> privacy@greenbites.com</a>
        {t('privacyContent4_2')}
      </p>
    </div>
  );
}

export default PrivacyPolicy;
