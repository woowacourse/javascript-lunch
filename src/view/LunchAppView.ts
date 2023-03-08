import { $ } from '../util/querySelector';
import { Restaurant, UserRestaurantInput } from '../type';
import Header from './Header';
import RestaurantFilter from './RestaurantFilter';
import RestaurantList from './RestaurantList';
import RestaurantAddModal from './RestaurantAddModal';
import RestaurantInfoModal from './RestaurantInfoModal';

type LunchAppViewType = {
  parentElement: HTMLElement;
  restaurants: Restaurant[];
  parentEvent: {
    onModalCancelButtonClicked: () => void;
    onModalAddButtonClicked: (restaurantData: UserRestaurantInput) => void;
    onHeaderAddButtonClicked: () => void;
    onFilterByChange: (filterBy: string) => void;
    onSortByChange: (sortBy: string) => void;
    onRestaurantItemClicked: (index: number) => void;
  };
};

class LunchAppView {
  #parentElement;
  #parentEvent;
  #restaurantAddModal!: RestaurantAddModal;
  #restaurantInfoModal!: RestaurantInfoModal;

  constructor({ parentElement, restaurants, parentEvent }: LunchAppViewType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#renderChild(restaurants);
  }

  updateRestaurants(restaurants: Restaurant[]) {
    this.#renderRestaurants(restaurants);
  }

  closeOrOpenRestaurantAddModal(command: string) {
    this.#restaurantAddModal.closeOrOpenModal(command);
  }

  closeOrOpenRestaurantInfoModal(command: string) {
    this.#restaurantInfoModal.closeOrOpenModal(command);
  }

  clearAllModalInputs() {
    this.#restaurantAddModal.clearAllInputs();
  }

  openInfoModal(restaurant: Restaurant) {
    this.#restaurantInfoModal.openInfoModal(restaurant);
  }

  #render() {
    const template = `
      <div id="header-root"></div>
      <main id="app-main">
        <div id="filter-root"></div>
        <section
          class="restaurant-list-container"
          id="restaurant-list-root"
        ></section>
        <div id="restaurant-add-modal-root"></div>
        <div id="restaurant-info-modal-root"></div>
      </main>
    `;

    this.#parentElement.innerHTML = template;
  }

  #renderChild(restaurants: Restaurant[]) {
    this.#renderHeader();
    this.#renderFilter();
    this.#renderRestaurants(restaurants);
    this.#renderAddModal();
    this.#renderInfoModal();
  }

  #renderHeader() {
    new Header({
      parentElement: $('#header-root'),
      parentEvent: {
        onHeaderAddButtonClicked: () =>
          this.#parentEvent.onHeaderAddButtonClicked(),
      },
    });
  }

  #renderFilter() {
    new RestaurantFilter({
      parentElement: $('#filter-root'),
      parentEvent: {
        onFilterByChange: (filterBy: string) =>
          this.#parentEvent.onFilterByChange(filterBy),
        onSortByChange: (sortBy: string) =>
          this.#parentEvent.onSortByChange(sortBy),
      },
    });
  }

  #renderRestaurants(restaurants: Restaurant[]) {
    new RestaurantList({
      parentElement: $('#restaurant-list-root'),
      restaurants: restaurants,
      parentEvent: {
        onRestaurantItemClicked: (index) =>
          this.#parentEvent.onRestaurantItemClicked(index),
      },
    });
  }

  #renderAddModal() {
    this.#restaurantAddModal = new RestaurantAddModal({
      parentElement: $('#restaurant-add-modal-root'),
      parentEvent: {
        onModalCancelButtonClicked: () =>
          this.#parentEvent.onModalCancelButtonClicked(),
        onModalAddButtonClicked: (restaurantData) =>
          this.#parentEvent.onModalAddButtonClicked(restaurantData),
      },
    });
  }

  #renderInfoModal() {
    this.#restaurantInfoModal = new RestaurantInfoModal({
      parentElement: $('#restaurant-info-modal-root'),
    });
  }
}

export default LunchAppView;
