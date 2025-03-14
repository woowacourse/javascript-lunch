import InitHeader from "./InitHeader";
import InitModalHandler from "./InitModalHandler";
import InitRestaurantList from "./InitRestaurantList";

addEventListener("load", () => {
  InitHeader();
  InitRestaurantList();
  InitModalHandler();
});
