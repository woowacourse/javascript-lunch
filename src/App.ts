import './App.css';
import { RESTAURANT_CATEGORY } from './domain/Restaurant';
import { SORT_CONDITION } from './domain/RestaurantCatalog';
import Navigator from './components/Navigator/Navigator';
import RestaurantList from './components/RestaurantList';
import RestaurantDropdown from './components/Dropdown/RestaurantDropdown';
import FormModal from './components/Modal/FormModal';

class App {
  #main = document.getElementById('main');

  #restaurantUlElement;

  constructor() {
    this.#restaurantUlElement = new RestaurantList('total');

    this.#renderNavBar();
    this.#renderFormModal();
    this.#renderDropdown();

    this.#main?.appendChild(this.#restaurantUlElement.element);

    this.#addFormButtonEvent();
  }

  #renderNavBar() {
    const navBar = new Navigator((navState) => {
      this.#restaurantUlElement.navState = navState;
    });

    this.#main?.appendChild(navBar.element);
  }

  #renderFormModal() {
    const formModal = new FormModal(() => {
      this.#restaurantUlElement.renderRestaurantList();
    });

    this.#main?.appendChild(formModal.element);
  }

  #renderDropdown() {
    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('restaurant-filter-container');

    this.#generateCategoryDropdown(dropdownContainer);
    this.#generateSortDropdown(dropdownContainer);
    this.#main?.appendChild(dropdownContainer);
  }

  #generateCategoryDropdown(dropdownContainer: HTMLElement) {
    const onChange = (category: string) => {
      this.#restaurantUlElement.categoryFilter = category;
    };

    dropdownContainer.appendChild(
      new RestaurantDropdown('category-select', 'category', RESTAURANT_CATEGORY, onChange).element,
    );
  }

  #generateSortDropdown(dropdownContainer: HTMLElement) {
    const onChange = (sortFilter: string) => {
      this.#restaurantUlElement.sortFilter = sortFilter;
    };

    dropdownContainer.appendChild(new RestaurantDropdown('sort-select', 'sort', SORT_CONDITION, onChange).element);
  }

  #addFormButtonEvent() {
    const modalOpenButton = document.getElementById('add-restaurant-button');
    modalOpenButton?.addEventListener('click', () => {
      const modal = document.getElementById('add-form-modal');

      modal?.classList.remove('modal--close');
      modal?.classList.add('modal--open');
    });
  }
}

export default App;
