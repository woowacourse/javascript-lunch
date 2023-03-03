import Header from "./component/disposable/Header";
import Modal from "./component/disposable/Modal";
import RestaurantList from "./component/disposable/RestaurantList";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantTicket from "./component/reusable/RestaurantTicket";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./type/type";

class App {
  constructor(body: Element) {
    Header.render(body);
    SelectContainer.render(body, this.sortList);
    RestaurantList.render(body);
    Modal.render(body, this.makeRestaurantList);
  }

  makeRestaurantList = (restaurant: Restaurant): void => {
    restaurantListHandler.addRestaurant(restaurant);

    const restaurantList = restaurantListHandler.getRestaurants();
    RestaurantList.replaceTemplate(
      restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantTicket(restaurant).template()
        )
        .join("")
    );
  };

  sortList = (id: string, value: string) => {
    let restaurantList = [];

    if (id === "category-filter") {
      restaurantList = restaurantListHandler.getFilteredByCategory(value);
    } else {
      if (value === "거리순") {
        restaurantList = restaurantListHandler.getSortedByTakingTime();
      } else {
        restaurantList = restaurantListHandler.getSortedByName();
      }
    }

    RestaurantList.replaceTemplate(
      restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantTicket(restaurant).template()
        )
        .join("")
    );
  };
}

export default App;
