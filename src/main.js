import { LunchList } from "./components/LunchList.js";
import { RestaurantTabMenu } from "./components/RestaurantTabMenu.js";
import SubmitEvent from "./utils/SubmitEvent.js";
import { getHTML } from "./utils/utils.js";

const restaurantTabMenu = RestaurantTabMenu("restaurantMenuSection");
const lunchList = LunchList("restaurantListSection");

lunchList.render();
SubmitEvent(lunchList);

const lunchFavoriteList = LunchList("restaurantFavoriteSection");
lunchFavoriteList.render();
