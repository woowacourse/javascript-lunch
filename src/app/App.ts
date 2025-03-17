import { BaseState } from "../../types/common.js";
import Filter from "../components/Filter";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList.js";
import { Component } from "../components/core";
import { AddRestaurantModal } from "../components/modal";
import { favoriteIds, restaurants } from "../database";
import { CategoryType, Restaurant, SortByType, TabKey } from "../entities";
import { isHTMLElement } from "../utils";
import {
  handleCategoryFilterChange,
  handleSortByFilterChange,
  handleTabChange,
} from "./eventHandlers.js";
import { getRestaurantsByTab } from "./helpers.js";
import { restaurantStorage as storage } from "./restaurantStorage.js";

export interface AppState extends BaseState {
  restaurants: Restaurant[];
  favoriteIds: Restaurant["id"][];
  categoryFilter: CategoryType | "ALL";
  sortBy: SortByType;
  currentTab: TabKey;
  restaurantListInstance: RestaurantList | null;
}

class App extends Component<AppState> {
  override setup(): void {
    this.setState({
      restaurants:
        storage.restaurants.length > 0 ? storage.restaurants : restaurants,
      favoriteIds:
        storage.favoriteIds.length > 0 ? storage.favoriteIds : favoriteIds,
      categoryFilter: storage.filters.category || "ALL",
      sortBy: storage.filters.sortBy || "NAME",
      currentTab: storage.currentTab || "ALL",
      restaurantListInstance: null,
    });

    this.watchState("restaurants", () => {
      this.renderRestaurantList();
      storage.restaurants = this.getState().restaurants;
    });
    this.watchState("favoriteIds", () => {
      this.renderFavoriteStatesOnly();
      storage.favoriteIds = this.getState().favoriteIds;
    });
    this.watchState("categoryFilter", () => {
      this.renderRestaurantList();
      const state = this.getState();
      storage.filters = {
        category: state.categoryFilter,
        sortBy: state.sortBy,
      };
    });
    this.watchState("sortBy", () => {
      this.renderRestaurantList();
      const state = this.getState();
      storage.filters = {
        category: state.categoryFilter,
        sortBy: state.sortBy,
      };
    });
    this.watchState("currentTab", () => {
      this.renderFilter();
      this.renderRestaurantList();
      storage.currentTab = this.getState().currentTab;
    });

    this.eventBindings.push(
      {
        action: "set-category-filter",
        eventType: "change",
        handler: (event: Event) => handleCategoryFilterChange(this, event),
      },
      {
        action: "set-sortBy-filter",
        eventType: "change",
        handler: (event: Event) => handleSortByFilterChange(this, event),
      },
      {
        action: "set-tab",
        eventType: "click",
        handler: (event: Event) => handleTabChange(this, event),
      }
    );
  }

  private addRestaurant(newRestaurant: Restaurant): void {
    this.setState({
      restaurants: [...this.getState().restaurants, newRestaurant],
    });
  }

  private deleteRestaurant(restaurantId: Restaurant["id"]): void {
    this.setState({
      restaurants: this.getState().restaurants.filter(
        (restaurant) => restaurant.id !== restaurantId
      ),
    });
  }

  private toggleFavorite(restaurantId: Restaurant["id"]): void {
    const currentFavorites = this.getState().favoriteIds;
    const updatedFavorites = currentFavorites.includes(restaurantId)
      ? currentFavorites.filter((id) => id !== restaurantId)
      : [...currentFavorites, restaurantId];
    this.setState({ favoriteIds: updatedFavorites });
  }

  override template(): string {
    return /*html*/ `
      ${Header(this.getState().currentTab)}
      <main> 
        <section class="restaurant-filter-container"></section>
        <section id="restaurant-list"></section>
      </main>
      <div id="modal"></div>
    `;
  }

  override componentDidMount(): void {
    this.renderFilter();
    this.renderAddRestaurantModal();
    this.renderRestaurantList();
  }

  private renderFilter(): void {
    const $filterContainer = document.querySelector(
      ".restaurant-filter-container"
    );
    if (!isHTMLElement($filterContainer)) return;

    if (this.getState().currentTab === "FAVORITE") {
      $filterContainer.innerHTML = "";
      return;
    }
    $filterContainer.innerHTML = Filter({
      selectedCategory: this.getState().categoryFilter,
      selectedSortBy: this.getState().sortBy,
    });
  }

  private renderAddRestaurantModal(): void {
    const $modal = document.querySelector("#modal");
    if (!isHTMLElement($modal)) return;

    new AddRestaurantModal($modal, {
      submit: (newRestaurant: Restaurant) => this.addRestaurant(newRestaurant),
    });
  }

  private renderRestaurantList(): void {
    const $main = document.querySelector("#restaurant-list");
    if (!isHTMLElement($main)) return;

    // 기존 인스턴스가 존재하면 destroy() 호출 후 null로 초기화
    if (this.getState().restaurantListInstance) {
      this.getState().restaurantListInstance?.destroy();
      this.setState({ restaurantListInstance: null });
    }

    const newInstance = new RestaurantList($main, {
      restaurants: getRestaurantsByTab(this.getState()),
      deleteRestaurant: (id: Restaurant["id"]) => this.deleteRestaurant(id),
      getIsFavorite: (id: Restaurant["id"]) =>
        this.getState().favoriteIds.includes(id),
      toggleFavorite: (id: Restaurant["id"]) => this.toggleFavorite(id),
    });
    this.setState({ restaurantListInstance: newInstance });
  }

  private renderFavoriteStatesOnly(): void {
    const { favoriteIds } = this.getState();
    document
      .querySelectorAll("[data-restaurant-id]")
      .forEach((item: Element) => {
        const id = item.getAttribute("data-restaurant-id");
        const icon = item.querySelector<HTMLImageElement>(
          ".restaurant__favorite-button img"
        );
        if (!icon || !id) return;
        const isFavorite = favoriteIds.includes(id);
        icon.setAttribute(
          "src",
          `./icons/${
            isFavorite ? "favorite-icon-filled.png" : "favorite-icon-lined.png"
          }`
        );
      });
  }
}

const app = document.querySelector("#app");
if (isHTMLElement(app)) new App(app);
