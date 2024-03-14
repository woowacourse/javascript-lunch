import Restaurant from '../Common/Restaurant/Restaurant';
import Select from '../Common/Select/Select';
import { validateRequiredValue, validateRestaurantsName } from '../../validators';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { $ } from '../../utils/dom';
import { RULES } from '../../constants/rules';
import { SELECT_FORM_DATA } from '../../data/selectData';

// TODO: 클래스명 수정
export default class AddRestaurantModal {
  #element;
  #restaurants;

  constructor(element, restaurants) {
    this.#element = element;
    this.#restaurants = restaurants;
    this.render();
    this.#addEvents();
  }

  render() {
    this.#element.innerHTML = `
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
          <input placeholder="이름을 입력해주세요." type="text" name="name" id="name" required>
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
          <button type="button" id="add-restaurant-cancel-button" class="button button--secondary text-caption">취소하기</button>
          <button id="add-button" class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }

  #addEvents() {
    $('add-restaurant-cancel-button').addEventListener('click', () => this.#handleCancelButton());
    $('modal').addEventListener('focusout', (event) => this.#handleInputFocusout(event));
    $('modal').addEventListener('submit', (event) => this.#handleAddButton(event));
  }

  #handleCancelButton() {
    $('modal').classList.remove('modal--open');
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
    this.#restaurants.addRestaurant(this.#parseWalkingTime(inputData));
    this.#insertRestaurantList(inputData);
    $('modal').classList.remove('modal--open');
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
    const category = target['category'].value;
    const name = target['name'].value;
    const walkingTimeFromCampus = Number(target['distance'].value);
    const description = target['description'].value;

    return { category, name, walkingTimeFromCampus, description };
  }

  #parseWalkingTime(inputData) {
    const parsedWalkingTime = Number(inputData.walkingTimeFromCampus);

    return { ...inputData, walkingTimeFromCampus: parsedWalkingTime };
  }
}
