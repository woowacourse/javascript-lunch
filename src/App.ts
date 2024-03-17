import Component from "./common/Component";
import Header from "./components/Header";
import RestauranStorage from "./domain/RestauranStorage";
import Restaurants from "./components/Restuarants";
import Filter from "./components/Filter";
import { RestaurantType } from "./types";
import Selects from "./components/Selects";

export default class App extends Component {
  setup(): void {
    this.state = {
      restaurants: RestauranStorage.getRestaurants(),
    };
  }

  render() {
    return /*html*/ `
            <header class="gnb"></header>
            <main>
              <section class="filter-container"></section>
              <section class="select-container">

              </section>
              <section class="restaurants"></section>
            </main>
            <div class="modal">
              <div class="modal-backdrop"></div>
              <div class="modal-container"></div>
            </div>
        `;
  }

  componentDidMount(): void {
    const $header = document.querySelector(".gnb");
    const $restaurants = document.querySelector(".restaurants");
    const $filter = document.querySelector(".filter-container");
    const $select = document.querySelector(".select-container");
    new Header($header, {
      loadRestaurant: this.loadRestaurant.bind(this),
    });
    new Filter($filter, {
      loadRestaurant: this.loadRestaurant.bind(this),
    });
    new Selects($select, {
      loadRestaurant: this.loadRestaurant.bind(this),
    });
    new Restaurants($restaurants, {
      restaurants: this.state.restaurants,
      loadRestaurant: this.loadRestaurant.bind(this),
    });
  }

  loadRestaurant() {
    this.setState({
      restaurants: RestauranStorage.getRestaurants(),
    });
  }
}
