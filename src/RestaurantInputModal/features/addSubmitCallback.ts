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
      //Alert.open(submitAlert, e.message);
      return;
    }
  
    //restaurantList.add({ restaurant, favorite: false });
    //window.dispatchEvent(renderRestaurants);
  
    modal.close();
  
    // if (categoryFilter.value !== "전체" && restaurant.category !== categoryFilter.value) {
    //   Modal.open(restaurantInputSuccessModal);
    // }
    //console.log(restaurant);
    modal.element.dispatchEvent(
      new CustomEvent("restaurantsubmit", { bubbles: true, detail: { restaurant }})
    );
  });
};

export default attachSubmitCallback;
