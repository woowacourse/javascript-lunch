import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";

function ListController(allListContainerElement) {
  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS);
  let listElement = List(restaurantList.filterAndSort("전체", "이름순"));
  allListContainerElement.appendChild(listElement);

  function updateList(category, sortOption) {
    const filteredRestaurants = restaurantList.filterAndSort(category, sortOption);
    listElement.innerHTML = "";
    filteredRestaurants.forEach(({ information }) => {
      listElement.appendChild(ListItem(information));
    });
  }

  return { listElement, restaurantList, updateList };
}

export default ListController;
