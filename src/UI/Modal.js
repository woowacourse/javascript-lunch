import { $, $$ } from "../utils/Dom";
import { CATEGORY, DISTANCE, INFORMATION_RESTAURANT, 
  FOODCATEGORY_LOCALSTORAGE_KEY, SORTBY_LOCALSTORAGE_KEY, 
  NUMBER__LOCALSTORAGE_KEY, CATEGORY_VALUE, NAME_VALUE, 
  DISTANCE_VALUE, DESCRIPTION_VALUE, LINK_VALUE, 
  FAVORITE_VALUE, ID_VALUE, FAVORITE_UNENROLL } from "../utils/Constant";
import {
  getRestaurantListFromLocalstorage,
  getFoodCategoryFromLocalStorage,
  getSortByFromLocalStorage,
} from "../utils/LocalStorage";
import RestaurantInventory from "./RestaurantInventory";
export default class Modal {
  #template = `
    <div class="modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form class="modal-form">

          <!-- 카테고리 -->
          <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="아시안">아시안</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <!-- 음식점 이름 -->
          <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name" required>
          </div>

          <!-- 거리 -->
          <div class="form-item form-item--required">
            <label for="distance text-caption">거리(도보 이동 시간) </label>
            <select name="distance" id="distance" required>
              <option value="">선택해 주세요</option>
              <option value="5">5분 내</option>
              <option value="10">10분 내</option>
              <option value="15">15분 내</option>
              <option value="20">20분 내</option>
              <option value="30">30분 내</option>
            </select>
          </div>

          <!-- 설명 -->
          <div class="form-item">
            <label for="description text-caption">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <!-- 링크 -->
          <div class="form-item">
            <label for="link text-caption">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>

          <!-- 취소/추가 버튼 -->
          <div class="button-container">
            <button type="button" class="button button--secondary text-caption">취소하기</button>
            <button class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      </div>
    </div>
    `;

  constructor(restaurantList, restaurantRegistry) {
    this.restaurantList = restaurantList;
    this.restaurantRegistry = restaurantRegistry;
  }

  render() {
    document.body.insertAdjacentHTML("beforeend", this.#template);
  }

  initializeButtonEvents() {
    $(".modal-form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.addRestaurant();
    });

    $(".button--secondary").addEventListener("click", this.closeModal);
  }

  addRestaurant() {
    const restaurantInfo = this.setRestaurantInformation();

    this.restaurantList.add(restaurantInfo);
    this.restaurantRegistry.appendRestaurant(
      this.restaurantList.listRestaurant[this.getRestaurantLength()]
    );
    RestaurantInventory.favoriteTabToAllListTab();

    this.restauranListFilter();
    this.closeModal();
  }

  restauranListFilter() {
    const foodCategory = getFoodCategoryFromLocalStorage(FOODCATEGORY_LOCALSTORAGE_KEY);
    const sortBy = getSortByFromLocalStorage(SORTBY_LOCALSTORAGE_KEY);
    this.restaurantList.filterCategory(foodCategory);
    this.restaurantList.filterBySort(sortBy, foodCategory);
  }

  setRestaurantInformation() {
    const restaurantInfo = {};
    const idNumber = getRestaurantListFromLocalstorage(NUMBER__LOCALSTORAGE_KEY);
    const array = [CATEGORY_VALUE,NAME_VALUE,DISTANCE_VALUE,DESCRIPTION_VALUE,LINK_VALUE,FAVORITE_VALUE,];

    $$(".form-item").forEach((val, index) => {
      restaurantInfo[array[index]] = val.children[1].value;
    });
    restaurantInfo[ID_VALUE] = idNumber;
    restaurantInfo[FAVORITE_VALUE] = FAVORITE_UNENROLL;

    localStorage.setItem(NUMBER__LOCALSTORAGE_KEY, idNumber + 1);
    return restaurantInfo;
  }

  getRestaurantLength() {
    return this.restaurantList.listRestaurant.length - 1;
  }

  closeModal = () => {
    this.resetValue();
    $(".modal").style.display = "none";
  };

  resetValue() {
    $$(".form-item").forEach((val, index) => {
      if (index === CATEGORY || index === DISTANCE) {
        val.children[INFORMATION_RESTAURANT].value = "";
        return;
      }

      val.children[INFORMATION_RESTAURANT].value = null;
    });
  }
}
