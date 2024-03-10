import { RESTAURANT_INFO_FOR_VALIDATE_TEST } from '../../data/restaurantData.ts';
import { Restaurant } from '../../domains/index.ts';
import { RestaurantInfoKey, RestaurantInfo } from '../../types/index.ts';

class FormTextField extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const labelText = this.getAttribute('labelText');
    const labelForId = this.getAttribute('labelForId');
    const key = this.getAttribute('key');

    const labelEl = document.createElement('label');
    if (labelForId) labelEl.setAttribute('for', labelForId);
    labelEl.textContent = labelText;

    const slot = document.createElement('slot'); // Slot 요소 생성
    slot.setAttribute('name', 'formChild'); // Slot의 이름 설정

    const errorMessageBoxEl = document.createElement('error-message-box');

    shadow.innerHTML = `
      <style>
        error-message-box{
          color: var(--lunch-primary-color);
          font-weight: 500;
          font-size: 12px;
        }
        label {
          margin-bottom: 6px;
          color: var(--lunch-grey-scale-4-color);
          font-size: var(--label-font-size);
          line-height: 20px;
        }
      </style>
    `;

    shadow.appendChild(labelEl);
    shadow.appendChild(slot);
    shadow.appendChild(errorMessageBoxEl);

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
    const slot = this.shadowRoot?.querySelector('slot');
    const slotContent = slot?.querySelector('slot')?.assignedNodes()[0];

    if (slotContent) {
      slotContent.addEventListener('change', (event) =>
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
    const errorMessageBoxEl =
      this.shadowRoot?.querySelector('error-message-box');

    if (error instanceof Error && errorMessageBoxEl instanceof HTMLElement) {
      errorMessageBoxEl.textContent = error.message || null;
    }
  }
}
customElements.define('form-text-filed', FormTextField);
