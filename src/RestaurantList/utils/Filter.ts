import RestaurantSummary from "../../RestaurantSummary/RestaurantSummary";
import RestaurantList from "../RestaurantList";
import { isValidFoodCategory } from "../../type/FoodCategory";
import { $ } from "../../util/querySelector";

const Filter = {
  byCategory(list: RestaurantSummary[]) {
    const targetCategory = ($("#category-filter") as HTMLSelectElement)?.value;

    if (targetCategory === "전체") return list;

    if (!isValidFoodCategory(targetCategory)) return [];

    return list.filter(
      (summary) => summary.info.restaurant.category === targetCategory
    );
  },

  byFavorite(list: RestaurantSummary[]) {
    const globalFilterValue = ($("nav input[name='global-filter']:checked") as HTMLInputElement).value;

    if (globalFilterValue === "all") {
      return list;
    }

    if (globalFilterValue === "favorite"){
      return list.filter(
        (summary) => summary.info.favorite
      );
    }

    return [];
  }
};

export default Filter;
