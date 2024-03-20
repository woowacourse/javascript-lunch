import Component from "../common/Component";
import { RestaurantType } from "../types";
import Restaurant from "./Restaurant";

interface RestaurantsProps {
  restaurants: RestaurantType[];
  loadRestaurant: Function;
}

export default class Restaurants extends Component<
  HTMLDivElement,
  RestaurantsProps
> {
  render() {
    if (!this.props) return "";
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
    if (!this.props) return;

    const { restaurants, loadRestaurant } = this.props;
    const $restaurants = document.querySelectorAll<HTMLLIElement>("li");
    $restaurants.forEach(($restaurant, key) => {
      new Restaurant($restaurant, {
        restaurant: restaurants[key],
        loadRestaurant,
      });
    });
  }
}
