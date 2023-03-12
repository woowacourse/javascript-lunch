import { eventBus } from '@res/core/eventBus';
import { FavoriteImage, ImageByCategory, toggleFavoriteIcon } from '@res/images/imageByCategory';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';
import { restaurantStore } from '@res/model/restaurantStore';
import { $, on } from '@res/utils/domUtils';
import Component from '../core/Component';
import { buttonTemplate } from './templates/button';

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
    // FIXME: component 만들기
    // FIXME: img (음식사진, 즐겨찾기)
    // FIXME: modal 프레임
    // FIXME: button (취소, 삭제)

    return `  
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <div class="restaurant__category">
            <img src=${ImageByCategory[category]} alt=${category} class="category-icon"/>  
          </div>
          <div class="favorite"> 
            <img src=${
              favorite ? FavoriteImage.favoriteOn : FavoriteImage.favoriteOff
            } alt='즐겨찾기' class="favorite-icon ${favorite ? 'favorite' : ''}"/>
          </div>
          <p class="restaurant__description text-body">${description}</p>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
          <p class="restaurant__link text-body">${link}</p>
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
    `;
  }
}

//
