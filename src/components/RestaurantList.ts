import { Restaurant, RestaurantType } from "./Restaurant";
interface listInterface {
  filterState: string;
  sortState: string;
  originList: Restaurant[];
  valList: Restaurant[];
  defaultList: (restaurantList: RestaurantType[]) => Restaurant[];
  addRestaurant: (
    restaurantList: Restaurant[],
    restaurant: RestaurantType
  ) => Restaurant[];
  template(restaurantList: Restaurant[]): string;
  filter(restaurantList: Restaurant[], category: string): Restaurant[];
  sort(restaurantList: Restaurant[], Priority: string): Restaurant[];
}
const RestaurantList: listInterface = {
  filterState: "전체",
  sortState: "이름순",
  originList: [],
  valList: [],
  defaultList(restaurantList: RestaurantType[]) {
    return restaurantList.map((item) => {
      const restaurant = new Restaurant(item);
      return restaurant;
    });
  },
  addRestaurant(restaurantList: Restaurant[], restaurant: RestaurantType) {
    return [...restaurantList, new Restaurant(restaurant)];
  },
  template(restaurantList): string {
    return `<ul class='restaurant-list'>
    ${restaurantList.map((restaurant) => restaurant.template()).join("")}
    </ul>`;
  },
  filter(restaurantList, category) {
    if (category === "전체") {
      this.valList = this.originList;
      return restaurantList;
    }
    const result = restaurantList.filter((restaurant) => {
      if (restaurant.getRestaurant().category === category) return restaurant;
    });
    this.valList = result;
    return result;
  },
  sort(restaurantList, Priority) {
    const result = restaurantList.sort((a, b) => {
      return a.getRestaurant().distance - b.getRestaurant().distance;
    });
    return result;
  },
};
export default RestaurantList;
