import Component from "../common/Component";
import Restaurant from "./Restaurant";

export default class Restaurants extends Component {
  render() {
    const { restaurants } = this.props;

    return /*html*/ `    
        <section class="restaurant-list-container">
            <ul class="restaurant-list" id="restaurant-list">
                ${restaurants.map(() => `<li></li>`).join("")}
            </ul>
        </section>
    `;
  }

  componentDidMount(): void {
    const { restaurants, loadRestaurant } = this.props;
    const $restaurants = document.querySelectorAll("li");
    $restaurants.forEach(($restaurant, key) => {
      new Restaurant($restaurant, {
        restaurant: restaurants[key],
        loadRestaurant,
      });
    });
  }
}
