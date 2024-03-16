import EventComponent from "../abstract/EventComponent";
import RestaurantItem from "./RestaurantItem";
import Restaurants from "../domain/Restaurants";
import { RestaurantInfo } from "../domain/Restaurant";

import { CategoryFilter, SortFilter } from "../types/Filter";
import restaurantStore from "../store/restaurantStore";
import { CATEGORY_FILTER, SORT_FILTER } from "../constants/filter";
import {
  FILTER_EVENT,
  RESTAURANT_FORM_SUBMIT_EVENT,
  RESTAURANT_DETAIL_SHOW_EVENT,
  TAB_SWITCH_EVENT,
  TAB_SWITCH_EVENT_SWITCH_TO,
  MODAL_EVENT,
  MODAL_EVENT_ACTION,
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

    const restaurantInfosFilteredByFavorite = this.filterByFavorite(
      restaurantInfos,
      favoriteRestaurantNames,
      this.isFavoriteTab
    );

    const restaurantInfosFilteredByCategory = this.filterByCategory(
      restaurantInfosFilteredByFavorite,
      this.categoryFilter,
      this.isFavoriteTab
    );

    const displayingRestaurantInfos = this.sort(
      restaurantInfosFilteredByCategory,
      this.sortFilter,
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
                }: RestaurantInfo) =>
                  `
            <restaurant-item
              name="${name}"
              category="${category}"
              timeToReach="${timeToReach}"
              description="${description}"
              isFavorite="${favoriteRestaurantNames.includes(name)}"
            >
            </restaurant-item>`
              )
              .join("") ||
            (this.isFavoriteTab
              ? "<p class='no-restaurant-item-message'>자주 가는 음식점이 없습니다.<br/> 모든 음식점 탭에서 음식점을 둘러보고 추가해 보세요 👩🏻‍🍳</p>"
              : "<p class='no-restaurant-item-message'>등록된 식당이 없습니다.<br/> 우측 상단 버튼을 눌러 식당을 추가해주세요 👨🏻‍🍳</p>")
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

    document.addEventListener(RESTAURANT_FORM_SUBMIT_EVENT, (e) => {
      this.handleRestaurantFormSubmit(e as CustomEvent);
    });

    this.addEventListener("click", (e) => {
      this.handleRestaurantItemClick(e);
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

  private handleRestaurantItemClick(event: Event) {
    const target = event.target as HTMLElement;
    const restaurantItem = target?.closest(".restaurant") as HTMLElement;

    if (!restaurantItem?.classList.contains("restaurant")) {
      return;
    }

    const restaurantName = restaurantItem.dataset.name;

    const restaurantInfos = this.restaurants.getDetails();
    const targetRestaurantInfo = restaurantInfos.find(
      ({ name }) => name === restaurantName
    );

    const favoriteRestaurantNames = favoriteStore.get();

    const restaurantInfo = {
      ...targetRestaurantInfo,
      isFavorite: targetRestaurantInfo?.name
        ? favoriteRestaurantNames.includes(targetRestaurantInfo?.name)
        : false,
    };

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_SHOW_EVENT, {
        bubbles: true,
        detail: { restaurantInfo },
      })
    );

    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantDetailModalAction, {
        bubbles: true,
        detail: { action: MODAL_EVENT_ACTION.open },
      })
    );
  }

  private filterByCategory(
    restaurantInfos: RestaurantInfo[],
    categoryFilter: CategoryFilter,
    isFavoriteTab: boolean
  ): RestaurantInfo[] {
    if (isFavoriteTab) {
      return restaurantInfos;
    }

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
    sortFilter: SortFilter,
    isFavoriteTab: boolean
  ): RestaurantInfo[] {
    if (isFavoriteTab) {
      return restaurantInfos;
    }

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
