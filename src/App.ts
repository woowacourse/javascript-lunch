import Component from "./common/Component";
import Header from "./components/Header";
import RestauranStorage from "./domain/RestaurantStorage";
import Restaurants from "./components/Restuarants";
import Filter from "./components/Filter";
import { RestaurantType } from "./types";
import Selects from "./components/Selects";

interface AppProps {}

export default class App extends Component<HTMLDivElement, AppProps> {
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
              <section class="select-container"></section>
              <section class="restaurants"></section>
            </main>
            <div class="modal">
              <div class="modal-backdrop"></div>
              <div class="modal-container"></div>
            </div>
        `;
  }

  setEvents(): void {
    const $header = document.querySelector<HTMLDivElement>(".gnb");
    const $restaurants = document.querySelector<HTMLDivElement>(".restaurants");
    const $filter = document.querySelector<HTMLDivElement>(".filter-container");
    const $select = document.querySelector<HTMLDivElement>(".select-container");
    const restaurants = this.state.restaurants as RestaurantType[];
    if ($header) {
      new Header($header, {
        loadRestaurant: this.loadRestaurant.bind(this),
      });
    }

    if ($filter) {
      new Filter($filter, {
        loadRestaurant: this.loadRestaurant.bind(this),
      });
    }

    if (RestauranStorage.getFilter() === "all" && $select) {
      new Selects($select, {
        loadRestaurant: this.loadRestaurant.bind(this),
      });
    }
    if ($restaurants) {
      new Restaurants($restaurants, {
        restaurants,
        loadRestaurant: this.loadRestaurant.bind(this),
      });
    }
  }

  loadRestaurant() {
    this.setState({
      restaurants: RestauranStorage.getRestaurants(),
    });
  }
}
