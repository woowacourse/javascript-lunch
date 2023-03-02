import createCustomSelect from "./components/CustomSelect";

class App {
  constructor() {
    this.init();
  }

  init() {
    createCustomSelect();
    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <header class="gnb"></header>
      <main>
        <section class="restaurant-filter-container">
          <custom-select name="category" id="category-filter" class="restaurant-filter"></custom-select>
          <custom-select name="sorting" id="sorting-filter" class="restaurant-filter"></custom-select>
        </section>
        <section class="restaurant-list-container"></section>
        <div class="modal modal--open">
          <div class="modal-backdrop"></div>
          <div class="modal-container"></div>
        </div>
      </main>
    `;
  }
}

export default App;
