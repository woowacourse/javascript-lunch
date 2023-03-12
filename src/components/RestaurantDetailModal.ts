import { CategoryImagePath, FavoriteIconImagePath } from '../data/imagePath';
import { Component } from '../type/Component';
import { Restaurant } from '../type/Restaurant';

const detailTemplate = (restaurant: Restaurant) => `
  <section class="restaurant-detail-container">
    <div class="restaurant__category">
    <img src=${CategoryImagePath[restaurant.category]} alt=${
  restaurant.category
} class="category-icon">
    </div>
    <div class="restaurant__favorite">
      <button type="button" class="button--favorite" aria-label="즐겨찾기 추가">
      <img src=${
        restaurant.isFavorite ? FavoriteIconImagePath.ADDED : FavoriteIconImagePath.DEFALUT
      } alt="즐겨찾기 추가">
      </button>
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
      <p class="restaurant__description text-body">${restaurant.description ?? ''}</p>
      <a href=${restaurant.link?? ''} target="blank">${restaurant.link ?? ''}</a>
    </div>
    <div class="button-container">
      <button type="button" class="button button--secondary text-caption">삭제하기</button>
      <button type="button" class="button button--primary text-caption">닫기</button>
    </div>
  </section>
`;

class RestaurantDetailModal implements Component {
  $target: Element;
  #restaurant?: Restaurant;

  constructor(parent: HTMLElement) {
    parent.insertAdjacentHTML('beforeend', this.template());
    this.$target = parent.lastElementChild!;
  }

  template = () => `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container"></div>
    </div>
  `;

  setRestaurant = (restaurant: Restaurant) => {
    this.#restaurant = restaurant;
  };

  render = () => {
    this.$target.querySelector('.modal-container')?.replaceChildren();
    this.$target
      .querySelector('.modal-container')
      ?.insertAdjacentHTML('beforeend', detailTemplate(this.#restaurant!));
  };

  show = () => {
    this.$target.classList.add('modal--open');
  };

  hide = () => {
    this.$target.classList.remove('modal--open');
  };

  setCloseModalHandler = () => {
    this.$target.querySelector('.button--primary')?.addEventListener('click', this.hide);
    this.$target.querySelector('.modal-backdrop')?.addEventListener('click', this.hide);

    document.addEventListener(
      'keydown',
      (event) => (event.key === 'Escape' || event.key === 'Esc') && this.hide(),
    );
  };
}

export default RestaurantDetailModal;
