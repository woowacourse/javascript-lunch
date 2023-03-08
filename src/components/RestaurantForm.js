import { restaurantService } from '..';
import { CATEGORIES, SELECT_DISTANCE } from '../constants';
import { closeModal } from '../modal';
import selectTemplate from '../template/selectTemplate';
import { arrayElementToObject } from '../utils/util';

export default class RestaurantForm {
  constructor(rootElement, restaurantList) {
    this.$root = rootElement;
    this.$restaurantList = restaurantList;
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    return `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <div class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
        ${selectTemplate({
          name: 'category',
          id: 'category',
          options: [{ value: '', text: '선택해주세요' }, ...arrayElementToObject(CATEGORIES)],
          required: true,
        })}
      </div>

      <!-- 음식점 이름 -->
      <div class="form-item form-item--required">
        <label for="name text-caption">이름</label>
        <input type="text" name="name" id="name" required>
      </div>

      <!-- 거리 -->
      <div class="form-item form-item--required">
        <label for="distance text-caption">거리(도보 이동 시간) </label>
        ${selectTemplate({
          name: 'distance',
          id: 'distance',
          options: SELECT_DISTANCE,
          required: true,
        })}
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
        <button id="cancel-button" type="button" class="button button--secondary text-caption">취소하기</button>
        <button class="button button--primary text-caption">추가하기</button>
      </div>
    </form>
  `;
  }

  bindEvents() {
    const $form = this.$root.querySelector('form');
    const $cancelButton = this.$root.querySelector('#cancel-button');

    $form.addEventListener('submit', this.handleFormSubmit.bind(this));
    $cancelButton.addEventListener('click', closeModal);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const restaurant = {};

    for (const [key, value] of new FormData(event.target)) {
      restaurant[key] = value;
    }

    restaurantService.addRestaurant(restaurant);
    restaurantService.filterRestaurantList();

    this.$restaurantList.restaurants = restaurantService.getFilteredRestaurant();
    this.$restaurantList.remove();
    this.$restaurantList.render();

    closeModal();
  }
}
