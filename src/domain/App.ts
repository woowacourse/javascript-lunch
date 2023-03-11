import { Restaurant } from './RestaurantList';
import { $ } from '../utils';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../constants';

class App {
  play() {
    this.setRestaurantData();
    this.selectEvent();
    $('restaurant-boxes').drawRestaurants();
  }

  setRestaurantData() {
    const userList: Restaurant[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );

    if (userList.length > 0) return;

    const restaurants = JSON.stringify(DEFAULT_RESTAURANTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, restaurants);
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
}

export default App;
