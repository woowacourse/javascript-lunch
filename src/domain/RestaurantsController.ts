import { getFormData } from "../util/form";
import { validateName } from "../validator";

export default class RestaurantsController {
  private static instance: RestaurantsController;

  private constructor() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = this;
    }
  }

  public static getInstance() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = new RestaurantsController();
    }

    return RestaurantsController.instance;
  }

  addNewRestaurant(event: Event) {
    const restaurantInfo = Object.values(getFormData(event)).map((info) =>
      String(info).trim()
    );

    validateName(restaurantInfo);
  }
}
