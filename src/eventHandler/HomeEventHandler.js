import { FAVORITE, STORAGE_KEY } from '../constants/config';
import { FAVORITE_IMG_SRC } from '../constants/filter';
import LocalStorage from '../domain/LocalStorage';

class HomeEventHandler {
  restaurantList;

  constructor(restaurantList) {
    this.restaurantList = restaurantList;
    this.setEvent();
  }

  setEvent() {
    const $favoriteIconNodeList = document.querySelectorAll('.favorite-icon');
    $favoriteIconNodeList.forEach((favoriteIconNode, index) => {
      favoriteIconNode.addEventListener('click', e => this.handleFavorite(e, index));
    });
  }

  handleFavorite(e, index) {
    const target = this.restaurantList.restaurants[index].information;
    const restaurantsInStorage = localStorage.getItem(STORAGE_KEY);
    const localStorageRestaurants = LocalStorage.getStorageRestaurantList(restaurantsInStorage);

    localStorageRestaurants.forEach(restaurant => {
      if (restaurant.information.name === target.name) {
        this.changeFavorite(restaurant);
        e.target.src = FAVORITE_IMG_SRC[restaurant.information.favorite];
      }
    });
    LocalStorage.setStorageRestaurantList(localStorageRestaurants);
  }

  changeFavorite(restaurant) {
    if (restaurant.information.favorite === FAVORITE.yes) {
      restaurant.information.favorite = FAVORITE.no;
    } else {
      restaurant.information.favorite = FAVORITE.yes;
    }
  }
}
export default HomeEventHandler;
