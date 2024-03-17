import EventComponent from "../abstract/EventComponent";
import RestaurantItem from "./RestaurantItem";
import FilterBar from "./FilterBar";
import Restaurants from "../domain/Restaurants";
import Restaurant, { RestaurantInfo } from "../domain/Restaurant";

import { CategoryFilter, SortFilter } from "../types/Filter";
import restaurantStore from "../store/restaurantStore";
import { RESTAURANT_DISPLAYING_FILTER, SORT_FILTER } from "../constants/filter";
import {
  FILTER_EVENT,
  MODAL_EVENT,
  ACTION_TYPES,
  RESTAURANT_EVENT,
} from "../constants/event";

customElements.define("restaurant-item", RestaurantItem);
customElements.define("filter-bar", FilterBar);

export default class RestaurantList extends EventComponent {
  private restaurants: Restaurants;
  private categoryFilter: CategoryFilter;
  private sortFilter: SortFilter;
  private showFavorite: boolean;
  private handleCategoryFilterChangeBind: (e: Event) => void;
  private handleSortFilterChangeBind: (e: Event) => void;
  private handleRestaurantFormSubmitBind: (e: Event) => void;
  private showRestaurantDetailBind: (e: MouseEvent) => void;
  private handleFavoriteFilterChangeBind: (e: Event) => void;
  private reRenderPageBind: () => void;

  constructor(
    restaurants = restaurantStore.getRestaurants(),
    categoryFilter = RESTAURANT_DISPLAYING_FILTER.all,
    sortFilter = SORT_FILTER.name
  ) {
    super();
    this.restaurants = restaurants;
    this.categoryFilter = categoryFilter;
    this.sortFilter = sortFilter;
    this.showFavorite = false;
    this.handleCategoryFilterChangeBind =
      this.handleCategoryFilterChange.bind(this);
    this.handleSortFilterChangeBind = this.handleSortFilterChange.bind(this);
    this.handleRestaurantFormSubmitBind =
      this.handleRestaurantFormSubmit.bind(this);
    this.showRestaurantDetailBind = this.showRestaurantDetail.bind(this);
    this.handleFavoriteFilterChangeBind =
      this.handleFavoriteFilterChange.bind(this);
    this.reRenderPageBind = this.reRenderPage.bind(this);
  }

