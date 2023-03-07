import { isValidFoodCategory } from "../type/FoodCategory";
import { Restaurant } from "../type/restaurant";

const Filter = {
  byCategory(targetCategory: string, restaurantList: Restaurant[]) {
    if (targetCategory === "전체") return restaurantList;

    if (!isValidFoodCategory(targetCategory)) return [];

    return restaurantList.filter(
      (restaurant) => restaurant.category === targetCategory
    );
  },
};

export default Filter;
