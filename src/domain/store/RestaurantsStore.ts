import Store from "./Store";
import {
  Category,
  Restaurant,
  Action,
  SortMethod,
  AddRestaurant,
} from "../../abstracts/types";
import {
  CATEGORY_DEFAULT,
  RESTAURANT_ACTION,
  SORT_METHOD,
} from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";

class RestaurantsStore extends Store {
  private restaurantList: Restaurant[] = [];
  private category: Category = CATEGORY_DEFAULT;
  private sortMethod: SortMethod = SORT_METHOD.NAME;

  public publish() {
    this.getSubscribers().forEach((subscriber: CustomElement) => {
      subscriber.rerender({
        restaurantList: this.restaurantList,
        category: this.category,
      });
    });
  }

  public reducer = {
    [RESTAURANT_ACTION.SET_RESTAURANT_LIST]: (action: Action) => {
      this.restaurantList = action.data as Restaurant[];
      this.sortRestaurants(this.sortMethod);
      this.publish();
    },
    [RESTAURANT_ACTION.ADD_RESTAURANT]: (action: Action) => {
      this.addRestaurant(action.data as Restaurant);
      this.sortRestaurants(this.sortMethod);
      this.publish();
    },
    [RESTAURANT_ACTION.HANDLE_FAVORITE]: (action: Action) => {
      this.handleFavoriteRestaurant(action.data as number);
      this.publish();
    },
    [RESTAURANT_ACTION.DELETE_RESTAURANT]: (action: Action) => {
      this.deleteRestaurant(action.data as number);
      this.publish();
    },
    [RESTAURANT_ACTION.FILTER_BY_CATEGORY]: (action: Action) => {
      this.category = action.data as Category;
      this.publish();
    },
    [RESTAURANT_ACTION.SORT_RESTAURANTS]: (action: Action) => {
      this.sortRestaurants(action.data as SortMethod);
      this.publish();
    },
  };

  private addRestaurant(addedRestaurantData: AddRestaurant) {
    const restaurant = addedRestaurantData as Restaurant;
    restaurant.id = this.restaurantList.length;

    this.restaurantList.push(restaurant);
  }

  private deleteRestaurant(restaurantId: number) {
    const restaurantIndex = this.restaurantList.findIndex(
      (restaurant) => restaurant.id === Number(restaurantId)
    );

    this.restaurantList.splice(restaurantIndex, 1);
  }

  private handleFavoriteRestaurant(restaurantId: number) {
    const index = this.restaurantList.findIndex(
      (restaurant) => restaurant.id === Number(restaurantId)
    );
    const restaurant = this.restaurantList[index];

    if (restaurant) {
      this.restaurantList[index].isFavorite = !restaurant.isFavorite;
    }
  }

  private sortRestaurants(sortMethod: SortMethod) {
    this.sortMethod = sortMethod;
    switch (this.sortMethod) {
      case SORT_METHOD.NAME:
        this.restaurantList = this.restaurantList.sort(
          (prev: Restaurant, next: Restaurant) =>
            prev.name > next.name ? 1 : -1
        );
        break;
      case SORT_METHOD.DISTANCE:
        this.restaurantList = this.restaurantList.sort(
          (prev: Restaurant, next: Restaurant) => prev.distance - next.distance
        );
        break;
    }
  }
}

const RestaurantInstance = new RestaurantsStore();

export default RestaurantInstance;
