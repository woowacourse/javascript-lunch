import "./types/restaurant";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";

export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      sortingWay: "name",
      category: "전체",
    };
    this.render();
  }

  template() {
    return `
      <header class="gnb"></header>
      <main>
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
    const { render, setState } = this;
    const { sortingWay, category } = this.state;

    const $header = this.$target.querySelector(".gnb");
    const $restaurantFilter = this.$target.querySelector(".restaurant-filter-container");
    const $restaurantList = this.$target.querySelector(".restaurant-list-container");

    new Header($header, { render: render.bind(this) });
    new Filter($restaurantFilter, {
      sortingWay,
      category,
      setState: setState.bind(this),
    });
    new RestaurantList($restaurantList, { category, sortingWay });
  }
}
