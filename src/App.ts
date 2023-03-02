import FilterButton from "./components/FilterButton";
import Header from "./components/Header";
import ModalButton from "./components/ModalButton";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
  }

  paint() {
    this.#app.innerHTML = `
      ${Header.template()}
      ${FilterButton.template()}
    `;
  }

  setEvent() {
    FilterButton.setEvent();
    ModalButton.setEvent();
  }
}

export default App;
