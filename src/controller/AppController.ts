import FavoriteButton from '../components/button/FavoriteButton';
import PlusButton from '../components/button/PlusButton';
import RestaurantFilterContainer from '../components/filter/RestaurantFilterContainer';
import Header from '../components/Header';
import RestaurantAddModalContent from '../components/modal/RestaurantAddModalContent';
import RestaurantDetailModalContent from '../components/modal/RestaurantDetailModalContent';
import RestaurantItem from '../components/restaurant/RestaurantItem';
import RestaurantList from '../components/restaurant/RestaurantList';
import RestaurantListContainer from '../components/restaurant/RestaurantListContainer';
import RestaurantTabContainer from '../components/tab/RestaurantTabContainer';
import Restaurants from '../domain/Restaurants';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';
import ModalController from './modalController';

class AppController {
  modalController;
  restaurants;

  constructor() {
    this.modalController = new ModalController();
    this.restaurants = new Restaurants();
  }

  init() {
    this.renderHeader();
    this.renderTabContainer();
    this.renderFilterContainer();
    this.renderRestaurantListContainer();
    this.renderModal();
  }

  renderHeader() {
    const body = $('body');

    const header = Header({
      title: '점심 뭐 먹지',
      right: PlusButton({
        onclick: () => {
          this.modalController.switchContent(RestaurantAddModalContent());
          this.modalController.attachModalEvents();
          this.modalController.attachFormSubmitEvent((data) => this.addRestaurantItem(data));
          this.modalController.open();
        },
      }),
    });
    body?.prepend(header);
  }

  renderTabContainer() {
    const main = $('main');

    const tabContainer = RestaurantTabContainer();
    main?.prepend(tabContainer);

    const tabs = document.querySelectorAll('.restaurant-tab');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // 활성 탭 변경
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // data-active 속성 변경
        tabContainer.setAttribute('data-active', (tab as HTMLElement).dataset.tab || 'all');
      });
    });
  }

  renderFilterContainer() {
    const main = $('main');

    const filterContainer = RestaurantFilterContainer();
    main?.appendChild(filterContainer);

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
    const main = $('main');
    const container = RestaurantListContainer({ restaurants: this.restaurants.items });

    main?.appendChild(container);

    container.addEventListener('click', (event) => {
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
          const modalContent = RestaurantDetailModalContent({ restaurant: selectedRestaurant });
          this.modalController.switchContent(modalContent);
          this.modalController.open();
          modalContent.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const favoriteButton = target.closest('.restaurant__favorite-button');
            const closeButton = target.closest('.button--secondary');
            const deleteButton = target.closest('.button--primary');

            if (favoriteButton) {
              this.restaurants.toggleFavoriteRestaurant(selectedRestaurant.name);
              favoriteButton.replaceWith(FavoriteButton({ isFavorite: selectedRestaurant.isFavorite, isDetail: true }));
              const listRestaurantElement = $(`.restaurant[data-id="${selectedRestaurant.name}"]`, container);
              if (listRestaurantElement) {
                const listFavoriteButton = $('.restaurant__favorite-button', listRestaurantElement);
                listFavoriteButton?.replaceWith(FavoriteButton({ isFavorite: selectedRestaurant.isFavorite }));
              }
            }
            if (closeButton) {
              this.modalController.close();
            }
            if (deleteButton) {
              this.restaurants.removeRestaurant(selectedRestaurant.name);
              this.modalController.close();
              this.removeRestaurantItem(selectedRestaurant.name);
            }
          });
        }
      }
    });
  }

  renderModal() {
    const main = $('main');

    if (main) {
      this.modalController.attachTo(main);
      this.modalController.attachModalEvents();
      this.modalController.attachFormSubmitEvent((data) => this.addRestaurantItem(data));
    }
  }

  updateRestaurantListByFilter(categoryFilterValue?: string, sortFilterValue?: string) {
    const filteredRestaurants = this.restaurants.getRestaurantByFilter(
      categoryFilterValue ?? 'all',
      sortFilterValue ?? 'latest',
    );

    const restaurantListDOM = $('.restaurant-list');
    const restaurantList = RestaurantList({ restaurants: filteredRestaurants });

    restaurantListDOM?.replaceWith(restaurantList);
  }

  addRestaurantItem(restaurant: Restaurant) {
    const item = RestaurantItem({ restaurant });

    $('.restaurant-list')?.appendChild(item);
    this.restaurants.addRestaurant({ ...restaurant, isFavorite: false });
  }

  removeRestaurantItem(restaurantName: string) {
    const restaurantList = $('.restaurant-list-container');

    if (restaurantList) {
      const target = restaurantList.querySelector(`[data-id="${restaurantName}"]`);
      target?.remove();
    }
  }
}

export default AppController;
