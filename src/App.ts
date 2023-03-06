import RestaurantCardList from "./components/RestaurantCardList";

class App {
  constructor() {
    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <header is="lunch-header" class="gnb"></header>
      <main>
        <section class="restaurant-filter-container">
          <select is="custom-select" name="category" id="category-filter" class="restaurant-filter" hasFilterEvent></select>
          <select is="custom-select" name="sorting" id="sorting-filter" class="restaurant-filter" hasFilterEvent></select>
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
