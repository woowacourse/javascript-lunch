import { $, FilterSort, Render } from "../until/ControlDom";
import { MakeNewList } from "../until/MakeNewList";
import { RestaurantList } from "../RestaurantList";

const addEventFilterSortButton = () => {
  const restaurantFilterContainer = $(".restaurant-filter-container");
  restaurantFilterContainer?.addEventListener("change", () => {
    FilterSort.setState();
    Render.restaurantList(MakeNewList.getNewList(RestaurantList.list));
  });
};

export default addEventFilterSortButton;
