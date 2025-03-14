import { CATEGORY_KEY, RESTAURANT_DATA } from '../../public/restaurantData.js';
import createSectionContainer from '../components/common/SectionContainer.js';
import createFilterGroup from '../components/FilterGroup.js';
import RestaurantDetailModal from '../components/RestaurantDetailModal.js';
import createRestaurantDetailModal from '../components/RestaurantDetailModal.js';
import createRestaurantEnrollModal from '../components/RestaurantEnrollModal.js';
import {
  createRestaurantList,
  addRestaurantList,
  updateRestaurantList,
} from '../components/RestaurantList.js';
import createTabBar from '../components/TabBar.js';
import RestaurantList from '../domains/RestaurantList.js';
import RestaurantStorage from '../domains/RestaurantStorage.js';

class RestaurantController {
  #main = document.getElementsByTagName('main')[0];
  #restaurantList = null;
  #restaurantStorage = null;
  #category = null;
  #order = '이름순';
  #tab = 'all';
  #enrollModal = null;
  #detailModal = null;

  constructor() {
    this.#restaurantStorage = new RestaurantStorage();
    this.#restaurantList = new RestaurantList(this.#restaurantStorage.getAllRestaurants());
  }

  start() {
    this.#createLayout();
    this.#appendModal();

    document.querySelector('.gnb__button').addEventListener('click', () => {
      this.#enrollModal.toggle();
    });
  }

  #createLayout() {
    const $tabBar = createTabBar(this.#handleTabBar);
    const $filterContainer = createSectionContainer('restaurant-filter-container');
    $filterContainer.appendChild(
      createFilterGroup(this.#handleChangeCategory, this.#handleChangeFilter)
    );

    const $listContainer = createSectionContainer('restaurant-list-container');
    $listContainer.appendChild(
      createRestaurantList(
        this.#restaurantList.getOrderedRestaurantList(this.#order),
        this.#handleClickItem,
        this.#handleClickStar
      )
    );

    this.#main.append($tabBar, $filterContainer, $listContainer);
  }

  #appendModal() {
    const $enrollModal = createRestaurantEnrollModal();
    const $detailModal = new RestaurantDetailModal();

    this.#main.append($enrollModal.getElement(), $detailModal.modal.getElement());

    this.#enrollModal = $enrollModal;
    this.#detailModal = $detailModal;
  }

  #handleClickStar = (event, id) => {
    const updatedRestaurantList = this.#restaurantList.toggleFavorite(id);
    this.#restaurantStorage.updateStorage(updatedRestaurantList);
    event.target.classList.toggle('restaurant__star--clicked');
  };

  #handleChangeCategory = (event) => {
    this.#category = event.target.value;
    const restaurantList = this.#restaurantList.filterRestaurant(this.#category, this.#order);
    this.#updateRestaurantUI(restaurantList);
  };

  #handleChangeFilter = (event) => {
    this.#order = event.target.value;
    const restaurantList = this.#restaurantList.filterRestaurant(this.#category, this.#order);
    this.#updateRestaurantUI(restaurantList);
  };

  #handleTabBar = (event) => {
    document.querySelector('.restaurant-filter-container').classList.toggle('hidden');

    if (event.target.id === 'favorite') {
      const favoriteRestaurantList = this.#restaurantList.filterFavorite();
      this.#updateRestaurantUI(favoriteRestaurantList);
      this.#tab = 'favorite';
      document.querySelector('select#category-filter').value = '전체';
    } else if (event.target.id === 'all') {
      const allRestaurants = this.#restaurantList.getOrderedRestaurantList(this.#order);
      this.#updateRestaurantUI(allRestaurants);
      this.#tab = 'all';
    }
  };

  #handleDelete = (event, id) => {
    const deletedRestaurantList = this.#restaurantList.deleteRestaurant(id);
    this.#restaurantStorage.updateStorage(deletedRestaurantList);
    this.#updateRestaurantUI(deletedRestaurantList);
    this.#detailModal.modal.toggle();
  };

  #handleClickItem = (event, data) => {
    this.#detailModal.updateModalContent({
      data,
      onClickStar: this.#handleClickStar,
      onDelete: this.#handleDelete,
      onClose: () => {},
    });
    this.#detailModal.modal.toggle();
  };

  #updateRestaurantUI(restaurantList) {
    const $restaurants = updateRestaurantList(
      restaurantList,
      this.#handleClickItem,
      this.#handleClickStar
    );
    this.#main.appendChild($restaurants);
  }
}

export default RestaurantController;
