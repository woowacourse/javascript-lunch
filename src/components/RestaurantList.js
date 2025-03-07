import Restaurant from "./Restaurant";
import Component from "../core/Component";

class RestaurantList extends Component {
  constructor(props) {
    super(props);
  }

  template() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.props.restaurantList
            .map((restaurant) => new Restaurant(restaurant).template())
            .join("")}
        </ul>
      </section>
    `;
  }
}

export default RestaurantList;
