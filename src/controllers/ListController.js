import createListView from "../view/createListView.js";

function ListController(allListContainerElement, restaurantList) {
  const updateListView = createListView(allListContainerElement, restaurantList);

  return updateListView;
}

export default ListController;
