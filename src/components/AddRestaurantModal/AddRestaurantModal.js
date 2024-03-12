import Restaurant from '../Common/Restaurant/Restaurant';
import Select from '../Common/Select/Select';
import { validateRequiredValue, validateRestaurantsName } from '../../validators';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { $ } from '../../utils/dom';
import { RULES, SELECT_FORM_DATA } from '../../constants/rules';

export default class AddRestaurantModal {
  #restaurants;

  constructor(restaurants) {
    this.#restaurants = restaurants;
    this.#addEvents();
  }

  render() {
    return `
    <!-- 음식점 추가 모달 -->
    <div id="modal-backdrop" class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="restaurant-input-form">

        <!-- 카테고리 -->
        <div class="form-item form-item--required">
          ${Select(SELECT_FORM_DATA.category)}
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
          ${Select(SELECT_FORM_DATA.distance)}
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

  #addEvents() {
    $('add-restaurant-modal').addEventListener('click', (event) => this.#handleCancelButton(event));
    $('add-restaurant-modal').addEventListener('focusout', (event) =>
      this.#handleInputFocusout(event),
    );
    $('add-restaurant-modal').addEventListener('submit', (event) => this.#handleAddButton(event));
  }

  #handleCancelButton(event) {
    if (event.target.closest('#cancel-button') || event.target.closest('#modal-backdrop')) {
      $('add-restaurant-modal').classList.remove('modal--open');
    }
  }

  #handleInputFocusout(event) {
    if (RULES.requiredIds.some((id) => id === event.target.id)) {
      tryCatchWrapper(
        () => this.#validateRequirements(event.target.id),
        ({ message }) => ($(`${event.target.id}-error`).innerText = message),
      );
    }
  }

  #handleAddButton(event) {
    event.preventDefault();

    if (event.submitter.id === 'add-button') {
      tryCatchWrapper(
        () => this.#addRestaurant(event),
        ({ message }) => alert(message),
      );
    }
  }

  #addRestaurant(event) {
    const inputData = this.#getInputData(event.target);

    this.#validateInputData(inputData);
    this.#restaurants.addRestaurant(inputData);
    $('add-restaurant-modal').classList.remove('modal--open');
    this.#insertRestaurantList(inputData);
  }

  #validateInputData(inputData) {
    const restaurantNames = this.#restaurants.storageData.map((restaurant) => restaurant.name);

    validateRestaurantsName({ restaurantNames, name: inputData.name });
    RULES.requiredIds.forEach((id) => this.#validateRequirements(id));
  }

  #validateRequirements(id) {
    validateRequiredValue(id, $(id).value);
    $(`${id}-error`).innerText = '';
  }

  #insertRestaurantList(inputData) {
    $('restaurant-list').insertAdjacentHTML('afterbegin', Restaurant(inputData));
    $('restaurant-input-form').reset();
  }

  #getInputData(target) {
    // TODO: 숫자 파싱 문제 해결
    const category = target['category'].value;
    const name = target['name'].value;
    const walkingTimeFromCampus = Number(target['distance'].value);
    const description = target['description'].value;

    return { category, name, walkingTimeFromCampus, description };
  }
}
