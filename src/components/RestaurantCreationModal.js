import Restaurant from './Restaurant';
import { validateRequiredValue, validateRestaurantsName } from '../validators';
import tryCatchWrapper from '../utils/tryCatchWrapper';
import { $ } from '../utils/dom';
import { closeModal } from '../utils/modalHandler';
import { RULES } from '../constants/rules';

export default class RestaurantCreationModal {
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.initEventListeners();
  }

  static getTemplate() {
    return `
    <!-- 음식점 추가 모달 -->
    <div id="modal-backdrop" class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="restaurant-input-form">

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
          <span id="category-error" class="error-message"></span>
        </div>

        <!-- 음식점 이름 -->
        <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          <input type="text" name="name" id="name" required>
          <span id="name-error" class="error-message"></span>
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
          <span id="distance-error" class="error-message"></span>
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
          <button type="button" id="cancel-button" class="button button--secondary text-caption">취소하기</button>
          <button id="add-button" class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    </div>
    `;
  }

  initEventListeners() {
    const modal = $('restaurant-creation-modal');

    modal.addEventListener('focusout', this.handleRequiredInput.bind(this));
    modal.addEventListener('click', this.handleModalClose.bind(this));
    modal.addEventListener('submit', this.handleAddRestaurant.bind(this));
  }

  handleRequiredInput(event) {
    const targetId = event.target.id;

    if (RULES.requiredIds.some((requiredId) => requiredId === targetId)) {
      tryCatchWrapper({
        tryBlock: () => this.validateRequiredInput(targetId),
        catchBlock: ({ message }) => ($(`${targetId}-error`).innerText = message),
      });
    }
  }

  handleModalClose(event) {
    const targetId = event.target.id;

    if (targetId === 'cancel-button' || targetId === 'modal-backdrop') {
      closeModal($('restaurant-creation-modal'));
    }
  }

  handleAddRestaurant(event) {
    event.preventDefault();

    if (event.submitter.id === 'add-button') {
      tryCatchWrapper({
        tryBlock: () => this.addRestaurant(event),
        catchBlock: ({ message }) => alert(message),
      });
    }
  }

  addRestaurant(event) {
    const inputData = this.getInputData(event);

    this.validateUniqueName(inputData);
    closeModal($('restaurant-creation-modal'));
    this.insertRestaurantList(inputData);
  }

  validateUniqueName(inputData) {
    const restaurantNames = this.restaurants.storageData.map((restaurant) => restaurant.name);
    validateRestaurantsName({ restaurantNames, name: inputData.name });
  }

  validateRequiredInput(id) {
    validateRequiredValue(id, $(id).value);
    $(`${id}-error`).innerText = '';
  }

  insertRestaurantList(inputData) {
    $('restaurant-list').insertAdjacentHTML('afterbegin', new Restaurant().render(inputData));
    $('restaurant-input-form').reset();
  }

  getInputData(event) {
    const form = event.target;
    console.log(event);
    const category = form['category'].value;
    const name = form['name'].value;
    const walkingTimeFromCampus = form['distance'].value;
    const description = form['description'].value;

    return { category, name, walkingTimeFromCampus, description };
  }
}
