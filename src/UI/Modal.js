import { $, $$ } from "../utils/Dom";
import {
  CATEGORY_NAME,
  FORM_ARRAY,
  ERROR_MESSAGE,
  DISTANCE,
} from "../constants";
import Validator from "../Validator";

export default class Modal {
  #template = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form class="modal-form">

          <!-- 카테고리 -->
          <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              <option value="${CATEGORY_NAME.korean}">${CATEGORY_NAME.korean}</option>
              <option value="${CATEGORY_NAME.chinese}">${CATEGORY_NAME.chinese}</option>
              <option value="${CATEGORY_NAME.japanese}">${CATEGORY_NAME.japanese}</option>
              <option value="${CATEGORY_NAME.western}">${CATEGORY_NAME.western}</option>
              <option value="${CATEGORY_NAME.asian}">${CATEGORY_NAME.asian}</option>
              <option value="${CATEGORY_NAME.etc}">${CATEGORY_NAME.etc}</option>
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
              <option value="${DISTANCE.five}">${DISTANCE.five}분 내</option>
              <option value="${DISTANCE.ten}">${DISTANCE.ten}분 내</option>
              <option value="${DISTANCE.fifteen}">${DISTANCE.fifteen}분 내</option>
              <option value="${DISTANCE.twenty}">${DISTANCE.twenty}분 내</option>
              <option value="${DISTANCE.thirty}">${DISTANCE.thirty}분 내</option>
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
    `;

  constructor(restaurantList, store) {
    this.restaurantList = restaurantList;
    this.store = store;
    this.init();
  }

  init() {
    this.modal = $(".modal");
    this.modal.insertAdjacentHTML("beforeend", this.#template);
    this.modalForm = $(".modal-form");
    this.addRestaurantHandler();
    this.addEvent();
  }

  addRestaurantHandler() {
    this.modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const restaurantInfo = this.setRestaurant();
      const hasError = this.validateRestaurantInfo(restaurantInfo);
      if (!hasError) {
        this.addRestaurant(restaurantInfo);
        this.renderRestaurant();
        this.closeModal();
      }
    });
  }

  validateRestaurantInfo(restaurantInfo) {
    if (this.isInvalidName(restaurantInfo.name)) return true;
    if (this.isDuplicated(this.store.getRestaurantList(), restaurantInfo.name))
      return true;
    if (this.isInvalidURL(restaurantInfo.link)) return true;
    return false;
  }

  isInvalidName(restaurantName) {
    if (Validator.name(restaurantName)) {
      alert(ERROR_MESSAGE.NAME);
      return true;
    }
    return false;
  }

  isDuplicated(restaurantList, inputName) {
    if (Validator.duplicatedName(restaurantList, inputName)) {
      alert(ERROR_MESSAGE.DUPLICATED);
      return true;
    }
    return false;
  }

  isInvalidURL(restaurantLink) {
    if (Validator.url(restaurantLink) && restaurantLink !== "") {
      alert(ERROR_MESSAGE.URL);
      return true;
    }
    return false;
  }

  addRestaurant(restaurantInfo) {
    this.restaurantList.add(restaurantInfo);
  }

  setRestaurant() {
    const restaurantInfo = {};
    $$(".form-item").forEach((inputValue, index) => {
      restaurantInfo[FORM_ARRAY[index]] = inputValue.children[1].value;
    });
    restaurantInfo["id"] = Date.now();
    restaurantInfo["favorite"] = false;
    return restaurantInfo;
  }

  renderRestaurant() {
    $(".restaurant-list").replaceChildren();
    const categoryFilter = $("#category-filter");
    categoryFilter.value = CATEGORY_NAME.total;
    categoryFilter.dispatchEvent(new Event("change"));
  }

  closeModal = () => {
    this.modalForm.reset();
    this.modal.style.display = "none";
  };

  closeEscape = (event) => {
    if (!this.isVisibleModal()) return;
    if (event.key !== "Escape") return;
    this.closeModal();
  };

  closeBackDrop = () => {
    if (!this.isVisibleModal()) return;
    this.closeModal();
  };

  addEvent() {
    window.addEventListener("keyup", this.closeEscape);
    $(".modal-backdrop").addEventListener("click", this.closeBackDrop);
    $(".button--secondary").addEventListener("click", this.closeModal);
  }

  isVisibleModal() {
    return this.modal.style.display === "block";
  }
}
