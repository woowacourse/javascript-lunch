import Header from "./components/disposable/Header";
import RestaurantFormBottomSheet from "./components/disposable/RestaurantFormBottomSheet";
import RestaurantList from "./components/disposable/RestaurantList";
import SelectContainer from "./components/disposable/SelectContainer";
import { Constants, OptionValue } from "./utils/Constants";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./types/type";

class App {
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.restaurantList = restaurantListHandler.getSortedByName();

    Header.initialize(body);
    SelectContainer.initialize(body, this.sortList);
    RestaurantList.render(body);
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

  sortList = (id: string, value: string) => {
    if (id === Constants.CATEGORY_FILTER) {
      this.restaurantList = restaurantListHandler.getFilteredByCategory(value);
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
