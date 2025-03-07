import Header from "./Header.js";
import Restaurant from "./Restaurant.js";
import { categoryValue } from "./optionValue.js";
import Component from "./Component.js";
import createRestaurant from "./createRestaurant.js";
class App extends Component {
  constructor($target) {
    super($target);
    document.addEventListener("restaurantUpdated", () => this.render());
  }

  render() {
    document.querySelector(".restaurant-list").innerHTML = "";
    new Header(document.querySelector(".gnb"));
    createRestaurant();
  }
}
export default App;
