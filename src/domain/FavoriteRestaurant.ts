import Observable from '../Observable';
import { Restaurant } from '../types/Restaurant.js';

class FavoriteRestaurant extends Observable {
  private favoriteList: Restaurant[];

  constructor() {
    super();
    const favoriteData = localStorage.getItem('favoriteList');

    if (favoriteData === null || favoriteData.length === 0) {
      this.favoriteList = [];
    } else {
      this.favoriteList = JSON.parse(favoriteData);
    }
  }

  getRestaurantList() {
    return this.favoriteList;
  }

  addRestaurant(restaurant: Restaurant) {
    this.favoriteList.push(restaurant);
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));

    this.notify(this.favoriteList);
  }

  removeRestaurant(restaurantStoreName: string) {
    const favoriteData = localStorage.getItem('favoriteList');

    if (favoriteData === null || favoriteData.length === 0) {
      return;
    } else {
      this.favoriteList = JSON.parse(favoriteData).filter(
        (favorite: Restaurant) => favorite.storeName !== restaurantStoreName
      );

      console.log(this.favoriteList);
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));

      this.notify(this.favoriteList);
    }
  }
}

const favoriteRestaurant = new FavoriteRestaurant();
export default favoriteRestaurant;
