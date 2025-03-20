import RestaurantList from "../domain/RestaurantList.ts";
import createListView from "../view/createListView.js";

class ListController {
  listElement;
  updateListView;
  constructor(restaurantList: RestaurantList) {
    const { listElement, updateListView } = createListView(restaurantList);
    this.listElement = listElement;
    this.updateListView = updateListView;
  }

  getListElement(): HTMLElement {
    return this.listElement;
  }

  updateList(category: string, sortOption: string) {
    this.updateListView(category, sortOption);
  }
}

export default ListController;
