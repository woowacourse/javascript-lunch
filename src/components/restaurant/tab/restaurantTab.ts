import { getElement } from "../../../utils/dom";
import createButton from "../../button/button";
import {
  toggleFavoriteRenderMode,
  getFavoriteRenderMode,
} from "../list/restaurantList";

function restaurantTabRenderer() {
  function toggleRestaurantTab() {
    toggleFavoriteRenderMode();
    const toggleClassName = "select-tab-button";
    getElement(".all-restaurant-tab").classList.toggle(toggleClassName);
    getElement(".favorite-restaurant-tab").classList.toggle(toggleClassName);

    const selectEffect = getElement(".select-effect");
    if (getFavoriteRenderMode()) {
      selectEffect.classList.add("select-favorite-restaurant-tab");
      selectEffect.classList.remove("select-all-restaurant-tab");
      return;
    }

    selectEffect.classList.add("select-all-restaurant-tab");
    selectEffect.classList.remove("select-favorite-restaurant-tab");
  }

  function createRestaurantTab() {
    const allRestaurantTab = createButton({
      type: "button",
      textContent: "모든 음식점",
      className: ["tab-button", "select-tab-button", "all-restaurant-tab"],
      onclick: toggleRestaurantTab,
    });
    const favoriteRestaurantTab = createButton({
      type: "button",
      textContent: "자주가는 음식점",
      className: ["tab-button", "favorite-restaurant-tab"],
      onclick: toggleRestaurantTab,
    });
    const selectEffect = createElement("p", {
      className: "select-effect",
    });

    return createElementsFragment([
      allRestaurantTab,
      favoriteRestaurantTab,
      selectEffect,
    ]);
  }

  function renderRestaurantTab() {
    const restaurantTabContainer = getElement(".restaurant-tab-container");
    restaurantTabContainer.appendChild(createRestaurantTab());
  }

  return { renderRestaurantTab };
}

export const { renderRestaurantTab } = restaurantTabRenderer();

export default restaurantTabRenderer;
