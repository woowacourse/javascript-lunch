import List from "../components/List.js";
import ListItem from "../components/ListItem.js";

function createFavoriteListView(containerElement, restaurantList) {
  let favoriteListElement = List(restaurantList.favoriteRestaurants());
  containerElement.appendChild(favoriteListElement);

  function updateFavoriteListView() {
    const favoriteRestaurants = restaurantList.favoriteRestaurants();
    favoriteListElement.innerHTML = "";
    favoriteRestaurants.forEach(({ information }) => {
      favoriteListElement.appendChild(ListItem(information));
    });
  }

  return updateFavoriteListView;
}

export default createFavoriteListView;
