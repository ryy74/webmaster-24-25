import { useLanguage } from '../contexts/LanguageContext';

import kabob from '../assets/Vegan-kabob.jpg';
import masala from '../assets/Vegan-masala.jpg';
import pizza from '../assets/Vegan-pizza.jpg';
import tacos from '../assets/vegan-tacos.jpg';

const useMenuItems = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      name: t('menuItem1'),
      description: t('menuDesc1'),
      image: tacos,
    },
    {
      id: 5,
      name: t('menuItem5'),
      description: t('menuDesc5'),
      image: pizza,
    },
    {
      id: 10,
      name: t('menuItem10'),
      description: t('menuDesc10'),
      image: kabob,
    },
    {
      id: 16,
      name: t('menuItem16'),
      description: t('menuDesc16'),
      image: masala,
    },
  ];

  return menuItems;
};

export default useMenuItems;
