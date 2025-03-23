import RestaurantList from "../domain/RestaurantList.ts";

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

    const restaurantName = starElement.dataset.name || "";
    const restaurant = restaurantList.getRestaurantByName(restaurantName);

    const starElements = mainElement.querySelectorAll(`.favorite-star[data-name="${restaurantName}"]`);
    starElements.forEach((element) => element.classList.toggle("active"));

    if (restaurant) {
      restaurant.toggleFavorite();
      restaurantList.updateLocalStorage();
      updateFavoriteListView();
    }
  });
}

export default favoriteEventHandler;
