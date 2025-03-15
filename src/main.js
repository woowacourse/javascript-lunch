import { LunchList } from "./components/LunchList.ts";
import { RestaurantTabMenu } from "./components/RestaurantTabMenu.js";
import SubmitEvent from "./utils/SubmitEvent.js";
import { getHTML } from "./utils/utils.ts";

const restaurantTabMenu = RestaurantTabMenu("restaurantMenuSection");
const lunchList = LunchList(
  "restaurantListSection",
  "restaurantFavoriteSection"
);

lunchList.render();
lunchList.renderFavorites();
SubmitEvent(lunchList);
