import { controlFavoriteIcon } from "../domain/favoriteIconController";
import { updateRestaurants } from "../domain/filter";
import { tabButtonType } from "../type";
import { executeEventListener } from "../util/eventListener";
import { $, $$ } from "../util/selector";

// UI
const renderTemplate = (buttonList: tabButtonType) => {
  return `<button
      id="tab-button${buttonList.key}"
      class="text-body viewer-button ${buttonList.state ? "active" : ""}"
    >
      ${buttonList.name}
    </button>`;
};

const tabButtons = [
  { key: 0, name: "모든 음식점", state: true },
  { key: 0, name: "즐겨찾는 음식점", state: false },
];

const combineAllRestaurants = (tabButtons: tabButtonType[]) => {
  return tabButtons
    .map((button, index) => {
      button.key = index + 1;
      return renderTemplate(button);
    })
    .join("");
};

export const renderTabButtons = () => {
  const tabButtonElement = $("#restaurant-list-viewer");
  tabButtonElement?.insertAdjacentHTML(
    "beforeend",
    combineAllRestaurants(tabButtons)
  );

  changeButtonState();
};

// Domain
const changeButtonState = () => {
  $$(".viewer-button").forEach((button) => {
    executeEventListener(button, {
      type: "click",
      listener: (event) => activeButton(event),
    });
  });
};

const activeButton = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  const buttons = target.closest("#restaurant-list-viewer")?.children;
  const CLICKED_BUTTON = "active";

  [...buttons!].forEach((button) => button.classList.remove(CLICKED_BUTTON));

  if (target.classList.contains(CLICKED_BUTTON)) return;
  target.classList.toggle(CLICKED_BUTTON);

  updateRestaurants();
  controlFavoriteIcon();
};
