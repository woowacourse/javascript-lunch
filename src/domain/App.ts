import { Restaurant } from './RestaurantList';
import { $ } from '../utils';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../constants';

class App {
  play() {
    this.setRestaurantData();
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
}

export default App;
