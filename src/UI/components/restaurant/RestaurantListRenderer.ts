import { DOM } from '../../../dom';
import Restaurant from '../../../Domain/Restaurant';
import RestaurantItem from './RestaurantItem';
import RestaurantDetailModal from '../../pages/modal/components/RestaurantDetailModal';
import {
  getFilteredRestaurants,
  addRestaurantEventListener,
  removeRestaurantEventListener,
  RestaurantEventType,
} from '../../../Domain/services/RestaurantService';
import './Restaurant.css';

class RestaurantListRenderer {
  private static instance: RestaurantListRenderer;
  private currentCategory: string = '전체';
  private currentSortBy: string = 'name';
  private showOnlyFavorites: boolean = false;

  private constructor() {
    this.registerEventListeners();
    this.initializeToggleListeners();
  }

  private registerEventListeners(): void {
    addRestaurantEventListener(this.handleRestaurantEvent.bind(this));
  }

  private initializeToggleListeners(): void {
    if (DOM.ALL_RESTAURANTS_TOGGLE && DOM.FAVORITE_RESTAURANTS_TOGGLE) {
      DOM.ALL_RESTAURANTS_TOGGLE.addEventListener('click', () => this.handleToggleChange(false));
      DOM.FAVORITE_RESTAURANTS_TOGGLE.addEventListener('click', () => this.handleToggleChange(true));
    }
  }

  private handleToggleChange(showOnlyFavorites: boolean): void {
    this.showOnlyFavorites = showOnlyFavorites;

    if (DOM.ALL_RESTAURANTS_TOGGLE && DOM.FAVORITE_RESTAURANTS_TOGGLE) {
      if (showOnlyFavorites) {
        DOM.ALL_RESTAURANTS_TOGGLE.classList.remove('active');
        DOM.FAVORITE_RESTAURANTS_TOGGLE.classList.add('active');
      } else {
        DOM.ALL_RESTAURANTS_TOGGLE.classList.add('active');
        DOM.FAVORITE_RESTAURANTS_TOGGLE.classList.remove('active');
      }
    }

    if (DOM.RESTAURANT_FILTER_CONTAINER) {
      if (showOnlyFavorites) {
        DOM.RESTAURANT_FILTER_CONTAINER.style.display = 'none';
      } else {
        DOM.RESTAURANT_FILTER_CONTAINER.style.display = '';
      }
    }

    this.refreshRestaurantList();
  }

  private handleRestaurantEvent(eventType: RestaurantEventType, restaurant: Restaurant): void {
    this.refreshRestaurantList();
  }

  public static getInstance(): RestaurantListRenderer {
    if (!RestaurantListRenderer.instance) {
      RestaurantListRenderer.instance = new RestaurantListRenderer();
    }
    return RestaurantListRenderer.instance;
  }

  public renderRestaurantList(restaurantList: Restaurant[]): void {
    if (!DOM.RESTAURANT_LIST) return;

    DOM.RESTAURANT_LIST.innerHTML = '';

    const filteredList = this.showOnlyFavorites
      ? restaurantList.filter((restaurant) => restaurant.isFavorite())
      : restaurantList;

    filteredList.forEach((restaurant: Restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant).getElement();

      restaurantItem.addEventListener('click', () => {
        const detailModal = new RestaurantDetailModal(restaurant, () => this.refreshRestaurantList());
        detailModal.handleToggleModal();
      });

      DOM.RESTAURANT_LIST!.appendChild(restaurantItem as unknown as Node);
    });
  }

  public handleFilterChange(category: string, sortBy: string): void {
    this.currentCategory = category;
    this.currentSortBy = sortBy;
    const filteredRestaurants = getFilteredRestaurants(category, sortBy);
    this.renderRestaurantList(filteredRestaurants);
  }

  public refreshRestaurantList(): void {
    if (this.showOnlyFavorites) {
      const allRestaurants = getFilteredRestaurants('전체', this.currentSortBy);
      this.renderRestaurantList(allRestaurants);
    } else {
      this.handleFilterChange(this.currentCategory, this.currentSortBy);
    }
  }

  public getCurrentCategory(): string {
    return this.currentCategory;
  }

  public getCurrentSortBy(): string {
    return this.currentSortBy;
  }

  public isShowingOnlyFavorites(): boolean {
    return this.showOnlyFavorites;
  }
}

export default RestaurantListRenderer;
