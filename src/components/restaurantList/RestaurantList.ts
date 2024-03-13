/* eslint-disable max-lines-per-function */
import { RestaurantState } from '../../types/index.d';
import convertHTMLStringToDOM from '../../utils/convertHTMLStringToDOM';

import renderRestaurantList from './renderHandlers';
import restaurantListTemplate from './restaurantListTemplate';

function RestaurantList(filterData: RestaurantState[]) {
  const main = document.querySelector('main');

  const render = () => {
    if (filterData) {
      renderRestaurantList(filterData);
    }
  };

  const formattedRestaurantListTemplate = convertHTMLStringToDOM(restaurantListTemplate);
  if (main) {
    main.appendChild(formattedRestaurantListTemplate);
  }

  render();
}

export default RestaurantList;
