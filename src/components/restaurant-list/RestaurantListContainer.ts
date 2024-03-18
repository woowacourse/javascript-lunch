import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import RestaurantList from "./RestaurantList";
import restaurantListTemplate from "./restaurantListTemplate";

function RestaurantListContainer() {
  const main = document.querySelector("main") as HTMLElement;
  const formattedRestaurantListTemplate = convertHTMLStringToDOM(
    restaurantListTemplate,
  );
  main.appendChild(formattedRestaurantListTemplate);
  RestaurantList();
}
export default RestaurantListContainer;
