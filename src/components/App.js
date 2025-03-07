import Header from "./Header/Header.js";
import createRestaurant from "./createRestaurant.js";
import Component from "./Component.js";
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
