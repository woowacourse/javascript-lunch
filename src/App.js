import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import Component from "./components/core/Component.js";
import RestaurantItem from "./components/RestaurantItem.js";

class App extends Component {
  setup() {
    this.state = {
      restaurants: restaurants,
    };
  }

  updateRestaurant(newRestaurant) {
    this.setState({
      restaurants: [...this.state.restaurants, newRestaurant],
    });

    this.componentDidUpdate(newRestaurant);
  }

  template() {
    return /*html*/ `
        ${Header()}
        <main></main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate(newRestaurant) {
    const $restaurantList = document.querySelector("#restaurant-list");
    $restaurantList.insertAdjacentHTML(
      "afterbegin",
      RestaurantItem(newRestaurant)
    );
  }

  componentDidMount() {
    const $modal = new AddRestaurantModal(document.querySelector("#modal"), {
      updateRestaurant: this.updateRestaurant.bind(this),
    });
    const $gnbButton = this.$target.querySelector(".gnb__button");

    $gnbButton.addEventListener("click", () => {
      $modal.open();
    });

    this.renderRestaurantList();
  }

  renderRestaurantList() {
    const $main = document.querySelector("main");

    $main.insertAdjacentHTML(
      "afterbegin",
      RestaurantList(this.state.restaurants)
    );
  }
}

const app = document.querySelector("#app");
new App(app);
