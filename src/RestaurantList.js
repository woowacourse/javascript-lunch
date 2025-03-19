import RestaurantItem from './components/Restaurant/RestaurantItem.js';
import Restaurant from './domain/Restaurant';
import RestaurantStorage from './domain/RestaurantStorage';
import { LIKE_HEADER_STATE } from './components/LikeHeader';

class RestaurantList {
  #restaurantListContainer; // 레스토랑 리스트 컨테이너
  #onRestaurantUpdate; // 레스토랑 리스트 리로드 함수
  #detailModal; // 레스토랑 상세정보 모달
  #restaurantData; // localStorage 레스토랑 데이터
  #restaurants;
  #currentCategory;
  #currentSorting;
  #currentHeader;
  #onClickItem;

  constructor(restaurantListContainer, onRestaurantUpdate, onClickItem) {
    this.#restaurantListContainer = restaurantListContainer;
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#onClickItem = onClickItem;
    // this.#detailModal = detailModal;

    this.#restaurants = RestaurantStorage.getRestaurants();
    this.#renderRestaurantList();
  }

  #createRestaurantList(restaurantList) {
    this.#restaurantListContainer.innerHTML = '';
    restaurantList.forEach((restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant, this.#onRestaurantUpdate, this.#onClickItem).getElement();
      this.#restaurantListContainer.appendChild(restaurantItem);
    });
  }

  #renderRestaurantList() {
    const restaurantList = this.#restaurants.filterAndSort({
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

    this.#renderRestaurantList();
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

  updateRestaurantIsLiked(restaurantName, isLiked) {
    this.#restaurantData = RestaurantStorage.updateRestaurantIsLiked(restaurantName, isLiked);
    this.#renderRestaurantList();
  }

  getRestaurantData() {
    return this.#restaurants.getAll();
  }
}

export default RestaurantList;
