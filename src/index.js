import Restaurants from './domains/Restaurants';

import Header from './components/Header/Header';
import RestaurantCreationModal from './components/AddRestaurantModal/AddRestaurantModal';
import RestaurantFilter from './components/RestaurantFilter/RestaurantFilter';
import Restaurant from './components/Common/Restaurant/Restaurant';

import { $ } from './utils/dom';

import './styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  // domain
  const restaurants = new Restaurants(localStorage);

  // components
  const header = new Header();
  const restaurantFilter = new RestaurantFilter(restaurants);
  const modal = new RestaurantCreationModal(restaurants);

  $('header').innerHTML = header.render();
  $('restaurant-filter-container').innerHTML += restaurantFilter.render();
  restaurants.standardList.forEach((restaurantData) => {
    $('restaurant-list').innerHTML += Restaurant(restaurantData);
  });
  $('add-restaurant-modal').innerHTML = modal.render();
});
