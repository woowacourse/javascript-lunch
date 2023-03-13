import Restaurant from '../../domain/Restaurant';
import CustomElement from '../CustomElement';

class RestaurantList extends CustomElement {
  #restaurants: Restaurant[] = [];

  setRestaurants = (restaurants: Restaurant[]) => {
    this.#restaurants = restaurants;
    this.render();
  };

  renderTemplate = () => {
    return `
      <ul>
        ${this.#restaurants
          .map((restaurant) => {
            return `<r-restaurant
              name="${restaurant.getName()}"
              distanceByMinutes="${restaurant.getDistanceByMinutes()}"
              description="${restaurant.getDescription() ?? ''}"
              category="${restaurant.getCategory() ?? ''}"
              ${restaurant.getIsFavorite() ? 'favorite' : ''}
            ></r-restaurant>`;
          })
          .join('')}
      </ul>
    `;
  };
}

customElements.define('r-restaurant-list', RestaurantList);

export default RestaurantList;
