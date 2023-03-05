import Header from "./component/disposable/Header";
import Modal from "./component/disposable/Modal";
import RestaurantList from "./component/disposable/RestaurantList";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantItem from "./component/reusable/RestaurantItem";
import { Constants, OptionValue } from "./constant/Constants";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./type/type";

class App {
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.restaurantList = restaurantListHandler.getSortedByName();
    this.renderComponents(body);
    this.addEvents();
    this.rerenderList();
  }

  renderComponents(body: Element) {
    Header.render(body);
    SelectContainer.render(body);
    RestaurantList.render(body);
    Modal.render(body);
  }

  addEvents() {
    Header.addEvent();
    SelectContainer.addEvent(this.sortList);
    Modal.addEvent(this.makeRestaurantList);
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
        value === OptionValue.DISTANCE_ORDER
          ? restaurantListHandler.getSortedByTakingTime(this.restaurantList)
          : restaurantListHandler.getSortedByName(this.restaurantList);
    }

    this.rerenderList();
  };

  rerenderList() {
    RestaurantList.replaceTemplate(
      this.restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantItem(restaurant).template()
        )
        .join("")
    );
  }
}

export default App;
