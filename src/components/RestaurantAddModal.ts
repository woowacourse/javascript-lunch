import { CATEGORY, MINUTES_TO_CAMPUS } from '../data/Constants';
import { Component } from '../type/Component';
import { Category, MinutesToCampus, Restaurant } from '../type/Restaurant';

class RestaurantAddModal implements Component {
  $target: Element;
  #validator: (restaurant: Restaurant) => void;

  constructor(parent: Element, validator: (restaurant: Restaurant) => void) {
    parent.insertAdjacentHTML('beforeend', this.template());
    this.$target = parent.lastElementChild!;
    this.#validator = validator;
  }

  template = () => `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container restaurant-add-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="form-add-restaurant">
          <div class="form-item form-item--required">
          
            <label for="category text-caption">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              ${CATEGORY.map((category) => `<option value="${category}">${category}</option>`).join(
                '',
              )}
            </select>
          </div>
          
          <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name" required">
          </div>
          
          <div class="form-item form-item--required">
            <label for="distance text-caption">거리(도보 이동 시간) </label>
            <select name="distance" id="distance" required>
              <option value="">선택해 주세요</option>
            ${MINUTES_TO_CAMPUS.map(
              (distance) => `<option value="${distance}">${distance}분 내</option>`,
            ).join('')}
            </select>
          </div>

          <div class="form-item">
            <label for="description text-caption">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <div class="form-item">
            <label for="link text-caption">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>

          <div class="button-container">
            <button type="button" class="button button--secondary text-caption">취소하기</button>
            <button class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      </div>
      </div>
  `;

  show = () => {
    this.$target.classList.add('modal--open');
  };

  hide = () => {
    (this.$target.querySelector('#form-add-restaurant') as HTMLFormElement).reset();
    this.$target.classList.remove('modal--open');
  };

  makeRestaurant(): Restaurant {
    const formData = new FormData(
      this.$target.querySelector('#form-add-restaurant') as HTMLFormElement,
    );
    const restaurant: Restaurant = {
      category: formData.get('category') as Category,
      name: formData.get('name') as string,
      distance: Number(formData.get('distance')) as MinutesToCampus,
      description: formData.get('description') as string,
      link: formData.get('link') as string,
      isFavorite: false,
    };
    this.#validator(restaurant);

    return restaurant;
  }

  setCloseModalHandler = () => {
    this.$target.querySelector('.button--secondary')?.addEventListener('click', this.hide);
    this.$target.querySelector('.modal-backdrop')?.addEventListener('click', this.hide);

    document.addEventListener(
      'keydown',
      (event) => (event.key === 'Escape' || event.key === 'Esc') && this.hide(),
    );
  };

  setAddbuttonHandler = (handler: (restaurant: Restaurant) => void) => {
    this.$target.querySelector('#form-add-restaurant')?.addEventListener('submit', (event) => {
      try {
        event.preventDefault();
        handler(this.makeRestaurant());
        this.hide();
      } catch (error) {
        alert((error as Error).message);
      }
    });
  };
}

export default RestaurantAddModal;
