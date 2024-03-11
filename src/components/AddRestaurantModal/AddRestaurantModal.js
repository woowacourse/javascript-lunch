import Restaurant from '../Restaurant/Restaurant';
import { validateRequiredValue, validateRestaurantsName } from '../../validators';
import tryCatchWrapper from '../../utils/tryCatchWrapper';
import { $ } from '../../utils/dom';
import { RULES } from '../../constants/rules';

export default class AddRestaurantModal {
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.addEvent();
  }

  render() {
    // TODO: option 상수화
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

  addEvent() {
    this.handleCancelButton();
    this.handleCreationButton();
    this.handleInputFocusout();
  }

  handleInputFocusout() {
    $('restaurant-creation-modal').addEventListener('focusout', ({ target }) => {
      if (RULES.requiredIds.some((id) => id === target.id)) {
        tryCatchWrapper(
          () => this.validateRequirements(target.id),
          ({ message }) => ($(`${target.id}-error`).innerText = message),
        );
      }
    });
  }

  // TODO: 이벤트를 addRestaurant에 보낼 것인지. 보내게 되면 prop drilling이 일어남. 어떤 방법이 더 좋은 것인가. 그렇게 된다면 target['name']으로 가져올 수 있음.
  handleCreationButton() {
    $('restaurant-creation-modal').addEventListener('submit', (event) => {
      event.preventDefault();

      if (event.submitter.id === 'add-button') {
        tryCatchWrapper(
          () => this.addRestaurant(),
          ({ message }) => alert(message),
        );
      }
    });
  }

  handleCancelButton() {
    $('restaurant-creation-modal').addEventListener('click', ({ target }) => {
      if (target.closest('#cancel-button') || target.closest('#modal-backdrop')) {
        $('restaurant-creation-modal').classList.remove('modal--open');
      }
    });
  }

  addRestaurant() {
    const inputData = this.getInputData();

    this.validateIputData(inputData);
    this.restaurants.addRestaurant(inputData);
    $('restaurant-creation-modal').classList.remove('modal--open');
    this.insertRestaurantList(inputData);
  }

  validateIputData(inputData) {
    const restaurantNames = this.restaurants.storageData.map((restaurant) => restaurant.name);

    validateRestaurantsName({ restaurantNames, name: inputData.name });
    RULES.requiredIds.forEach((id) => this.validateRequirements(id));
  }

  validateRequirements(id) {
    validateRequiredValue(id, $(id).value);
    $(`${id}-error`).innerText = '';
  }

  insertRestaurantList(inputData) {
    $('restaurant-list').insertAdjacentHTML('afterbegin', new Restaurant().render(inputData));
    $('restaurant-input-form').reset();
  }

  getInputData() {
    const category = $('category').options[$('category').selectedIndex].value;
    const name = $('name').value;
    const walkingTimeFromCampus = $('distance').options[$('distance').selectedIndex].value;
    const description = $('description').value;

    return { category, name, walkingTimeFromCampus, description };
  }
}
