import EventComponent from "../abstract/EventComponent";
import RestaurantItem from "./RestaurantItem";
import FilterBar from "./FilterBar";
import Restaurants from "../domain/Restaurants";
import { RestaurantInfo } from "../domain/Restaurant";

import { CategoryFilter, SortFilter } from "../types/Filter";
import restaurantStore from "../store/restaurantStore";
import { RESTAURANT_DISPLAYING_FILTER, SORT_FILTER } from "../constants/filter";
import { FILTER_EVENT, RESTAURANT_EVENT } from "../constants/event";

customElements.define("restaurant-item", RestaurantItem);
customElements.define("filter-bar", FilterBar);

export default class RestaurantList extends EventComponent {
  private restaurants: Restaurants;
  private categoryFilter: CategoryFilter;
  private sortFilter: SortFilter;

  constructor(
    restaurants = restaurantStore.get(),
    categoryFilter = RESTAURANT_DISPLAYING_FILTER.all,
    sortFilter = SORT_FILTER.name
  ) {
    super();
    this.restaurants = restaurants;
    this.categoryFilter = categoryFilter;
    this.sortFilter = sortFilter;
  }

  protected getTemplate(): string {
    const restaurantInfos = this.restaurants.getDetails();

    const filteredRestaurantInfos = this.filterByCategory(
      restaurantInfos,
      this.categoryFilter
    );

    const displayingRestaurantInfos = this.sort(
      filteredRestaurantInfos,
      this.sortFilter
    );

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
    document.addEventListener(FILTER_EVENT.categoryFilterChange, (e) =>
      this.handleCategoryFilterChange(e as CustomEvent)
    );

    document.addEventListener(FILTER_EVENT.sortFilterChange, (e) =>
      this.handleSortFilterChange(e as CustomEvent)
    );

    document.addEventListener(RESTAURANT_EVENT.restaurantFormSubmit, (e) => {
      this.handleRestaurantFormSubmit(e as CustomEvent);
    });
  }

  private handleCategoryFilterChange(event: CustomEvent) {
    const { value: categoryFilter } = event?.detail;

    this.categoryFilter = categoryFilter;

    this.render();
  }

  private handleSortFilterChange(event: CustomEvent) {
    const { value: sortFilter } = event?.detail;

    this.sortFilter = sortFilter;

    this.render();
  }

  private handleRestaurantFormSubmit(event: CustomEvent) {
    const { newRestaurant } = event?.detail;

    try {
      this.restaurants.add(newRestaurant);
      restaurantStore.set(this.restaurants);
    } catch (error: any) {
      return alert(error.message);
    }

    this.render();
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
}
