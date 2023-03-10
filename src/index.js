import './css/index.css';
import Image from '../image/image';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantsList from './components/RestaurantsList';
import Restaurants from './domain/Restaurants';
import RestaurantItemModal from './components/RestaurantItemModal';
import FavoritesFilter from './components/FavoritesFilter';

if (!localStorage.getItem('restaurants')) {
  localStorage.setItem('restaurants', JSON.stringify([]));
}

const restaurants = new Restaurants(JSON.parse(localStorage.getItem('restaurants')));

const modal = new Modal(restaurants);
const header = new Header();
const favoritesFilter = new FavoritesFilter();
const restaurantFilter = new RestaurantFilter();
const restaurantItemModal = new RestaurantItemModal(restaurants);
const restaurantsList = new RestaurantsList(restaurants, restaurantItemModal.openModal.bind(restaurantItemModal));

modal.setSubmitEvent(restaurantsList.render.bind(restaurantsList));
header.setOpenModalEvent(modal.render.bind(modal));

favoritesFilter.setClickAllButtonEvent(
  restaurantFilter.openFilter.bind(restaurantFilter),
  restaurantsList.render.bind(restaurantsList)
);
favoritesFilter.setClickFavoritesButtonEvent(
  restaurantFilter.closeFilter.bind(restaurantFilter),
  restaurantsList.render.bind(restaurantsList)
);

restaurantFilter.setChangeEvent(restaurantsList.render.bind(restaurantsList));
restaurantItemModal.setDeleteRestaurantEvent(restaurantsList.render.bind(restaurantsList));
restaurantItemModal.setCloseEvent(restaurantsList.render.bind(restaurantsList));
