import Header from "./component/disposable/Header";
import RestaurantFormBottomSheet from "./component/disposable/RestaurantFormBottomSheet";
import RestaurantList from "./component/disposable/RestaurantList";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantTicket from "./component/reusable/RestaurantTicket";
import { Constants, OptionValue } from "./constant/Constants";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./type/type";

class App {
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.restaurantList = restaurantListHandler.getSortedByName();

    Header.render(body);
    SelectContainer.render(body, this.sortList);
    RestaurantList.render(body);
    RestaurantFormBottomSheet.render(body, this.makeRestaurantList);

    this.rerenderList();
  }

  makeRestaurantList = (restaurant: Restaurant): void => {
    restaurantListHandler.addRestaurant(restaurant);
    this.restaurantList = restaurantListHandler.getRestaurants();

    this.rerenderList();
  };

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

    this.rerenderList();
  };

  rerenderList() {
    RestaurantList.replaceTemplate(
      this.restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantTicket(restaurant).template()
        )
        .join("")
    );
  }
}

export default App;
