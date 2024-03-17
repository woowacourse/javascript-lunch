import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import TabBar from './components/TabBar';
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

const tabBar = new TabBar({
  targetId: 'tab-container',
  restaurantsInstance: restaurants,
  restaurantListInstance: restaurantList,
});

const restaurantCreationModal = new RestaurantCreationModal({
  targetId: 'restaurant-creation-modal',
  restaurantsInstance: restaurants,
});

header.render();
// tabBar.render();
select.render();
restaurantCreationModal.render();
restaurantList.render();
