import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import TabBar from './components/TabBar';
import FilteringSelectBox from './components/FilteringSelectBox';
import RestaurantCreationModal from './components/RestaurantCreationModal';
import RestaurantDetailModal from './components/RestaurantDetailModal';
import FavoriteButton from './components/FavoriteButton';
import RestaurantList from './layouts/RestaurantList';

import './styles/index.css';

// domain
const restaurants = new Restaurants(localStorage);

// components
const header = new Header({ targetId: 'header' });
const select = new FilteringSelectBox({ targetId: 'restaurant-filter-container', restaurants });

const restaurantCreationModal = new RestaurantCreationModal({
  targetId: 'restaurant-creation-modal',
  restaurantsInstance: restaurants,
});

const restaurantDetailModal = new RestaurantDetailModal({
  targetId: 'restaurant-detail-modal',
  restaurantsInstance: restaurants,
});

const restaurantList = new RestaurantList({
  targetId: 'restaurant-list',
  restaurantsInstance: restaurants,
  restaurantDetailModalInstance: restaurantDetailModal,
});

const favoriteButton = new FavoriteButton({
  restaurantsInstance: restaurants,
});

const tabBar = new TabBar({
  targetId: 'tab-container',
  restaurantsInstance: restaurants,
  restaurantListInstance: restaurantList,
});

header.render();
select.render();
restaurantCreationModal.render();
restaurantList.render();
