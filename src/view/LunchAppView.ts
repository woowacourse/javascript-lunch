import { $ } from '../util/querySelector';
import { Restaurant } from '../type';
import Header from './Header';
import RestaurantFilter from './RestaurantFilter';
import RestaurantList from './RestaurantList';
import RestaurantAddModal from './RestaurantAddModal';

type LunchAppViewType = {
  parentElement: HTMLElement;
  restaurants: Restaurant[];
  parentEvent: {
    onModalCancelButtonClicked: () => void;
    onModalAddButtonClicked: (restaurantData: Restaurant) => void;
    onHeaderAddButtonClicked: () => void;
    onFilterByChange: (filterBy: string) => void;
    onSortByChange: (sortBy: string) => void;
  };
};

class LunchAppView {
  #parentElement;
  #parentEvent;
  #restaurantAddModal!: RestaurantAddModal;

  constructor({ parentElement, restaurants, parentEvent }: LunchAppViewType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#renderChild(restaurants);
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
        <div id="modal-root"></div>
      </main>
    `;

    this.#parentElement.innerHTML = template;
  }
  #renderChild(restaurants: Restaurant[]) {
    this.#renderHeader();
    this.#renderFilter();
    this.#renderRestaurants(restaurants);
    this.#renderModal();
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
    });
  }

  #renderModal() {
    this.#restaurantAddModal = new RestaurantAddModal({
      parentElement: $('#modal-root'),
      parentEvent: {
        onModalCancelButtonClicked: () =>
          this.#parentEvent.onModalCancelButtonClicked(),
        onModalAddButtonClicked: (restaurantData) =>
          this.#parentEvent.onModalAddButtonClicked(restaurantData),
      },
    });
  }
}

export default LunchAppView;
