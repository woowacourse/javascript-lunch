import Restaurant from '../domain/Restaurant';
import $ from '../util/dom';
import RestaurantBlock from './RestaurantBlock';

class RestaurantBlockList {
  #template;

  constructor() {
    this.#template = `<section class="restaurant-list-container">
    <ul class="restaurant-list"></ul>
    </section>`;

    document.body.insertAdjacentHTML('beforeend', this.#template);
  }

  static render(list: Restaurant[]) {
    $('.restaurant-list').replaceChildren();

    list.forEach((restaurant) => {
      new RestaurantBlock(restaurant);
    });
  }
}

export default RestaurantBlockList;
