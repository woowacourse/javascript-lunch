import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";

function ListController(listContainerElement, category) {
  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS);
  let listElement = List(restaurantList.filterByCategory("전체"));
  listContainerElement.appendChild(listElement);

  function updateList(category) {
    const filteredRestaurants = restaurantList.filterByCategory(category);
    listElement.innerHTML = "";
    filteredRestaurants.forEach(({ information }) => {
      listElement.appendChild(ListItem(information));
    });
  }

  return { listElement, restaurantList, updateList };
}

export default ListController;
