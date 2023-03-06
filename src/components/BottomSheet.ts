import { $, BottomSheet, Render } from "../until/ControlDom";
import { RestaurantList } from "../RestaurantList";

const addEventBottomSheet = {
  addRestaurant() {
    const formElem = $("form");
    formElem?.addEventListener("submit", (event) => {
      event.preventDefault();

      const newRestaurant = BottomSheet.getInfo();
      BottomSheet.reset();
      BottomSheet.toggle();
      RestaurantList.addRestaurant(newRestaurant);
      Render.restaurantList(RestaurantList.list);
    });
    this.cancelAddRestaurant();
  },

  cancelAddRestaurant() {
    const buttonSecondary = $(".button--secondary");
    buttonSecondary?.addEventListener("click", () => {
      BottomSheet.toggle();
    });
  },
};
export default addEventBottomSheet;
