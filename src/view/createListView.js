import List from "../components/List.js";
import ListItem from "../components/ListItem.js";

function createListView(restaurantList) {
  let listElement = List(restaurantList.filterAndSort("전체", "이름순"));

  function updateListView(category, sortOption) {
    const filteredRestaurants = restaurantList.filterAndSort(category, sortOption);
    listElement.innerHTML = "";
    filteredRestaurants.forEach(({ restaurant }) => {
      listElement.appendChild(ListItem(restaurant));
    });
  }

  return { listElement, updateListView };
}

export default createListView;
