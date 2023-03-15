import './css/index.css';
import '../image/image';
import Header from './components/Header';
import AddModal from './components/modal/AddModal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';
import Tabbar from './components/Tabbar';
import { $ } from './utils/common';
import InfoModal from './components/modal/InfoModal';
import { yeoptoRestaurant, doriRestaurant, gongwonRestaurant } from './data/MockData';

if (localStorage.getItem('restaurants') === null) {
  localStorage.setItem('restaurants', JSON.stringify([yeoptoRestaurant, doriRestaurant, gongwonRestaurant]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

window.addEventListener('beforeunload', () => {
  localStorage.setItem('restaurants', JSON.stringify(restaurants.restaurantsList));
});

const $header = $('.gnb');
const $main = $('main');

const header = new Header($header);
const tabbar = new Tabbar($main);
const restaurantFilter = new RestaurantFilter($main);
const infoModal = new InfoModal(restaurants);
const restaurantsList = new RestaurantsList($main, restaurants, infoModal);
const addModal = new AddModal($main, restaurants, restaurantsList);

header.setEvent(addModal.render.bind(addModal));

tabbar.setEvent(
  restaurantsList.renderSortedList.bind(restaurantsList),
  restaurantsList.renderFavoriteItem.bind(restaurantsList),
  restaurantFilter.openFilter.bind(restaurantFilter),
  restaurantFilter.closeFilter.bind(restaurantFilter)
);

restaurantFilter.setEvent(restaurantsList.renderSortedList.bind(restaurantsList));
