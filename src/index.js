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
import RestaurantItem from './components/RestaurantItem';

if (localStorage.getItem('restaurants') === null) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

window.addEventListener('beforeunload', () => {
  localStorage.setItem('restaurants', JSON.stringify(restaurants.restaurantsList));
});

const $header = $('.gnb');
const $main = $('main');

const header = new Header($header);
const addModal = new AddModal($main);
const infoModal = new InfoModal();
const tabbar = new Tabbar($main);
const restaurantFilter = new RestaurantFilter($main);
const restaurantsList = new RestaurantsList($main, restaurants);
const restaurantItem = new RestaurantItem();

header.setEvent(
  addModal.render.bind(addModal),
  restaurantsList.setState.bind(restaurantsList),
  restaurants.add.bind(restaurants)
);

tabbar.setEvent(
  restaurantsList.render.bind(restaurantsList),
  restaurantsList.renderFavoriteRestaurant.bind(restaurantsList),
  restaurantFilter.openFilter.bind(restaurantFilter),
  restaurantFilter.closeFilter.bind(restaurantFilter)
);

restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));

restaurantsList.setEvent(restaurants.setFavoriteState.bind(restaurants));

restaurantItem.setEvent(restaurants.restaurantsList, infoModal.render.bind(infoModal));
