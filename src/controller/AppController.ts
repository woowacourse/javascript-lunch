import PlusButton from '../components/button/PlusButton';
import Header from '../components/Header';
import LocalStorage from '../domain/LocalStorage';
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
    this.tabController = new TabController(this.#onTabChange.bind(this));

    this.filterController = new FilterController(this.#onFilterChange.bind(this));

    this.modalController = new ModalController(
      this.#onAddRestaurant.bind(this),
      this.#onRemoveRestaurant.bind(this),
      this.#onToggleFavorite.bind(this),
    );

    this.restaurants = new Restaurants(LocalStorage<Restaurant[]>());

    this.restaurantListController = new RestaurantListController(
      this.restaurants.items,
      this.#onToggleFavorite.bind(this),
      this.#onSelectRestaurant.bind(this),
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
        onclick: () => this.modalController.openRestaurantAddModal(),
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

  #onAddRestaurant(restaurant: Restaurant) {
    const newRestaurant = { ...restaurant, isFavorite: false };
    this.restaurants.addRestaurant(newRestaurant);
    this.restaurantListController.addItem(newRestaurant);
  }

  #onRemoveRestaurant(restaurantName: string) {
    this.restaurants.removeRestaurant(restaurantName);
    this.restaurantListController.removeItem(restaurantName);
  }

  #onToggleFavorite(restaurantName: string) {
    this.restaurants.toggleFavoriteRestaurant(restaurantName);
  }

  #onSelectRestaurant(restaurant: Restaurant) {
    this.modalController.openRestaurantDetailModal(restaurant);
  }
}

export default AppController;
