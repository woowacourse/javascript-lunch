import './style.css';

import { DROP_BOX_MAP } from '../../constants';
import { Restaurant, RestaurantList } from '../../domains';
import { FilteringController } from '../../services';
import { DropBoxName, RestaurantInfo, Category, Distance } from '../../types';

class RestaurantFormModalInner extends HTMLElement {
  #newInfo: RestaurantInfo | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const templateEl = document.getElementById(
      'template-restaurant-modal-inner',
    );

    if (templateEl instanceof HTMLTemplateElement) {
      shadowRoot.appendChild(templateEl.content.cloneNode(true));
    }
  }

  connectedCallback() {
    // this.innerHTML = /* html */ `
    //   <h2 class="restaurant-form-modal-title">새로운 음식점</h2>
    //   <form>
    //     <!-- 카테고리 -->
    //     <div class="form-item form-item--required">
    //       <label for="restaurant-name">카테고리</label>
    //       <drop-box name="category"></drop-box>
    //     </div>

    //     <!-- 음식점 이름 -->
    //     <div class="form-item form-item--required">
    //       <label for="restaurant-name">이름</label>
    //       <custom-input type="text" id="restaurant-name" name="restaurant-name" required="true" maxlength="10" placeholder="이름 (10자 이내)"></custom-input>
    //     </div>

    //     <!-- 거리 -->
    //     <div class="form-item form-item--required">
    //       <label for="restaurant-name">거리(도보 이동 시간)</label>
    //         <drop-box name="distance"></drop-box>
    //     </div>
    //     <!-- 설명 -->
    //     <div class="form-item">
    //       <label for="restaurant-description">설명</label>
    //       <custom-textarea
    //             name="restaurant-description"
    //             id="restaurant-description"
    //             cols="30"
    //             rows="5"
    //             placeholder="메뉴 등 추가 정보를 입력해 주세요.(150자 이내)"
    //             maxlength="150"
    //       >
    //       </custom-textarea>
    //     </div>

    //     <!-- 링크 -->
    //     <div class="form-item">
    //       <form-text-filed
    //       labelText="참고 링크"
    //       labelForId="restaurant-link"
    //       key="link"
    //       >
    //         <div slot="formChild">
    //           <custom-input type="text" id="restaurant-link" name="restaurant-link" placeholder="음식점 링크 (http/https 포함, 예시: https://example.com)" maxlength="2000"></custom-input>
    //         </div>
    //       </form-text-filed>
    //     </div>
    //     <!-- 취소/추가 버튼 -->
    //     <div class="button-container">
    //       <default-btn color="white" text="취소하기" type="reset"></default-btn>
    //       <default-btn color="red" text="추가하기" type="submit"></default-btn>
    //     </div>
    //   </form>
    // `;

    // 이벤트
    const formEl = this.shadowRoot?.querySelector('form');

    if (formEl instanceof HTMLFormElement) {
      formEl.addEventListener('reset', this.#handleResetForm.bind(this));
      formEl.addEventListener('submit', (event) =>
        this.#handleSubmitFormToAddStore(event),
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
    const el = document
      .getElementById(elementId)
      ?.querySelector(textFiledTagName);

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      return el.value;
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

    this.#newInfo = new Restaurant(info).info;
  }

  #addToRestaurantList(info: RestaurantInfo) {
    new RestaurantList().addRestaurant(info);
  }

  #closeModal() {
    const modalEl = document
      .querySelector('custom-modal')
      ?.shadowRoot?.querySelector('.modal');

    modalEl?.classList.toggle('open');

    const bodyEl = document.querySelector('body');
    if (bodyEl) bodyEl.style.overflowY = 'scroll';
  }

  #handleResetForm() {
    this.#closeModal();
  }

  #handleSubmitFormToAddStore(event: Event) {
    event.preventDefault();
    this.#getRestaurantInfo();

    if (this.#newInfo) {
      this.#addToRestaurantList(this.#newInfo);
      this.querySelector('form')?.reset();
      FilteringController.showFilteredSortedList();
    }
  }
}

customElements.define('restaurant-form-inner', RestaurantFormModalInner);
