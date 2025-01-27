import { useLanguage } from '../../contexts/LanguageContext';

import './Policies.css';

function TermsOfUse() {
  const { t } = useLanguage();

  return (
    <div className="policy-container">
      <h1>{t('tou')}</h1>
      <h3>{t('touTitle1')}</h3>
      <p>{t('touContent1')}</p>
      <h3>{t('touTitle2')}</h3>
      <p>{t('touContent2')}</p>
      <h3>{t('touTitle3')}</h3>
      <p>{t('touContent3')}</p>
      <h3>{t('touTitle4')}</h3>
      <p>{t('touContent4')}</p>
    </div>
  );
}

export default TermsOfUse;
