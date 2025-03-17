import Restaurant from "./Restaurant";
import { Category, NameOrDistance, RestaurantValue, TabInfo } from "./types";

const storage = {
  saveRestaurantList(value: Restaurant[]) {
    const restaurantListValue = value.map((restaurant) => {
      return restaurant.value;
    });
    localStorage.setItem("restaurnatList", JSON.stringify(restaurantListValue));
  },

  loadRestaurantList(): RestaurantValue[] | null {
    const restaurantList = localStorage.getItem("restaurnatList");

    return restaurantList ? JSON.parse(restaurantList) : null;
  },

  saveCategory(value: Category) {
    localStorage.setItem("category", JSON.stringify(value));
  },

  loadCategory(): Category | null {
    const category = localStorage.getItem("category");

    return category ? JSON.parse(category) : null;
  },

  saveNameOrDistance(value: NameOrDistance) {
    localStorage.setItem("nameOrDistance", JSON.stringify(value));
  },

  loadNameOrDistance(): NameOrDistance | null {
    const nameOrDistance = localStorage.getItem("nameOrDistance");

    return nameOrDistance ? JSON.parse(nameOrDistance) : null;
  },

  saveTabInfo(value: TabInfo) {
    localStorage.setItem("TabInfo", JSON.stringify(value));
  },

  loadTabInfo(): TabInfo | null {
    const tabInfo = localStorage.getItem("TabInfo");

    return tabInfo ? JSON.parse(tabInfo) : null;
  },
};

export default storage;
