import InitHeader from "./domain/InitHeader.js";
import InitRestaurantList from "./domain/InitRestaurantList.js";
import InitModalHandler from "./domain/InitModalHandler.js";

addEventListener("load", () => {
  InitHeader();
  InitRestaurantList();
  InitModalHandler();
});
