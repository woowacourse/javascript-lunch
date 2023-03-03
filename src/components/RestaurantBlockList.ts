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

  // static addRestaurant(restaurant: RestaurantBlock) {
  //   $('.restaurant-list').insertAdjacentHTML('beforeend', restaurant.template);
  // }
}

// const RestaurantBlockList = (restaurants: Restaurant[]) =>
//   `<ul class="restaurant-list">${restaurants
//     .map((restaurant) => RestaurantBlock(restaurant))
//     .join('')}
//     </ul>`;

export default RestaurantBlockList;
