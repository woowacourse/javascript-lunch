import { Constants, OptionValue } from "./constant/Restaurant";
import restaurantListHandler from "./domain/restaurantListHandler";
import restaurantValidator from "./domain/restaurantValidator";
import { Category, Restaurant, Sort } from "./type/type";

class AppController {
  category: Category;
  sort: Sort;
  restaurantList: Restaurant[];

  constructor() {
    this.category = OptionValue.TOTAL as Category;
    this.sort = OptionValue.NAME_ORDER as Sort;
    this.restaurantList = restaurantListHandler.getRestaurants(
      this.category,
      this.sort
    );
  }

  getRestaurantList() {
    return this.restaurantList;
  }

  getRestaurant(id: string) {
    return this.restaurantList.find((restaurant) => restaurant.id === id);
  }

  setRestaurantList() {
    this.restaurantList = restaurantListHandler.getRestaurants(
      this.category,
      this.sort
    );
  }

  setSelectedValue = (filterId: string, selectedValue: Category | Sort) => {
    if (filterId === Constants.CATEGORY_FILTER) {
      this.category = selectedValue as Category;
    }

    if (filterId === Constants.SORTING_FILTER) {
      this.sort = selectedValue as Sort;
    }

    this.setRestaurantList();
  };

  addNewRestaurant = (restaurant: Restaurant): void => {
    restaurantValidator.validate(restaurant);
    restaurantListHandler.addRestaurant(restaurant);
    this.setRestaurantList();
  };

  deleteRestaurant = (id: string) => {
    restaurantListHandler.deleteRestaurant(id);
    this.setRestaurantList();
  };

  toggleBookmark = (id: string) => {
    restaurantListHandler.toggleBookmark(id);
    this.setRestaurantList();
  };
}

export default new AppController();
