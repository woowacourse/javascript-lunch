import { CATEGORY_TO_FILENAME, FOVORITES_TO_FILENAME } from '../constants/constants';

class RestaurantItem {
  constructor(restaurantInfo, restaurants) {
    this.restaurantInfo = restaurantInfo;
    this.restaurants = restaurants;

    this.render();
    this.setClickFavoritesIconEvent();
  }

  template() {
    const imageName = CATEGORY_TO_FILENAME[this.restaurantInfo.category];
    const iconName = FOVORITES_TO_FILENAME[this.restaurantInfo.favorites];

    return `
      <li id="restaurant${this.restaurantInfo.ID}" class="restaurant">

        <div class="restaurant__category__info">
          <div class="restaurant__category">
              <img src="./${imageName}.png" alt="${this.restaurantInfo.category}" class="category-icon">
          </div>

          <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${this.restaurantInfo.name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${this.restaurantInfo.distance}분 내</span>
              <p class="restaurant__description text-body">${this.restaurantInfo.description}</p>
          </div>
        </div>

        <img src="./${iconName}.png" class="favorite-icon">

      </li>
      `;
  }

  render() {
    document.querySelector('.restaurant-list').insertAdjacentHTML('beforeend', this.template());
  }

  setClickItemEvent(onClickRestaurantItem) {
    const $info = document.querySelector(`#restaurant${this.restaurantInfo.ID} .restaurant__category__info`);
    $info.addEventListener('click', e => {
      e.preventDefault();
      onClickRestaurantItem(this.restaurantInfo);
    });
  }

  setClickFavoritesIconEvent() {
    const $favoriteIcon = document.querySelector(`#restaurant${this.restaurantInfo.ID} .favorite-icon`);

    $favoriteIcon.addEventListener('click', e => {
      e.preventDefault();

      this.restaurants.swapFavoritesByID(this.restaurantInfo.ID);
      this.updateIcon();
      localStorage.setItem('restaurants', JSON.stringify(this.restaurants.restaurants));
    });
  }

  updateIcon() {
    const iconName = FOVORITES_TO_FILENAME[this.restaurantInfo.favorites];

    const $favoriteIcon = document.querySelector(`#restaurant${this.restaurantInfo.ID} .favorite-icon`);
    $favoriteIcon.setAttribute('src', `./${iconName}.png`);
  }
}

export default RestaurantItem;
