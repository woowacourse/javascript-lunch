import type { Component } from '../../interface';
import type { Restaurant } from '../../type';
import {
  CATEGORIES,
  DEFAULT_CATEGORY,
  DEFAULT_DISTANCE,
  OPTION_START_INDEX,
  REQUEST_RASTAURANT_KEY,
} from '../../utils/constants';

type AddRestaurantDrawerState = {
  restaurantForm: Restaurant;
  onToggleAddRestaurantDrawer: () => void;
};

type AddRestaurantDrawerProps = {
  $parent: HTMLElement;
  onToggleAddRestaurantDrawer: () => void;
};

export default class AddRestaurantDrawer implements Component<AddRestaurantDrawerState> {
  $target: HTMLElement;
  state: AddRestaurantDrawerState;

  constructor({ $parent, onToggleAddRestaurantDrawer }: AddRestaurantDrawerProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('modal');
    this.$target.classList.add('modal--open');

    this.state = {
      restaurantForm: {
        id: 0,
        name: '',
        category: DEFAULT_CATEGORY,
        distance: DEFAULT_DISTANCE,
        isFavorite: false,
      },
      onToggleAddRestaurantDrawer,
    };

    $parent.append(this.$target);
    this.render();
  }

  addEvent() {
    const $cancelButton = this.$target.querySelector('#modal-cancel');
    const $modalForm = this.$target.querySelector('#modal-form') as HTMLElement;

    $cancelButton?.addEventListener('click', this.state.onToggleAddRestaurantDrawer);
    $modalForm?.addEventListener('submit', this.onSubmitForm.bind(this));
  }

  render() {
    this.$target.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="modal-form">
          <!-- 카테고리 -->
          <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              ${CATEGORIES.slice(OPTION_START_INDEX)
                .map((category) => `<option value="${category}">${category}</option>`)
                .join('')}
            </select>
          </div>

          <!-- 음식점 이름 -->
          <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name" required>
          </div>

          <!-- 거리 -->
          <div class="form-item form-item--required">
            <label for="distance text-caption">거리(도보 이동 시간) </label>
            <select name="distance" id="distance" required>
              <option value="">선택해 주세요</option>
              <option value="5">5분 내</option>
              <option value="10">10분 내</option>
              <option value="15">15분 내</option>
              <option value="20">20분 내</option>
              <option value="30">30분 내</option>
            </select>
          </div>

          <!-- 설명 -->
          <div class="form-item">
            <label for="description text-caption">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <!-- 링크 -->
          <div class="form-item">
            <label for="link text-caption">참고 링크</label>
            <input type="url" name="link" id="link" pattern="https?://.+">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>

          <!-- 취소/추가 버튼 -->
          <div class="button-container">
            <button type="button" id="modal-cancel" class="button button--secondary text-caption">취소하기</button>
            <button class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      </div>
    `;

    this.addEvent();
  }

  onSubmitForm(e: SubmitEvent) {
    e.preventDefault();
    const restaurants = JSON.parse(localStorage.getItem(REQUEST_RASTAURANT_KEY) ?? '[]');
    // TODO: id 고유값 사용
    const id = restaurants.length;
    const newRestauant = this.getFormValues(e.currentTarget as HTMLFormElement, id);
    restaurants.push(newRestauant);
    localStorage.setItem(REQUEST_RASTAURANT_KEY, JSON.stringify(restaurants));

    this.state.onToggleAddRestaurantDrawer();
  }

  getFormValues(form: HTMLFormElement, id: number) {
    const $category = form.category;
    const $name = form.querySelector('#name') as HTMLInputElement;
    const $distance = form.distance;
    const $description = form.description;
    const $link = form.link;

    return {
      id,
      category: $category?.options[$category.selectedIndex].value,
      name: $name.value,
      distance: $distance.options[$distance.selectedIndex].value,
      description: $description.value ?? '',
      link: $link.value ?? '',
      isFavorite: false,
    };
  }
}
