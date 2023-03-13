import RestaurantList from "../RestaurantList";
import Filter from "../utils/Filter";
import { sort } from "../utils/sort";

const updateList = (restaurantList: RestaurantList) => {
  restaurantList.element.innerHTML = "";
  const result = sort(Filter.byCategory(Filter.byFavorite(restaurantList.list)));
  result.forEach((summary) => restaurantList.element.appendChild(summary.element));
};

export default updateList;
