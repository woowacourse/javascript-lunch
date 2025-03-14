import createSectionContainer from '../components/common/SectionContainer.js';
import createFilterGroup from '../components/FilterGroup.js';
import {
  addRestaurantList,
  createRestaurantList,
  updateRestaurantList,
} from '../components/RestaurantList.js';
import createTabBar from '../components/TabBar.js';
import { CATEGORY, MODAL_TYPE, ORDER, STATE_KEY, TAB } from '../constants/SETTING.js';
import RestaurantList from '../domains/RestaurantList.js';
import ModalService from '../services/ModalService.js';
import RestaurantService from '../services/RestaurantService.js';

class RestaurantController {
  #restaurantService = null;
  #modalService = null;
  #main = document.getElementsByTagName('main')[0];

  #state = {
    category: CATEGORY.ALL,
    order: ORDER.NAME,
    tab: TAB.ALL,
  };

  constructor() {
    this.#restaurantService = new RestaurantService();
    this.#modalService = new ModalService(this.#handleAddRestaurant);
  }

  start() {
    this.#initializeUI();
    this.#modalService.appendModal();

    document.querySelector('.gnb__button').addEventListener('click', () => {
      this.#modalService.toggleModal(MODAL_TYPE.ENROLL);
    });
  }

  #initializeUI() {
    const $tabBar = createTabBar(this.#handleTabBar);
    const $filterContainer = createSectionContainer('restaurant-filter-container');
    $filterContainer.appendChild(
      createFilterGroup(this.#handleChangeCategory, this.#handleChangeFilter)
    );

    const $listContainer = createSectionContainer('restaurant-list-container');
    $listContainer.appendChild(
      createRestaurantList(
        this.#restaurantService.getOrderedRestaurants(this.#state.order),
        this.#handleClickItem,
        this.#handleClickStar
      )
    );

    this.#main.append($tabBar, $filterContainer, $listContainer);
  }

  #handleClickStar = (event, id) => {
    const { filteredList } = this.#restaurantService.toggleFavorite({
      id,
      tab: this.#state.tab,
      category: this.#state.category,
      order: this.#state.order,
    });
    this.#updateRestaurantUI(filteredList);
    event.target.classList.toggle('restaurant__star--clicked');
  };

  #handleChangeCategory = (event) => {
    this.#changeState(STATE_KEY.CATEGORY, event.target.value);
    const restaurantList = this.#restaurantService.getFilteredRestaurants(
      this.#state.category,
      this.#state.order
    );
    this.#updateRestaurantUI(restaurantList);
  };

  #handleChangeFilter = (event) => {
    this.#changeState(STATE_KEY.ORDER, event.target.value);
    const restaurantList = this.#restaurantService.getFilteredRestaurants(
      this.#state.category,
      this.#state.order
    );
    this.#updateRestaurantUI(restaurantList);
  };

  #handleTabBar = (event) => {
    document.querySelector('.restaurant-filter-container').classList.toggle('hidden');

    if (event.target.id === TAB.FAVORITE) {
      const favoriteRestaurantList = this.#restaurantService.getFavoriteRestaurants();
      this.#updateRestaurantUI(favoriteRestaurantList);
      this.#changeState(STATE_KEY.TAB, TAB.FAVORITE);
      document.querySelector('select#category-filter').value = CATEGORY.ALL;
    } else if (event.target.id === TAB.ALL) {
      const allRestaurants = this.#restaurantService.getOrderedRestaurants(this.#state.order);
      this.#updateRestaurantUI(allRestaurants);
      this.#changeState(STATE_KEY.TAB, TAB.ALL);
    }
  };

  #handleDelete = (event, id) => {
    if (window.confirm('해당 음식점을 삭제하시겠습니까?')) {
      const { filteredList } = this.#restaurantService.deleteRestaurant({
        id,
        tab: this.#state.tab,
        order: this.#state.order,
        category: this.#state.category,
      });
      this.#updateRestaurantUI(filteredList);
      this.#modalService.toggleModal(MODAL_TYPE.DETAIL);
    }
  };

  #handleClickItem = (event, data) => {
    this.#modalService.updateModalContent({
      data,
      onClickStar: this.#handleClickStar,
      onDelete: this.#handleDelete,
    });
    this.#modalService.toggleModal(MODAL_TYPE.DETAIL);
  };

  #handleAddRestaurant = (inputData) => {
    if (window.confirm('해당 음식점을 추가하시겠습니까?')) {
      addRestaurantList(inputData, this.#handleClickItem, this.#handleClickStar);

      const { filteredList } = this.#restaurantService.addRestaurant({
        data: inputData,
        tab: this.#state.tab,
        order: this.#state.order,
        category: this.#state.category,
      });
      this.#updateRestaurantUI(filteredList);
      this.#modalService.toggleModal(MODAL_TYPE.ENROLL);
    }
  };

  #updateRestaurantUI(restaurantList) {
    const $restaurants = updateRestaurantList(
      restaurantList,
      this.#handleClickItem,
      this.#handleClickStar
    );
    this.#main.appendChild($restaurants);
  }

  #changeState(field, value) {
    this.#state[field] = value;
  }
}

export default RestaurantController;
