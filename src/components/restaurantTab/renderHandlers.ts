import generateButtonComponent from '../../uiUtils/generateButtonComponent';
import generateContainerComponent from '../../uiUtils/generateContainerComponent';

import ALL_RESTAURNAT_TAB_BUTTON_DATA from './componentsData/AllRestaurantTabButtonData';
import FAVORITE_RESTAURANTS_TAB_DATA from './componentsData/FavoriteRestaurantTabData';
import TAB_CONTAINER_COMPONENT_DATA from './componentsData/TabContainerComponentData';

export const renderRestaurantTabContainerComponent = () => {
  const container = generateContainerComponent(TAB_CONTAINER_COMPONENT_DATA);

  document.body.appendChild(container);
};

export const renderRestaurantTabButtonContainer = () => {
  const tabContainer = document.querySelector('.restaurant-tab-container') as HTMLButtonElement;

  tabContainer.appendChild(generateButtonComponent(ALL_RESTAURNAT_TAB_BUTTON_DATA));
  tabContainer.appendChild(generateButtonComponent(FAVORITE_RESTAURANTS_TAB_DATA));
};
