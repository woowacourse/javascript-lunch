import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import ICON from '../../../icons';
import { $ } from '../../../utils/dom';
import { FAVORITE_ICON } from '../../../constants/rules';

export default class RestaurantDetail extends ModalWrapper {
  #element;
  #restaurant;
  #restaurants;
  #restaurantList;

  constructor(element, { restaurants, restaurant, restaurantList }) {
    super();
    this.#restaurantList = restaurantList;
    this.#restaurants = restaurants;
    this.#restaurant = restaurant;
    this.#element = element;
    this.render(restaurant);
    this.#addEvent();
  }

  render({ category, name, walkingTimeFromCampus, description = '', link = '', favorite }) {
    this.#element.innerHTML = this.getTemplate(`
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
    $('detail-favorite-buttton').addEventListener('click', (event) =>
      this.#handleClickFavoriteButton(event),
    );
  }

  #handleDeleteRestaurantButton() {
    if (confirm('정말 삭제하시겠습니까?')) {
      const close = this._handleClose.bind(this);

      this.#restaurants.deleteRestaurant(this.#restaurant.name);
      close();
      this.#restaurantList.render();
    }
  }

  #handleClickFavoriteButton(event) {
    const favoriteIcon = event.target.closest('img');
    if (!favoriteIcon) return;

    this.#restaurants.toggleFavoriteState(this.#restaurant.name);
    this.#toggleIconImg(favoriteIcon);
    this.#restaurantList.render();
  }

  #toggleIconImg(iconImg) {
    iconImg.src === ICON[FAVORITE_ICON.add]
      ? (iconImg.src = ICON[FAVORITE_ICON.remove])
      : (iconImg.src = ICON[FAVORITE_ICON.add]);

    iconImg.alt === FAVORITE_ICON.add
      ? (iconImg.alt = FAVORITE_ICON.remove)
      : (iconImg.alt = FAVORITE_ICON.add);
  }
}
