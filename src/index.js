import './css/index.css';
import Image from '../image/image';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';
import RestaurantItemModal from './components/RestaurantItemModal';

if (!localStorage.getItem('restaurants')) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

const header = new Header();
const modal = new Modal(restaurants);
const restaurantFilter = new RestaurantFilter();
const restaurantItemModal = new RestaurantItemModal(restaurants);
const restaurantsList = new RestaurantsList(restaurants, restaurantItemModal.openModal.bind(restaurantItemModal));

header.setModalOpenEvent(modal.render.bind(modal));
restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));
modal.setSubmitEvent(restaurantsList.render.bind(restaurantsList));
restaurantItemModal.setDeleteRestaurantEvent(restaurantsList.render.bind(restaurantsList));
