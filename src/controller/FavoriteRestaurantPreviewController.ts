import RestaurantListProxy from "../domain/RestaurantListProxy";
import RestaurantPreviewWithToggler from "../view/components/RestaurantInfo/RestaurantPreviewWithToggler";

class FavoriteRestaurantPreviewController {
  #modalOpener;
  element = this.#createUl();

  constructor(modalOpener: (preview: RestaurantPreviewWithToggler) => void) {
    this.#modalOpener = modalOpener;
  }
  render() {
    const favoriteRestaurants = RestaurantListProxy.getFavoriteRestaurants();
    const restaurantItemElements = favoriteRestaurants.map((restaurant) => {
      return this.#getRestaurantPreviewWithToggler(restaurant).element;
    });

    this.element?.replaceChildren(...restaurantItemElements);
  }

  reveal() {
    this.element?.classList.remove("display-none");
  }

  hide() {
    this.element?.classList.add("display-none");
  }

  #createUl() {
    const ul = document.createElement("ul");
    ul.classList.add("restaurant-list-container");

    return ul;
  }

  #getRestaurantPreviewWithToggler(restaurant: Restaurant) {
    const isTogglerOn = RestaurantListProxy.hasRestaurantInFavoriteRestaurant(
      restaurant.name
    );
    const toggleOnFunc = () =>
      RestaurantListProxy.addToFavoriteRestaurantList(restaurant.name);
    const toggleOffFunc = () =>
      RestaurantListProxy.deleteRestaurantInFavoriteRestaurantList(
        restaurant.name
      );

    const restaurantPreviewWithToggler = new RestaurantPreviewWithToggler({
      restaurant,
      isTogglerOn,
      toggleOnFunc,
      toggleOffFunc,
      afterToggleFunc: this.render.bind(this),
      eventListenerArgs: [
        [
          "click",
          () => {
            this.#modalOpener.bind(this)(restaurantPreviewWithToggler);
          },
        ],
      ],
    });

    return restaurantPreviewWithToggler;
  }
}

export default FavoriteRestaurantPreviewController;
