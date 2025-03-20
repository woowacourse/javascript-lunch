import createSectionContainer from '../components/common/SectionContainer.js';
import createFilterGroup from '../components/FilterGroup.js';
import {
  addRestaurantList,
  createRestaurantList,
  updateRestaurantList,
} from '../components/RestaurantList.js';
import createTabBar from '../components/TabBar.js';
import {
  RESTAURANT_CATEGORY,
  RESTAURANT_MODAL_TYPE,
  RESTAURANT_ORDER,
  RESTAURANT_STATE_KEY,
  RESTAURANT_TAB,
} from '../constants/SETTING.js';
import ModalService from '../services/ModalService.js';
import RestaurantService from '../services/RestaurantService.ts';

class RestaurantController {
  #restaurantService = null;
  #modalService = null;
  #main = document.getElementsByTagName('main')[0];

  #state = {
    category: RESTAURANT_CATEGORY.ALL,
    order: RESTAURANT_ORDER.NAME,
    tab: RESTAURANT_TAB.ALL,
  };

  constructor() {
    this.#restaurantService = new RestaurantService();
    this.#modalService = new ModalService(this.#handleAddRestaurant);
  }

  start() {
    this.#initializeUI();
    this.#modalService.appendModal();

    document.querySelector('.gnb__button').addEventListener('click', () => {
      this.#modalService.toggleModal(RESTAURANT_MODAL_TYPE.ENROLL);
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
      createRestaurantList({
        datas: this.#restaurantService.getOrderedRestaurants(this.#state.order),
        onClickItem: this.#handleClickItem,
        onClickStar: this.#handleClickStar,
      })
    );

    this.#main.append($tabBar, $filterContainer, $listContainer);
  }

  #handleClickStar = (event, id) => {
    this.#updateRestaurantUI(
      this.#restaurantService.toggleFavorite({
        id,
        tab: this.#state.tab,
        category: this.#state.category,
        order: this.#state.order,
      }).filteredList
    );
    event.target.classList.toggle('restaurant__star--clicked');
  };

  #handleChangeCategory = (event) => {
    this.#changeState(RESTAURANT_STATE_KEY.CATEGORY, event.target.value);
    this.#updateRestaurantUI(
      this.#restaurantService.getFilteredRestaurants(this.#state.category, this.#state.order)
    );
  };

  #handleChangeFilter = (event) => {
    this.#changeState(RESTAURANT_STATE_KEY.ORDER, event.target.value);
    this.#updateRestaurantUI(
      this.#restaurantService.getFilteredRestaurants(this.#state.category, this.#state.order)
    );
  };

  #handleTabBar = (event) => {
    document.querySelector('.restaurant-filter-container').classList.toggle('hidden');

    if (event.target.id === RESTAURANT_TAB.FAVORITE) {
      this.#changeState(RESTAURANT_STATE_KEY.TAB, RESTAURANT_TAB.FAVORITE);
      this.#updateRestaurantUI(this.#restaurantService.getFavoriteRestaurants());
    } else if (event.target.id === RESTAURANT_TAB.ALL) {
      this.#initialOptionState();
      this.#changeState(RESTAURANT_STATE_KEY.TAB, RESTAURANT_TAB.ALL);
      this.#updateRestaurantUI(this.#restaurantService.getOrderedRestaurants(this.#state.order));
    }
  };

  #handleDelete = (event, id) => {
    if (window.confirm('해당 음식점을 삭제하시겠습니까?')) {
      this.#updateRestaurantUI(
        this.#restaurantService.deleteRestaurant({
          id,
          tab: this.#state.tab,
          order: this.#state.order,
          category: this.#state.category,
        }).filteredList
      );
      this.#modalService.toggleModal(RESTAURANT_MODAL_TYPE.DETAIL);
      window.alert('삭제되었습니다.');
    }
  };

  #handleClickItem = (event, data) => {
    this.#modalService.updateModalContent({
      data,
      onClickStar: this.#handleClickStar,
      onDelete: this.#handleDelete,
    });
    this.#modalService.toggleModal(RESTAURANT_MODAL_TYPE.DETAIL);
  };

  #handleAddRestaurant = (data) => {
    if (window.confirm('해당 음식점을 추가하시겠습니까?')) {
      addRestaurantList({
        data,
        onClickItem: this.#handleClickItem,
        onClickStar: this.#handleClickStar,
      });
      this.#updateRestaurantUI(
        this.#restaurantService.addRestaurant({
          data,
          tab: this.#state.tab,
          order: this.#state.order,
          category: this.#state.category,
        }).filteredList
      );
      this.#modalService.toggleModal(RESTAURANT_MODAL_TYPE.ENROLL);
      window.alert('추가되었습니다.');
    }
  };

  #updateRestaurantUI(restaurantList) {
    const $restaurants = updateRestaurantList({
      datas: restaurantList,
      onClickItem: this.#handleClickItem,
      onClickStar: this.#handleClickStar,
    });
    this.#main.appendChild($restaurants);
  }

  #changeState(field, value) {
    this.#state[field] = value;
  }

  #initialOptionState() {
    document.querySelector('select#category-filter').value = RESTAURANT_CATEGORY.ALL;
    document.querySelector('select#sorting-filter').value = RESTAURANT_ORDER.NAME;
    this.#changeState(RESTAURANT_STATE_KEY.CATEGORY, RESTAURANT_CATEGORY.ALL);
    this.#changeState(RESTAURANT_STATE_KEY.ORDER, RESTAURANT_ORDER.NAME);
  }
}

export default RestaurantController;
