import { useLanguage } from '../contexts/LanguageContext';

const useMenuItems = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      name: t('menuItem1'),
      price: 7.99,
      description: t('menuDesc1'),
      image: '/assets/menu-1-vegan-tacos.jpg',
    },
    {
      id: 5,
      name: t('menuItem5'),
      price: 15.49,
      description: t('menuDesc5'),
      image: '/assets/menu-5-vegan-pizza.jpg',
    },
    {
      id: 10,
      name: t('menuItem10'),
      price: 6.49,
      description: t('menuDesc10'),
      image: '/assets/menu-10-vegan-kabob.jpg',
    },
    {
      id: 16,
      name: t('menuItem16'),
      price: 9.99,
      description: t('menuDesc16'),
      image: '/assets/menu-16-vegan-masala.jpg',
    },
  ];

  return menuItems;
};

export default useMenuItems;
