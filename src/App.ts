import createCustomSelect from "./components/CustomSelect";
import createCustomModal from "./components/CustomModal";

class App {
  constructor() {
    this.init();
  }

  init() {
    createCustomSelect();
    createCustomModal();
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
        <custom-modal></custom-modal>
      </main>
    `;
  }
}

export default App;
