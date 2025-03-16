import RestaurantList from "../domain/RestaurantList";

interface favoriteEventHandler {
  mainElement: HTMLElement;
  restaurantList: RestaurantList;
  updateFavoriteListView: () => void;
}

function favoriteEventHandler({ mainElement, restaurantList, updateFavoriteListView }: favoriteEventHandler) {
  mainElement.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const starElement = target.closest(".favorite-star") as HTMLDivElement;
    if (!starElement) return;

    starElement.classList.toggle("active");
    const restaurantName = starElement.dataset.name || "";
    const restaurant = restaurantList.getRestaurantByName(restaurantName);

    if (restaurant) {
      restaurant.toggleFavorite();
      restaurantList.updateLocalStorage();
      updateFavoriteListView();
    }
  });
}

export default favoriteEventHandler;
