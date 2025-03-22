import Restaurant from "./Restaurant";
import {
  CategoryFilter,
  NameOrDistanceFilter,
  RestaurantValue,
  TabInfo,
} from "./types";

const STORAGE_KEYS = {
  RESTAURANT_LIST: "restaurantList",
  CATEGORY: "category",
  NAME_OR_DISTANCE: "nameOrDistance",
  TAB_INFO: "TabInfo",
};

const storage = {
  saveRestaurantList(value: Restaurant[]) {
    const restaurantListValue = value.map((restaurant) => {
      return restaurant.value;
    });
    localStorage.setItem(
      STORAGE_KEYS.RESTAURANT_LIST,
      JSON.stringify(restaurantListValue)
    );
  },

  loadRestaurantList(): RestaurantValue[] | null {
    const restaurantList = localStorage.getItem(STORAGE_KEYS.RESTAURANT_LIST);

    return restaurantList ? JSON.parse(restaurantList) : null;
  },

  saveCategory(value: CategoryFilter) {
    localStorage.setItem(STORAGE_KEYS.CATEGORY, JSON.stringify(value));
  },

  loadCategory(): CategoryFilter | null {
    const category = localStorage.getItem(STORAGE_KEYS.CATEGORY);

    return category ? JSON.parse(category) : null;
  },

  saveNameOrDistance(value: NameOrDistanceFilter) {
    localStorage.setItem(STORAGE_KEYS.NAME_OR_DISTANCE, JSON.stringify(value));
  },

  loadNameOrDistance(): NameOrDistanceFilter | null {
    const nameOrDistance = localStorage.getItem(STORAGE_KEYS.NAME_OR_DISTANCE);

    return nameOrDistance ? JSON.parse(nameOrDistance) : null;
  },

  saveTabInfo(value: TabInfo) {
    localStorage.setItem(STORAGE_KEYS.TAB_INFO, JSON.stringify(value));
  },

  loadTabInfo(): TabInfo | null {
    const tabInfo = localStorage.getItem(STORAGE_KEYS.TAB_INFO);

    return tabInfo ? JSON.parse(tabInfo) : null;
  },
};

export default storage;
