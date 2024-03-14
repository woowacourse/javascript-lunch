import EventComponent from "../abstract/EventComponent";
import RestaurantItem from "./RestaurantItem";
import Restaurants from "../domain/Restaurants";
import { RestaurantInfo } from "../domain/Restaurant";

import { CategoryFilter, SortFilter } from "../types/Filter";
import restaurantStore from "../store/restaurantStore";
import { CATEGORY_FILTER, SORT_FILTER } from "../constants/filter";
import {
  FILTER_EVENT,
  RESTAURANT_EVENT,
  TAB_SWITCH_EVENT,
  TAB_SWITCH_EVENT_SWITCH_TO,
} from "../constants/event";
import favoriteStore from "../store/favoriteStore";

customElements.define("restaurant-item", RestaurantItem);

export default class RestaurantList extends EventComponent {
  private restaurants: Restaurants;
  private categoryFilter: CategoryFilter;
  private sortFilter: SortFilter;
  private isFavoriteTab: boolean;

  constructor(
    restaurants = restaurantStore.get(),
    categoryFilter = CATEGORY_FILTER.all,
    sortFilter = SORT_FILTER.name,
    isFavoriteTab = false
  ) {
    super();
    this.restaurants = restaurants;
    this.categoryFilter = categoryFilter;
    this.sortFilter = sortFilter;
    this.isFavoriteTab = isFavoriteTab;
  }

  protected getTemplate(): string {
    const favoriteRestaurantNames = favoriteStore.get();

    const restaurantInfos = this.restaurants.getDetails();

    const filteredRestaurantInfos = this.filterByCategory(
      restaurantInfos,
      this.categoryFilter
    );

    const sortedRestaurantInfos = this.sort(
      filteredRestaurantInfos,
      this.sortFilter
    );

    const displayingRestaurantInfos = this.filterByFavorite(
      sortedRestaurantInfos,
      favoriteRestaurantNames,
      this.isFavoriteTab
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
            <restaurant-item
              name="${name}"
              category="${category}"
              timeToReach="${timeToReach}"
              description="${description}"
              link="${link}"
              isFavorite="${favoriteRestaurantNames.includes(name)}"
            >
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

    document.addEventListener(TAB_SWITCH_EVENT, (e) => {
      this.handleTabSwitch(e as CustomEvent);
    });

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

  private handleTabSwitch(event: CustomEvent) {
    const { switchTo } = event?.detail;

    const isFavoriteTab = switchTo === TAB_SWITCH_EVENT_SWITCH_TO.favorite;
    this.isFavoriteTab = isFavoriteTab;

    this.render();
  }

  private handleRestaurantFormSubmit(event: CustomEvent) {
    const { newRestaurant } = event?.detail;

    this.restaurants.add(newRestaurant);

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

  private filterByFavorite(
    restaurantInfos: RestaurantInfo[],
    favoriteRestaurantNames: string[],
    isFilterOn: boolean
  ): RestaurantInfo[] {
    if (!isFilterOn) {
      return restaurantInfos;
    }

    return restaurantInfos.filter(({ name }) =>
      favoriteRestaurantNames.includes(name)
    );
  }

  static get observedAttributes() {
    return ["restaurants"];
  }
}
