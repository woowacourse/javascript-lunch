import { Restaurant } from '../../domains';
import { RestaurantInfoKey } from '../../types';

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
    const $label = document.createElement('label');

    if (labelForId) $label.setAttribute('for', labelForId);
    $label.textContent = labelText;
    // $customTextContainer
    const $customTextContainer = document.createElement('div');
    $customTextContainer.className = 'custom-text-container';
    // errorMessage
    const errorMessageBoxEl = document.createElement('error-message-box');

    this.appendChild(style);
    this.appendChild($label);
    this.appendChild($customTextContainer);
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
      'favorite',
      'link',
      'name',
    ];

    return key ? ([...restaurantInfoKeys] as string[]).includes(key) : false;
  }

  #addEventToChange(key: RestaurantInfoKey) {
    const $customTextContainer = this.querySelector('.custom-text-container');
    const $inputOrTextarea =
      $customTextContainer?.firstElementChild?.firstChild;

    if (
      $inputOrTextarea instanceof HTMLInputElement ||
      $inputOrTextarea instanceof HTMLTextAreaElement
    ) {
      $inputOrTextarea.addEventListener('change', (event) =>
        this.#handleChangeToValidateValue(event, key),
      );
    }
  }

  #handleChangeToValidateValue(event: Event, key: RestaurantInfoKey) {
    const { value } = event.target as HTMLInputElement | HTMLTextAreaElement;

    try {
      this.#checkInfoValidate(key, value);
      this.#handleErrorMessage('');
    } catch (error) {
      this.#handleErrorMessage(error);
    }
  }

  #checkInfoValidate(key: RestaurantInfoKey, value: string) {
    const restaurant = new Restaurant();

    switch (key) {
      case 'category':
        restaurant.validateCategory(value);
        break;
      case 'description':
        restaurant.validateDescription(value);
        break;
      case 'distance':
        restaurant.validateDistance(value);
        break;
      case 'name':
        restaurant.validateName(value);
        break;
      case 'link':
        restaurant.validateLink(value);
        break;
      default:
        break;
    }
  }

  #handleErrorMessage(error: unknown) {
    const $errorMessageBox = this.querySelector('error-message-box');

    if ($errorMessageBox instanceof HTMLElement) {
      $errorMessageBox.textContent =
        error instanceof Error ? error.message : null;
    }
  }
}

export default FormTextField;
