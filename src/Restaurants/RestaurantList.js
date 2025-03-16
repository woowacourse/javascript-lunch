import InputDropDown from '../components/InputDropDown.js';
import RestaurantItem from '../components/Restaurant/RestaurantItem.js';
import CATEGORY from '../constant/category.js';
import Restaurant from '../Restaurant.js';
import RestaurantStorage from './RestaurantStorage.js';

class RestaurantList {
  #restaurantListContainer; // 레스토랑 리스트 컨테이너
  #onRestaurantUpdate; // 레스토랑 리스트 리로드 함수
  #detailModal; // 레스토랑 상세정보 모달
  #restaurantData; // localStorage 레스토랑 데이터
  #currentCategory = '';
  #currentSorting = 'name';
  #currentHeader = '모든 음식점';

  constructor(restaurantListContainer, onRestaurantUpdate, detailModal) {
    this.#restaurantListContainer = restaurantListContainer;
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#detailModal = detailModal;
    this.#restaurantData = RestaurantStorage.getRestaurants();
    this.#createRestaurantList(this.sortRestaurantList('', 'name', '모든 음식점'));
  }

  #createRestaurantList(restaurantList) {
    this.#restaurantListContainer.innerHTML = '';
    restaurantList.forEach((restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant, this.#onRestaurantUpdate, this.#detailModal).getElement();
      this.#restaurantListContainer.appendChild(restaurantItem);
    });
  }

  sortRestaurantList(category, sorting, currentHeader) {
    let filteredList = this.#restaurantData;
    if (category && category !== '') {
      filteredList = filteredList.filter((restaurant) => {
        return restaurant.getCategory() === category;
      });
    }

    if (sorting === 'name') {
      filteredList = [...filteredList].sort((a, b) => a.getName().localeCompare(b.getName()));
    } else if (sorting === 'distance') {
      filteredList = [...filteredList].sort((a, b) => Number(a.getDistance()) - Number(b.getDistance()));
    }

    if (currentHeader === '모든 음식점') {
      filteredList = [...filteredList].filter((restaurant) => {
        return restaurant.getLike() === false || restaurant.getLike() === true;
      });
    }

    if (currentHeader === '자주 가는 음식점') {
      filteredList = [...filteredList].filter((restaurant) => {
        return restaurant.getLike() === true;
      });
    }

    this.#createRestaurantList(filteredList);
    return filteredList;
  }

  addRestaurant(restaurant) {
    this.#restaurantData = RestaurantStorage.addRestaurant(restaurant);
    this.#onRestaurantUpdate();
  }

  deleteRestaurant(restaurantName) {
    this.#restaurantData = RestaurantStorage.deleteRestaurant(restaurantName);
    this.#onRestaurantUpdate();
  }

  updateRestaurantLike(restaurantName, like) {
    this.#restaurantData = RestaurantStorage.updateRestaurantLike(restaurantName, like);
    this.#onRestaurantUpdate();
  }

  getRestaurantData() {
    return this.#restaurantData;
  }

  setModal(detailModal) {
    this.#detailModal = detailModal;
    this.#createRestaurantList(
      this.sortRestaurantList(this.#currentCategory, this.#currentSorting, this.#currentHeader),
    );
  }
}

export default RestaurantList;
