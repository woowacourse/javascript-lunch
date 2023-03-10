import Restaurants from './domain/models/Restaurants';
import header from './component/header';
import modal from './component/modal';
import restaurantList from './component/restaurantList';
import restaurantFilterContainer from './component/restaurantFilterContainer';
import { $ } from './utils/dom';
import ListStorage from './utils/ListStorage';
import { DEFAULT_CATEGORY } from './constants';

class App {
  #root;
  #storage;
  #model;

  constructor(root) {
    this.#root = root;
    this.#storage = new ListStorage('restaurants');
    this.#initRestaurants();
  }

  initRender() {
    this.#root.innerHTML = `
      ${header()}
      <main>
        ${restaurantFilterContainer()}
        <section class="restaurant-list-container">
          ${restaurantList({
            restaurants: this.#model.getFiltered(DEFAULT_CATEGORY, 'name'),
          })}
        </section>
        ${modal()}
      </main>
    `;
  }
}

export default App;
