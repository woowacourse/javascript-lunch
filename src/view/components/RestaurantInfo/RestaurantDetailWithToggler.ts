import FavoriteToggler from "../FavoriteToggler/FavoriteToggler";
import RestaurantDetail from "./RestaurantDetail/RestaurantDetail";

class RestaurantDetailWithToggler extends RestaurantDetail {
  #favoriteToggler: FavoriteToggler;

  constructor({
    restaurant,
    isTogglerOn = false,
    toggleOnFunc = () => {},
    toggleOffFunc = () => {},
    afterToggleFunc = () => {},
  }: {
    restaurant: Restaurant;
    eventListenerArgs?: EventListenerArg[];
    isTogglerOn?: boolean;
    toggleOnFunc?: (...any: any[]) => any | void;
    toggleOffFunc?: (...any: any[]) => any | void;
    afterToggleFunc?: (...any: any[]) => any | void;
  }) {
    super();
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

  setDetail(restaurant: Restaurant): void {
    super.setDetail(restaurant);
  }

  setToggler() {}

  toggle() {
    this.#favoriteToggler.toggle();
  }
}

export default RestaurantDetailWithToggler;
