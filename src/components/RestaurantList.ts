import { RestaurantType } from '../lib/types.ts';
import Component from '../core/Component.ts';
import Restaurant from './Restaurant.ts';

interface RestaurantListProps {
  restaurants: RestaurantType[];
}

export default class RestaurantList extends Component<null, RestaurantListProps> {
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
      this.element.querySelector('.restaurant-list')?.appendChild(new Restaurant(restaurant).render());
    });
  }
}
