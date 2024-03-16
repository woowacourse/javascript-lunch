import Component from "./common/Component";
import Header from "./components/Header";
import RestauranStorage from "./domain/RestauranStorage";
import Restaurants from "./components/Restuarants";
import Filter from "./components/Filter";
import { RestaurantType } from "./types";

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
              <section class="restaurant-select">

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
    const filter = this.state.filter;
    const restaurants: RestaurantType[] = this.state.restaurants;
    const $header = document.querySelector(".gnb");
    const $restaurants = document.querySelector(".restaurants");
    const $filter = document.querySelector(".filter-container");
    new Header($header, {
      addRestaurant: this.addRestaurant.bind(this),
      loadRestaurant: this.loadRestaurant.bind(this),
    });
    new Filter($filter, {
      filter: this.state.filter,
      changeFilter: this.changeFilter.bind(this),
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

  addRestaurant(newRestaurant: Restaurants) {
    this.setState({
      filter: this.state.filter,
      restaurants: [newRestaurant, ...this.state.restaurants],
    });
  }

  changeFilter(newFilter: "all" | "bookmark") {
    this.setState({
      filter: newFilter,
      restaurants: RestauranStorage.getRestaurants(),
    });
  }
}
