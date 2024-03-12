import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Select from './components/FilteringSelectBox';
import RestaurantCreationModal from './components/RestaurantCreationModal';

import restaurantList from './layouts/RestaurantList';

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

header.render();
select.render();
restaurantCreationModal.render();

// layout
restaurantList({ targetId: 'restaurant-list', restaurants: restaurants.standardList });
