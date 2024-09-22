import { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import img from '../assets/img/americano.jpg';

export const DrinksContext = createContext();

export const DrinksProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    setDrinks([
      {
        key: 'coffee',
        id: '#coffee',
        category: t('products.coffee'),
        drinks: [
          {
            key: 'americano',
            name: t('coffee_descriptions.americano.name'),
            descr: t('coffee_descriptions.americano.description'),
            img: img,
          },
          {
            key: 'cappuccino',
            name: t('coffee_descriptions.cappuccino.name'),
            descr: t('coffee_descriptions.cappuccino.description'),
            img: img,
          },
          {
            key: 'latte',
            name: t('coffee_descriptions.latte.name'),
            descr: t('coffee_descriptions.latte.description'),
            img: img,
          },
          {
            key: 'espresso',
            name: t('coffee_descriptions.espresso.name'),
            descr: t('coffee_descriptions.espresso.description'),
            img: img,
          },
          {
            key: 'turkish_coffee',
            name: t('coffee_descriptions.turkish_coffee.name'),
            descr: t('coffee_descriptions.turkish_coffee.description'),
            img: img,
          },
        ],
      },
      {
        key: 'icecoffee',
        id: '#icecoffee',
        category: t('products.ice_coffee'),
        drinks: [
          {
            key: 'ice_americano',
            name: t('icecoffee_descriptions.ice_americano.name'),
            descr: t('icecoffee_descriptions.ice_americano.description'),
            img: img,
          },
          {
            key: 'ice_sparkling_americano',
            name: t('icecoffee_descriptions.ice_sparkling_americano.name'),
            descr: t(
              'icecoffee_descriptions.ice_sparkling_americano.description'
            ),
            img: img,
          },
          {
            key: 'ice_latte',
            name: t('icecoffee_descriptions.ice_latte.name'),
            descr: t('icecoffee_descriptions.ice_latte.description'),
            img: img,
          },
          {
            key: 'ice_mocha',
            name: t('icecoffee_descriptions.ice_mocha.name'),
            descr: t('icecoffee_descriptions.ice_mocha.description'),
            img: img,
          },
        ],
      },
      {
        key: 'tea',
        id: '#tea',
        category: t('products.tea'),
        drinks: [
          {
            key: 'black_tea',
            name: t('tea_descriptions.black_tea.name'),
            descr: t('tea_descriptions.black_tea.description'),
            img: img,
          },
          {
            key: 'green_tea',
            name: t('tea_descriptions.green_tea.name'),
            descr: t('tea_descriptions.green_tea.description'),
            img: img,
          },
          {
            key: 'jasmine_tea',
            name: t('tea_descriptions.jasmine_tea.name'),
            descr: t('tea_descriptions.jasmine_tea.description'),
            img: img,
          },
          {
            key: 'citrus_tea',
            name: t('tea_descriptions.citrus_tea.name'),
            descr: t('tea_descriptions.citrus_tea.description'),
            img: img,
          },
        ],
      },
      {
        key: 'icetea',
        id: '#icetea',
        category: t('products.ice_tea'),
        drinks: [
          {
            key: 'mango_ice_tea',
            name: t('icetea_descriptions.mango_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
          {
            key: 'peach_ice_tea',
            name: t('icetea_descriptions.peach_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
          {
            key: 'lemon_ice_tea',
            name: t('icetea_descriptions.lemon_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
          {
            key: 'lime_ice_tea',
            name: t('icetea_descriptions.lime_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
          {
            key: 'berry_ice_tea',
            name: t('icetea_descriptions.berry_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
          {
            key: 'strawberry_ice_tea',
            name: t('icetea_descriptions.strawberry_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
          {
            key: 'raspberry_ice_tea',
            name: t('icetea_descriptions.raspberry_ice_tea.name'),
            descr: t('icetea_descriptions.description'),
            img: img,
          },
        ],
      },
      {
        key: 'cold',
        id: '#cold',
        category: t('products.cold_drinks'),
        drinks: [
          {
            key: 'coca_cola_classic',
            name: t('cold_descriptions.coca_cola_classic.name'),
            descr: t('cold_descriptions.coca_cola_classic.description'),
            img: img,
          },
          {
            key: 'coca_cola_zero',
            name: t('cold_descriptions.coca_cola_zero.name'),
            descr: t('cold_descriptions.coca_cola_zero.description'),
            img: img,
          },
          {
            key: 'fanta',
            name: t('cold_descriptions.fanta.name'),
            descr: t('cold_descriptions.fanta.description'),
            img: img,
          },
          {
            key: 'sprite',
            name: t('cold_descriptions.sprite.name'),
            descr: t('cold_descriptions.sprite.description'),
            img: img,
          },
        ],
      },
      {
        key: 'lemonade',
        id: '#lemonades',
        category: t('products.lemonades'),
        drinks: [
          {
            key: 'lemon',
            name: t('lemonade_descriptions.lemon.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'lime',
            name: t('lemonade_descriptions.lime.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'mango',
            name: t('lemonade_descriptions.mango.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'pear',
            name: t('lemonade_descriptions.pear.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'berry',
            name: t('lemonade_descriptions.berry.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'strawberry',
            name: t('lemonade_descriptions.strawberry.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'raspberry',
            name: t('lemonade_descriptions.raspberry.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
          {
            key: 'passion_fruit',
            name: t('lemonade_descriptions.passion_fruit.name'),
            descr: t('lemonade_descriptions.description'),
            img: img,
          },
        ],
      },
      {
        key: 'fruitjuices',
        id: '#fruitjuices',
        category: t('products.fruit_juices'),
        drinks: [
          {
            key: 'orange_juice',
            name: t('fruitjuices_descriptions.orange_juice.name'),
            descr: t('fruitjuices_descriptions.orange_juice.description'),
            img: img,
          },
          {
            key: 'apple_juice',
            name: t('fruitjuices_descriptions.apple_juice.name'),
            descr: t('fruitjuices_descriptions.apple_juice.description'),
            img: img,
          },
          {
            key: 'cherry_juice',
            name: t('fruitjuices_descriptions.cherry_juice.name'),
            descr: t('fruitjuices_descriptions.cherry_juice.description'),
            img: img,
          },
          {
            key: 'peach_juice',
            name: t('fruitjuices_descriptions.peach_juice.name'),
            descr: t('fruitjuices_descriptions.peach_juice.description'),
            img: img,
          },
          {
            key: 'multifruit_juice',
            name: t('fruitjuices_descriptions.multifruit_juice.name'),
            descr: t('fruitjuices_descriptions.multifruit_juice.description'),
            img: img,
          },
        ],
      },
      {
        key: 'water',
        id: '#water',
        category: t('products.water'),
        drinks: [
          {
            key: 'sparklingsirab',
            name: t('water_descriptions.sparklingsirab.name'),
            descr: t('water_descriptions.sparklingsirab.description'),
            img: img,
          },
          {
            key: 'stillsirab',
            name: t('water_descriptions.stillsirab.name'),
            descr: t('water_descriptions.stillsirab.description'),
            img: img,
          },
          {
            key: 'sarikiz',
            name: t('water_descriptions.sarikiz.name'),
            descr: t('water_descriptions.sarikiz.description'),
            img: img,
          },
        ],
      },
    ]);
  }, [t, i18n.language]);

  return (
    <DrinksContext.Provider value={{ drinks }}>
      {children}
    </DrinksContext.Provider>
  );
};
