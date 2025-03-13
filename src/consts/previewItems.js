import { useLanguage } from '../contexts/LanguageContext';

const useMenuItems = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      name: t('menuItem1'),
      price: 9.99,
      description: t('menuDesc1'),
      image: '/assets/vegan-tacos.jpg',
    },
    {
      id: 5,
      name: t('menuItem5'),
      price: 12.99,
      description: t('menuDesc5'),
      image: '/assets/Vegan-pizza.jpg',
    },
    {
      id: 10,
      name: t('menuItem10'),
      price: 8.99,
      description: t('menuDesc10'),
      image: '/assets/Vegan-kabob.jpg',
    },
    {
      id: 16,
      name: t('menuItem16'),
      price: 10.99,
      description: t('menuDesc16'),
      image: '/assets/Vegan-masala.jpg',
    },
  ];

  return menuItems;
};

export default useMenuItems;
