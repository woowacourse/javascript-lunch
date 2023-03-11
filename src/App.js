import "./types/restaurant";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Tabbar from "./components/Tabbar";
import { TAB } from "./constant/variables";

export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      sortingWay: "name",
      category: "전체",
      tab: TAB.ALL,
    };
    this.render();
  }

  template() {
    return `
      <header class="gnb"></header>
      <main>
        <section class="tab-bar p-16 w-full"></section>
        <section class="restaurant-filter-container"></section>
        <section class="restaurant-list-container"></section>
        <div class="modal"></div>
      </main>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  mounted() {
    const { setState } = this;
    const { sortingWay, category, tab } = this.state;

    const $header = this.$target.querySelector(".gnb");
    const $tabBar = this.$target.querySelector(".tab-bar");
    const $restaurantFilter = this.$target.querySelector(".restaurant-filter-container");
    const $restaurantList = this.$target.querySelector(".restaurant-list-container");

    if (this.state.tab === TAB.ALL) {
      const restaurant = new RestaurantList($restaurantList, { category, sortingWay, tab });
      new Header($header, { render: () => restaurant.render() });
      new Tabbar($tabBar, {
        tab,
        setState: (state) => this.setState(state),
      });
      $restaurantFilter.style.display = "flex";
      new Filter($restaurantFilter, {
        sortingWay,
        category,
        setState: (state) => this.setState(state),
      });
    }

    if (this.state.tab === TAB.FAVORITE) {
      const restaurant = new RestaurantList($restaurantList, { category, sortingWay, tab });
      new Header($header, { render: () => restaurant.render() });
      new Tabbar($tabBar, { tab, setState: (state) => this.setState(state) });
      $restaurantFilter.style.display = "none";
    }
  }
}
