import { DISTANCE_FROM_CAMPUS, RESTAURANT_CATEGORY } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION } from '../domain/RestaurantCatalog';
import { mockingData } from '../domain/mocking';

class WebController {
  #restaurantCatalog;

  run() {
    this.#restaurantCatalog = new RestaurantCatalog();
    this.#defaultDataInsert();

    this.#initRestaurantCatalogFromLocalStorage();

    this.#assignRestaurantDataAttribute();

    this.#renderDropdownOptions('category-select', ['전체', ...RESTAURANT_CATEGORY]);
    this.#renderDropdownOptions('sort-select', SORT_CONDITION);
    this.#renderDropdownOptions('add-category-select', RESTAURANT_CATEGORY);
    this.#renderDropdownOptions('add-distance-select', DISTANCE_FROM_CAMPUS);

    this.#formSubmitEventHandler();

    // Button event
    const modalCloseButton = document.getElementById('form-modal-close-button');
    modalCloseButton.addEventListener('click', () => {
      this.#closeModal();
    });

    const modalOpenButton = document.getElementById('add-restaurent-button');
    modalOpenButton.addEventListener('click', () => {
      this.#openModal();
    });
  }

  #defaultDataInsert() {
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

  // TODO: 리팩터링, 메서드의 위치 -> component로?
  #renderDropdownOptions(id, options) {
    const select = document.getElementById(id);
    select.addOptions(options);
    select.catalog = this.#restaurantCatalog;
  }

  #assignRestaurantDataAttribute() {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.setAttribute(
      'data-restaurants',
      JSON.stringify(this.#restaurantCatalog.getRestaurants().map((restaurant) => restaurant.getInfo())),
    );
  }

  #formSubmitEventHandler() {
    const addForm = document.getElementById('add-restaurant-form');

    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const {
        category: { value: categoryValue },
        name: { value: nameValue },
        distance: { value: distanceValue },
        description: { value: descriptionValue },
        link: { value: linkValue },
      } = e.target;
      const restaurantInfo = {
        category: categoryValue,
        name: nameValue,
        distanceFromCampus: Number(distanceValue),
        description: descriptionValue,
        link: linkValue,
      };
      try {
        this.#restaurantCatalog.pushNewRestaurant(restaurantInfo);
        this.#updateRestaurantToLocalStorage(restaurantInfo);
        this.#assignRestaurantDataAttribute();
        this.#closeModal();
      } catch (e) {
        alert(e.message);
      }
    });
  }

  #updateRestaurantToLocalStorage(restaurant) {
    const restaurantArr = JSON.parse(localStorage.getItem('restaurants')) || [];
    restaurantArr.push(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(restaurantArr));
  }

  #closeModal() {
    const modal = document.getElementById('add-form-modal');

    modal.classList.remove('modal--open');
    modal.classList.add('modal--close');
  }

  #openModal() {
    const modal = document.getElementById('add-form-modal');

    modal.classList.remove('modal--close');
    modal.classList.add('modal--open');
  }
}

export default WebController;
