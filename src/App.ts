import { LUNCH_STORAGE_ID } from "./constants/storageId";
import restaurantState from "./states/restaurants";

class App {
  constructor() {
    this.render();
    this.bindEvent();
  }

  render() {
    document.body.insertAdjacentHTML("afterbegin", this.mainPage());
  }

  bindEvent() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem(
        LUNCH_STORAGE_ID,
        JSON.stringify(restaurantState.getList())
      );
    });
  }

  mainPage() {
    return `
      <header is="lunch-header" class="gnb"></header>
      <main>
        <section class="restaurant-filter-container">
          <select is="restaurant-option-select" name="category" id="category-filter" class="restaurant-filter" hasFilterEvent></select>
          <select is="restaurant-option-select" name="sorting" id="sorting-filter" class="restaurant-filter" hasFilterEvent></select>
        </section>
        <section class="restaurant-list-container">
          <ul is="restaurant-card-list" class="restaurant-list"></ul>
        </section>
        <modal-root class="modal"></modal-root>
      </main>
    `;
  }
}

export default App;
