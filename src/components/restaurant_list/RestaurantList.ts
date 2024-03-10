import RestaurantListStorageService from "../../services/restaurantListStorageService";

import render from "./renderHandlers";

function RestaurantList() {
  const filterData = RestaurantListStorageService.getfilteredData();
  render(filterData);
}
export default RestaurantList;
