import Dropdown from './components/Dropdown/Dropdown';
import RestaurantList from './components/RestaurantList';
import { DISTANCE_FROM_CAMPUS, IRestaurantInfo, RESTAURANT_CATEGORY } from './domain/Restaurant';
import { SORT_CONDITION } from './domain/RestaurantCatalog';
import DropdownEvent from './components/Dropdown/DropdownEvent';
import restaurantStore from './store/RestaurantStore';
import Navigator from './components/Navigator/Navigator';

class App {
  #restaurantStore;

  #restaurantListComponent;

  constructor() {
    this.#restaurantStore = restaurantStore;
    this.#restaurantListComponent = new RestaurantList();
  }

  run() {
    const navigator = new Navigator();
    const navigatorSection = document.getElementById('navigator-section');
    navigatorSection?.appendChild(navigator.element);

    this.#renderRestaurants();
    this.#renderFilterDropdowns();
    this.#renderFormDropdowns();
    this.#addEventListeners();
  }

  #addEventListeners() {
    DropdownEvent.addCategoryDropdownEventListener(this.#restaurantListComponent);
    DropdownEvent.addSortDropdownEventListener(this.#restaurantListComponent);
    this.#addRestaurantFormEventListener();
    this.#addModalButtonEventHandler();
  }

  #renderRestaurants() {
    const RestaurantListSection = document.getElementById('restaurant-list-section');
    const restaurantsFromStorage = localStorage.getItem('restaurants');

    if (restaurantsFromStorage && RestaurantListSection) {
      RestaurantListSection.innerHTML = '';
      this.#restaurantListComponent.renderRestaurantList(JSON.parse(restaurantsFromStorage));

      RestaurantListSection.appendChild(this.#restaurantListComponent);
    }
  }

  #renderFilterDropdowns() {
    const restaurantFilterDropdownContainer = document.getElementById('restaurant-filter-dropdown-container');

    restaurantFilterDropdownContainer?.appendChild(new Dropdown('category-select', 'category', RESTAURANT_CATEGORY));
    restaurantFilterDropdownContainer?.appendChild(new Dropdown('sort-select', 'sort', SORT_CONDITION));
  }

  #renderFormDropdowns() {
    const formCategorySelectContainer = document.getElementById('form-category-select-container');
    const formDistanceSelectContainer = document.getElementById('form-distance-select-container');

    formCategorySelectContainer?.appendChild(
      new Dropdown('form-category-select-container', 'category', RESTAURANT_CATEGORY),
    );
    formDistanceSelectContainer?.appendChild(
      new Dropdown('form-distance-select-container', 'distance', DISTANCE_FROM_CAMPUS),
    );
  }

  #addRestaurantFormEventListener() {
    const addForm = document.getElementById('add-restaurant-form');

    addForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const restaurantInfo = this.#makeRestaurantInfo(target);
      this.#formSubmitEvent(restaurantInfo);
    });
  }

  #makeRestaurantInfo(target: HTMLFormElement) {
    const name = (target.querySelector('#name') as HTMLInputElement).value;
    const { category, distance, description, link } = target;
    return {
      category: category.value,
      name,
      distanceFromCampus: Number(distance.value),
      description: description.value,
      link: link.value,
    } as IRestaurantInfo;
  }

  #formSubmitEvent(restaurantInfo: IRestaurantInfo) {
    try {
      this.#restaurantStore.addNewRestaurantToStore(restaurantInfo);
      this.#renderRestaurants();
      this.#closeModal();
    } catch (error: any) {
      alert(error.message);
    }
  }

  #addModalButtonEventHandler() {
    const modalCloseButton = document.getElementById('form-modal-close-button');
    modalCloseButton?.addEventListener('click', () => {
      this.#closeModal();
    });

    const modalOpenButton = document.getElementById('add-restaurant-button');
    modalOpenButton?.addEventListener('click', () => {
      this.#openModal();
    });
  }

  #closeModal() {
    const modal = document.getElementById('add-form-modal');
    const form = document.getElementById('add-restaurant-form') as HTMLFormElement;

    modal?.classList.remove('modal--open');
    modal?.classList.add('modal--close');
    form?.reset();
  }

  #openModal() {
    const modal = document.getElementById('add-form-modal');

    modal?.classList.remove('modal--close');
    modal?.classList.add('modal--open');
  }
}

export default App;
