import RestaurantList from "../domain/RestaurantList.js";
import createListView from "../view/createListView.js";

function ListController(restaurantList: RestaurantList) {
  const { listElement, updateListView } = createListView(restaurantList);

  return { listElement, updateListView };
}

export default ListController;
