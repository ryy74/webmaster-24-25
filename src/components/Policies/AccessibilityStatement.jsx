import { useLanguage } from '../../contexts/LanguageContext';

import './Policies.css';

function AccessibilityStatement() {
  const { t } = useLanguage();

  return (
    <div className="policy-container">
      <h1>{t('accessibility')}</h1>
      <h3>{t('aTitle1')}</h3>
      <p>{t('aContent1')}</p>
      <h3>{t('aTitle2')}</h3>
      <p>{t('aContent2')}</p>
      <h3>{t('aTitle3')}</h3>
      <p>
        {t('aContent3_1')}
        <a href="mailto:accessibility@greenbites.com">
          {' '}
          accessibility@greenbites.com
        </a>
        {t('aContent3_2')}
      </p>
    </div>
  );
}

export default AccessibilityStatement;
