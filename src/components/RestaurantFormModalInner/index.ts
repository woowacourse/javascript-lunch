import './style.css';

import { DROP_BOX_MAP } from '../../constants';
import { Restaurant, RestaurantList } from '../../domains';
import FilteringController from '../../services/FilteringController';
import { DropBoxName, RestaurantInfo, Category, Distance } from '../../types';
import { closeModal } from '../../utils';

class RestaurantFormModalInner extends HTMLElement {
  #newInfo: RestaurantInfo | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /* html */ `
      <h2 class="restaurant-form-modal-title">새로운 음식점</h2>
      <form>
        <!-- 카테고리 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">카테고리</label>
          <drop-box name="category"></drop-box>
        </div>

        <!-- 음식점 이름 -->
        <div class="form-item form-item--required">
          <form-input
            labelText="이름"
            labelForId="restaurant-name"
            key="name"
            type="text"
            required="true",
            placeholder="이름을 입력해주세요(10자 이내)"
            max-length="10"
          > 
          </form-input>
        </div>

        <!-- 거리 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">거리(도보 이동 시간)</label>
            <drop-box name="distance"></drop-box>
        </div>
        <!-- 설명 -->
        <div class="form-item">
          <label for="restaurant-description">설명</label>
          <custom-textarea
            name="restaurant-description"
            id="restaurant-description"
            cols="30"
            rows="5"
            placeholder="메뉴 등 추가 정보를 입력해 주세요.(150자 이내)"
            max-length="150"
          >
          </custom-textarea>
        </div>

        <!-- 링크 -->
        <div class="form-item">
        <form-input
          labelText="참고 링크"
          labelForId="restaurant-link"
          key="link"
          type="text"
          placeholder="음식점 링크 (http/https 포함, 예시: https://example.com)"
          max-length="2000"
        > 
        </form-input>
        </div>
        <!-- 취소/추가 버튼 -->
        <div class="button-container">
          <default-btn color="white" text="취소하기" type="reset"></default-btn>
          <default-btn disabled="true" color="red" text="추가하기" type="submit"></default-btn>
        </div>
      </form>
    `;

    // 이벤트
    const $restaurantForm = this.querySelector('form');

    if ($restaurantForm instanceof HTMLFormElement) {
      $restaurantForm.addEventListener(
        'reset',
        this.#handleResetForm.bind(this),
      );
      $restaurantForm.addEventListener('submit', (event) =>
        this.#handleSubmitFormToAddStore(event),
      );
      $restaurantForm.addEventListener(
        'focusout',
        this.#handleFocusOutToActiveSubmitBtn.bind(this),
      );
    }
  }

  // 이벤트 함수 정의
  #getSelectedOptions() {
    const keys: DropBoxName[] = ['category', 'distance'];

    const options = keys.map((key) => {
      const id = DROP_BOX_MAP.get(key)?.selectProps?.id as string;

      const selectElement = document.getElementById(id);

      if (selectElement instanceof HTMLSelectElement) {
        const { selectedIndex } = selectElement;
        const selectedValue = selectElement.options[selectedIndex].value;

        return {
          key,
          value: selectedValue,
        };
      }

      return undefined;
    });

    const map: Map<DropBoxName, string> = options.reduce(
      (accumulator, obj) => accumulator.set(obj?.key, obj?.value),
      new Map(),
    );

    return map;
  }

  #getTextFieldValue(elementId: string, textFiledTagName: string) {
    const $textField = document
      .getElementById(elementId)
      ?.querySelector(textFiledTagName);

    if (
      $textField instanceof HTMLInputElement ||
      $textField instanceof HTMLTextAreaElement
    ) {
      return $textField.value;
    }

    return undefined;
  }

  #getRestaurantInfo() {
    const selectedOptions = this.#getSelectedOptions();
    const restaurantName = this.#getTextFieldValue('restaurant-name', 'input');
    const category = selectedOptions.get('category');
    const distance = selectedOptions.get('distance');

    if (!restaurantName) return;

    const info: RestaurantInfo = {
      category: category as Category,
      name: restaurantName,
      distance: Number(distance) as Distance,
      description: this.#getTextFieldValue(
        'restaurant-description',
        'textarea',
      ),
      link: this.#getTextFieldValue('restaurant-link', 'input'),
    };

    // consistent-return : off
    // eslint-disable-next-line
    return info;
  }

  #addToRestaurantList(info: RestaurantInfo) {
    new RestaurantList().addRestaurant(info);
  }

  #handleSubmitBtnDisabled(disabled: boolean) {
    const submitBtnEl = this.querySelector('button[type="submit"]');

    if (submitBtnEl instanceof HTMLButtonElement) {
      submitBtnEl.disabled = disabled;
    }
  }

  #handleFocusOutToActiveSubmitBtn() {
    const info = this.#getRestaurantInfo();

    if (!info) return;

    try {
      this.#newInfo = new Restaurant(info).info;
      this.#handleSubmitBtnDisabled(false);
    } catch (error) {
      this.#handleSubmitBtnDisabled(true);
    }
  }

  #handleResetForm() {
    closeModal();
  }

  #handleSubmitFormToAddStore(event: Event) {
    event.preventDefault();
    this.#getRestaurantInfo();

    if (this.#newInfo) {
      this.#addToRestaurantList(this.#newInfo);
      this.querySelector('form')?.reset();
      closeModal();
      FilteringController.showFilteredSortedList();
    }
  }
}

customElements.define('restaurant-form-inner', RestaurantFormModalInner);
