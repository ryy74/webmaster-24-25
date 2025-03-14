import { useLanguage } from '../contexts/LanguageContext';

export const useCountries = () => {
  const { t } = useLanguage();

  return [
    t('usa'),
    t('canada'),
    t('mexico'),
    t('bahamas'),
    t('barbados'),
    t('belize'),
    t('costaRica'),
    t('cuba'),
    t('dominica'),
    t('dominicanRepublic'),
    t('elSalvador'),
    t('grenada'),
    t('haiti'),
    t('honduras'),
    t('jamaica'),
    t('nicaragua'),
    t('panama'),
    t('skan'),
    t('sl'),
    t('svadtg'),
    t('tat'),
  ];
};

export const useUSStates = () => {
  const { t } = useLanguage();

  return [
    t('alabama'),
    t('alaska'),
    t('arizona'),
    t('arkansas'),
    t('california'),
    t('colorado'),
    t('connecticut'),
    t('delaware'),
    t('dc'),
    t('florida'),
    t('georgia'),
    t('hawaii'),
    t('idaho'),
    t('illinois'),
    t('indiana'),
    t('iowa'),
    t('kansas'),
    t('kentucky'),
    t('louisiana'),
    t('maine'),
    t('maryland'),
    t('massachusetts'),
    t('michigan'),
    t('minnesota'),
    t('mississippi'),
    t('missouri'),
    t('montana'),
    t('nebraska'),
    t('nevada'),
    t('newHampshire'),
    t('newJersey'),
    t('newMexico'),
    t('newYork'),
    t('northCarolina'),
    t('northDakota'),
    t('ohio'),
    t('oklahoma'),
    t('oregon'),
    t('pennsylvania'),
    t('rhodeIsland'),
    t('southCarolina'),
    t('southDakota'),
    t('tennessee'),
    t('texas'),
    t('utah'),
    t('vermont'),
    t('virginia'),
    t('washington'),
    t('westVirginia'),
    t('wisconsin'),
    t('wyoming'),
  ];
};

export const useCanadaProvinces = () => {
  const { t } = useLanguage();

  return [
    t('ontario'),
    t('quebec'),
    t('britishColumbia'),
    t('alberta'),
    t('saskatchewan'),
    t('manitoba'),
    t('nflal'),
    t('novaScotia'),
    t('newBrunswick'),
    t('pei'),
    t('nunavut'),
    t('northwest'),
    t('yukon'),
  ];
};

export const useMexicoStates = () => {
  const { t } = useLanguage();

  return [
    t('aguascalientes'),
    t('bajaCalifornia'),
    t('bajaCaliforniaSur'),
    t('campeche'),
    t('chiapas'),
    t('chihuahua'),
    t('cdmx'),
    t('coahuila'),
    t('colima'),
    t('durango'),
    t('guanajuato'),
    t('guerrero'),
    t('hidalgo'),
    t('jalisco'),
    t('edoMexico'),
    t('michoacan'),
    t('morelos'),
    t('nayarit'),
    t('nuevoLeon'),
    t('oaxaca'),
    t('puebla'),
    t('queretaro'),
    t('quintanaRoo'),
    t('sanLuisPotosi'),
    t('sinaloa'),
    t('sonora'),
    t('tabasco'),
    t('tamaulipas'),
    t('tlaxcala'),
    t('veracruz'),
    t('yucatan'),
    t('zacatecas'),
  ];
};
