import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import IRestaurantInput from '@res/interfaces/IRestaurantInput';
import { restaurantStore } from '@res/model/restaurantStore';
import { $, on } from '@res/utils/domUtils';

class AddModalContainer extends Component {
  constructor(element: HTMLElement | Element) {
    super(element);
    this.subscribe();
    this.$target;
  }

  subscribe() {
    eventBus.subscribe('@modal-click', () => {
      this.render().setEvent();
    });

    return this;
  }

  setEvent() {
    on($('.submit-restaurant'), 'click', (event) => {
      event.preventDefault();

      eventBus.dispatch(
        '@add-restaurant',
        this.getInput(),
        this.updateRestaurant.bind(this)
      );

      this.hide();
    });

    return this;
  }

  updateRestaurant(restaurantInput: IRestaurantInput) {
    return restaurantStore.add(restaurantInput).get();
  }

  getInput(): IRestaurantInput {
    return {
      category: this.getElementValue($('#category-input')),
      name: this.getElementValue($('#name-input')),
      distance: this.getElementValue($('#distance-input')),
      description: this.getElementValue($('#description-input')),
      link: this.getElementValue($('#link-input')),
    };
  }

  getElementValue(element: HTMLElement): string {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return element.value;
    }

    return '';
  }

  template(): string {
    return `
      <!-- 음식점 추가 모달 -->
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form class="restaurant-form" >
            <!-- 카테고리 -->
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category-input" required>
                <option value="" disabled selected>선택해 주세요</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="아시안">아시안</option>
                <option value="기타">기타</option>
              </select>
              <p id='category-message' class='input-error-message'><p/>
            </div>

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name-input" required />
              <p id='name-message' class='input-error-message'><p/>
            </div>

            <!-- 거리 -->
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              <select name="distance" id="distance-input" required>
                <option value="" disabled selected>선택해 주세요</option>
                <option value="5">5분 내</option>
                <option value="10">10분 내</option>
                <option value="15">15분 내</option>
                <option value="20">20분 내</option>
                <option value="30">30분 내</option>
              </select>
              <p id='distance-message' class='input-error-message'><p/>
            </div>

            <!-- 설명 -->
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea
                name="description"
                id="description-input"
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
              <p id='description-input' class='input-error-message'><p/>
            </div>

            <!-- 링크 -->
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="link" id="link-input" />
              <span class="help-text text-caption"
                >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
              >
              <p id='link-message' class='input-error-message'><p/>
            </div>

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
              <button
                type="button"
                class="button button--secondary text-caption cancel"
                onClick="this"
              >
                취소하기
              </button>
              <button class="button button--primary text-caption submit-restaurant">
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>`;
  }
}

export default AddModalContainer;
