import Header from "./components/Header";
import RestaurantFormBottomSheet from "./components/RestaurantFormBottomSheet";
import RestaurantList from "./components/RestaurantList";
import SelectContainer from "./components/SelectContainer";
import { Constants, OptionValue } from "./utils/Constants";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./types/type";
import RestaurantItemBottomSheet from "./components/RestaurantItemBottomSheet";

class App {
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.restaurantList = restaurantListHandler.getSortedByName();

    Header.initialize(body);
    SelectContainer.initialize(body, this.setSortListFilterById);
    RestaurantList.initialize(
      body,
      this.restaurantList,
      this.createItemBottomSheet
    );
    RestaurantFormBottomSheet.initialize(
      body,
      this.addRestaurantItemToList.bind(this)
    );

    RestaurantList.updateRestaurantList(this.restaurantList);
  }

  addRestaurantItemToList(data: Restaurant) {
    restaurantListHandler.addRestaurant(data);
    this.restaurantList = restaurantListHandler.getRestaurants();

    RestaurantList.updateRestaurantList(this.restaurantList);
  }

  createItemBottomSheet = (id: string) => {
    const restaurant = <Restaurant>this.getSelectedItem(id);
    const itemSheet = new RestaurantItemBottomSheet(restaurant);
    itemSheet.initialize();
  };

  getSelectedItem(id: string) {
    return this.restaurantList.find((restaurant) => restaurant.id === id);
  }

  setSortListFilterById = (id: string, value: string) => {
    if (id === Constants.CATEGORY_FILTER) {
      this.restaurantList =
        value === ""
          ? restaurantListHandler.getRestaurants()
          : restaurantListHandler.getFilteredByCategory(value);
    }

    if (id === Constants.SORTING_FILTER) {
      this.restaurantList =
        value === OptionValue.TAKING_TIME_ORDER
          ? restaurantListHandler.getSortedByTakingTime(this.restaurantList)
          : restaurantListHandler.getSortedByName(this.restaurantList);
    }

    RestaurantList.updateRestaurantList(this.restaurantList);
  };
}

export default App;
