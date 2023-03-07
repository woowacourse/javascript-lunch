import './css/index.css';
import '../image/image';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';
import { $ } from './utils/common';

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
const modal = new Modal($main);
const restaurantFilter = new RestaurantFilter($main);
const restaurantsList = new RestaurantsList($main, restaurants);

header.setEvent(modal.toggleModalOpen.bind(modal));
modal.setSubmitEvent(restaurantsList.setState.bind(restaurantsList), restaurants.add.bind(restaurants));
modal.setModalCloseEvent();
restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));
