import './css/index.css';
import Image from '../image/image';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';

if (!localStorage.getItem('restaurants')) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

const header = new Header();
const restaurantFilter = new RestaurantFilter();
const restaurantsList = new RestaurantsList(restaurants);
const modal = new Modal(restaurants);

header.setEvent(modal.render.bind(modal));
restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));
modal.setSubmitEvent(restaurantsList.render.bind(restaurantsList));
