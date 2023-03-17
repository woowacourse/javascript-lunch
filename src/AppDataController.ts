import { Constants, OptionValue } from "./constant/Restaurant";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Category, Restaurant, Sort } from "./type/type";

class AppController {
  page: string;
  category: Category;
  sort: Sort;
  restaurantList: Restaurant[];

  constructor() {
    this.page = Constants.EVERY_PAGE;
    this.category = <Category>OptionValue.TOTAL;
    this.sort = <Sort>OptionValue.NAME_ORDER;
    this.restaurantList = restaurantListHandler.getTotalRestaurants();
  }

  getRestaurantList(): Restaurant[] {
    this.restaurantList = restaurantListHandler.getTotalRestaurants();

    if (this.page === Constants.BOOKMARKED_PAGE) {
      return this.restaurantList.filter((restaurant) => restaurant.bookmarked);
    }

    const restaurants = this.getFilteredByCategory(this.category);
    return this.sort === OptionValue.NAME_ORDER
      ? this.getSortedByName(restaurants)
      : this.getSortedByTakingTime(restaurants);
  }

  getRestaurant(id: string) {
    return this.restaurantList.find((restaurant) => restaurant.id === id);
  }

  private getSortedByName(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, Constants.KOREAN)
    );
  }

  private getSortedByTakingTime(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort(
      (resA, resB) => resA.takingTime - resB.takingTime
    );
  }

  getFilteredByCategory(category: Category): Restaurant[] {
    return category === OptionValue.TOTAL
      ? [...this.restaurantList]
      : [...this.restaurantList].filter(
          (restaurant) => restaurant.category === category
        );
  }

  setPage(page: string) {
    this.page = page;
  }

  setFilter(id: string, value: Sort | Category) {
    if (id === "category-filter") {
      this.setCategory(<Category>value);
    }

    if (id === "sorting-filter") {
      this.setSort(<Sort>value);
    }
  }

  setCategory(category: Category) {
    this.category = category;
  }

  setSort(sort: Sort) {
    this.sort = sort;
  }
}

export default new AppController();
