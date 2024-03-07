import RestaurantItem from "./RestaurantItem";
import Restaurants from "../domain/Restaurants";
import Restaurant, { RestaurantInfo } from "../domain/Restaurant";
import FilterBar from "./FilterBar";
import EventComponent from "../abstract/EventComponent";
import { CATEGORY_FILTER, SORT_FILTER } from "../constants/filter";
import { EVENT } from "../constants/event";
import { CategoryFilter, SortFilter } from "../types/Filter";

customElements.define("restaurant-item", RestaurantItem);
customElements.define("filter-bar", FilterBar);

export default class RestaurantList extends EventComponent {
  private categoryFilter: CategoryFilter;
  private sortFilter: SortFilter;

  constructor(
    categoryFilter = CATEGORY_FILTER.all as CategoryFilter,
    sortFilter = SORT_FILTER.name as SortFilter
  ) {
    super();
    this.categoryFilter = categoryFilter;
    this.sortFilter = sortFilter;
  }

  protected getTemplate(): string {
    const restaurantInfos = new Restaurants([]).getDetails();

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
          ${displayingRestaurantInfos
            .map(
              ({
                name,
                category,
                timeToReach,
                description,
                link,
              }: RestaurantInfo) =>
                `<restaurant-item name="${name}" category="${category}" timeToReach=${timeToReach} description=${description} link=${link}>
            </restaurant-item>`
            )
            .join("")}
        </ul>
      </section>
    `;
  }

  protected setEvent() {
    document.addEventListener(EVENT.categoryFilterChanged, (e) =>
      this.handleCategoryFilterChange(e as CustomEvent)
    );

    document.addEventListener(EVENT.sortFilterChanged, (e) =>
      this.handleSortFilterChange(e as CustomEvent)
    );
  }

  private handleCategoryFilterChange(event: CustomEvent) {
    const categoryFilter = event?.detail;

    this.categoryFilter = categoryFilter;

    this.render();
  }

  private handleSortFilterChange(event: CustomEvent) {
    const sortFilter = event?.detail;

    this.sortFilter = sortFilter;

    this.render();
  }

  private filterByCategory(
    restaurantInfos: RestaurantInfo[],
    categoryFilter: CategoryFilter
  ): RestaurantInfo[] {
    if (!Object.keys(CATEGORY_FILTER).includes(categoryFilter)) {
      return restaurantInfos;
    }

    if (categoryFilter === CATEGORY_FILTER.all) {
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
