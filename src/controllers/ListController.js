import List from "../components/List.js";
import { LIST_ITEM_CONTENTS } from "../contants.js";
import RestaurantList from "../domain/RestaurantList.js";

function ListController(listContainerElement) {
  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS);
  const listElement = List(restaurantList.resaurants);
  listContainerElement.appendChild(listElement);

  return { listElement, restaurantList };
}

export default ListController;
