import Header from "./Header.js";
import Restaurant from "./Restaurant.js";
import { RestaurantData } from "./RestaurantData.js";
import { categoryValue } from "./optionValue.js";
import Component from "./Component.js";
class App extends Component {
  constructor($target) {
    super($target);
    document.addEventListener("restaurantUpdated", () => this.render());
  }

  render() {
    document.querySelector(".restaurant-list").innerHTML = "";
    new Header(document.querySelector(".gnb"));

    RestaurantData.forEach((data) => {
      const restaurantItem = document.createElement("li");
      restaurantItem.classList.add("restaurant");
      document.querySelector(".restaurant-list").appendChild(restaurantItem);

      new Restaurant(restaurantItem, data);
    });
  }
}
export default App;
