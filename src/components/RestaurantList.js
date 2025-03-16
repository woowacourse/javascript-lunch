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
            .sort((a, b) => {
              if (this.props.sort === '이름순') return a.props.name.localeCompare(b.props.name);
              if (this.props.sort === '거리순') return a.props.distance - b.props.distance;
              return 0;
            })
            .map((restaurant) => restaurant.template())
            .join('')}
        </ul>
      </section>
    `;
  }
}

export default RestaurantList;
