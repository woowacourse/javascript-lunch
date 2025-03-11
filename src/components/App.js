import Header from "./Header/Header.js";
import { createRestaurant, updateRestaurant } from "./createRestaurant.js";
import Component from "./Component.js";
class App extends Component {
  constructor($target) {
    super($target);
    document.addEventListener("restaurantUpdated", (event) =>
      updateRestaurant(event.detail),
    );
  }

  render() {
    new Header(document.querySelector(".gnb"));
    createRestaurant();
  }
}
export default App;
