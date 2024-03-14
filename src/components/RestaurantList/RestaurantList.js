import Restaurant from '../Common/Restaurant/Restaurant';

export default class RestaurantList {
  #element;
  #restaurants;

  constructor(element, restaurants) {
    this.#element = element;
    this.#restaurants = restaurants;
    this.render();
  }

  render() {
    this.#element.innerHTML = `
    <ul id="restaurant-list" class="restaurant-list">
      ${this.#restaurants.standardList.reduce(
        (prevRestaurantData, currentRestaurantData) =>
          prevRestaurantData + Restaurant(currentRestaurantData),
        '',
      )}
    </ul>`;
  }
}
