import FavoriteButton from '../components/button/FavoriteButton';
import PlusButton from '../components/button/PlusButton';
import Header from '../components/Header';
import Restaurants from '../domain/Restaurants';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';
import RestaurantFilterView from '../view/RestaurantFilterView';
import RestaurantListView from '../view/RestaurantListView';
import ModalController from './modalController';
import TabController from './TabController';

class AppController {
  modalController;
  restaurants;
  tabController;

  constructor() {
    this.tabController = new TabController((tabType) => {
      this.#onTabChange(tabType);
    });
    this.modalController = new ModalController();
    this.restaurants = new Restaurants();
  }

  init() {
    this.renderHeader();
    this.tabController.render();
    this.renderFilterContainer();
    this.renderRestaurantListContainer();
    this.modalController.renderModal();
  }

  renderHeader() {
    const body = $('body');

    const header = Header({
      title: '점심 뭐 먹지',
      right: PlusButton({
        onclick: () => this.modalController.openRestaurantAddModal((data) => this.addRestaurantItem(data)),
      }),
    });
    body?.prepend(header);
  }

  #onTabChange(tabType: 'all' | 'favorite') {
    if (tabType === 'all') {
      this.renderFilterContainer();
    } else if (tabType === 'favorite') {
      RestaurantFilterView.remove();
    }
    this.updateRestaurantListByTab(tabType);
  }

  renderFilterContainer() {
    RestaurantFilterView.render();

    $<HTMLSelectElement>('#category-filter')?.addEventListener('change', (event) => {
      const sortFilterValue = $<HTMLSelectElement>('#sort-filter')?.value;

      this.updateRestaurantListByFilter((event.target as HTMLSelectElement)?.value, sortFilterValue);
    });
    $<HTMLSelectElement>('#sorting-filter')?.addEventListener('change', (event) => {
      const categoryFilterValue = $<HTMLSelectElement>('#category-filter')?.value;

      this.updateRestaurantListByFilter(categoryFilterValue, (event.target as HTMLSelectElement)?.value);
    });
  }

  renderRestaurantListContainer() {
    RestaurantListView.render(this.restaurants.items);

    const container = $('.restaurant-list-container');

    container?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const restaurantElement = target.closest('.restaurant');
      const restaurantFavoriteButton = target.closest('.restaurant__favorite-button');

      if (!restaurantElement) return;

      const restaurantName = (restaurantElement as HTMLElement).dataset.id;
      const selectedRestaurant = this.restaurants.items.find((restaurant) => restaurant.name === restaurantName);

      if (selectedRestaurant) {
        if (restaurantFavoriteButton) {
          this.restaurants.toggleFavoriteRestaurant(selectedRestaurant.name);
          restaurantFavoriteButton.replaceWith(FavoriteButton({ isFavorite: selectedRestaurant.isFavorite }));
        } else {
          this.modalController.openRestaurantDetailModal(selectedRestaurant, this.restaurants);
        }
      }
    });
  }

  updateRestaurantListByFilter(categoryFilterValue?: string, sortFilterValue?: string) {
    const filteredRestaurants = this.restaurants.getRestaurantByFilter(
      categoryFilterValue ?? 'all',
      sortFilterValue ?? 'latest',
    );

    RestaurantListView.updateList(filteredRestaurants);
  }

  updateRestaurantListByTab(tabType: 'all' | 'favorite') {
    const favoriteRestaurants = this.restaurants.getFavoriteRestaurants();

    if (tabType === 'all') {
      RestaurantListView.updateList(this.restaurants.items);
    } else if (tabType === 'favorite') {
      RestaurantListView.updateList(favoriteRestaurants);
    }
  }

  addRestaurantItem(restaurant: Restaurant) {
    RestaurantListView.addItem(restaurant);
    this.restaurants.addRestaurant({ ...restaurant, isFavorite: false });
  }
}

export default AppController;
