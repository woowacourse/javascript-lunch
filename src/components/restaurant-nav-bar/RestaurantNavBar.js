import {
  EVENT_TYPES,
  NAV_BAR_KEYS,
  NAV_BAR_OPTIONS,
} from "../../constants/constants.js";
import "./restaurantNavBar.css";

export default class RestaurantNavBar {
  constructor({ onFilterChange }) {
    this.onFilterChange = onFilterChange;
    this.currnentFilterType = NAV_BAR_KEYS.all;
  }

  render() {
    const $navBar = document.createElement("nav");
    const $navList = document.createElement("ul");
    $navList.className = "restaurant-tab-menu";

    const $allItem = document.createElement("li");
    const $allButton = document.createElement("button");
    $allButton.className = `restaurant-${NAV_BAR_KEYS.all}-menu text-subtitle active-tab-menu`;
    $allButton.value = NAV_BAR_KEYS.all;
    $allButton.type = "button";
    $allButton.textContent = NAV_BAR_OPTIONS[NAV_BAR_KEYS.all];

    const $favoriteItem = document.createElement("li");
    const $favoriteButton = document.createElement("button");
    $favoriteButton.className = `restaurant-${NAV_BAR_KEYS.favorite}-menu text-subtitle`;
    $favoriteButton.value = NAV_BAR_KEYS.favorite;
    $favoriteButton.type = "button";
    $favoriteButton.textContent = NAV_BAR_OPTIONS[NAV_BAR_KEYS.favorite];

    [$allButton, $favoriteButton].forEach(($button) => {
      $button.addEventListener(EVENT_TYPES.click, (e) => {
        this.currnentFilterType = e.target.value;

        $navList.querySelectorAll("button").forEach((button) => {
          button.classList.toggle(
            "active-tab-menu",
            button.value === this.currnentFilterType
          );
        });

        if (this.onFilterChange) {
          this.onFilterChange(this.currnentFilterType);
        }
      });
    });

    $allItem.append($allButton);
    $navList.append($allItem);
    $favoriteItem.append($favoriteButton);
    $navList.append($favoriteItem);
    $navBar.append($navList);

    return $navBar;
  }

  getCurrentFilterType() {
    return this.currnentFilterType;
  }
}
