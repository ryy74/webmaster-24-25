import { useLanguage } from '../contexts/LanguageContext';

import bbowl from '../assets/vegan-bbowl.jpg';
import burger from '../assets/vegan-burger.jpg';
import burrito from '../assets/vegan-burrito.jpg';
import curry from '../assets/Vegan-curry.jpg';
import kabob from '../assets/Vegan-kabob.jpg';
import lasagna from '../assets/Vegan-lasagna.jpg';
import masala from '../assets/Vegan-masala.jpg';
import mc from '../assets/Vegan-mc.jpg';
import pizza from '../assets/Vegan-pizza.jpg';
import quesadillas from '../assets/Vegan-quesadillas.jpg';
import salad from '../assets/vegan-salad.jpg';
import soup from '../assets/Vegan-soup.jpg';
import staco from '../assets/Vegan-staco.jpg';
import stirfry from '../assets/vegan-stirfry.jpg';
import sushi from '../assets/Vegan-sushi.jpg';
import tacos from '../assets/vegan-tacos.jpg'

const useMenuItems = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 1,
      name: t('menuItem1'),
      price: 9.99,
      description: t('menuDesc1'),
      image: tacos,
      longDescription: t('menuLD1'),
      ingredients: t('menuIngredients1'),
      nutritionalInfo: t('menuNutrition1'),
      allergens: t('menuAllergens1'),
    },
    {
      id: 2,
      name: t('menuItem2'),
      price: 10.99,
      description: t('menuDesc2'),
      image: burrito,
      longDescription: t('menuLD2'),
      ingredients: t('menuIngredients2'),
      nutritionalInfo: t('menuNutrition2'),
      allergens: t('menuAllergens2'),
    },
    {
      id: 3,
      name: t('menuItem3'),
      price: 8.49,
      description: t('menuDesc3'),
      image: salad,
      longDescription: t('menuLD3'),
      ingredients: t('menuIngredients3'),
      nutritionalInfo: t('menuNutrition3'),
      allergens: t('menuAllergens3'),
    },
    {
      id: 4,
      name: t('menuItem4'),
      price: 11.49,
      description: t('menuDesc4'),
      image: burger,
      longDescription: t('menuLD4'),
      ingredients: t('menuIngredients4'),
      nutritionalInfo: t('menuNutrition4'),
      allergens: t('menuAllergens4'),
    },
    {
      id: 5,
      name: t('menuItem5'),
      price: 12.99,
      description: t('menuDesc5'),
      image: pizza,
      longDescription: t('menuLD5'),
      ingredients: t('menuIngredients5'),
      nutritionalInfo: t('menuNutrition5'),
      allergens: t('menuAllergens5'),
    },
    {
      id: 6,
      name: t('menuItem6'),
      price: 9.99,
      description: t('menuDesc6'),
      image: mc,
      longDescription: t('menuLD6'),
      ingredients: t('menuIngredients6'),
      nutritionalInfo: t('menuNutrition6'),
      allergens: t('menuAllergens6'),
    },
    {
      id: 7,
      name: t('menuItem7'),
      price: 13.49,
      description: t('menuDesc7'),
      image: lasagna,
      longDescription: t('menuLD7'),
      ingredients: t('menuIngredients7'),
      nutritionalInfo: t('menuNutrition7'),
      allergens: t('menuAllergens7'),
    },
    {
      id: 8,
      name: t('menuItem8'),
      price: 10.99,
      description: t('menuDesc8'),
      image: curry,
      longDescription: t('menuLD8'),
      ingredients: t('menuIngredients8'),
      nutritionalInfo: t('menuNutrition8'),
      allergens: t('menuAllergens8'),
    },
    {
      id: 9,
      name: t('menuItem9'),
      price: 11.99,
      description: t('menuDesc9'),
      image: bbowl,
      longDescription: t('menuLD9'),
      ingredients: t('menuIngredients9'),
      nutritionalInfo: t('menuNutrition9'),
      allergens: t('menuAllergens9'),
    },
    {
      id: 10,
      name: t('menuItem10'),
      price: 8.99,
      description: t('menuDesc10'),
      image: kabob,
      longDescription: t('menuLD10'),
      ingredients: t('menuIngredients10'),
      nutritionalInfo: t('menuNutrition10'),
      allergens: t('menuAllergens10'),
    },
    {
      id: 11,
      name: t('menuItem11'),
      price: 9.49,
      description: t('menuDesc11'),
      image: stirfry,
      longDescription: t('menuLD11'),
      ingredients: t('menuIngredients11'),
      nutritionalInfo: t('menuNutrition11'),
      allergens: t('menuAllergens11'),
    },
    {
      id: 12,
      name: t('menuItem12'),
      price: 8.99,
      description: t('menuDesc12'),
      image: sushi,
      longDescription: t('menuLD12'),
      ingredients: t('menuIngredients12'),
      nutritionalInfo: t('menuNutrition12'),
      allergens: t('menuAllergens12'),
    },
    {
      id: 13,
      name: t('menuItem13'),
      price: 10.49,
      description: t('menuDesc13'),
      image: staco,
      longDescription: t('menuLD13'),
      ingredients: t('menuIngredients13'),
      nutritionalInfo: t('menuNutrition13'),
      allergens: t('menuAllergens13'),
    },
    {
      id: 14,
      name: t('menuItem14'),
      price: 9.49,
      description: t('menuDesc14'),
      image: quesadillas,
      longDescription: t('menuLD14'),
      ingredients: t('menuIngredients14'),
      nutritionalInfo: t('menuNutrition14'),
      allergens: t('menuAllergens14'),
    },
    {
      id: 15,
      name: t('menuItem15'),
      price: 7.99,
      description: t('menuDesc15'),
      image: soup,
      longDescription: t('menuLD15'),
      ingredients: t('menuIngredients15'),
      nutritionalInfo: t('menuNutrition15'),
      allergens: t('menuAllergens15'),
    },
    {
      id: 16,
      name: t('menuItem16'),
      price: 10.99,
      description: t('menuDesc16'),
      image: masala,
      longDescription: t('menuLD16'),
      ingredients: t('menuIngredients16'),
      nutritionalInfo: t('menuNutrition16'),
      allergens: t('menuAllergens16'),
    },
  ];

  return menuItems;
};

export default useMenuItems;
