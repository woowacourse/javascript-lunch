import AppController from "./AppDataController";
import render from "./view/Render";

class App {
  constructor(body: HTMLElement) {
    render.init(body);
    render.addEvents();

    const restaurantList = AppController.getRestaurantList();
    render.updateRestaurantList(restaurantList);
  }
}

export default App;
