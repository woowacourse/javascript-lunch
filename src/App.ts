import AppController from "./AppDataController";
import render from "./view/render";

class App {
  constructor(body: HTMLElement) {
    render.init(body);
    render.addEvents();

    const restaurantList = AppController.getRestaurantList();
    render.updateRestaurantList(restaurantList);
  }
}

export default App;
