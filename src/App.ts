import Header from "./component/disposable/Header";
import Modal from "./component/disposable/Modal";
import RestaurantList from "./component/disposable/RestaurantList";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantTicket from "./component/reusable/RestaurantTicket";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./type/type";

class App {
  restaurantList: any;

  constructor(body: Element) {
    new Header().render(body);
    new SelectContainer().render(body);
    new Modal().render(body, this.makeTicket);
    this.restaurantList = new RestaurantList();
    this.restaurantList.render(body);
  }

  makeTicket = (restaurant: Restaurant): void => {
    restaurantListHandler.addRestaurant(restaurant);

    const restaurantList = restaurantListHandler.getSortedByName();
    this.restaurantList.replaceTemplate(
      restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantTicket(restaurant).template()
        )
        .join("")
    );
  };
}

export default App;
