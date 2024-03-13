import { DISTANCE_FROM_CAMPUS, IRestaurantInfo, RESTAURANT_CATEGORY } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION } from '../domain/RestaurantCatalog';
import { mockingData } from '../domain/mocking';
import Dropdown from '../components/Dropdown';
import RestaurantCards from '../components/RestaurantCards';

class WebController {
  #restaurantCatalog: RestaurantCatalog;

  constructor() {
    this.#restaurantCatalog = new RestaurantCatalog();
  }

  run() {
    this.#initDefaultData();
    this.#renderRestaurants();
    this.#renderFilterDropdowns();
    this.#renderFormDropdowns();
    this.#formSubmitEventHandler();
    this.#buttonEventHandler();
  }

  #initDefaultData() {
    this.#insertDefaultData();
    this.#initRestaurantCatalogFromLocalStorage();
    this.#setLocalStorage();
  }

  #insertDefaultData() {
    if (!localStorage.getItem('restaurants')) {
      mockingData.forEach((data) => {
        this.#restaurantCatalog.pushNewRestaurant(data);
      });
    }
  }

  #initRestaurantCatalogFromLocalStorage() {
    const localData = localStorage.getItem('restaurants');
    if (localData) {
      JSON.parse(localData).forEach((restaurant: any) => {
        this.#restaurantCatalog.pushNewRestaurant(restaurant);
      });
    }
  }

  #setLocalStorage() {
    const restaurants = JSON.stringify(this.#restaurantCatalog.getTotalRestaurantInfo());

    localStorage.setItem('restaurants', restaurants);
  }

  #renderFilterDropdowns() {
    const restaurantFilterDropdownContainer = document.getElementById('restaurant-filter-dropdown-container');

    restaurantFilterDropdownContainer?.appendChild(new Dropdown('category-select', 'category', RESTAURANT_CATEGORY));
    restaurantFilterDropdownContainer?.appendChild(new Dropdown('sort-select', 'sort', SORT_CONDITION));
  }

  #renderRestaurants() {
    const restaurantCardsContainer = document.getElementById('restaurant-cards-container');
    const restaurantsFromStorage = localStorage.getItem('restaurants');

    if (restaurantsFromStorage && restaurantCardsContainer) {
      restaurantCardsContainer.innerHTML = '';
      restaurantCardsContainer.appendChild(new RestaurantCards(JSON.parse(restaurantsFromStorage)));
    }
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

  #formSubmitEventHandler() {
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
      this.#restaurantCatalog.pushNewRestaurant(restaurantInfo);
      this.#updateRestaurantToLocalStorage();
      this.#renderRestaurants();
      this.#closeModal();
    } catch (error: any) {
      alert(error.message);
    }
  }

  #updateRestaurantToLocalStorage() {
    if (localStorage.getItem('restaurants') !== null) {
      localStorage.removeItem('restaurants');
      this.#setLocalStorage();
    }
  }

  #buttonEventHandler() {
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

export default WebController;
