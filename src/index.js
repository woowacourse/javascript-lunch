import './css/index.css';
import '../templates/add-button.png';
import '../templates/category-western.png';
import '../templates/category-asian.png';
import '../templates/category-chinese.png';
import '../templates/category-etc.png';
import '../templates/category-japanese.png';
import '../templates/category-korean.png';
import '../templates/favorite-icon-filled.png';
import '../templates/favorite-icon-lined.png';
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
