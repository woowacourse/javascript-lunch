import Restaurants from "./domain/Restaurants";
import RestaurantCardList from "./components/RestaurantCardList";

class App {
  #restaurants;

  constructor() {
    const restaurants = JSON.parse(localStorage.getItem("restaurants") ?? "[]");

    this.#restaurants = new Restaurants([
      {
        category: "일식",
        name: "스시야좋아",
        distance: 15,
      },
      {
        category: "아시안",
        name: "쌀국수맛있다",
        distance: 20,
      },
      {
        category: "한식",
        name: "경주 은희네 해장국",
        distance: 10,
      },
    ]);

    this.renderContainer();
    this.renderRestaurantList();
    this.bindEvent();
  }

  renderContainer() {
    document.body.innerHTML = `
      <header is="lunch-header" class="gnb"></header>
      <main>
        <section class="restaurant-filter-container">
          <select is="custom-select" name="category" id="category-filter" class="restaurant-filter"></select>
          <select is="custom-select" name="sorting" id="sorting-filter" class="restaurant-filter"></select>
        </section>
        <section class="restaurant-list-container">
          <ul is="restaurant-card-list" class="restaurant-list"></ul>
        </section>
        <lunch-modal class="modal"></lunch-modal>
      </main>
    `;
  }

  bindEvent() {
    const $sortingSelect = document.querySelector("#sorting-filter");
    const $filteringSelect = document.querySelector("#category-filter");

    $sortingSelect?.addEventListener(
      "change",
      this.onClickSortingOption.bind(this)
    );
    $filteringSelect?.addEventListener(
      "change",
      this.onClickFilteringOption.bind(this)
    );
  }

  onClickSortingOption(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    const restaurantCardList =
      document.querySelector<RestaurantCardList>(".restaurant-list");
    restaurantCardList?.setAttribute("data-sorting", event.target.value);
  }

  onClickFilteringOption(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    const restaurantCardList =
      document.querySelector<RestaurantCardList>(".restaurant-list");
    restaurantCardList?.setAttribute("data-category", event.target.value);
  }

  onSubmitNewRestaurant(event: Event) {
    event.preventDefault();

    this.renderRestaurantList();

    localStorage.setItem(
      "restaurants",
      JSON.stringify(
        this.#restaurants.getListByOption({ filter: "전체", sort: "name" })
      )
    );
  }

  renderRestaurantList() {
    const restaurantCardList =
      document.querySelector<RestaurantCardList>(".restaurant-list");

    restaurantCardList?.render(this.#restaurants);
  }
}

export default App;
