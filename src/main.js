import InitHeader from "./InitHeader.js";
import InitRestaurantList from "./InitRestaurantList.js";
import InitModalHandler from "./InitModalHandler.js";
import SaveFavoriteRestaurant from "./domain/SaveFavoriteRestaurant.js";

addEventListener("load", () => {
  InitHeader();
  InitRestaurantList();
  InitModalHandler();
  SaveFavoriteRestaurant();
});
