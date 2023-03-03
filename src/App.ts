import Header from "./component/disposable/Header";
import Modal from "./component/disposable/Modal";
import RestaurantList from "./component/disposable/RestaurantList";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantTicket from "./component/reusable/RestaurantTicket";
import { Constants, OptionValue } from "./constant/Constants";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./type/type";

class App {
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.restaurantList = JSON.parse(
      localStorage.getItem(Constants.RESTAURANT_LIST) as string
    );
    Header.render(body);
    SelectContainer.render(body, this.sortList);
    RestaurantList.render(body);
    Modal.render(body, this.makeRestaurantList);
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
    } else {
      if (value === OptionValue.DISTANCE_ORDER) {
        this.restaurantList = restaurantListHandler.getSortedByTakingTime();
      } else {
        this.restaurantList = restaurantListHandler.getSortedByName();
      }
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
