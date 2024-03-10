import { Iall, Icategory } from "../types/category";
import { Irestaurant, IrestaurantList } from "../types/restaurant";
import { IsortType } from "../types/sort";

class RestaurantListHelper implements IrestaurantList {
  sortBySelectedValue(seletedValue: IsortType, restaurantList: Irestaurant[]) {
    if (seletedValue === "name") return this.sortByName(restaurantList);

    return this.sortByDistance(restaurantList);
  }

  sortByName(restaurantList: Irestaurant[]) {
    return restaurantList.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Irestaurant[]) {
    return restaurantList.sort((a, b) => {
      if (a.distance === b.distance) {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  }

  filterByCategory(category: Icategory | Iall, restaurantList: Irestaurant[]) {
    if (category === "전체") {
      return restaurantList;
    }

    return restaurantList.filter(
      (restaurant) => restaurant.category === category,
    );
  }
}

const restaurantListHelper = new RestaurantListHelper();

export default restaurantListHelper;
