import Restaurants from './domains/Restaurants';

import Header from './components/Header/Header';
import RestaurantCreationModal from './components/AddRestaurantModal/AddRestaurantModal';
import Restaurant from './components/Restaurant/Restaurant';
import RestaurantFilter from './components/RestaurantFilter/RestaurantFilter';

import { $ } from './utils/dom';

import './styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  // domain
  const restaurants = new Restaurants(localStorage);

  // components
  const header = new Header();
  const restaurantFilter = new RestaurantFilter(restaurants);
  const restaurant = new Restaurant();
  const modal = new RestaurantCreationModal(restaurants);

  $('header').innerHTML = header.render();
  $('restaurant-filter-container').innerHTML += restaurantFilter.render();
  restaurants.standardList.forEach((restaurantData) => {
    $('restaurant-list').innerHTML += restaurant.render(restaurantData);
  });
  $('add-restaurant-modal').innerHTML = modal.render();
});
