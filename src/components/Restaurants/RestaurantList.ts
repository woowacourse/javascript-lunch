import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { CategoryString, RestaurantItem, RestaurantTab, SortOptionString } from "../../types/menu";
import { filterByCategory, findRestaurantByName, getFavoriteRestaurants, sortByType } from "../../domains/Restaurants";

class RestaurantList extends BaseComponent {
  private currentCategory: CategoryString;
  private currentTab: RestaurantTab;

  constructor() {
    super();
    this.currentCategory = "전체";
    this.currentTab = "all";
  }

  private getCurrentList(sortOption?: SortOptionString) {
    if (this.currentTab === "favorite") {
      return getFavoriteRestaurants();
    }
    return sortOption ? sortByType(this.currentCategory, sortOption) : filterByCategory(this.currentCategory);
  }

  private sortRestaurantList(sortOption: SortOptionString) {
    this.render(sortOption);
  }

  private filterRestaurantList(option: CategoryString) {
    this.currentCategory = option;
    this.render();
  }

  private handleTabChange(tab: RestaurantTab) {
    if (tab === this.currentTab) return;
    if (tab === "all") {
      this.currentCategory = "전체";
    }
    this.currentTab = tab;
    this.render();
  }

  private getRestaurantName(element: Element): string | null {
    const restaurantName = element?.querySelector(".restaurant__name");
    if (!(restaurantName instanceof HTMLSpanElement)) return null;
    return restaurantName.innerText;
  }

  private handleShowRestaurantDetailModal(element: Element) {
    const restaurantName = this.getRestaurantName(element);
    if (!restaurantName) return;

    this.emitEvent<{ detailInfo: RestaurantItem | null }>(MENU_APP_EVENTS.openRestaurantDetail, {
      detailInfo: findRestaurantByName(restaurantName),
    });
  }

  private createRestaurantListHTML(restaurantList: RestaurantItem[]) {
    return restaurantList.reduce((accRestaurants, currentRestaurant) => {
      const { name, category, distance, description, isFavorite } = currentRestaurant;

      return (
        accRestaurants +
        /*html*/ `
        <restaurant-item
          name="${name}"
          category="${category}"
          distance="${distance}"
          description="${description}"
          is-favorite="${isFavorite}"
        ></restaurant-item>
        `
      );
    }, "");
  }

  render(sortOption?: SortOptionString) {
    const currentList = this.getCurrentList(sortOption);

    this.innerHTML = /*html*/ `
      <section class="restaurant-list-container">
        ${this.createRestaurantListHTML(currentList)}
      </section>
    `;
  }

  setEvent() {
    document.addEventListener(MENU_APP_EVENTS.renderRestaurants, () => {
      this.render();
    });

    document.addEventListener(MENU_APP_EVENTS.changeTabState, (event) => {
      if (!(event instanceof CustomEvent)) return;

      const { tab } = event.detail;
      this.handleTabChange(tab);
    });

    document.addEventListener(MENU_APP_EVENTS.selectChange, (event) => {
      if (!(event instanceof CustomEvent)) return;

      const { type, option } = event.detail;
      type === "sort" ? this.sortRestaurantList(option) : this.filterRestaurantList(option);
    });

    this.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement) || event.target.matches("img")) return;

      const targetRestaurantElement = event.target.closest(".restaurant");
      targetRestaurantElement && this.handleShowRestaurantDetailModal(targetRestaurantElement);
    });
  }
}

customElements.define("restaurant-list", RestaurantList);
