import { eventBus } from '@res/core/eventBus';
import { FavoriteImage, ImageByCategory } from '@res/images/imageByCategory';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';
import { restaurantStore } from '@res/model/restaurantStore';
import { $, on } from '@res/utils/domUtils';
import Component from '../core/Component';

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
    on($('.favorite-icon', this.$target), 'click', (event) => {
      const $eventTarget = event.target as HTMLElement;
      const $closestDiv = $eventTarget.closest('div')!;
      const $image = $<HTMLImageElement>('.favorite-icon', $closestDiv);
      // Favorite 버튼 클릭 시
      // FIXME: classlist toggle 로 변경
      // FIXME: 핸들러 분리
      // FIXME: 핸들러 안에서 세부적으로 분리.

      if ($image.classList.contains('favorite')) {
        $image.src = FavoriteImage.favoriteOff;
        $image.classList.remove('favorite');
      } else {
        $image.src = FavoriteImage.favoriteOn;
        $image.classList.add('favorite');
      }

      restaurantStore.toggleFavorite(this.#id);
      eventBus.dispatch('@toggle-favorite', this.#id);
    });

    return this;
  }

  template({ id, favorite, category, description, name, link, distance }: IRestaurant) {
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
          <button type="button" class="button button--secondary text-caption cancel" onClick="this">
            삭제하기
          </button>
          <button class="button button--primary text-caption submit-restaurant">
            닫기
          </button>
        </div>
      </div>
    `;
  }
}

//
