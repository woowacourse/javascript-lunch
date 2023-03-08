import '../templates/style.css';

import App from './App';
import { mockRestaurant } from './data';
import RestaurantService from './domain/RestaurantService';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';

export const restaurantService = new RestaurantService(
  getLocalStorage('restaurants') ?? mockRestaurant,
);

window.addEventListener('beforeunload', () => {
  setLocalStorage('restaurants', restaurantService.getRestaurant());
});

const app = new App(document.getElementById('app'));
app.init();
