import FavoriteToggler from "../FavoriteToggler/FavoriteToggler";
import RestaurantPreview from "./RestaurantPreview/RestaurantPreview";

class RestaurantPreviewWithToggler extends RestaurantPreview {
  #favoriteToggler: FavoriteToggler;
  constructor({
    restaurant,
    eventListenerArgs = [],
    isTogglerOn = false,
    toggleOnFunc = () => {},
    toggleOffFunc = () => {},
    afterToggleFunc = () => {},
  }: {
    restaurant: Restaurant;
    eventListenerArgs?: EventListenerArg[];
    isTogglerOn?: boolean;
    toggleOnFunc?: (...any: any[]) => any;
    toggleOffFunc?: (...any: any[]) => any;
    afterToggleFunc?: (...any: any[]) => any;
  }) {
    super({ restaurant, eventListenerArgs });
    const favoriteToggler = new FavoriteToggler({
      isOn: isTogglerOn,
      toggleAction: function () {
        const name = restaurant.name;
        if (favoriteToggler.isOn()) toggleOnFunc(name);
        else toggleOffFunc(name);
        afterToggleFunc();
      },
    });

    this.#favoriteToggler = favoriteToggler;
    this.element.append(this.#favoriteToggler.element);
  }

  toggle() {
    this.#favoriteToggler.toggle();
  }
}

export default RestaurantPreviewWithToggler;
