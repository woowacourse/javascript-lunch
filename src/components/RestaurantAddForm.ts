import { FormValue, Errors } from '../types';
import { ERROR_MESSAGE, MESSAGE, SELECT_OPTIONS } from '../constants/constants';
import { CAPTION_ATTRIBUTE, FORM_ATTRIBUTE } from '../constants/domAttributes';
import { $ } from '../utils/domSelectors';
import restaurantFormValidator from '../validators/restaurantFormValidator';
import Select from './Select';
import Caption from './FormCaption';
import { createInput } from '../template/InputTemplate';

class RestaurantAddForm {
  private categorySelect: Select;
  private distanceSelect: Select;

  private categorySelectCaption: Caption;
  private distanceSelectCaption: Caption;
  private nameInputCaption: Caption;
  private linkInputCaption: Caption;

  constructor() {
    this.categorySelect = new Select(FORM_ATTRIBUTE.CATEGORY_SELECT, SELECT_OPTIONS.CATEGORY);
    this.distanceSelect = new Select(FORM_ATTRIBUTE.DISTANCE_SELECT, SELECT_OPTIONS.DISTANCE);

    this.categorySelectCaption = new Caption(CAPTION_ATTRIBUTE.CATEGORY_SELECT, 'change');
    this.distanceSelectCaption = new Caption(CAPTION_ATTRIBUTE.DISTANCE_SELECT, 'change');
    this.nameInputCaption = new Caption(CAPTION_ATTRIBUTE.NAME_INPUT, 'input');
    this.linkInputCaption = new Caption(CAPTION_ATTRIBUTE.LINK_INPUT, 'input', MESSAGE.LINK_DEFAULT_CAPTION);
  }

  resetForm() {
    const restaurantAddForm = $('#restaurant-add-form') as HTMLFormElement;
    restaurantAddForm.reset();
  }

  showFormErrors(errors: Errors) {
    if (errors.category) this.categorySelectCaption.showErrorMessage(ERROR_MESSAGE.EMPTY_CATEGORY);

    if (errors.name) this.nameInputCaption.showErrorMessage(ERROR_MESSAGE.INVALID_NAME);

    if (errors.distance) this.distanceSelectCaption.showErrorMessage(ERROR_MESSAGE.EMPTY_DISTANCE);

    if (errors.link) this.linkInputCaption.showErrorMessage(ERROR_MESSAGE.INVALID_LINK);
  }

  removeFormErrors() {
    this.categorySelectCaption.addRemoveErrorMessageEvent();
    this.distanceSelectCaption.addRemoveErrorMessageEvent();
    this.nameInputCaption.addRemoveErrorMessageEvent();
    this.linkInputCaption.addRemoveErrorMessageEvent();
  }

  addSubmitEvent(handleCloseModal: CallableFunction, handleAddRestaurant: CallableFunction) {
    const restaurantAddForm = $<HTMLFormElement>('#restaurant-add-form');

    restaurantAddForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formData: FormData = new FormData(target);

      const restaurantItem = Object.fromEntries(
        [...formData].map(([key, value]) => [key, key === 'distance' ? Number(value) : value])
      ) as FormValue;

      const formErrors: Errors = restaurantFormValidator.verify(restaurantItem);
      const hasError = Object.values(formErrors).some(Boolean);

      if (!hasError) {
        handleCloseModal();
        this.resetForm();
        return handleAddRestaurant({ ...restaurantItem });
      }

      this.showFormErrors(formErrors);
      this.removeFormErrors();
    });
  }

  addCloseButtonClickEvent(handleCloseModal: CallableFunction) {
    const closeButton = $<HTMLButtonElement>('#form-close-button');

    closeButton.addEventListener('click', () => {
      this.resetForm();
      handleCloseModal();
    });
  }

  addEvents(handleCloseModal: CallableFunction, handleAddRestaurant: CallableFunction) {
    this.addCloseButtonClickEvent(handleCloseModal);
    this.addSubmitEvent(handleCloseModal, handleAddRestaurant);
  }

  create() {
    return `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="restaurant-add-form" novalidate>
        <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          ${this.categorySelect.create()}
          <span class="text-caption info-text" id="category-caption"></span>
        </div>

        <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          ${createInput(FORM_ATTRIBUTE.NAME_INPUT)}
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
          ${createInput(FORM_ATTRIBUTE.LINK_INPUT)}
          <span class="help-text text-caption info-text" id="link-caption"
            >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
          >
        </div>

        <div class="button-container">
          <button
            type="button"
            id="form-close-button"
            class="button button--secondary text-caption modal-close-button"
          >
            취소하기
          </button>
          <button type="submit" class="button button--primary text-caption">추가하기</button>
        </div>
      </form>`;
  }
}

export default new RestaurantAddForm();
