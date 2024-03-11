import { DISTANCE_FROM_CAMPUS, RESTAURANT_CATEGORY } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION } from '../domain/RestaurantCatalog';
import mockingData from '../domain/mocking';

class WebController {
  #restaurantCatalog;

  run() {
    this.#init();
    this.#renderDropdownElement();
    this.#addEventToForm();
    this.#addEventToButton();
  }

  #init() {
    this.#restaurantCatalog = new RestaurantCatalog();
    this.#insertDefaultData();
    this.#initRestaurantCatalogFromLocalStorage();
    this.#assignRestaurantDataAttribute();
  }

  #renderDropdownElement() {
    this.#renderDropdownOptions('category-select', RESTAURANT_CATEGORY);
    this.#renderDropdownOptions('sort-select', SORT_CONDITION);
    this.#renderDropdownOptions('add-category-select', RESTAURANT_CATEGORY);
    this.#renderDropdownOptions('add-distance-select', DISTANCE_FROM_CAMPUS);
  }

  #addEventToButton() {
    const modalCloseButton = document.getElementById('form-modal-close-button');
    modalCloseButton.addEventListener('click', () => {
      this.#closeModal();
    });

    const modalOpenButton = document.getElementById('add-restaurant-button');
    modalOpenButton.addEventListener('click', () => {
      this.#openModal();
    });
  }

  #insertDefaultData() {
    mockingData.forEach((data) => {
      this.#restaurantCatalog.pushNewRestaurant(data);
    });
  }

  #initRestaurantCatalogFromLocalStorage() {
    const localData = localStorage.getItem('restaurants');
    if (localData) {
      JSON.parse(localData).forEach((restaurant) => {
        this.#restaurantCatalog.pushNewRestaurant(restaurant);
      });
    }
  }

  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
    select.catalog = this.#restaurantCatalog;
  }

  #assignRestaurantDataAttribute() {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.setAttribute(
      'data-restaurants',
      JSON.stringify(
        this.#restaurantCatalog.getRestaurants().map((restaurant) => restaurant.getRestaurantInfoObject()),
      ),
    );
  }

  #addEventToForm() {
    const addForm = document.getElementById('add-restaurant-form');

    addForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const restaurantInfo = this.#makeRestaurantInfo(event.target);
      this.#executeFormSubmitEvent(restaurantInfo);
    });
  }

  #executeFormSubmitEvent(restaurantInfo) {
    try {
      this.#restaurantCatalog.pushNewRestaurant(restaurantInfo);
      this.#updateRestaurantToLocalStorage(restaurantInfo);
      this.#assignRestaurantDataAttribute();
      this.#closeModal();
    } catch (error) {
      alert(error.message);
    }
  }

  #makeRestaurantInfo(target) {
    const { category, name, distance, description, link } = target;
    return {
      category: category.value,
      name: name.value,
      distanceFromCampus: Number(distance.value),
      description: description.value,
      link: link.value,
    };
  }

  #updateRestaurantToLocalStorage(restaurant) {
    const restaurantArr = JSON.parse(localStorage.getItem('restaurants')) || [];
    restaurantArr.push(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(restaurantArr));
  }

  #closeModal() {
    const modal = document.getElementById('add-form-modal');
    const form = document.getElementById('add-restaurant-form');

    modal.classList.remove('modal--open');
    modal.classList.add('modal--close');
    form.reset();
  }

  #openModal() {
    const modal = document.getElementById('add-form-modal');

    modal.classList.remove('modal--close');
    modal.classList.add('modal--open');
  }
}

export default WebController;
