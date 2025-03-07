import Restaurant from './Restaurant.js';
import Component from '../core/Component.js';

export default class RestaurantList extends Component {
  template() {
    console.log(this.props);
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.props.restaurants.map((restaurant) => new Restaurant(restaurant).template()).join('')}
        </ul>
      </section>
    `;
  }
}
