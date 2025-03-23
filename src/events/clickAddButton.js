import Persistence from "../domain/persistence/Persistence";
import registerFlows from "../flows/registerFlow";
import renderFilteredRestaurants from "../ui/renderFilteredRestaurant";

const clickAddButton = (e, restaurantList) => {
  registerFlows(e, restaurantList);
  if (Persistence.loadTabInfo() === "all") {
    renderFilteredRestaurants(restaurantList);
  }
};

export default clickAddButton;
