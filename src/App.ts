import RestaurantCardList from "./components/RestaurantCardList";

class App {
  constructor() {
    this.renderContainer();
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
}

export default App;
