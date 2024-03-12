import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Select from './components/FilteringSelectBox';
import RestaurantCreationModal from './components/RestaurantCreationModal';

import generateRestaurantItem from './components/template/generateRestaurantItem';

import { $ } from './utils/dom';

import './styles/index.css';

// domain
const restaurants = new Restaurants(localStorage);

// components
const header = new Header({ targetId: 'header' });
const select = new Select({ targetId: 'restaurant-filter-container', restaurants });
const restaurantCreationModal = new RestaurantCreationModal({
  targetId: 'restaurant-creation-modal',
  restaurants,
});

restaurants.standardList.forEach((restaurantData) => {
  $('restaurant-list').innerHTML += generateRestaurantItem(restaurantData);
});

header.render();
select.render();
restaurantCreationModal.render();
