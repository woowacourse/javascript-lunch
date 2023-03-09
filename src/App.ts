import RestaurantFilter from './components/RestaurantFilter';
import Header from './components/Header';
import ModalButton from './components/ModalButton';

class App {
  #app;

  constructor() {
    this.#app = document.querySelector('#app') as HTMLElement;
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      ${RestaurantFilter.template()}
    `;

    this.#setEvent();
  }

  #setEvent() {
    RestaurantFilter.setEvent();
    ModalButton.setEvent();
  }
}

export default App;
