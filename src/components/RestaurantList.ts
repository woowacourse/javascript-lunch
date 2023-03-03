import { Restaurant, RestaurantType } from "./Restaurant";
interface listInterface {
  originList: Restaurant[];
  filterState: string;
  sortState: string;
  defaultList: (restaurantList: RestaurantType[]) => void;
  addRestaurant: (restaurant: RestaurantType) => void;
  template(restaurantList: Restaurant[]): string;
  listUp(category: string, priority: string): Restaurant[];
  filter(category: string): Restaurant[];
  sort(restaurantList: Restaurant[], priority: string): Restaurant[];
}

const RestaurantList: listInterface = {
  originList: [],
  filterState: "전체",
  sortState: "name",

  defaultList(restaurantList: RestaurantType[]) {
    const list = restaurantList.map((item) => {
      const restaurant = new Restaurant(item);
      return restaurant;
    });
    this.originList = this.sort(list, this.sortState);
  },
  addRestaurant(restaurant: RestaurantType) {
    this.originList = [...this.originList, new Restaurant(restaurant)];
  },
  template(restaurantList): string {
    return `<ul class='restaurant-list'>
    ${restaurantList.map((restaurant) => restaurant.template()).join("")}
    </ul>`;
  },
  listUp(category, priority) {
    return this.sort(this.filter(category), priority);
  },

  filter(category) {
    this.filterState = category;
    if (category === "전체") return this.originList;

    return this.originList.filter(
      (item) => item.getRestaurant().category === category && item
    );
  },
  sort(restaurantList, priority) {
    this.sortState = priority;
    if (priority === "distance") {
      const result = restaurantList.sort((current, next) => {
        return current.getRestaurant().distance - next.getRestaurant().distance;
      });

      return result;
    }

    const result = restaurantList.sort((current, next) => {
      return current.getRestaurant().name > next.getRestaurant().name ? 1 : -1;
    });

    return result;
  },
};
export default RestaurantList;
