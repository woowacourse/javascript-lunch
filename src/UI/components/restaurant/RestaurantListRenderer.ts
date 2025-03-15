import { DOM } from '../../../dom';
import Restaurant from '../../../Domain/Restaurant';
import RestaurantItem from './RestaurantItem';
import RestaurantDetailModal from '../../pages/modal/components/RestaurantDetailModal';
import { getFilteredRestaurants } from '../../../Domain/services/RestaurantService';

class RestaurantListRenderer {
  private static instance: RestaurantListRenderer;
  private currentCategory: string = '전체';
  private currentSortBy: string = 'name';

  private constructor() {}

  public static getInstance(): RestaurantListRenderer {
    if (!RestaurantListRenderer.instance) {
      RestaurantListRenderer.instance = new RestaurantListRenderer();
    }
    return RestaurantListRenderer.instance;
  }

  public renderRestaurantList(restaurantList: Restaurant[]): void {
    if (!DOM.RESTAURANT_LIST) return;

    DOM.RESTAURANT_LIST.innerHTML = '';

    restaurantList.forEach((restaurant: Restaurant) => {
      const restaurantItem = new RestaurantItem(restaurant).getElement();

      restaurantItem.addEventListener('click', () => {
        const detailModal = new RestaurantDetailModal(restaurant);
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
    this.handleFilterChange(this.currentCategory, this.currentSortBy);
  }

  public getCurrentCategory(): string {
    return this.currentCategory;
  }

  public getCurrentSortBy(): string {
    return this.currentSortBy;
  }
}

export default RestaurantListRenderer;
