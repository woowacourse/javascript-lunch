import { NAV_BAR_KEYS, NAV_BAR_OPTIONS } from "../../constants/constants.js";
import "./restaurantNavBar.css";

export default class RestaurantNavBar {
  constructor() {}

  render() {
    const $navBar = document.createElement("nav");
    const $navList = document.createElement("ul");
    $navList.className = "restaurant-tab-menu";
    $navBar.append($navList);

    const $allItem = document.createElement("li");
    const $allButton = document.createElement("button");
    $allButton.className = `restaurant-${NAV_BAR_KEYS.all}-menu text-subtitle active-tab-menu`;
    $allButton.value = NAV_BAR_KEYS.all;
    $allButton.type = "button";
    $allButton.textContent = NAV_BAR_OPTIONS[NAV_BAR_KEYS.all];

    $allItem.append($allButton);
    $navList.append($allItem);

    const $favoriteItem = document.createElement("li");
    const $favoriteButton = document.createElement("button");
    $favoriteButton.className = `restaurant-${NAV_BAR_KEYS.favorite}-menu text-subtitle`;
    $favoriteButton.value = NAV_BAR_KEYS.favorite;
    $favoriteButton.type = "button";
    $favoriteButton.textContent = NAV_BAR_OPTIONS[NAV_BAR_KEYS.favorite];

    $favoriteItem.append($favoriteButton);
    $navList.append($favoriteItem);

    return $navBar;
  }
}
