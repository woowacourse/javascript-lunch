import { FilterBox } from "./components/common/FilterBox.js";
import { LunchList } from "./components/function/LunchList.ts";
import { RestaurantTabMenu } from "./components/function/RestaurantTabMenu.js";
import ChangeEvent from "./components-event/ChangeEvent.ts";
import SubmitEvent from "./components-event/SubmitEvent.ts";
import ClickEvent from "./components-event/ClickEvent.js";

RestaurantTabMenu("restaurantTabMenuBox");
const filterBox = FilterBox();
document.getElementById("restaurantFilterBox")!.innerHTML = filterBox;
const lunchList = LunchList("restaurantListBox", "restaurantFavoriteSection");
lunchList.render();
lunchList.renderFavorites();
ChangeEvent(lunchList);
SubmitEvent(lunchList);
new ClickEvent(document);
