import { RestaurantValidator } from '../../domains';
import { RestaurantTextInfoKey } from '../../types';

class FormTextField extends HTMLElement {
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
    const labelText = this.getAttribute('label-text');
    const labelForId = this.getAttribute('label-for-id');
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

  #isRestaurantInfoKey(key: string | null): key is RestaurantTextInfoKey {
    const restaurantInfoKeys: RestaurantTextInfoKey[] = [
      'description',
      'link',
      'name',
    ];
    return key ? (restaurantInfoKeys as string[]).includes(key) : false;
  }

  #addEventToChange(key: RestaurantTextInfoKey) {
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

  #handleChangeToValidateValue(event: Event, key: RestaurantTextInfoKey) {
    const { value } = event.target as HTMLInputElement | HTMLTextAreaElement;

    try {
      this.#checkInfoValidate(key, value);
      this.#handleErrorMessage('');
    } catch (error) {
      this.#handleErrorMessage(error);
    }
  }

  /**
   * 글자로 입력하는 정보(이름,설명,링크)에 대한 유효성 검사
   */
  #checkInfoValidate(key: RestaurantTextInfoKey, value: string) {
    RestaurantValidator.validateTextAboutInfo(key, value);
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
