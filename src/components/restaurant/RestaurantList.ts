import Restaurant from '../../domain/Restaurant';
import CustomElement from '../CustomElement';

class RestaurantList extends CustomElement {
  #restaurants: Restaurant[] = [];

  setRestaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
    this.render();
  }

  getRestaurants() {
    return this.#restaurants;
  }

  renderTemplate(): string {
    return `
      <ul>
        ${this.#restaurants
          .map((restaurant) => {
            return `<r-restaurant
              name="${restaurant.getName()}"
              distance="${restaurant.getDistanceByMinutes()}"
              description="${restaurant.getDescription() ?? ''}"
              category="${restaurant.getCategory() ?? ''}"
            ></r-restaurant>`;
          })
          .join('')}
      </ul>
    `;
  }
}

customElements.define('r-restaurant-list', RestaurantList);

export default RestaurantList;