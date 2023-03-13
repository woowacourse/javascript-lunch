import { LOCAL_STORAGE_KEY } from '../constant/constant';
import images from '../img/images';
import RestaurantController from '../model/RestaurantController';
import { Restaurant, State } from '../types/restaurantTypes';

export default class detailRestaurantModal {
  private $target: HTMLElement;
  private _restaurantController: RestaurantController;
  private _restaurant: Restaurant;
  private _state: State;

  constructor(restaurantController: RestaurantController, restaurant: Restaurant, state: State) {
    this.$target = document.querySelector('body') as HTMLElement;
    this._restaurantController = restaurantController;
    this._restaurant = restaurant;
    this._state = state;

    this.render();
  }

  private template() {
    const { name, category, distance, description, link, isLike } = this._restaurant;

    return `
      <!-- 음식점 추가 모달 -->
	    <div class="modal modal--open">
	      <div class="modal-backdrop"></div>
	      <div class="modal-container">
          <div class="restaurant__category">
            <img src="${images[category]}" alt="${category}" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <div class="favorite-icon-container">
            ${
              isLike
                ? `<img src="${images['색칠별']}" alt="색칠별" class="favorite-icon" data-like="true">`
                : `<img src="${images['빈별']}" alt="빈별" class="favorite-icon" data-like="false">`
            }
            </div>
            <p class="restaurant__description text-body">${description}</p>
            ${link ? `<p class="restaurant__description text-body">${link}</p>` : ''}
              <!-- 취소/추가 버튼 -->
              <form>
              <div class="button-container">
                <button type="button" class="button button--secondary text-caption">삭제하기</button>
                <button class="button button--primary text-caption">닫기</button>
              </div>
            </form>
          </div>
	      </div>
      </div>
	    `;
  }

  private render(): void {
    this.$target.insertAdjacentHTML('beforeend', this.template());
    this.listenEvent();
  }

  private listenEvent() {
    this.$target.querySelector('.button--primary')?.addEventListener('click', (event: Event) => {
      event.preventDefault();

      this.closeModal();
    });

    this.$target.querySelector('.button--secondary')!.addEventListener('click', (event: Event) => {
      event.preventDefault();

      this._restaurantController.deleteById(this._restaurant.id!);
      this._state.restaurants = this._restaurantController.getRestaurants();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._state));

      this.closeModal();
    });

    this.listenCloseEvent();
  }

  private listenCloseEvent() {
    document.querySelector('.modal-backdrop')?.addEventListener('click', () => {
      this.closeModal();
    });

    document.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  private closeModal() {
    const modal = this.$target.querySelector('.modal--open');
    if (modal) {
      modal.classList.add('hidden');
    }
    const event = new CustomEvent('closeDetailModal');
    document.dispatchEvent(event);
  }
}
