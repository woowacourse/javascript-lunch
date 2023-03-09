import RestaurantFilter from './components/RestaurantFilter';
import Header from './components/Header';
import ModalButton from './components/ModalButton';

class App {
  #app;

  constructor() {
    this.#app = document.querySelector('#app') as HTMLElement;
  }

  paint() {
    this.#app.innerHTML = `
      ${Header.template()}
      ${RestaurantFilter.template()}
    `;
  }

  setEvent() {
    RestaurantFilter.setEvent();
    ModalButton.setEvent();
  }
}

export default App;
