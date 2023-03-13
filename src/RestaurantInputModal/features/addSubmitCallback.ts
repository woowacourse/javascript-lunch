import RestaurantInputModal from "../RestaurantInputModal";
import readRestaurantInput from "./readRestaurantInput";
import RestaurantValidator from "../utils/RestaurantValidator";

const attachSubmitCallback = (modal: RestaurantInputModal) => {
  modal.element.querySelector(".button--primary")?.addEventListener("click", (event) => {
    event.preventDefault();
  
    const restaurant = readRestaurantInput(modal);
  
    try {
      RestaurantValidator.checkAll(restaurant);
    } catch (e) {
      return;
    }
  
    modal.close();

    modal.element.dispatchEvent(
      new CustomEvent("restaurantSubmit", { bubbles: true, detail: { restaurant, favorite: false }})
    );
  });
};

export default attachSubmitCallback;
