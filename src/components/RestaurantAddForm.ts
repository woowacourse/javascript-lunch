import { Errors, Restaurant } from '../types/types';
import { ERROR_MESSAGE, MESSAGE, SELECT_OPTIONS } from '../constants/constants';
import { $ } from '../utils/domSelectors';
import restaurantFormValidator from '../validators/restaurantFormValidator';
import Select from './Select';
import Input from './Input';
import { FORM_ATTRIBUTE } from '../constants/domAttributes';

class RestaurantAddForm {
  private categorySelect: Select;
  private distanceSelect: Select;
  private nameInput: Input;
  private linkInput: Input;

  constructor() {
    this.categorySelect = new Select(FORM_ATTRIBUTE.CATEGORY_SELECT, SELECT_OPTIONS.CATEGORY);
    this.distanceSelect = new Select(FORM_ATTRIBUTE.DISTANCE_SELECT, SELECT_OPTIONS.DISTANCE);
    this.nameInput = new Input(FORM_ATTRIBUTE.NAME_INPUT);
    this.linkInput = new Input(FORM_ATTRIBUTE.LINK_INPUT);
  }

  showFormErrors(errors: Errors) {
    if (errors.category) this.categorySelect.showErrorMessage(ERROR_MESSAGE.EMPTY_CATEGORY);

    if (errors.name) this.nameInput.showErrorMessage(ERROR_MESSAGE.INVALID_NAME);

    if (errors.distance) this.distanceSelect.showErrorMessage(ERROR_MESSAGE.EMPTY_DISTANCE);

    if (errors.link) this.linkInput.showErrorMessage(ERROR_MESSAGE.INVALID_LINK);
  }

  removeErrorMessages() {
    this.categorySelect.addRemoveErrorMessageEvent();
    this.distanceSelect.addRemoveErrorMessageEvent();
    this.nameInput.addRemoveErrorMessageEvent();
    this.linkInput.addRemoveErrorMessageEvent(MESSAGE.LINK_DEFAULT_CAPTION);
  }

  addSubmitEvent(closeModal: CallableFunction, addRestaurant: CallableFunction) {
    const restaurantAddForm = $('#restaurant-add-form') as HTMLFormElement;

    restaurantAddForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formData: FormData = new FormData(target);

      const restaurantItem = Object.fromEntries(
        [...formData].map(([key, value]) => [key, key === 'distance' ? Number(value) : value])
      ) as Omit<Restaurant, 'favorite'>;

      const formErrors: Errors = restaurantFormValidator.verify(restaurantItem);
      const hasError = Object.values(formErrors).some(Boolean);

      if (!hasError) {
        closeModal();
        return addRestaurant(restaurantItem);
      }

      this.showFormErrors(formErrors);
      this.removeErrorMessages();
    });
  }

  addEvent(closeModal: CallableFunction, addRestaurant: CallableFunction) {
    const closeButton = $('#modal-close-button') as HTMLButtonElement;

    closeButton.addEventListener('click', () => {
      closeModal();
    });

    this.addSubmitEvent(closeModal, addRestaurant);
  }

  create() {
    return `
      <form id="restaurant-add-form" novalidate>
        <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          ${this.categorySelect.create()}
          <span class="text-caption info-text" id="category-caption"></span>
        </div>

        <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          ${this.nameInput.create()}
          <span class="text-caption info-text" id="name-caption"></span>
        </div>

        <div class="form-item form-item--required">
          <label for="distance text-caption">거리(도보 이동 시간) </label>
          ${this.distanceSelect.create()}
          <span class="text-caption info-text" id="distance-caption"></span>
        </div>

        <div class="form-item">
          <label for="description text-caption">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption info-text"
            >메뉴 등 추가 정보를 입력해 주세요.</span
          >
        </div>

        <div class="form-item">
          <label for="link text-caption">참고 링크</label>
          ${this.linkInput.create()}
          <span class="help-text text-caption info-text" id="link-caption"
            >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
          >
        </div>

        <div class="button-container">
          <button
            type="button"
            id="modal-close-button"
            class="button button--secondary text-caption"
          >
            취소하기
          </button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>`;
  }
}

export default RestaurantAddForm;
