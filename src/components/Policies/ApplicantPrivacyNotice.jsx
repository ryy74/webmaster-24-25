import { useLanguage } from '../../contexts/LanguageContext';

import './Policies.css';

function ApplicantPrivacyNotice() {
  const { t } = useLanguage();

  return (
    <div className="policy-container">
      <h1>{t('apn')}</h1>
      <h3>{t('apnTitle1')}</h3>
      <p>{t('apnContent1')}</p>
      <h3>{t('apnTitle2')}</h3>
      <p>{t('apnContent2')}</p>
      <h3>{t('apnTitle3')}</h3>
      <p>{t('apnContent3')}</p>
      <h3>{t('apnTitle4')}</h3>
      <p>
        {t('apnContent4_1')}
        <a href="mailto:privacy@greenbites.com">privacy@greenbites.com</a>
        {t('apnContent4_2')}
      </p>
    </div>
  );
}

export default ApplicantPrivacyNotice;
