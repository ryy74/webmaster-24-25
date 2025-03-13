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
      price: 9.99,
      description: t('menuDesc1'),
      image: tacos,
    },
    {
      id: 5,
      name: t('menuItem5'),
      price: 12.99,
      description: t('menuDesc5'),
      image: pizza,
    },
    {
      id: 10,
      name: t('menuItem10'),
      price: 8.99,
      description: t('menuDesc10'),
      image: kabob,
    },
    {
      id: 16,
      name: t('menuItem16'),
      price: 10.99,
      description: t('menuDesc16'),
      image: masala,
    },
  ];

  return menuItems;
};

export default useMenuItems;
