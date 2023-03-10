import { Category, Restaurant } from "../type/restaurant";

const Filter = {
  byCategory(targetCategory: Category, restaurantList: Restaurant[]) {
    if (targetCategory === "전체") return restaurantList;

    return restaurantList?.filter(
      (restaurant) => restaurant.category === targetCategory
    );
  },
};

export default Filter;
