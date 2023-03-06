import "./types/restaurant";
import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";

export default class App extends Component {
  restaurantRepository: any;

  setup() {
    this.state = {
      sortingWay: "name",
      category: "전체",
    };
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

  mounted() {
    const { render, setState } = this;
    const { sortingWay, category } = this.state;

    const $header = this.$target.querySelector(".gnb") as HTMLElement;
    const $restaurantFilter = this.$target.querySelector(".restaurant-filter-container") as HTMLElement;
    const $restaurantList = this.$target.querySelector(".restaurant-list-container") as HTMLElement;

    new Header($header, { render: render.bind(this) });
    new Filter($restaurantFilter, {
      sortingWay,
      category,
      setState: setState.bind(this),
    });
    new RestaurantList($restaurantList, { category, sortingWay });
  }
}
