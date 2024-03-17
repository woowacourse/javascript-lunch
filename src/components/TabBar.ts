import RestaurantList from '../domain/restaurantList';
import { swapClasses } from '../domain/util';
import TabBarButton from './TabBarButton';

const TabBar = (restaurantList: RestaurantList) => {
  const createTabBar = (): HTMLElement => {
    const tabBar = document.createElement('nav');
    tabBar.classList.add('tabBar');
    return tabBar;
  };

  const createTabButtons = () => {
    const allRestaurantButton = TabBarButton({
      text: '모든 음식점',
      id: 'all-restaurants-button',
      onClick: () => restaurantList.setIsFavorite(false),
      isPrimary: true
    }).create();

    const favoriteRestaurantsButton = TabBarButton({
      text: '자주 가는 음식점',
      id: 'favorite-restaurants-button',
      onClick: () => restaurantList.setIsFavorite(true),
      isPrimary: false
    }).create();

    return [allRestaurantButton, favoriteRestaurantsButton];
  };

  const updateButtonClasses = (buttons: HTMLCollectionOf<Element>) => {
    Array.from(buttons).forEach((button) => {
      swapClasses({
        element: button as HTMLElement,
        classA: 'tabBar_button--primary',
        classB: 'tabBar_button--secondary'
      });
    });
  };

  const setupTabBarEvents = (tabBar: HTMLElement) => {
    const buttons = tabBar.getElementsByClassName('tabBar_button');
    tabBar.addEventListener('click', () => updateButtonClasses(buttons));
  };

  const assembleTabBar = (): HTMLElement => {
    const tabBar = createTabBar();
    const [allRestaurantButton, favoriteRestaurantsButton] = createTabButtons();

    tabBar.appendChild(allRestaurantButton);
    tabBar.appendChild(favoriteRestaurantsButton);

    setupTabBarEvents(tabBar);

    return tabBar;
  };

  const tabBarElement = assembleTabBar();

  const create = (): HTMLElement => tabBarElement;

  return { create };
};

export default TabBar;
