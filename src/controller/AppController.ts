import PlusButton from '../components/button/PlusButton';
import Header from '../components/Header';
import Restaurants from '../domain/Restaurants';
import { FilterType, Restaurant } from '../types/types';
import { $ } from '../util/selector';
import FilterController from './FilterController';
import ModalController from './modalController';
import RestaurantListController from './RestaurantListController';
import TabController from './TabController';

class AppController {
  modalController;
  restaurants;
  tabController;
  filterController;
  restaurantListController;

  constructor() {
    this.tabController = new TabController((tabType) => {
      this.#onTabChange(tabType);
    });
    this.filterController = new FilterController((type, value) => {
      this.#onFilterChange(type, value);
    });
    this.modalController = new ModalController();
    this.restaurants = new Restaurants();
    this.restaurantListController = new RestaurantListController(
      this.restaurants.items,
      (restaurantName) => {
        this.restaurants.toggleFavoriteRestaurant(restaurantName);
      },
      (restaurant) => {
        this.modalController.openRestaurantDetailModal(restaurant, this.restaurants);
      },
    );
  }

  init() {
    this.renderHeader();
    this.tabController.render();
    this.filterController.render();
    this.restaurantListController.render();
    this.modalController.renderModal();
  }

  renderHeader() {
    const body = $('body');

    const header = Header({
      title: '점심 뭐 먹지',
      right: PlusButton({
        onclick: () => this.modalController.openRestaurantAddModal((data) => this.#addRestaurantItem(data)),
      }),
    });
    body?.prepend(header);
  }

  #onTabChange(tabType: 'all' | 'favorite') {
    if (tabType === 'all') {
      this.filterController.render();
      this.restaurantListController.updateList(this.restaurants.items);
    } else if (tabType === 'favorite') {
      this.filterController.remove();
      const favoriteRestaurants = this.restaurants.getFavoriteRestaurants();
      this.restaurantListController.updateList(favoriteRestaurants);
    }
  }

  #onFilterChange(type: FilterType, value: string) {
    const filteredRestaurants = this.restaurants.getRestaurantByFilter(type, value);
    this.restaurantListController.updateList(filteredRestaurants);
  }

  #addRestaurantItem(restaurant: Restaurant) {
    this.restaurants.addRestaurant({ ...restaurant, isFavorite: false });
    this.restaurantListController.addItem(restaurant);
  }
}

export default AppController;
