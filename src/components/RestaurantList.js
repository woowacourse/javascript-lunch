import Component from "../core/Component";
import Restaurant from "./Restaurant";

export default class RestaurantList extends Component {
  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  mounted() {
    const { restaurantList } = this.props;
    const $restaurantList = this.$target.querySelector(".restaurant-list");

    restaurantList.forEach((restaurant) => {
      new Restaurant($restaurantList, restaurant);
    });
  }
}
