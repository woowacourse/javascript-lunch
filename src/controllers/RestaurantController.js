import { CATEGORY_KEY, RESTAURANT_DATA } from '../../public/restaurantData.js';
import createSectionContainer from '../components/common/SectionContainer.js';
import createFilterGroup from '../components/FilterGroup.js';
import createRestaurantEnrollModal from '../components/RestaurantEnrollModal.js';
import { createRestaurantList, filterRestaurant } from '../components/RestaurantList.js';
import RestaurantList from '../domains/RestaurantList.js';
import RestaurantStorage from '../domains/RestaurantStorage.js';

class RestaurantController {
  #main = document.getElementsByTagName('main')[0];
  #restaurantList = null;
  #restaurantStorage = null;
  #category = null;
  #order = '이름순';

  constructor() {
    this.#restaurantStorage = new RestaurantStorage();
    this.#restaurantList = new RestaurantList(this.#restaurantStorage.getAllRestaurants());
  }

  start() {
    const { $enrollRestaurantModal } = this.#createLayout();

    const $openModalButton = document.querySelector('.gnb__button');
    const $backDrop = document.querySelector('.modal-backdrop');

    $openModalButton.addEventListener('click', () => {
      $enrollRestaurantModal.toggle();
    });

    $backDrop.addEventListener('click', () => {
      $enrollRestaurantModal.toggle();
    });
  }

  #createLayout() {
    const $filterContainer = createSectionContainer('restaurant-filter-container');
    $filterContainer.appendChild(
      createFilterGroup(this.#handleChangeCategory, this.#handleChangeFilter)
    );

    const $listContainer = createSectionContainer('restaurant-list-container');
    $listContainer.appendChild(
      createRestaurantList(
        this.#restaurantList.getOrderedRestaurantList(this.#order),
        this.#handleClickStar
      )
    );

    const $enrollRestaurantModal = createRestaurantEnrollModal();
    this.#main.append($filterContainer, $listContainer, $enrollRestaurantModal.getElement());

    return { $enrollRestaurantModal };
  }

  #handleClickStar = (event) => {
    event.target.classList.toggle('restaurant__star--clicked');
  };

  #handleChangeCategory = (event) => {
    this.#category = event.target.value;
    const restaurantList = this.#restaurantList.filterRestaurant(this.#category, this.#order);
    const $filteredRestaurants = filterRestaurant(restaurantList);
    this.#main.appendChild($filteredRestaurants);
  };

  #handleChangeFilter = (event) => {
    this.#order = event.target.value;
    const restaurantList = this.#restaurantList.filterRestaurant(this.#category, this.#order);
    const $filteredRestaurants = filterRestaurant(restaurantList);
    this.#main.appendChild($filteredRestaurants);
  };
}

export default RestaurantController;
