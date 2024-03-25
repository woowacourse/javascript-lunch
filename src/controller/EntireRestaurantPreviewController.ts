import FilterContainerController from "./FilterContainerController";
import RestaurantListProxy from "../domain/RestaurantListProxy";
import RestaurantPreviewWithToggler from "../view/components/RestaurantInfo/RestaurantPreviewWithToggler";

class EntireRestaurantPreviewController {
  #filterContainerController = new FilterContainerController();
  #ul = this.#createUl();

  #modalOpener;

  element = document.createElement("section");

  constructor(modalOpener: (preview: RestaurantPreviewWithToggler) => void) {
    this.element.append(this.#filterContainerController.element, this.#ul);
    this.#modalOpener = modalOpener;
    this.#filterContainerController.setOnChange(this.render.bind(this));
  }

  render() {
    const filteredRestaurants = this.#getFilteredRestaurant();
    const restaurantItemElements = filteredRestaurants.map((restaurant) => {
      return this.#getRestaurantPreviewWithToggler(restaurant).element;
    });

    this.#ul?.replaceChildren(...restaurantItemElements);
  }

  reveal() {
    this.element?.classList.remove("display-none");
    this.#filterContainerController.reveal();
  }

  hide() {
    this.element?.classList.add("display-none");
  }

  #createUl() {
    const ul = document.createElement("ul");
    ul.classList.add("restaurant-list-container");

    return ul;
  }

  #getFilteredRestaurant() {
    const { category, sortStandard } =
      this.#filterContainerController.getValue();

    return RestaurantListProxy.getOrderedEntireRestaurants(
      category as Category,
      sortStandard as SortStandard
    );
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

export default EntireRestaurantPreviewController;
