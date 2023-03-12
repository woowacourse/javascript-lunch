import CustomElement from '../CustomElement';
import { CustomSelectElement } from '..';
import { DEFAULT_MODAL_CATEGORY_OPTIONS, DEFAULT_MODAL_DISTANCE_OPTIONS } from '../../fixtures';

class RegisterRestaurantModal extends CustomElement {
  renderTemplate() {
    return `
      <r-modal>
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="modal-form">
          <r-form-item label="카테고리" required>
            <r-select name="category" id="restaurant-modal-category"></r-select>
          </r-form-item>
          <r-form-item label="이름" required>
            <r-input name="name"></r-input>
          </r-form-item>
          <r-form-item label="거리(도보 이동 시간)" required>
            <r-select name="distanceByMinutes" id="restaurant-modal-distance"></r-select>
          </r-form-item>
          <r-form-item label="설명" helper-text="메뉴 등 추가 정보를 입력해 주세요.">
            <r-textarea name="description"></r-textarea>
          </r-form-item>
          <r-form-item label="참고 링크" helper-text="매장 정보를 확인할 수 있는 링크를 입력해 주세요.">
            <r-input name="referenceUrl"></r-input>
          </r-form-item>
          <div class="button-container">
            <r-button type="button" action="closeModal" variant="secondary" name="취소하기"></r-button>
            <r-button type="submit" action="submitForm" variant="primary" name="추가하기"></r-button>
          </div>
        </form>
      </r-modal>
	  `;
  }

  render() {
    super.render();

    this.initEventHandlers();
    this.initModalSelect();
  }

  generateCreateRestaurantEvent = (event: Event) => {
    event.preventDefault();

    const $category = this.querySelector<HTMLSelectElement>('#restaurant-modal-category select');
    const $name = this.querySelector<HTMLInputElement>('r-input[name="name"] input');
    const $distance = this.querySelector<HTMLSelectElement>('#restaurant-modal-distance select');
    const $description = this.querySelector<HTMLTextAreaElement>(
      'r-textarea[name="description"] textarea',
    );
    const $referenceUrl = this.querySelector<HTMLInputElement>(
      'r-input[name="referenceUrl"] input',
    );

    if (!$category || !$name || !$distance || !$description || !$referenceUrl) return;

    this.dispatchEvent(
      new CustomEvent('createRestaurant', {
        bubbles: true,
        detail: {
          category: $category.value,
          name: $name?.value,
          distanceByMinutes: Number($distance.value),
          description: $description.value,
          referenceUrl: $referenceUrl.value,
        },
      }),
    );
  };

  initEventHandlers = () => {
    const $registerRestaurantFrom = this.querySelector('form');

    if (!$registerRestaurantFrom) return;

    $registerRestaurantFrom.addEventListener('submit', this.generateCreateRestaurantEvent);
  };

  initModalSelect = () => {
    const $category = this.querySelector<CustomSelectElement>('#restaurant-modal-category');
    const $distance = this.querySelector<CustomSelectElement>('#restaurant-modal-distance');

    if (!$category || !$distance) return;

    $category.setInitialOptions(DEFAULT_MODAL_CATEGORY_OPTIONS);
    $distance.setInitialOptions(DEFAULT_MODAL_DISTANCE_OPTIONS);
  };
}

customElements.define('r-register-restaurant-modal', RegisterRestaurantModal);

export default RegisterRestaurantModal;
