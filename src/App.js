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

  addEvents() {
    [
      {
        selectors: 'header button',
        event: 'click',
        actions: [this.#toggleModal],
      },
      {
        selectors: '.modal #cancel',
        event: 'click',
        actions: [this.#toggleModal],
      },
      {
        selectors: 'form',
        event: 'submit',
        actions: [this.#submitForm, this.#toggleModal, this.#initRestaurants, this.#renderList],
      },
      {
        selectors: '#category-filter',
        event: 'change',
        actions: [this.#renderList],
      },
      {
        selectors: '#sorting-filter',
        event: 'change',
        actions: [this.#renderList],
      },
    ].forEach(({ selectors, event, actions }) => {
      this.addEvent({ selectors, event, actions });
    });
  }

  addEvent({ selectors, event, actions }) {
    this.#root.addEventListener(event, (e) => {
      if (!$(selectors).contains(e.target)) return;
      actions.forEach((action) => {
        action(e);
      });
    });
  }

  #initRestaurants = () => {
    this.#model = new Restaurants(this.#storage.getList());
  };

  #toggleModal = () => {
    $('.modal').classList.toggle('modal--open');
  };

  #submitForm = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const restaurant = {
      category: form.get('category'),
      name: form.get('name'),
      takeMinute: form.get('takeMinute'),
      description: form.get('description'),
      link: form.get('link'),
    };

    this.#storage.setList([...this.#storage.getList(), restaurant]);
  };

  #renderList = () => {
    const $categoryFilter = $('#category-filter');
    const $sortingFilter = $('#sorting-filter');

    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sorting = $sortingFilter.options[$sortingFilter.selectedIndex].value;

    $('.restaurant-list').outerHTML = restaurantList({
      restaurants: this.#model.getFiltered(category, sorting),
    });
  };
}

export default App;
