import Restaurants from './domains/Restaurants';

import Header from './components/Header/Header';
import RestaurantCreationModal from './components/AddRestaurantModal/AddRestaurantModal';
import Restaurant from './components/Restaurant/Restaurant';
import RestaurantFilter from './components/RestaurantFilter/RestaurantFilter';

import { $ } from './utils/dom';
import { SELECTED_DATA } from './constants/rules';

import './styles/index.css';

// domain
const restaurants = new Restaurants(localStorage);

// components
const header = new Header();
const restaurantFilter = new RestaurantFilter(restaurants);
const restaurant = new Restaurant();
const modal = new RestaurantCreationModal(restaurants);

$('header').innerHTML = header.render();
$('restaurant-filter-container').appendChild(restaurantFilter.render(SELECTED_DATA.sorting));
$('restaurant-filter-container').appendChild(restaurantFilter.render(SELECTED_DATA.category));
restaurants.standardList.forEach((restaurantData) => {
  $('restaurant-list').innerHTML += restaurant.render(restaurantData);
});
$('restaurant-creation-modal').innerHTML = modal.render();
