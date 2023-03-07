import { RestaurantType } from "../Template";

export const MakeNewList = {
  filterState: "전체",
  sortState: "name",

  getNewList(restaurantList: RestaurantType[]): RestaurantType[] {
    return this.sort(this.filter(restaurantList));
  },

  filter(restaurantList: RestaurantType[]): RestaurantType[] {
    if (this.filterState === "전체") return restaurantList;

    return restaurantList.filter(
      (restaurant) => restaurant.category === this.filterState && restaurant
    );
  },

  sort(restaurantList: RestaurantType[]): RestaurantType[] {
    if (this.sortState === "distance") {
      const result = restaurantList.sort((current, next) => {
        return current.takeTime - next.takeTime;
      });
      return result;
    }

    const result = restaurantList.sort((prev, next) => {
      return prev.name > next.name ? 1 : -1;
    });
    return result;
  },
};
