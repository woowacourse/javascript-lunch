import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Main from './components/Main';
import Select from './components/Select';
import Restaurant from './components/Restaurant';
import RestaurantCreationModal from './components/RestaurantCreationModal';
import './styles/index.css';
import { SELECTED_DATA } from './constants/rules';

// domain
const restaurants = new Restaurants(localStorage);

// components
const header = new Header();
const main = new Main();
const select = new Select(restaurants);
const restaurant = new Restaurant();
const modal = new RestaurantCreationModal(restaurants);

document.getElementById('header').innerHTML = header.render();
document.getElementById('main').innerHTML = main.render();
document
  .getElementById('restaurant-filter-container')
  .appendChild(select.render(SELECTED_DATA.sorting));
document
  .getElementById('restaurant-filter-container')
  .appendChild(select.render(SELECTED_DATA.category));
restaurants.standardList.forEach((restaurantData) => {
  document.getElementById('restaurant-list').innerHTML += restaurant.render(restaurantData);
});

document.getElementById('restaurant-creation-modal').innerHTML = modal.render();
