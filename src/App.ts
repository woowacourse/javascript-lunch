import Header from "./component/disposable/Header";
import Modal from "./component/disposable/Modal";
import SelectContainer from "./component/disposable/SelectContainer";
import RestaurantTicket from "./component/reusable/RestaurantTicket";
import { Restaurant } from "./type/type";

class App {
  constructor(body: Element) {
    new Header().render(body);
    new SelectContainer().render(body);
    new Modal().render(body, this.makeTicket);
  }

  makeTicket = (restaurant: Restaurant): void => {
    const newRestaurant = new RestaurantTicket(restaurant);
    console.log(newRestaurant.template());
  };
}

export default App;
