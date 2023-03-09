import { CATEGORY_TO_FILENAME } from '../constants/constants';
const FOVORITES_TO_FILENAME = {
  true: 'favorite-icon-filled',
  false: 'favorite-icon-lined',
};

class RestaurantItem {
  constructor(restaurant, restaurants) {
    this.restaurant = restaurant;
    this.restaurants = restaurants;
    this.render();
    this.setFavoriteButtonEvent();
  }

  template() {
    const imageFile = CATEGORY_TO_FILENAME[this.restaurant.category];
    const iconName = FOVORITES_TO_FILENAME[this.restaurant.favorites];

    return `
      <li id="restaurant${this.restaurant.ID}" class="restaurant">

        <div class="restaurant__category__info">
          <div class="restaurant__category">
              <img src="./${imageFile}.png" alt="${this.restaurant.category}" class="category-icon">
          </div>

          <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${this.restaurant.name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${this.restaurant.distance}분 내</span>
              <p class="restaurant__description text-body">${this.restaurant.description}</p>
          </div>
        </div>

        <img src="./${iconName}.png" class="favorite-icon">

      </li>
      `;
  }

  render() {
    document.querySelector('.restaurant-list').insertAdjacentHTML('beforeend', this.template());
  }

  updateIcon() {
    const iconName = FOVORITES_TO_FILENAME[this.restaurant.favorites];

    const $favoriteIcon = document.querySelector(`#restaurant${this.restaurant.ID} .favorite-icon`);
    $favoriteIcon.setAttribute('src', `./${iconName}.png`);
  }

  setEvent(onClickRestaurantItem) {
    const $info = document.querySelector(`#restaurant${this.restaurant.ID} .restaurant__info`);
    $info.addEventListener('click', e => {
      e.preventDefault();
      onClickRestaurantItem(this.restaurant);
    });

    const $category = document.querySelector(`#restaurant${this.restaurant.ID} .restaurant__category`);
    $category.addEventListener('click', e => {
      e.preventDefault();
      onClickRestaurantItem(this.restaurant);
    });
  }

  setFavoriteButtonEvent() {
    const $favoriteIcon = document.querySelector(`#restaurant${this.restaurant.ID} .favorite-icon`);

    $favoriteIcon.addEventListener('click', e => {
      e.preventDefault();

      this.restaurants.swapFavoritesByID(this.restaurant.ID);
      this.updateIcon();
      localStorage.setItem('restaurants', JSON.stringify(this.restaurants.restaurants));
    });
  }
}

export default RestaurantItem;
