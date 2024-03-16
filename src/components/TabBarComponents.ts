import RestaurantList from '../domain/restaurantList';
import { swapClasses } from '../domain/util';
import TabBarButtonComponent from './TabBarButtonComponent';

const TabBarComponent = (restaurantList: RestaurantList) => {
  const tabBar = document.createElement('nav');
  tabBar.classList.add('tabBar');

  const allRestaurantButton = TabBarButtonComponent({
    text: '모든 음식점',
    id: 'all-restaurants-button',
    onClick: () => {},
    isPrimary: true
  }).create();

  const favoriteRestaurantsButton = TabBarButtonComponent({
    text: '자주 가는 음식점',
    id: 'favorite-restaurants-button',
    onClick: () => {},
    isPrimary: false
  }).create();

  tabBar.appendChild(allRestaurantButton);
  tabBar.appendChild(favoriteRestaurantsButton);

  const handleTabBarClick = () => {
    updateButtonClasses();
  };

  const buttons = tabBar.getElementsByClassName('tabBar_button');

  const updateButtonClasses = () => {
    Array.from(buttons).forEach((button) => {
      swapClasses({
        element: button,
        classA: 'tabBar_button--primary',
        classB: 'tabBar_button--secondary'
      });
    });
  };

  const setEvent = () => {
    tabBar
      .querySelector('#all-restaurants-button')
      ?.addEventListener('click', () => restaurantList.setIsFavorite(false));
    tabBar
      .querySelector('#favorite-restaurants-button')
      ?.addEventListener('click', () => restaurantList.setIsFavorite(true));
  };

  tabBar.addEventListener('click', handleTabBarClick);
  setEvent();

  const create = () => tabBar;

  return {
    create
  };
};

export default TabBarComponent;
