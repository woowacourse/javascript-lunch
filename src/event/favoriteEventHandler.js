import EventHandler from "../utils/EventHandler.js";

function favoriteEventHandler(mainElement, { restaurantList, updateFavoriteListView }) {
  mainElement.addEventListener("click", (event) => {
    const starElement = event.target.closest(".favorite-star");
    if (!starElement) return;
    starElement.classList.toggle("active");
    const restaurantName = starElement.dataset.name;
    const restaurant = restaurantList.getRestaurantByName(restaurantName);

    if (restaurant) {
      restaurant.toggleFavorite();
      restaurantList.updateLocalStorage();
      updateFavoriteListView();
    }
  });
}

export default favoriteEventHandler;
