import { CategoryImagePath, FavoriteIconImagePath } from '../data/imagePath';
import { Component } from '../type/Component';
import { Restaurant } from '../type/Restaurant';

const restaurantTemplate = (restaurant: Restaurant) => `
  <li class="restaurant"> 
    <div class="restaurant__category">
      <img src=${CategoryImagePath[restaurant.category]} alt=${
  restaurant.category
} class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
      <p class="restaurant__description text-body">${restaurant.description ?? ''}</p>
    </div>
    <div class="restaurant__favorite">
      <button type="button" class="button--favorite" aria-label="즐겨찾기 추가">
        <img src=${
          restaurant.isFavorite ? FavoriteIconImagePath.ADDED : FavoriteIconImagePath.DEFALUT
        } alt="즐겨찾기 추가">
      </button>
    </div>
  </li>`;

class RestaurantListSection implements Component {
  $target: Element;
  #restaurants: Restaurant[];

  constructor(parent: Element, restaurants: Restaurant[]) {
    this.$target = document.createElement('section');
    this.$target.classList.add('restaurant-list-container');
    this.#restaurants = restaurants;
    parent.insertAdjacentElement('beforeend', this.$target);
  }

  setRestaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
  }

  template() {
    return `
      <ul class="restaurant-list">
      </ul>`;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }

  reRender() {
    this.$target.querySelector('.restaurant-list')?.replaceChildren();
    this.$target
      .querySelector('.restaurant-list')
      ?.insertAdjacentHTML(
        'beforeend',
        this.#restaurants.map((restaurant) => restaurantTemplate(restaurant)).join(''),
      );
  }

  setFavoriteButtonHandler(handler: (name: string) => void) {
    Array.from(this.$target.querySelectorAll('.button--favorite')).forEach((button) => {
      button.addEventListener('click', (event) => {
        const parent = (event.target as HTMLButtonElement).closest('.restaurant') as HTMLElement;

        this.changeFavoriteButtonImage(
          parent.querySelector('img[alt="즐겨찾기 추가"]') as HTMLImageElement,
        );

        handler((parent.querySelector('.restaurant__name') as HTMLElement).innerText);
      });
    });
  }

  setRestaurantClickHandler(handler: (restaurant: Restaurant) => void) {
    ['.restaurant__category', '.restaurant__info'].forEach((className) => {
      this.$target.querySelectorAll(className).forEach((element) => {
        element?.addEventListener('click', (event) => {
          const name = (
            (event.target as HTMLElement)
              .closest('.restaurant')
              ?.querySelector('.restaurant__name') as HTMLElement
          ).innerText;

          handler(this.#restaurants.find((restaurant) => restaurant.name === name)!);
        });
      });
    });
  }

  private changeFavoriteButtonImage(image: HTMLImageElement) {
    image.src === FavoriteIconImagePath.DEFALUT
      ? (image.src = FavoriteIconImagePath.ADDED)
      : (image.src = FavoriteIconImagePath.DEFALUT);
  }
}

export default RestaurantListSection;
