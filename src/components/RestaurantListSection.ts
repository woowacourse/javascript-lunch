import { CategoryImagePath } from '../data/CategoryImagePath';
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
  </li>`;

class RestaurantListSection implements Component {
  $target: Element;
  #restaurants: Restaurant[];

  constructor(parent: Element, restaurants: Restaurant[]) {
    parent.insertAdjacentHTML('beforeend', this.template());
    this.$target = parent.lastElementChild!;
    this.#restaurants = restaurants;
  }

  set restaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
  }

  template = () => `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;

  render = () => {
    this.$target.querySelector('.restaurant-list')?.replaceChildren();
    this.$target
      .querySelector('.restaurant-list')
      ?.insertAdjacentHTML(
        'beforeend',
        this.#restaurants.map((restaurant) => restaurantTemplate(restaurant)).join(''),
      );
  };
}

export default RestaurantListSection;
