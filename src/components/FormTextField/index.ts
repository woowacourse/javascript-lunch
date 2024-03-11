import { RESTAURANT_INFO_FOR_VALIDATE_TEST } from '../../data/restaurantData';
import { Restaurant } from '../../domains';
import { RestaurantInfoKey, RestaurantInfo } from '../../types';

class FormTextField extends HTMLElement {
  $customTextField: HTMLElement | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    // style
    const style = document.createElement('style');
    style.textContent = `
      error-message-box{
        color: var(--lunch-primary-color);
        font-weight: 500;
        font-size: 12px;
        padding=left:18px;
      }
      label {
        margin-bottom: 6px;
        color: var(--lunch-grey-scale-4-color);
        font-size: var(--label-font-size);
        line-height: 20px;
      }
    `;
    // label
    const labelText = this.getAttribute('labelText');
    const labelForId = this.getAttribute('labelForId');
    const labelEl = document.createElement('label');

    if (labelForId) labelEl.setAttribute('for', labelForId);
    labelEl.textContent = labelText;
    // customTextContainerEl
    const customTextContainerEl = document.createElement('div');
    customTextContainerEl.className = 'custom-text-container';
    // errorMessage
    const errorMessageBoxEl = document.createElement('error-message-box');

    this.appendChild(style);
    this.appendChild(labelEl);
    this.appendChild(customTextContainerEl);
    this.appendChild(errorMessageBoxEl);
  }

  handleAddEvent() {
    const key = this.getAttribute('key');

    if (this.#isRestaurantInfoKey(key)) {
      this.#addEventToChange(key);
    }
  }

  #isRestaurantInfoKey(key: string | null): key is RestaurantInfoKey {
    const restaurantInfoKeys: RestaurantInfoKey[] = [
      'category',
      'description',
      'distance',
      'distance',
      'like',
      'link',
      'name',
    ];

    return key ? ([...restaurantInfoKeys] as string[]).includes(key) : false;
  }

  #addEventToChange(key: RestaurantInfoKey) {
    const customTextContainerEl = this.querySelector('.custom-text-container');
    const inputOrTextareaEl =
      customTextContainerEl?.firstElementChild?.firstChild;

    if (
      inputOrTextareaEl instanceof HTMLInputElement ||
      inputOrTextareaEl instanceof HTMLTextAreaElement
    ) {
      inputOrTextareaEl.addEventListener('change', (event) =>
        this.#handleChangeToValidateValue(event, key),
      );
    }
  }

  #handleChangeToValidateValue(event: Event, key: RestaurantInfoKey) {
    const { value } = event.target as HTMLInputElement | HTMLTextAreaElement;
    const newInfo: RestaurantInfo = { ...RESTAURANT_INFO_FOR_VALIDATE_TEST };
    (newInfo[key] as string) = value;

    try {
      // eslint[no-new] rule :off
      // eslint-disable-next-line
      new Restaurant(newInfo);
      this.#handleErrorMessage('');
    } catch (error) {
      this.#handleErrorMessage(error);
    }
  }

  #handleErrorMessage(error: unknown) {
    const errorMessageBoxEl = this.querySelector('error-message-box');

    if (error instanceof Error && errorMessageBoxEl instanceof HTMLElement) {
      errorMessageBoxEl.textContent = error.message || null;
    }
  }
}

export default FormTextField;
