import Restaurants from './domain/models/Restaurants';
import header from './component/header';
import modal from './component/bottomSheet/modal';
import restaurantList from './component/restaurantListPage/restaurantList';
import restaurantFilterContainer from './component/restaurantFilterContainer';
import tabBar from './component/tabBar';
import form from './component/bottomSheet/form';
import detail from './component/bottomSheet/detail';
import { $ } from './utils/dom';
import CustomStorage from './utils/CustomStorage';
import { DEFAULT_CATEGORY, DEFAULT_SORTING } from './constants';

class App {
  #root;
  #storage;
  #model;

  constructor(root) {
    this.#root = root;
    this.#storage = new CustomStorage('restaurants', []);
    this.initModel();
  }

  initRender() {
    const restaurants = this.#model.getFiltered(DEFAULT_CATEGORY, DEFAULT_SORTING);
    this.#root.innerHTML = `
      ${header()}
      <main>
        ${tabBar({ checkedType: 'all' })}
        ${restaurantFilterContainer()}
        <section class="restaurant-list-container">
          ${restaurantList({
            restaurants,
          })}
        </section>
        ${modal({ id: 'form-modal', content: form() })}
        ${modal({ id: 'detail-modal', content: '' })}
      </main>
    `;
  }

  addEvents() {
    [
      {
        selectors: 'header button',
        event: 'click',
        action: this.toggleFormModal,
      },
      {
        selectors: '#form-modal #cancel',
        event: 'click',
        action: this.toggleFormModal,
      },
      {
        selectors: '#form-modal form',
        event: 'submit',
        actions: [
          this.submitForm,
          this.initForm,
          this.toggleFormModal,
          this.initModel,
          this.renderList,
        ],
      },
      {
        selectors: '#category-filter',
        event: 'change',
        action: this.renderList,
      },
      {
        selectors: '#sorting-filter',
        event: 'change',
        action: this.renderList,
      },
      {
        selectors: '.tab-bar',
        event: 'change',
        actions: [this.toggleFilterContainer, this.renderList],
      },
      {
        selectors: '.restaurant-list',
        event: 'click',
        action: this.handleListItem,
      },
      {
        selectors: '#detail-modal .favorite-icon',
        event: 'click',
        actions: [this.updateFavorite, this.initModel, this.updateDetailModal, this.renderList],
      },
      {
        selectors: '#detail-modal #close',
        event: 'click',
        action: this.toggleDetailModal,
      },
      {
        selectors: '#detail-modal #remove',
        event: 'click',
        actions: [this.removeRestaurant, this.initModel, this.renderList, this.toggleDetailModal],
      },
    ].forEach((manual) => {
      this.addEvent(manual);
    });
  }

  addEvent({ selectors, event, action, actions = [action] }) {
    this.#root.addEventListener(event, (e) => {
      const $target = $(selectors);
      if ($target === null || !$target.contains(e.target)) return;

      actions.forEach((action) => {
        action(e);
      });
    });
  }

  handleListItem = (e) => {
    if (e.target.closest('.favorite-icon')) {
      this.updateFavorite(e);
      this.initModel();
      this.renderList();
    } else {
      this.updateDetailModal(e);
      this.toggleDetailModal();
    }
  };

  initModel = () => {
    this.#model = new Restaurants(this.#storage.getValue());
  };

  toggleFormModal = () => {
    $('#form-modal').classList.toggle('modal--open');
  };

  toggleDetailModal = () => {
    $('#detail-modal').classList.toggle('modal--open');
  };

  submitForm = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const restaurant = {
      id: String(Date.now()),
      category: form.get('category'),
      name: form.get('name'),
      takeMinute: form.get('takeMinute'),
      favorite: false,
      description: form.get('description'),
      link: form.get('link'),
    };

    this.#storage.setValue([...this.#storage.getValue(), restaurant]);
  };

  initForm = () => {
    $('#form-modal .modal-container').innerHTML = form();
  };

  renderList = () => {
    const $categoryFilter = $('#category-filter');
    const $sortingFilter = $('#sorting-filter');
    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sorting = $sortingFilter.options[$sortingFilter.selectedIndex].value;

    const restaurants =
      $('input[name=listType]:checked').id === 'favorite'
        ? this.#model.getFavorite()
        : this.#model.getFiltered(category, sorting);
    $('.restaurant-list').outerHTML = restaurantList({ restaurants });
  };

  toggleFilterContainer = () => {
    $('.restaurant-filter-container').classList.toggle('restaurant-filter-container--close');
  };

  updateFavorite = (e) => {
    const id = e.target.dataset.id;
    const newRestaurants = this.#model
      .getAll()
      .map((restaurant) =>
        restaurant.id === id ? { ...restaurant, favorite: !restaurant.favorite } : restaurant
      );
    this.#storage.setValue(newRestaurants);
  };

  updateDetailModal = (e) => {
    const $parent = e.target.closest('.restaurant') || e.target.closest('.detail');
    const restaurant = this.#model.findRestaurant($parent.dataset.id);
    $('#detail-modal .modal-container').innerHTML = detail({ restaurant });
  };

  removeRestaurant = (e) => {
    const id = e.target.closest('.detail').dataset.id;
    const newRestaurants = this.#model.getAll().filter((restaurant) => restaurant.id !== id);
    this.#storage.setValue(newRestaurants);
  };
}

export default App;
