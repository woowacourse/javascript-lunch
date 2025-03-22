import Restaurant from '../../../Domain/Restaurant';
import RestaurantItem from './RestaurantItem';
import RestaurantDetailModal from '../../pages/modal/components/RestaurantDetailModal';
import {
  getFilteredRestaurants,
  addRestaurantEventListener,
  RestaurantEventType,
} from '../../../Domain/services/RestaurantService';
import './Restaurant.css';

class RestaurantListRenderer {
  private static instance: RestaurantListRenderer;
  private currentCategory: string = '전체';
  private currentSortBy: string = 'name';
  private showOnlyFavorites: boolean = false;
  private listElement: HTMLUListElement;
  private onRestaurantClick: (restaurant: Restaurant) => void;

  private constructor(onRestaurantClick: (restaurant: Restaurant) => void) {
    this.onRestaurantClick = onRestaurantClick;
    this.listElement = document.createElement('ul');
    this.listElement.id = 'restaurant-list';
    this.registerEventListeners();
  }

  private registerEventListeners(): void {
    addRestaurantEventListener(this.handleRestaurantEvent.bind(this));
  }

  private handleRestaurantEvent(eventType: RestaurantEventType, restaurant: Restaurant): void {
    this.refreshRestaurantList();
  }

  public static getInstance(onRestaurantClick: (restaurant: Restaurant) => void): RestaurantListRenderer {
    if (!RestaurantListRenderer.instance) {
      RestaurantListRenderer.instance = new RestaurantListRenderer(onRestaurantClick);
    }
    return RestaurantListRenderer.instance;
  }

  public renderRestaurantList(restaurantList: Restaurant[]): void {
    this.listElement.innerHTML = '';

    const filteredList = this.showOnlyFavorites
      ? restaurantList.filter((restaurant) => restaurant.isFavorite())
      : restaurantList;

    filteredList.forEach((restaurant: Restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant).getElement();
      restaurantItem.addEventListener('click', () => this.onRestaurantClick(restaurant));
      this.listElement.appendChild(restaurantItem);
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

  public handleToggleChange(showOnlyFavorites: boolean): void {
    this.showOnlyFavorites = showOnlyFavorites;
    this.refreshRestaurantList();
  }

  public getElement(): HTMLUListElement {
    return this.listElement;
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
