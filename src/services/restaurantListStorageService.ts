import { Irestaurant } from "../types";
import filterState from "../store/FilterStateStore";
import restaurantListHelper from "../domain/RestaurantListHelper";

const RestaurantListStorageService = {
  getfilteredData() {
    const localData = this.getData();
    const filteredState = filterState.getFilterInfo();

    const filtereDataByCategory = restaurantListHelper.filterByCategory(
      filteredState.filter,
      localData,
    );

    return restaurantListHelper.sortBySelectedValue(
      filteredState.sort,
      filtereDataByCategory,
    );
  },

  getData() {
    const restaurantList = localStorage.getItem("restaurantList");
    if (restaurantList) {
      return JSON.parse(restaurantList);
    }
  },

  setData(restaurant: Irestaurant) {
    const prevData = this.getData();
    const newData = [...prevData, restaurant];

    localStorage.setItem("restaurantList", JSON.stringify(newData));
  },
};

export default RestaurantListStorageService;
