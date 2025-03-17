import { FilterBox } from "./components/common/FilterBox.js";
import { LunchList } from "./components/function/LunchList.ts";
import { RestaurantTabMenu } from "./components/function/RestaurantTabMenu.js";
import ChangeEvent from "./utils/ChangeEvent.ts";
import SubmitEvent from "./utils/SubmitEvent.ts";

RestaurantTabMenu("restaurantTabMenuBox");
const filterBox = FilterBox();
document.getElementById("restaurantFilterBox")!.innerHTML = filterBox;
const lunchList = LunchList("restaurantListBox", "restaurantFavoriteSection");
lunchList.render();
lunchList.renderFavorites();
ChangeEvent(lunchList);
SubmitEvent(lunchList);
