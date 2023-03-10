/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NewRestaurantModal from './components/restaurant/modal/NewRestaurantModal';
import RestaurantDetailModal from './components/restaurant/modal/RestaurantDetailModal';
import RestaurantList, { RestaurantClickEvent } from './components/restaurant/RestaurantList';
import restaurants from './states/restaurants';

class App {
  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  $restaurantList = document.querySelector<RestaurantList>('r-restaurant-list')!;

  $restaurantDetailModal = document.querySelector<RestaurantDetailModal>(
    'r-restaurant-detail-modal',
  )!;

  init() {
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.$modalOpenButton.addEventListener('click', () => {
      document.querySelector<NewRestaurantModal>('r-new-restaurant-modal')?.open();
    });
    this.$restaurantList?.addEventListener('click', (e: Event) => {
      const event = e as RestaurantClickEvent;

      const restaurantId = event.detail;
      const restaurant = restaurants.getRestaurant(restaurantId);
      if (!restaurant) return;

      this.$restaurantDetailModal.open(restaurant);
    });
  }
}

export default App;
