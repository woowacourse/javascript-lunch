import RestaurantList from "../components/RestaurantList";
import { Category, Restaurant } from "../type/restaurant";

const Filter = {
  byCategory(targetCategory: Category, restaurantList: Restaurant[]) {
    if (targetCategory === "전체") return restaurantList;

    return restaurantList?.filter(
      (restaurant) => restaurant.category === targetCategory
    );
  },

  byNodeCategory(targetCategory: Category, restaurantList: RestaurantList[]) {
    if (targetCategory === "전체") return restaurantList;

    return restaurantList?.filter(
      (restaurant: RestaurantList) =>
        restaurant.element.category === targetCategory
    );
  },
};

export default Filter;
