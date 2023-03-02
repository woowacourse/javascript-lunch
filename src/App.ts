import createCustomSelect from "./components/CustomSelect";
import createCustomModal from "./components/CustomModal";
import createCustomHeader from "./components/CustomHeader";
import Restaurants from "./domain/Restaurants";
import {
  Category,
  CategoryOption,
  Restaurant,
  SortOption,
} from "./types/restaurant";
import createRestaurantCardList from "./components/RestaurantCardList";

const mockList: Restaurant[] = [
  {
    category: "일식",
    name: "스시야좋아",
    distance: 15,
  },
  {
    category: "아시안",
    name: "쌀국수맛있다",
    distance: 20,
  },
  {
    category: "한식",
    name: "경주 은희네 해장국",
    distance: 10,
  },
  {
    category: "한식",
    name: "제주 은희네 해장국",
    distance: 5,
  },
  {
    category: "중식",
    name: "짜장짜장",
    distance: 10,
  },
  {
    category: "양식",
    name: "피자스쿨",
    distance: 30,
  },
];

class App {
  #modal: HTMLElement | null;

  #restaurants;

  #showState: {
    filter: CategoryOption;
    sort: SortOption;
  };

  constructor() {
    this.#restaurants = new Restaurants(mockList);
    this.#showState = {
      filter: "전체",
      sort: "name",
    };
    this.init();

    this.#modal = document.querySelector(".modal");
  }

  init() {
    createCustomSelect();
    createCustomModal();
    createCustomHeader();

    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <custom-header></custom-header>
      <main>
        <section class="restaurant-filter-container">
          <custom-select name="category" id="category-filter" class="restaurant-filter"></custom-select>
          <custom-select name="sorting" id="sorting-filter" class="restaurant-filter"></custom-select>
        </section>
        <section class="restaurant-list-container">
          ${createRestaurantCardList(
            this.#restaurants.getList(this.#showState)
          )}
        </section>
        <custom-modal></custom-modal>
      </main>
    `;
  }

  openModal() {
    this.#modal?.classList.add("modal--open");
  }

  closeModal() {
    this.#modal?.classList.remove("modal--open");
  }

  sortRestaurantList(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    this.#showState.sort = event.target.value as SortOption;
    this.renderRestaurantList();
  }

  filterRestaurantList(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    this.#showState.filter = event.target.value as CategoryOption;
    this.renderRestaurantList();
  }

  renderRestaurantList() {
    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    );

    if (restaurantListContainer === null) return;

    restaurantListContainer.innerHTML = createRestaurantCardList(
      this.#restaurants.getList(this.#showState)
    );
  }
}

export default App;
