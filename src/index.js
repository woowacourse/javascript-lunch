import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Select from './components/Select';
import Restaurant from './components/Restaurant';
import RestaurantCreationModal from './components/RestaurantCreationModal';

import { $ } from './utils/dom';
import { SELECTED_DATA } from './constants/rules';

import './styles/index.css';

// domain
const restaurants = new Restaurants(localStorage);

// components
new Header();
const select = new Select(restaurants);
const restaurant = new Restaurant();
const modal = new RestaurantCreationModal(restaurants);

$('header').innerHTML = Header.getTemplate();
$('restaurant-filter-container').appendChild(select.render(SELECTED_DATA.sorting));
$('restaurant-filter-container').appendChild(select.render(SELECTED_DATA.category));
restaurants.standardList.forEach((restaurantData) => {
  $('restaurant-list').innerHTML += restaurant.render(restaurantData);
});
$('restaurant-creation-modal').innerHTML = modal.render();