  protected getTemplate(): string {
    const restaurantInfos = this.restaurants.getDetails();

    let displayingRestaurantInfos;

    if (this.showFavorite) {
      displayingRestaurantInfos = this.filterByFavorite(restaurantInfos);
    } else {
      const filteredRestaurantInfos = this.filterByCategory(
        restaurantInfos,
        this.categoryFilter
      );

      displayingRestaurantInfos = this.sort(
        filteredRestaurantInfos,
        this.sortFilter
      );
    }

    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${
            displayingRestaurantInfos
              .map(
                ({
                  name,
                  category,
                  timeToReach,
                  description,
                  link,
                }: RestaurantInfo) =>
                  `
            <restaurant-item name="${name}" category="${category}" timeToReach="${timeToReach}" description="${description}" link="${link}">
            </restaurant-item>`
              )
              .join("") ||
            "<p class='no-restaurant-item-message'>등록된 식당이 없습니다.<br/> 식당을 추가해주세요 👨🏻‍🍳</p>"
          }
        </ul>
      </section>
    `;
  }

  protected setEvent() {
    document.addEventListener(
      FILTER_EVENT.categoryFilterChange,
      this.handleCategoryFilterChangeBind
    );

    document.addEventListener(
      FILTER_EVENT.sortFilterChange,
      this.handleSortFilterChangeBind
    );

    document.addEventListener(
      RESTAURANT_EVENT.restaurantFormSubmit,
      this.handleRestaurantFormSubmitBind
    );

    document.addEventListener(
      RESTAURANT_EVENT.showFavoriteList,
      this.handleFavoriteFilterChangeBind
    );

    document.addEventListener(
      RESTAURANT_EVENT.reRenderingList,
      this.reRenderPageBind
    );

    this.addEventListener("click", this.showRestaurantDetailBind);
  }

  private reRenderPage() {
    this.restaurants = restaurantStore.getRestaurants();
    this.render();
  }

  private handleFavoriteFilterChange(event: Event) {
    if (event instanceof CustomEvent) {
      const { action } = event?.detail;

      if (action) this.showFavorite = true;
      else this.showFavorite = false;

      this.render();
    }
  }

  private handleCategoryFilterChange(event: Event) {
    if (event instanceof CustomEvent) {
      const { value: categoryFilter } = event?.detail;

      this.categoryFilter = categoryFilter;

      this.render();
    }
  }

  private handleSortFilterChange(event: Event) {
    if (event instanceof CustomEvent) {
      const { value: sortFilter } = event?.detail;

      this.sortFilter = sortFilter;

      this.render();
    }
  }

  private handleRestaurantFormSubmit(event: Event) {
    if (event instanceof CustomEvent) {
      const { payload, cleanUp } = event?.detail;

      try {
        const restaurant = new Restaurant(payload);
        this.restaurants.add(restaurant);
        restaurantStore.setRestaurants(this.restaurants);
      } catch (error: any) {
        return alert(error.message);
      }

      cleanUp();
      this.render();
    }
  }

  private filterByCategory(
    restaurantInfos: RestaurantInfo[],
    categoryFilter: CategoryFilter
  ): RestaurantInfo[] {
    if (!Object.keys(RESTAURANT_DISPLAYING_FILTER).includes(categoryFilter)) {
      return restaurantInfos;
    }

    if (categoryFilter === RESTAURANT_DISPLAYING_FILTER.all) {
      return restaurantInfos;
    }

    return restaurantInfos.filter(
      ({ category }) => category === categoryFilter
    );
  }

  private filterByFavorite(restaurantInfos: RestaurantInfo[]) {
    return restaurantInfos.filter(({ name }) =>
      restaurantStore.getFavoriteRestaurantsName().includes(name)
    );
  }

  private sort(
    restaurantInfos: RestaurantInfo[],
    sortFilter: SortFilter
  ): RestaurantInfo[] {
    if (sortFilter === SORT_FILTER.name) {
      return restaurantInfos.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortFilter === SORT_FILTER.timeToReach) {
      return restaurantInfos.sort((a, b) => a.timeToReach - b.timeToReach);
    }

    return restaurantInfos;
  }

  static get observedAttributes() {
    return ["restaurants"];
  }

  private showRestaurantDetail(e: MouseEvent) {
    const targetElement = e.target as HTMLElement;
    const li = targetElement.closest<HTMLElement>(".restaurant");

    const name = li?.dataset.name;

    if (!name) return;

    this.handleRestaurantModal(name);
  }

  private handleRestaurantModal(name: string) {
    this.openRestaurantModal();
    this.emitRestaurantInfo(name);
  }

  private openRestaurantModal() {
    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantDetailModalAction, {
        bubbles: true,
        detail: {
          action: ACTION_TYPES.open,
        },
      })
    );
  }

  private emitRestaurantInfo(name: string) {
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_EVENT.restaurantDetail, {
        bubbles: true,
        detail: {
          name,
        },
      })
    );
  }

  protected removeEvent(): void {
    document.removeEventListener(
      FILTER_EVENT.categoryFilterChange,
      this.handleCategoryFilterChangeBind
    );

    document.removeEventListener(
      FILTER_EVENT.sortFilterChange,
      this.handleSortFilterChange
    );

    document.removeEventListener(
      RESTAURANT_EVENT.restaurantFormSubmit,
      this.handleRestaurantFormSubmit
    );

    document.removeEventListener(
      RESTAURANT_EVENT.showFavoriteList,
      this.handleFavoriteFilterChangeBind
    );

    document.removeEventListener(
      RESTAURANT_EVENT.reRenderingList,
      this.reRenderPageBind
    );

    this.removeEventListener("click", this.showRestaurantDetailBind);
  }
}
