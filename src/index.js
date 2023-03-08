import './css/index.css';
import Image from '../image/image';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';
<<<<<<< HEAD
=======
import RestaurantItemModal from './components/RestaurantItemModal';
>>>>>>> step2-test

if (!localStorage.getItem('restaurants')) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

const header = new Header();
<<<<<<< HEAD
const restaurantFilter = new RestaurantFilter();
const restaurantsList = new RestaurantsList(restaurants);
const modal = new Modal(restaurants);
=======
const modal = new Modal(restaurants);
const restaurantFilter = new RestaurantFilter();
const restaurantItemModal = new RestaurantItemModal(restaurants);
const restaurantsList = new RestaurantsList(restaurants, restaurantItemModal.openModal.bind(restaurantItemModal));
>>>>>>> step2-test

header.setModalOpenEvent(modal.render.bind(modal));
restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));
modal.setSubmitEvent(restaurantsList.render.bind(restaurantsList));
<<<<<<< HEAD
=======
restaurantItemModal.setDeleteRestaurantEvent(restaurantsList.render.bind(restaurantsList));
>>>>>>> step2-test
