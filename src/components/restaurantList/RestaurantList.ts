/* eslint-disable max-lines-per-function */
import RestaurantListStorageService from '../../services/restaurantListStorageService';
import convertHTMLStringToDOM from '../../utils/convertHTMLStringToDOM';

import renderRestaurantList from './renderHandlers';
import restaurantListTemplate from './restaurantListTemplate';

function RestaurantList() {
  const main = document.querySelector('main');

  const render = () => {
    const filterData = RestaurantListStorageService.getFilteredData();
    if (filterData) {
      renderRestaurantList(filterData);
    }
  };

  const formattedRestaurantListTemplate = convertHTMLStringToDOM(restaurantListTemplate);
  if (main) {
    main.appendChild(formattedRestaurantListTemplate);
  }

  render();

  return {
    render,
  };
}

export default RestaurantList;
