import { $, dispatchCustomEvent } from '../utils/dom';
import { uuid } from '../utils/uuid';

customElements.define(
  'restaurant-register-modal',
  class RestaurantRegisterModal extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form class="restaurant-register-form">
        <div class="form-item form-item--required">
          <label for="category" class="text-caption">카테고리</label>
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

        <div class="form-item form-item--required">
          <label for="name" class="text-caption">이름</label>
          <input type="text" name="name" id="name" required>
        </div>

        <div class="form-item form-item--required">
          <label for="distance" class="text-caption">거리(도보 이동 시간) </label>
          <select name="distance" id="distance" required>
            <option value="">선택해 주세요</option>
            <option value="5">5분 내</option>
            <option value="10">10분 내</option>
            <option value="15">15분 내</option>
            <option value="20">20분 내</option>
            <option value="30">30분 내</option>
          </select>
        </div>

        <div class="form-item">
          <label for="description" class="text-caption">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div class="form-item">
          <label for="link" class="text-caption">참고 링크</label>
          <input type="url" placeholder="https://www.google.com" name="link" id="link">
          <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        </div>

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption cancel-button">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
      `;
    }

    connectedCallback() {
      $('.restaurant-register-form').addEventListener('submit', (e) => this.handleSubmit(e));
      $('.cancel-button').addEventListener('click', this.closeModal);
    }

    handleSubmit(e) {
      e.preventDefault();

      const restaurant = this.createRestaurantInfo([...e.target.elements].slice(0, 5));
      this.dispatch(restaurant);
      this.resetForm(e.target);

      $('custom-modal').closeModal();
    }

    createRestaurantInfo(formElements) {
      const [category, name, distance, description, link] = formElements.map((el) => {
        if (el.id === 'distance') return Number(el.value);

        return el.value;
      });

      return {
        id: uuid(),
        category,
        name,
        distance,
        description,
        link,
      };
    }

    dispatch(data) {
      dispatchCustomEvent($('custom-modal'), {
        eventType: 'registerRestaurant',
        data,
      });
    }

    resetForm($form) {
      $form.reset();
    }
  }
);
