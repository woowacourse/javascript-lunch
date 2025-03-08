import Restaurant from './Restaurant.js';
import RestaurantTab from './RestaurantTab.js';
import RestaurantDetail from './RestaurantDetail.js';
import Component from '../core/Component.js';

export default class RestaurantList extends Component {
  template() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">

        </ul>
      </section>
    `;
  }

  onRender() {
    this.props.restaurants.forEach((restaurant) => {
      this.element.querySelector('.restaurant-list').appendChild(new Restaurant(restaurant).render());
    });
  }
}
