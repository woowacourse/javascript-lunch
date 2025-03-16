import createListView from "../view/createListView.js";

function ListController(restaurantList) {
  const { listElement, updateListView } = createListView(restaurantList);

  return { listElement, updateListView };
}

export default ListController;
