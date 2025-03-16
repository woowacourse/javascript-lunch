import { NavBarKey } from "../../../types/types.js";
import {
  EVENT_TYPES,
  NAV_BAR_KEYS,
  NAV_BAR_OPTIONS,
} from "../../constants/constants.js";
import "./restaurantNavBar.css";

const activeTabStyle = "active-tab-menu";

type TabChangeCallback = (tabType: NavBarKey) => void;

interface RestaurantNavBarProps {
  onTabChange: TabChangeCallback;
}

export default class RestaurantNavBar {
  private onTabChange: TabChangeCallback;
  private currentTabType: NavBarKey;

  constructor({ onTabChange }: RestaurantNavBarProps) {
    this.onTabChange = onTabChange;
    this.currentTabType = NAV_BAR_KEYS.all;
  }

  render() {
    const $navBar = document.createElement("nav");
    const $navList = document.createElement("ul");
    $navList.className = "restaurant-tab-menu";

    const $allItem = document.createElement("li");
    const $allButton = document.createElement("button");
    $allButton.className = `restaurant-${NAV_BAR_KEYS.all}-menu text-subtitle ${activeTabStyle}`;
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
      $button.addEventListener(EVENT_TYPES.click, (e: MouseEvent) => {
        if (e.target instanceof HTMLButtonElement) {
          this.currentTabType = e.target.value as NavBarKey;
        }

        $navList.querySelectorAll("button").forEach((button) => {
          button.classList.toggle(
            activeTabStyle,
            button.value === this.currentTabType
          );
        });

        if (this.onTabChange) {
          this.onTabChange(this.currentTabType);
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

  getCurrentTabType() {
    return this.currentTabType;
  }
}
