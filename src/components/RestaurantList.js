import Component from "../core/Component";
import Restaurant from "./Restaurant";

export default class RestaurantList extends Component {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>
    `;
  }

  mounted() {
    const { restaurantList } = this.props;
    const $restaurantList = this.$target.querySelector(".restaurant-list");

    restaurantList.map((restaurant) => {
      new Restaurant($restaurantList, restaurant);
    });
  }
}
