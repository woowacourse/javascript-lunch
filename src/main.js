import { LunchList } from "./components/LunchList.js";
import SubmitEvent from "./utils/SubmitEvent.js";
import { getHTML } from "./utils/utils.js";

const lunchList = LunchList("restaurantListSection");

lunchList.render();
SubmitEvent(lunchList);
