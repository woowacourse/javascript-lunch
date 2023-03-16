/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type Tabs from './components/common/Tabs';
import { allCustomElementsDefined } from './components/lifecycles';
import type NewRestaurantModal from './components/restaurant/modal/NewRestaurantModal';
import type RestaurantDetailModal from './components/restaurant/modal/RestaurantDetailModal';
import type RestaurantList from './components/restaurant/RestaurantList';
import type { RestaurantClickEvent } from './components/restaurant/RestaurantList';
import restaurants from './states/restaurants';

class App {
  constructor() {
    allCustomElementsDefined().then(() => this.initEventHandlers());
  }

  initEventHandlers() {
    document
      .querySelector<HTMLButtonElement>('#modal-open-button')
      ?.addEventListener('click', () => {
        document.querySelector<NewRestaurantModal>('r-new-restaurant-modal')?.open();
      });

    document.querySelectorAll<RestaurantList>('r-restaurant-list').forEach(($restaurantList) =>
      $restaurantList.addEventListener('click', (e: Event) => {
        const event = e as RestaurantClickEvent;

        const restaurantId = event.detail;
        const restaurant = restaurants.getRestaurant(restaurantId);
        if (!restaurant) return;

        document
          .querySelector<RestaurantDetailModal>('r-restaurant-detail-modal')
          ?.open(restaurant);
      }),
    );

    document.querySelector<Tabs>('r-tabs')?.setTabItems([
      {
        label: '모든 음식점',
        value: 'all',
      },
      {
        label: '자주 가는 음식점',
        value: 'favorite',
      },
    ]);

    restaurants.addEventListener(() => {
      document
        .querySelector<RestaurantList>('[slot="all"] r-restaurant-list')
        ?.setRestaurants(restaurants.getFilteredRestaurants());
    });

    restaurants.addEventListener(() => {
      document
        .querySelector<RestaurantList>('[slot="favorite"] r-restaurant-list')
        ?.setRestaurants(restaurants.getFavoritedRestaurants());
    });
  }
}

export default App;
