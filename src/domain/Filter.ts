import { Category, Restaurant } from "../type/restaurant";

const Filter = {
  byCategory(targetCategory: Category, restaurantList: Restaurant[]) {
    return restaurantList.filter(
      (restaurant) => restaurant.category === targetCategory
    );
  },
};

export default Filter;
