import FilteringController from './FilteringController';

const RestaurantListContainerController = {
  private_injectChildToListContainer(tag: string) {
    const $restaurantListContainer = document.querySelector(
      '.restaurant-list-container',
    );

    if ($restaurantListContainer) {
      $restaurantListContainer.firstChild?.remove();
      $restaurantListContainer.innerHTML = `<${tag}></${tag}>`;
    }
  },

  injectAllRestaurantList() {
    this.private_injectChildToListContainer('all-restaurant-list');

    FilteringController.showFilteredSortedList();
  },

  injectFavoriteRestaurantList() {
    this.private_injectChildToListContainer('favorite-restaurant-list');

    FilteringController.showFilteredSortedList();
  },
};

export default RestaurantListContainerController;
