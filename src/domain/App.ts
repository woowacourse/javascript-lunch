import RestaurantList, { Restaurant } from './RestaurantList';
import { $ } from '../utils';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../constants';

class App {
  play() {
    this.setRestaurantData();
    this.selectEvent();
    $('restaurant-boxes').drawRestaurants();
  }

  selectEvent() {
    $('#favoriteTab').notSelect();

    $('#allTab').addEventListener('click', () => {
      $('#allTab').select();
      $('#favoriteTab').notSelect();
      $('restaurant-boxes').drawRestaurants();
    });

    $('#favoriteTab').addEventListener('click', () => {
      $('#allTab').notSelect();
      $('#favoriteTab').select();
      $('restaurant-boxes').drawRestaurants();
    });
  }

  setRestaurantData() {
    const userList: Restaurant[] = RestaurantList.getLocalStorage();

    if (userList.length > 0) return;

    const restaurants = JSON.stringify(DEFAULT_RESTAURANTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, restaurants);
  }
}

export default App;
