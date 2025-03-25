import TabButton from "./TabButton.ts";
import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";

function Tab(restaurantList) {
  const $el = toElement(`
        <div class="tab--button-container"/>`);
  append($el, TabButton("totalTab"), TabButton("favoriteTab"));
  $("body").prepend($el);

  const $leftButton = document.getElementById("button_모든 음식점");
  const $rightButton = document.getElementById("button_자주 가는 음식점");

  $leftButton?.classList.add("focus");

  $rightButton?.addEventListener("click", () => {
    $leftButton?.classList.remove("focus");
    $rightButton?.classList.add("focus");
    restaurantList.toggleTotalTab();
    restaurantList.render();
  });
  $leftButton?.addEventListener("click", () => {
    $leftButton?.classList.add("focus");
    $rightButton?.classList.remove("focus");
    restaurantList.toggleTotalTab();
    restaurantList.render();
  });
}

export default Tab;
