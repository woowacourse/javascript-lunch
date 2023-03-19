import '../templates/style.css';
import '../templates/add-button.png';
import '../templates/category-korean.png';
import '../templates/category-chinese.png';
import '../templates/category-japanese.png';
import '../templates/category-western.png';
import '../templates/category-asian.png';
import '../templates/category-etc.png';
import '../templates/favorite-icon-lined.png';
import '../templates/favorite-icon-filled.png';

import { mockRestaurant } from './data';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';
import RestaurantService from './domain/RestaurantService';
import App from './App';

export const restaurantService = new RestaurantService(
  getLocalStorage('restaurants') ?? mockRestaurant,
);

window.addEventListener('beforeunload', () => {
  setLocalStorage('restaurants', restaurantService.getRestaurant());
});

const app = new App(document.getElementById('app'));
app.init();
