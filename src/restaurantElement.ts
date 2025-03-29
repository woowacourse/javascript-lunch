import createHeader from "./components/Header.ts";
import createTab from "./components/Tab.ts";
import RestaurantAddModal from "./components/RestaurantAddModal.ts";
import restaurantStore from "./restaurantStore.ts";
import { $ } from "./utils/dom.ts";
import { Category, SortType } from "./types/restaurant.ts";

export type RestaurantSelector = {
  $header: Element | null;
  $categoryFilter: HTMLSelectElement | null;
  $sortingFilter: HTMLSelectElement | null;
  $mainTab: Element | null;
  $subTab: Element | null;
  $restaurantFilter: Element | null;
  $addRestaurantModalButton: HTMLButtonElement | null;
};

type RestaurantElement = {
  selector: RestaurantSelector;
  init: () => void;
  eventHandler: () => void;
};

const restaurantElement: RestaurantElement = {
  selector: {
    $header: null,
    $categoryFilter: null,
    $sortingFilter: null,
    $mainTab: null,
    $subTab: null,
    $restaurantFilter: null,
    $addRestaurantModalButton: null,
  },

  init: function () {
    this.selector.$header = createHeader({ title: "점심 뭐 먹지" });
    this.selector.$categoryFilter = $("#category-filter");
    this.selector.$sortingFilter = $("#sorting-filter");

    const $tab = createTab({
      title: "모든 음식점",
      subTitle: "자주 가는 음식점",
    });
    const $mainTab = $tab.querySelector(".tab__title");
    $mainTab?.classList.add("active");
    this.selector.$mainTab = $mainTab;
    this.selector.$subTab = $tab.querySelector(".tab__subTitle");

    this.selector.$restaurantFilter = $(".restaurant-filter-container");
    this.selector.$addRestaurantModalButton = $(".gnb__button");

    this.selector.$header?.after($tab);
  },

  eventHandler: function () {
    const {
      $categoryFilter,
      $sortingFilter,
      $mainTab,
      $subTab,
      $restaurantFilter,
      $addRestaurantModalButton,
    } = this.selector;

    $categoryFilter?.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      restaurantStore.state.category = target.value as Category;

      restaurantStore.update(restaurantStore.state.restaurants);
    });

    $sortingFilter?.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      restaurantStore.state.sortType = target.value as SortType;

      restaurantStore.update(restaurantStore.state.restaurants);
    });

    $mainTab?.addEventListener("click", () => {
      $mainTab.classList.add("active");
      $subTab?.classList.remove("active");

      restaurantStore.state.tab = "모든 음식점";

      restaurantStore.update(restaurantStore.state.restaurants);

      $restaurantFilter?.classList.remove("hidden");
    });

    $subTab?.addEventListener("click", () => {
      $subTab.classList.add("active");
      $mainTab?.classList.remove("active");

      restaurantStore.state.tab = "자주 가는 음식점";

      restaurantStore.update(restaurantStore.state.restaurants);

      $restaurantFilter?.classList.add("hidden");
    });

    $addRestaurantModalButton?.addEventListener("click", () => {
      RestaurantAddModal({
        restaurants: restaurantStore.state.restaurants,
        onAddRestaurant: restaurantStore.update,
      });
    });
  },
};

export default restaurantElement;
