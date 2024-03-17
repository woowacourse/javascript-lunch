import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Select from './components/FilteringSelectBox';
import RestaurantList from './layouts/RestaurantList';
import RestaurantCreationModal from './components/RestaurantCreationModal';

import './styles/index.css';

// domain
const restaurants = new Restaurants(localStorage);

// components
const header = new Header({ targetId: 'header' });
const select = new Select({ targetId: 'restaurant-filter-container', restaurants });

const restaurantList = new RestaurantList({
  targetId: 'restaurant-list',
  restaurantsInstance: restaurants,
});

const restaurantCreationModal = new RestaurantCreationModal({
  targetId: 'restaurant-creation-modal',
  restaurantsInstance: restaurants,
});

header.render();
select.render();
restaurantCreationModal.render();
restaurantList.render();
