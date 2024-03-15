import { swapClasses } from '../domain/util';
import TabBarButtonComponent from './TabBarButtonComponent';

const TabBarComponent = () => {
  const tabBar = document.createElement('nav');
  tabBar.classList.add('tabBar');

  const allRestaurantButton = TabBarButtonComponent({
    text: '모든 음식점',
    onClick: () => {},
    isPrimary: true
  }).create();

  const favoriteRestaurantsButton = TabBarButtonComponent({
    text: '자주 가는 음식점',
    onClick: () => {},
    isPrimary: false
  }).create();

  tabBar.appendChild(allRestaurantButton);
  tabBar.appendChild(favoriteRestaurantsButton);

  const create = () => tabBar;

  const handleTabBarClick = () => {
    updateButtonClasses();
  };

  const updateButtonClasses = () => {
    const buttons = tabBar.getElementsByClassName('tabBar_button');

    Array.from(buttons).forEach((button) => {
      swapClasses({
        element: button,
        classA: 'tabBar_button--primary',
        classB: 'tabBar_button--secondary'
      });
    });
  };

  tabBar.addEventListener('click', handleTabBarClick);

  return {
    create
  };
};

export default TabBarComponent;
