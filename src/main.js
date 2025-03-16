import { FilterBox } from "./components/function/FilterBox.js";
import { LunchList } from "./components/function/LunchList.ts";
import { RestaurantTabMenu } from "./components/function/RestaurantTabMenu.js";
import SubmitEvent from "./utils/SubmitEvent.js";
import { getHTML } from "./utils/utils.ts";

const restaurantTabMenu = RestaurantTabMenu("restaurantTabMenuBox");
const filterBox = FilterBox();
console.log(filterBox);
document.getElementById("restaurantFilterBox").innerHTML = filterBox;
const lunchList = LunchList("restaurantListBox", "restaurantFavoriteSection");

lunchList.render();
lunchList.renderFavorites();
SubmitEvent(lunchList);
