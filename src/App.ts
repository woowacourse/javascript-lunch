import createCustomSelect from "./components/CustomSelect";
import createCustomModal from "./components/CustomModal";
import createCustomHeader from "./components/CustomHeader";

class App {
  #modal: HTMLElement | null;

  constructor() {
    this.init();

    this.#modal = document.querySelector(".modal");
  }

  init() {
    createCustomSelect();
    createCustomModal();
    createCustomHeader();

    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <custom-header></custom-header>
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

  openModal() {
    this.#modal?.classList.add("modal--open");
  }

  closeModal() {
    this.#modal?.classList.remove("modal--open");
  }
}

export default App;
