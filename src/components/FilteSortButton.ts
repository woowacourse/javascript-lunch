import { $, FilterSort, Render } from "../until/ControlDom";
import { RestaurantList } from "./RestaurantList";

const addEventFilterSortButton = () => {
  const restaurantFilterContainer = $(".restaurant-filter-container");
  restaurantFilterContainer?.addEventListener("change", () => {
    FilterSort.setState();
    Render.restaurantList(RestaurantList.list);
  });
};

export default addEventFilterSortButton;
