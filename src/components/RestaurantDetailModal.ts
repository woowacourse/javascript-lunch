import { CategoryImagePath, FavoriteIconImagePath } from '../data/imagePath';
import { Modal } from '../type/Component';
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
      <a href=${restaurant.link ?? ''} target="blank">${restaurant.link ?? ''}</a>
    </div>
    <div class="button-container">
      <button type="button" class="button button--secondary text-caption">삭제하기</button>
      <button type="button" class="button button--primary text-caption">닫기</button>
    </div>
  </section>
`;

class RestaurantDetailModal implements Modal {
  $target: Element;
  #restaurant?: Restaurant;

  constructor(parent: Element) {
    this.$target = document.createElement('div');
    this.$target.classList.add('modal');
    parent.insertAdjacentElement('beforeend', this.$target);
  }

  template() {
    return `
        <div class="modal-backdrop"></div>
        <div class="modal-container"></div>`;
  }

  setRestaurant(restaurant: Restaurant) {
    this.#restaurant = restaurant;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }

  reRender(): void {
    this.$target.querySelector('.modal-container')?.replaceChildren();
    this.$target
      .querySelector('.modal-container')
      ?.insertAdjacentHTML('beforeend', detailTemplate(this.#restaurant!));
  }

  show() {
    this.$target.classList.add('modal--open');
  }

  hide() {
    this.$target.classList.remove('modal--open');
  }

  setCloseModalHandler() {
    this.$target.querySelector('.button--primary')?.addEventListener('click', this.hide.bind(this));
    this.$target.querySelector('.modal-backdrop')?.addEventListener('click', this.hide.bind(this));

    document.addEventListener(
      'keydown',
      (event) => (event.key === 'Escape' || event.key === 'Esc') && this.hide(),
    );
  }

  setEventHandler(
    elementName: 'favoriteButton' | 'deleteButton',
    handler: (name: string) => void,
  ): void {
    switch (elementName) {
      case 'favoriteButton':
        this.setFavoriteButtonHandler(handler.bind(this));
        break;
      case 'deleteButton':
        this.setDeleteButtonHandler(handler.bind(this));
        break;
    }
  }

  private setFavoriteButtonHandler(handler: (name: string) => void) {
    this.$target.querySelector('.button--favorite')?.addEventListener('click', (event) => {
      const parent = (event.target as HTMLButtonElement).closest(
        '.restaurant-detail-container',
      ) as HTMLElement;

      this.changeFavoriteButtonImage(
        parent.querySelector('img[alt="즐겨찾기 추가"]') as HTMLImageElement,
      );

      handler((parent.querySelector('.restaurant__name') as HTMLElement).innerText);
    });
  }

  private setDeleteButtonHandler(handler: (name: string) => void) {
    this.$target.querySelector('.button--secondary')?.addEventListener('click', (event) => {
      const parent = (event.target as HTMLButtonElement).closest(
        '.restaurant-detail-container',
      ) as HTMLElement;

      handler((parent.querySelector('.restaurant__name') as HTMLElement).innerText);
      this.hide();
    });
  }

  private changeFavoriteButtonImage(image: HTMLImageElement) {
    image.src === FavoriteIconImagePath.DEFALUT
      ? (image.src = FavoriteIconImagePath.ADDED)
      : (image.src = FavoriteIconImagePath.DEFALUT);
  }
}

export default RestaurantDetailModal;
