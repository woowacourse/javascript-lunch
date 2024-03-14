import './style.css';
import { DROP_BOX_MAP, StorageKeyEnum } from '../../constants';
import { DropBoxName, RestaurantInfo, Category, Distance } from '../../types';
import { Restaurant } from '../../domains';
import { FilteringController } from '../../services';
class RestaurantFormModalInner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `             
      <h2 class="restaurant-form-modal-title">새로운 음식점</h2>
      <form>
        <!-- 카테고리 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">카테고리</label>
          <drop-box name="category"></drop-box>
        </div>

        <!-- 음식점 이름 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">이름</label>
          <custom-input type="text" id="restaurant-name" name="restaurant-name" required="true" maxlength="10" placeholder="이름 (10자 이내)"></custom-input>
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
                maxlength="150"
              ></custom-textarea>
        </div>

        <!-- 링크 -->
        <div class="form-item">
          <form-text-filed
          labelText="참고 링크"
          labelForId="restaurant-link"
          key="link"
        >
          <div slot="formChild">
            <custom-input type="text" id="restaurant-link" name="restaurant-link" placeholder="음식점 링크 (http/https 포함, 예시: https://example.com)" maxlength="2000"></custom-input>
          </div>
        </form-text-filed>
        </div>
        <!-- 취소/추가 버튼 -->
        <div class="button-container">
          <default-btn color="white" text="취소하기" type="reset"></default-btn>
          <default-btn color="red" text="추가하기" type="submit"></default-btn>
        </div>
      </form>
    `;

    //이벤트
    const formEl = this.querySelector('form');
    formEl?.addEventListener('reset', this.#handleResetForm.bind(this));
    formEl?.addEventListener('submit', (event) =>
      this.#handleSubmitFormToAddStore(event),
    );
  }

  //이벤트 함수 정의
  #getSelectedOptions() {
    const keys: DropBoxName[] = ['category', 'distance'];

    const options = keys.map((key) => {
      const id = DROP_BOX_MAP.get(key)?.selectProps?.id;

      if (id) {
        const selectElement = document.getElementById(
          id,
        ) as HTMLSelectElement | null;

        const selectedIndex = selectElement?.selectedIndex;
        const selectedValue = selectedIndex
          ? selectElement?.options[selectedIndex].value
          : undefined;
        return {
          key: key,
          value: selectedValue,
        };
      }
    });

    const map: Map<DropBoxName, string> = options.reduce((accumulator, obj) => {
      return accumulator.set(obj?.key, obj?.value);
    }, new Map());

    return map;
  }

  #getRestaurantName() {
    const name = (
      document
        .getElementById('restaurant-name')
        ?.querySelector('input') as HTMLInputElement
    ).value;
    return name;
  }

  #getRestaurantDescription() {
    const description = (
      document
        .getElementById('restaurant-description')
        ?.querySelector('textarea') as HTMLInputElement | null
    )?.value;

    return description;
  }

  #getRestaurantLink() {
    const link = (
      document
        .getElementById('restaurant-link')
        ?.querySelector('input') as HTMLInputElement | null
    )?.value;

    return link;
  }

  #getRestaurantInfo() {
    const selectedOptions = this.#getSelectedOptions();
    const name = this.#getRestaurantName();
    const category = selectedOptions.get('category');
    const distance = selectedOptions.get('distance');

    const info: RestaurantInfo = {
      category: category as Category,
      name: name,
      distance: Number(distance) as Distance,
      description: this.#getRestaurantDescription(),
      link: this.#getRestaurantLink(),
      like: false,
    };

    try {
      const restaurant = new Restaurant(info);

      return restaurant.info;
    } catch (error) {
      return undefined;
    }
  }

  #updateLocalStorage(info: RestaurantInfo) {
    const previousData = localStorage.getItem(StorageKeyEnum.restaurants);

    const restaurants = previousData ? JSON.parse(previousData) : [];

    restaurants.push(info);

    localStorage.setItem(
      StorageKeyEnum.restaurants,
      JSON.stringify(restaurants),
    );
  }

  #closeModal() {
    const modalEl = document
      .querySelector('custom-modal')
      ?.shadowRoot?.querySelector('.modal');

    if (modalEl) {
      modalEl.classList.toggle('open');
      const childSlotEl = document.querySelector('[slot="child"]');
      if (childSlotEl) {
        childSlotEl.innerHTML = '';
      }

      const bodyEl = document.querySelector('body');
      if (bodyEl) bodyEl.style.overflowY = 'scroll';
    }
  }

  #handleResetForm() {
    this.#closeModal();
  }

  #handleSubmitFormToAddStore(event: Event) {
    event.preventDefault();

    const newInfo = this.#getRestaurantInfo();

    if (newInfo) {
      this.#updateLocalStorage(newInfo);
      this.querySelector('form')?.reset();
      FilteringController.showFilteredSortedList();
    }
  }
}
customElements.define('restaurant-form-inner', RestaurantFormModalInner);
