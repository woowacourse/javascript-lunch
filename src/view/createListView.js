import List from "../components/List.js";
import ListItem from "../components/ListItem.js";

function createListView(containerElement, restaurantList) {
  let listElement = List(restaurantList.filterAndSort("전체", "이름순"));
  containerElement.appendChild(listElement);

  function updateListView(category, sortOption) {
    const filteredRestaurants = restaurantList.filterAndSort(category, sortOption);
    listElement.innerHTML = "";
    filteredRestaurants.forEach(({ information }) => {
      listElement.appendChild(ListItem(information));
    });
  }

  return updateListView;
}

export default createListView;
