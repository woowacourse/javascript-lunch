import Restaurant from './Restaurant.js';
import Component from '../core/Component.js';

class RestaurantList extends Component {
  template() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.props.restaurantList
            .map((restaurant) => new Restaurant(restaurant))
            .filter((restaurant) => this.props.category === '전체' || restaurant.props.category === this.props.category)
            .map((restaurant) => restaurant.template())
            .join('')}
        </ul>
      </section>
    `;
  }
}

export default RestaurantList;
