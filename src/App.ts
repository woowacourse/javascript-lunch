import actions from './hooks/actions';
import { $ } from './utils/querySelector';
import Header from './view/components/Header';
import RestaurantAddModal from './view/components/RestaurantAddModal';
import RestaurantList from './view/components/RestaurantList';

class App {
  #root;

  constructor($target: HTMLElement) {
    this.#root = $target;

    actions.reset();
    this.render();
  }

  #template() {
    return `
      <div class="restaurant-list-wrapper"></div>
      <div class="modal-wrapper"></div>
    `;
  }

  render() {
    new Header(this.#root).render();

    this.#root.insertAdjacentHTML('beforeend', this.#template());

    new RestaurantList($('.restaurant-list-wrapper')).render();
    new RestaurantAddModal($('.modal-wrapper')).render();
  }
}

export default App;
