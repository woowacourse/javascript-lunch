import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import RestaurantList from "./RestaurantList";
import restaurantListTemplate from "./restaurantListTemplate";

function RestaurantListContainer() {
  const main = document.querySelector("main");
  const formattedRestaurantListTemplate = convertHTMLStringToDOM(
    restaurantListTemplate,
  );
  if (main) {
    main.appendChild(formattedRestaurantListTemplate);
  }
  RestaurantList();
}
export default RestaurantListContainer;
