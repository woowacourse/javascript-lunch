import { handleBottomSheetToggle } from "./components/bottomSheet/bottomSheet.ts";
import { renderFilterBox } from "./components/filterBox/filterBox.ts";
import { renderRestaurantList } from "./components/restaurant/list/restaurantList.ts";
import { renderRestaurantTab } from "./components/restaurant/tab/restaurantTab.ts";
import { getRestaurantList } from "./utils/restaurant.ts";

renderRestaurantTab();
renderFilterBox();
renderRestaurantList(getRestaurantList());
document.body.addEventListener("click", handleBottomSheetToggle);
