import Header from "./component/disposable/Header";
import Modal from "./component/disposable/Modal";
import RestaurantList from "./component/disposable/RestaurantList";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantTicket from "./component/reusable/RestaurantTicket";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./type/type";

class App {
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.restaurantList = JSON.parse(
      localStorage.getItem("restuarantList") as string
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
    if (id === "category-filter") {
      this.restaurantList = restaurantListHandler.getFilteredByCategory(value);
    } else {
      if (value === "거리순") {
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
