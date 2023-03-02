import FilterButton from "./components/FilterButton";
import Header from "./components/Header";
import ModalButton from "./components/ModalButton";
import SortButton from "./components/SortButton";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <section class="restaurant-filter-container">
        ${FilterButton.template()}
        ${SortButton.template()}
      </section>
    `;
    this.#setEvent();
  }

  #setEvent() {
    FilterButton.setEvent();
    ModalButton.setEvent();
    SortButton.setEvent();
  }
}

export default App;
