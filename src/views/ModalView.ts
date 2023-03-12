import { $ } from '../utils/domSelectors';
import { Errors, Restaurant } from '../types/types';
import restaurantFormValidator from '../validators/restaurantFormValidator';
import { ERROR_MESSAGE, MESSAGE } from '../constants/constants';

class ModalView {
  private restaurantAddForm = $<HTMLFormElement>('#restaurant-add-form');
  private modal = $<HTMLDialogElement>('#add-restaurant-modal');
  private closeButton = $<HTMLButtonElement>('#modal-close-button');
  private categoryInput = $<HTMLSelectElement>('#category');
  private categoryInputCaption = $<HTMLSpanElement>('#category-caption');
  private nameInput = $<HTMLInputElement>('#name');
  private nameInputCaption = $<HTMLSpanElement>('#name-caption');
  private distanceInput = $<HTMLInputElement>('#distance');
  private distanceInputCaption = $<HTMLSpanElement>('#distance-caption');
  private linkInput = $<HTMLInputElement>('#link');
  private linkInputCaption = $<HTMLSpanElement>('#link-caption');

  constructor() {
    this.initInputCaptions();
    this.addCloseButtonClickEvent();
    this.addModalBackdropClickEvent();
  }

  initInputCaptions() {
    this.categoryInputCaption.textContent = ERROR_MESSAGE.EMPTY_CATEGORY;
    this.nameInputCaption.textContent = ERROR_MESSAGE.INVALID_NAME;
    this.distanceInputCaption.textContent = ERROR_MESSAGE.EMPTY_DISTANCE;
  }

  addSubmitEventHandler(
    onSubmitRestaurantAddForm: CallableFunction,
    getRestaurantNames: CallableFunction,
  ) {
    this.restaurantAddForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData: FormData = new FormData(this.restaurantAddForm);
      const restaurant = Object.fromEntries(
        [...formData].map(([key, value]) => {
          if (key === 'distance') return [key, Number(value)];
          if (key === 'favorite') return [key, Boolean(value)];
          return [key, String(value)];
        }),
      ) as Restaurant;

      const errors: Errors = restaurantFormValidator.verify(restaurant, getRestaurantNames());
      const hasError = Object.values(errors).some((error) => error === true);

      if (!hasError) {
        this.restaurantAddForm.reset();
        this.modal.close();
        return onSubmitRestaurantAddForm(restaurant);
      }

      this.showErrorMessages(errors);
      this.addErrorMessageRemovingEvents();
    });
  }

  showErrorMessages(errors: Errors) {
    if (errors.category) this.changeStyleForErrorMessage(this.categoryInputCaption);
    if (errors.name) this.changeStyleForErrorMessage(this.nameInputCaption);
    if (errors.distance) this.changeStyleForErrorMessage(this.distanceInputCaption);
    if (errors.link) {
      this.changeStyleForErrorMessage(this.linkInputCaption);
      this.linkInputCaption.textContent = ERROR_MESSAGE.INVALID_LINK;
    }
    if (errors.overlapName) {
      this.changeStyleForErrorMessage(this.nameInputCaption);
      this.nameInputCaption.textContent = ERROR_MESSAGE.OVERLAP_NAME;
    }
  }

  changeStyleForErrorMessage<E extends Element>(element: E) {
    element.classList.add('error-text');
    element.classList.remove('not-visible');
  }

  addCategoryChangeEvent() {
    this.categoryInput.addEventListener(
      'change',
      () => {
        this.categoryInputCaption.classList.remove('error-text');
        this.categoryInputCaption.classList.add('not-visible');
      },
      { once: true },
    );
  }

  addNameInputEvent() {
    this.nameInput.addEventListener(
      'input',
      () => {
        this.nameInputCaption.classList.remove('error-text');
        this.nameInputCaption.classList.add('not-visible');
      },
      { once: true },
    );
  }

  addDistanceChangeEvent() {
    this.distanceInput.addEventListener(
      'change',
      () => {
        this.distanceInputCaption.classList.remove('error-text');
        this.distanceInputCaption.classList.add('not-visible');
      },
      { once: true },
    );
  }

  addLinkInputEvent() {
    this.linkInput.addEventListener(
      'input',
      () => {
        this.linkInputCaption.classList.remove('error-text');
        this.linkInputCaption.textContent = MESSAGE.LINK_DEFAULT_CAPTION;
      },
      { once: true },
    );
  }

  addErrorMessageRemovingEvents() {
    this.addCategoryChangeEvent();
    this.addNameInputEvent();
    this.addDistanceChangeEvent();
    this.addLinkInputEvent();
  }

  addCloseButtonClickEvent() {
    this.closeButton.addEventListener('click', () => {
      this.restaurantAddForm.reset();
      this.modal.close();
    });
  }

  addModalBackdropClickEvent() {
    this.modal.addEventListener('click', (event) => {
      if (event.target instanceof HTMLDialogElement && event.target.nodeName === 'DIALOG') {
        event.target.close();
      }
    });
  }
}

export default ModalView;
