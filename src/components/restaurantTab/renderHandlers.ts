import { RestaurantState } from '../../types';
import generateButtonComponent from '../../uiUtils/generateButtonComponent';
import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import FilterBar from '../filterBar/FilterBar';

import ALL_RESTAURNAT_TAB_BUTTON_DATA from './componentsData/AllRestaurantTabButtonData';
import FAVORITE_RESTAURANTS_TAB_DATA from './componentsData/FavoriteRestaurantTabData';
import TAB_CONTAINER_COMPONENT_DATA from './componentsData/TabContainerComponentData';
import RestaurantList from '../restaurantList/RestaurantList';
import bindSelectCategoryOrDistanceOrNameFilterEvent from '../filterBar/eventHandlers';

export const renderRestaurantTabContainerComponent = () => {
  const container = generateContainerComponent(TAB_CONTAINER_COMPONENT_DATA);

  document.body.appendChild(container);
};

export const renderRestaurantTabButtonContainer = () => {
  const tabContainer = document.querySelector('.restaurant-tab-container') as HTMLButtonElement;

  tabContainer.appendChild(generateButtonComponent(ALL_RESTAURNAT_TAB_BUTTON_DATA));
  tabContainer.appendChild(generateButtonComponent(FAVORITE_RESTAURANTS_TAB_DATA));
};

export const unMountFilterBarComponent = (filteredRestaurantListFromTabValueQuery: RestaurantState[]) => {
  const main = document.querySelector('main');
  const sectionContainer = document.querySelector('.restaurant-filter-container');

  if (main && sectionContainer) {
    main.removeChild(sectionContainer);
    RestaurantList(filteredRestaurantListFromTabValueQuery);
  }
};

export const mountFilterBarComponent = (filteredRestaurantListFromTabValueQuery: RestaurantState[]) => {
  const main = document.querySelector('main');
  const filterBar = FilterBar();
  if (main) {
    main.innerHTML = '';
    main.appendChild(filterBar);
    RestaurantList(filteredRestaurantListFromTabValueQuery);
    bindSelectCategoryOrDistanceOrNameFilterEvent();
  }
};
