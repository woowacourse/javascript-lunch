import InputDropDown from './components/InputDropDown.js';
import RestaurantItem from './components/Restaurant/RestaurantItem.js';
import CATEGORY from './constant/category.js';
import Restaurant from './domain/Restaurant.js';
import RestaurantStorage from './domain/RestaurantStorage.js';

class RestaurantList {
  #restaurantListContainer; // 레스토랑 리스트 컨테이너
  #restaurants;
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

    this.#restaurants = RestaurantStorage.getRestaurants();
    this.#renderRestaurantList();
  }

  #createRestaurantList(restaurantList) {
    this.#restaurantListContainer.innerHTML = '';
    restaurantList.forEach((restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant, this.#onRestaurantUpdate, this.#detailModal).getElement();
      this.#restaurantListContainer.appendChild(restaurantItem);
    });
  }

  #renderRestaurantList() {
    const restaurantList = this.#restaurants.filter({
      category: this.#currentCategory,
      sorting: this.#currentSorting,
      header: this.#currentHeader,
    });

    this.#createRestaurantList(restaurantList);
  }

  sortRestaurantList(category, sorting, currentHeader) {
    this.#currentCategory = category;
    this.#currentSorting = sorting;
    this.#currentHeader = currentHeader;

    const filteredList = this.#restaurants.filter({
      category: this.#currentCategory,
      sorting: this.#currentSorting,
      header: this.#currentHeader,
    });

    this.#createRestaurantList(filteredList);
    return filteredList;
  }

  addRestaurant(restaurant) {
    this.#restaurantData = RestaurantStorage.addRestaurant(restaurant);
    this.#restaurants = this.#restaurantData;
    this.#renderRestaurantList();
  }

  deleteRestaurant(restaurantName) {
    this.#restaurantData = RestaurantStorage.deleteRestaurant(restaurantName);
    this.#restaurants = this.#restaurantData;
    this.#renderRestaurantList();
  }

  updateRestaurantLike(restaurantName, like) {
    this.#restaurantData = RestaurantStorage.updateRestaurantLike(restaurantName, like);
    this.#renderRestaurantList();
  }

  getRestaurantData() {
    return this.#restaurants.getAll();
  }

  setModal(detailModal) {
    this.#detailModal = detailModal;
    this.#renderRestaurantList();
  }
}

export default RestaurantList;
