import { LOCAL_STORAGE_KEY } from '../constants/LocalStorageKey';
import { DISTANCE_FROM_CAMPUS, RESTAURANT_CATEGORY } from '../domain/Restaurant';
import restaurantCatalog, { ALL_CATEGORY, SORT_CONDITION } from '../domain/RestaurantCatalog';
import mockingData from '../domain/mocking';
import { ALL_RESTAURANTS } from '../view/components/LikeSection';
import { addEventToButton, addEventToForm, updateRestaurantsToLocalStorage } from '../view/components/SubmitFormModal';

class WebController {
  run() {
    this.#init();
    this.#renderDropdownElement();
    addEventToForm();
    addEventToButton();
  }

  #init() {
    // localStorage가 있을 경우 LS데이터를 Server에 넣기.
    this.#initRestaurantCatalogFromLocalStorage();
    // localStorage가 비었을 경우 LS와 Server에 mocking data 둘다 넣기.
    this.#insertDefaultData();
    this.#renderDefaultRestaurantList();
  }

  #insertDefaultData() {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) return;
    mockingData.forEach((data) => {
      restaurantCatalog.pushNewRestaurant(data);
      updateRestaurantsToLocalStorage(data);
    });
  }

  #initRestaurantCatalogFromLocalStorage() {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!localData) return;
    try {
      JSON.parse(localData).forEach((restaurant) => {
        restaurantCatalog.pushNewRestaurant(restaurant);
      });
    } catch (e) {
      alert('LocalStorage의 Data값이 잘못되었습니다.', e.message);
    }
  }

  #renderDefaultRestaurantList() {
    const restaurantCards = document.querySelector('.restaurant-list');
    const SORT_BY_NAME = SORT_CONDITION[0];
    restaurantCards.setAttribute('data-sort-select', SORT_BY_NAME);
    restaurantCards.setAttribute('data-category-select', ALL_CATEGORY);
    restaurantCards.setAttribute('data-like', ALL_RESTAURANTS);
  }

  #renderDropdownElement() {
    this.#renderDropdownOptions('category-select', [ALL_CATEGORY, ...RESTAURANT_CATEGORY]);
    this.#renderDropdownOptions('sort-select', SORT_CONDITION);
    this.#renderDropdownOptions('add-category-select', RESTAURANT_CATEGORY);
    this.#renderDropdownOptions('add-distance-select', DISTANCE_FROM_CAMPUS);
  }

  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
  }
}

export default WebController;
