import Restaurant from './Restaurant.js';
import Component from '../core/Component.js';
import DetailModal from './DetailModal.js';

class RestaurantList extends Component {
  template() {
    return `
        <ul class="restaurant-list"></ul>
    `;
  }

  onRender() {
    const $restaurantList = this.element.querySelector('.restaurant-list');
    const restaurantList = this.props.restaurantList
      .map((restaurant) => new Restaurant(restaurant))
      .filter((restaurant) => this.props.category === '전체' || restaurant.props.category === this.props.category)
      .sort((a, b) => {
        if (this.props.sort === '이름순') return a.props.name.localeCompare(b.props.name);
        if (this.props.sort === '거리순') return a.props.distance - b.props.distance;
        return 0;
      });

    restaurantList.forEach((restaurant) => {
      $restaurantList.appendChild(restaurant.element);
    });
  }
}

export default RestaurantList;
