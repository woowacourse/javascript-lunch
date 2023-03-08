import { isValidFoodCategory } from "../type/FoodCategory";
import PersonalRestaurant from "../type/PersonalRestaurant";

const Filter = {
  byCategory(targetCategory: string, personalRestaurantList: PersonalRestaurant[]) {
    if (targetCategory === "전체") return personalRestaurantList;

    if (!isValidFoodCategory(targetCategory)) return [];

    return personalRestaurantList.filter(
      (personalRestaurant) => personalRestaurant.restaurant.category === targetCategory
    );
  },

  byFavorite(personalRestaurantList: PersonalRestaurant[]) {
    return personalRestaurantList.filter(
      (personalRestaurant) => personalRestaurant.favorite
    );
  }
};

export default Filter;
