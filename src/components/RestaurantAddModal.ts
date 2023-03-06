import { CATEGORY, MINUTES_TO_CAMPUS } from '../data/Constants';
import { Category, MinutesToCampus, Restaurant } from '../type/Restaurant';
import { $ } from '../util/dom';

class RestaurantAddModal {
  template = () => `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form>
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
            <input type="text" name="name" id="name" required>
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

  render = (target: HTMLElement) => {
    target.insertAdjacentHTML('beforeend', this.template());
  };

  toggle = () => {
    $('.modal')?.classList.toggle('modal--open');
  };

  get restaurant(): Restaurant {
    const restaurant: Restaurant = {
      category: ($('#category') as HTMLInputElement).value as Category,
      name: ($('#name') as HTMLInputElement).value,
      distance: +($('#distance') as HTMLInputElement).value as MinutesToCampus,
      description: ($('#description') as HTMLInputElement).value,
      link: ($('#link') as HTMLInputElement).value,
    };
    !restaurant.distance && delete restaurant.description;
    !restaurant.link && delete restaurant.link;

    return restaurant;
  }

  setCloseModalHandler = () => {
    $('.button--secondary')?.addEventListener('click', this.toggle);

    $('.modal-backdrop')?.addEventListener('click', this.toggle);

    document.addEventListener(
      'keydown',
      (event) => (event.key === 'Escape' || event.key === 'Esc') && this.toggle(),
    );
  };

  setAddbuttonHandler = (handler: (restaurant: Restaurant) => void) => {
    $('.button--primary')?.addEventListener('click', (event) => {
      event.preventDefault();
      this.toggle();
      handler(this.restaurant);
    });
  };
}

export default new RestaurantAddModal();
