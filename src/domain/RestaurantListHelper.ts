import { IAll, Icategory, Irestaurant, IrestaurantList } from "../types";

class RestaurantListHelper implements IrestaurantList {
  sortByName(restaurantList: Irestaurant[]) {
    return restaurantList.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Irestaurant[]) {
    return restaurantList.sort((a, b) => a.distance - b.distance);
  }

  filterByCategory(category: Icategory | IAll, restaurantList: Irestaurant[]) {
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
