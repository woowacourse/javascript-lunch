import RestaurantList from "../domain/RestaurantList.ts";
import createFavoriteListView from "../view/createFavoriteListView.js";

class FavoriteListController {
  favoriteListElement;
  updateFavoriteListView;

  constructor(restaurantList: RestaurantList) {
    const { favoriteListElement, updateFavoriteListView } = createFavoriteListView(restaurantList);
    this.favoriteListElement = favoriteListElement;
    this.updateFavoriteListView = updateFavoriteListView;
  }

  getFavoriteListElement(): HTMLElement {
    return this.favoriteListElement;
  }

  updateFavoriteList(): void {
    this.updateFavoriteListView();
  }

  render(container: HTMLElement) {
    container.appendChild(this.favoriteListElement);
  }
}

export default FavoriteListController;
