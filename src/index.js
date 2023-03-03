import './css/index.css';
import Image from '../image/image';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';

if (localStorage.getItem('restaurants') === null) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

const $header = document.querySelector('.gnb');
const $main = document.querySelector('main');

const header = new Header($header);
const restaurantFilter = new RestaurantFilter($main);
const restaurantsList = new RestaurantsList($main, restaurants);
const modal = new Modal($main, restaurantsList);

header.render(modal);
restaurantFilter.render(restaurantsList);
