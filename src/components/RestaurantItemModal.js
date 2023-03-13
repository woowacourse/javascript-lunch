import { CATEGORY_TO_FILENAME, FOVORITES_TO_FILENAME } from '../constants/constants';

class RestaurantItemModal {
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.restaurantInfo = null;

    this.$target = document.querySelector('main');

    this.render();
  }

  template() {
    return `
    <div class="modal restaurant-item-modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container">

      <div class="modal-contents"></div>

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">삭제하기</button>
          <button type="button" class="button button--primary text-caption">닫기</button>
        </div>
        
      </div>
    </div>
    `;
  }

  makeContentsTemplate() {
    const imageFile = CATEGORY_TO_FILENAME[this.restaurantInfo.category];
    const iconName = FOVORITES_TO_FILENAME[this.restaurantInfo.favorites];

    return `
    <img src="./${iconName}.png" class="favorite-icon">

    <div class="restaurant__category">
      <img src="./${imageFile}.png" alt="${this.restaurantInfo.category}" class="category-icon">
    </div>

    <h3 class="restaurant__name text-subtitle">${this.restaurantInfo.name}</h3>

    <div class="restaurant__distance text-body">캠퍼스부터 ${this.restaurantInfo.distance}분 내</div>
    <p class="restaurant__description text-body">${this.restaurantInfo.description}</p>
    <a class="restaurant__link text-body" href="${this.restaurantInfo.link}">${this.restaurantInfo.link}</a>
    `;
  }

  render() {
    if (!document.querySelector(`.restaurant-item-modal`)) {
      this.$target.insertAdjacentHTML('beforeend', this.template());
    }

    this.toggleModal();
  }

  toggleModal() {
    const $modal = document.querySelector(`.restaurant-item-modal`);
    $modal.classList.toggle('modal--open');
  }

  openModal(restaurantInfo) {
    this.restaurantInfo = restaurantInfo;
    this.updateContents();
    this.render();

    this.setFavoritesIconEvent();
  }

  updateContents() {
    document.querySelector(`.restaurant-item-modal .modal-contents`).innerHTML = this.makeContentsTemplate();
  }

  setFavoritesIconEvent() {
    const $favoriteIcon = document.querySelector(`.restaurant-item-modal .favorite-icon`);

    $favoriteIcon.addEventListener('click', e => {
      e.preventDefault();

      this.restaurants.swapFavoritesByID(this.restaurantInfo.ID);
      this.updateIcon();
      localStorage.setItem('restaurants', JSON.stringify(this.restaurants.restaurants));
    });
  }

  updateIcon() {
    const iconName = FOVORITES_TO_FILENAME[this.restaurantInfo.favorites];

    const $favoriteIcon = document.querySelector(`.restaurant-item-modal .favorite-icon`);
    $favoriteIcon.setAttribute('src', `./${iconName}.png`);
  }

  setCloseEvent(onCloseButtonClick) {
    const $cancelButton = document.querySelector('.restaurant-item-modal .button--primary');

    $cancelButton.addEventListener('click', e => {
      e.preventDefault();

      onCloseButtonClick();

      this.toggleModal();
    });
  }

  setDeleteRestaurantEvent(onDeleteButtonClick) {
    const $deleteButton = document.querySelector('.restaurant-item-modal .button--secondary');

    $deleteButton.addEventListener('click', e => {
      e.preventDefault();

      this.restaurants.deleteByID(this.restaurantInfo.ID);
      localStorage.setItem('restaurants', JSON.stringify(this.restaurants.restaurants));

      document.querySelector(`#restaurant${this.restaurantInfo.ID}`).remove();

      onDeleteButtonClick();
      this.toggleModal();
    });
  }
}

export default RestaurantItemModal;
