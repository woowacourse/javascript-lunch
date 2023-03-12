import Component from '../core/Component';
import { eventBus } from '../core/eventBus';
import { FavoriteImage, ImageByCategory, toggleFavoriteIcon } from '../images/imageByCategory';
import { IRestaurant } from '../interfaces/IRestaurantInput';
import { restaurantStore } from '../model/restaurantStore';
import { $, on } from '../utils/domUtils';
import { buttonTemplate } from './templates/button';
import { iconImageTemplate } from './templates/iconImage';

export default class DetailModal extends Component {
  #id: number = 0;
  constructor(target: HTMLElement) {
    super(target);

    this.subscribe.call(this);
  }

  subscribe() {
    eventBus.subscribe('@click-detail', (restaurant) => {
      const { id } = restaurant;
      this.#id = id;
      this.render(restaurantStore.getItemById(id)).setEvent();
    });
  }

  render(restaurant: IRestaurant) {
    this.$target.innerHTML = this.template(restaurant);

    return this;
  }

  setEvent() {
    on({
      target: $('.favorite-icon', this.$target),
      eventName: 'click',
      handler: this.handleClickFavorite.bind(this),
    });

    on({
      target: $('.delete-restaurant', this.$target),
      eventName: 'click',
      handler: this.handleDeleteRestaurant.bind(this),
    });

    on({
      target: $('.close-modal'),
      eventName: 'click',
      handler: this.handleCloseModal.bind(this),
    });

    on({
      target: $('.modal-backdrop'),
      eventName: 'click',
      handler: this.handleCloseModal.bind(this),
    });

    return this;
  }

  handleCloseModal() {
    this.hide();
  }

  handleDeleteRestaurant() {
    restaurantStore.deleteById(this.#id);
    eventBus.dispatch('@delete-restaurant', this.#id);
    this.hide();
  }

  hide(): this {
    this.$target.innerHTML = '';
    return this;
  }

  handleClickFavorite(event: Event) {
    const $image = event.target as HTMLImageElement;

    $image.classList.toggle('favorite');
    toggleFavoriteIcon($image);
    restaurantStore.toggleFavorite(this.#id);
    eventBus.dispatch('@toggle-favorite', this.#id);
  }

  template({ favorite, category, description, name, link, distance }: IRestaurant) {
    return `  
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container detail-modal">
          <div class="modal-icon-container"> 
            <div class="restaurant__category">
            ${iconImageTemplate(
              {
                src: ImageByCategory[category],
                alt: category + ' 카테고리 이미지',
              },
              { className: 'category-icon' }
            )}
          </div>
          <div class="favorite">
            ${iconImageTemplate(
              {
                src: favorite ? FavoriteImage.favoriteOn : FavoriteImage.favoriteOff,
                alt: '즐겨 찾는 음식점 토글 이미지',
              },
              { className: 'favorite-icon' }
            )}
          </div>
          </div>
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <p class="restaurant__description text-body">${description}</p>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
          <p class="restaurant__link text-body">${link}</p>
          <div class ="button-container">
            ${buttonTemplate(
              { content: '삭제하기', type: 'button' },
              { className: 'button button--secondary text-caption delete-restaurant' }
            )}
            ${buttonTemplate(
              { content: '닫기', type: 'button' },
              { className: 'button button--primary text-caption close-modal' }
            )}
          </div>
        </div>
      </div>
    `;
  }
}
