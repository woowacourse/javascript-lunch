import ICON from '../../../icons';
import { $ } from '../../../utils/dom';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { FAVORITE_ICON } from '../../../constants/rules';

// TODO: 즐겨찾기 버튼 분리, 데이터 받아오기
export default class RestaurantDetail extends ModalWrapper {
  #element;
  #restaurant;
  #restaurants;
  #restaurantList;

  // TODO: 멤버변수 개수 문제
  constructor(element, restaurants, restaurant, restaurantList) {
    super();
    this.#restaurantList = restaurantList;
    this.#restaurants = restaurants;
    this.#restaurant = restaurant;
    this.#element = element;
    this.render(restaurant);
    this.#addEvent();
  }

  render({ category, name, walkingTimeFromCampus, description = '', link = '', favorite }) {
    this.#element.innerHTML = /*html*/ this.getTemplate(`
      <div class="restaurant-detail-container">
        <section class="restaurant-detail-header">
          <div class="restaurant__category">
            <img src="${ICON[category]}" alt="${category}" class="category-icon">
          </div>
          ${FavoriteButton('detail-favorite-buttton', favorite ? FAVORITE_ICON.add : FAVORITE_ICON.remove)}
        </section>
        <section class="restaurant-detail-main">
          <div class="restaurant-detail-title">
            <h2>${name}</h2>
          </div>
          <span class="restaurant__distance">캠퍼스로부터 ${walkingTimeFromCampus}분 내</span>
          <div class="restaurant-detail-description">
            <p>
              ${description}
            </p>
          </div>
          <div class="restaurant-detail-link">
            <a target="_blank" href="${link}">${link}</a>
          </div>
        </section>
        <div class="button-container">
            <button id="delete-restaurant-button" class="button button--secondary text-caption">삭제하기</button>
            <button id="close-detail-button" type="button" class="button button--primary text-caption">닫기</button>
          </div>
      </div>
    `);
  }

  #addEvent() {
    $('modal-backdrop').addEventListener('click', this._handleClose.bind(this));
    $('close-detail-button').addEventListener('click', this._handleClose.bind(this));
    $('delete-restaurant-button').addEventListener('click', () =>
      this.#handleDeleteRestaurantButton(),
    );

    $('detail-favorite-buttton').addEventListener('click', (event) => {
      const favoriteIcon = event.target.closest('img');
      if (!favoriteIcon) return;

      this.#restaurants.toggleFavoriteState(this.#restaurant.name);

      favoriteIcon.src === ICON[FAVORITE_ICON.add]
        ? (favoriteIcon.src = ICON[FAVORITE_ICON.remove])
        : (favoriteIcon.src = ICON[FAVORITE_ICON]);

      this.#restaurantList.render();
    });
  }

  #handleDeleteRestaurantButton() {
    if (confirm('정말 삭제하시겠습니까?')) {
      const close = this._handleClose.bind(this);

      this.#restaurants.deleteRestaurant(this.#restaurant.name);
      close();
      this.#restaurantList.render();
    }
  }
}
