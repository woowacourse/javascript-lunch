import { updateRestaurantList } from "../domain/filter";
import { executeEventListener } from "../util/eventListener";
import { $, $$ } from "../util/selector";

// UI
const renderTemplate = (buttonNameList: string[]) => {
  return `<button
  id="all-restaurants"
  class="text-body viewer-button clicked-viewer-button"
>
  ${buttonNameList[0]}
</button>
<button id="favorite-restaurant" class="text-body viewer-button">
  ${buttonNameList[1]}
</button>`;
};

export const renderTabButtons = () => {
  const tabButtonElement = $("#restaurant-list-viewer");
  const tabButtonNameList = ["모든 음식점", "즐겨찾는 음식점"];

  tabButtonElement?.insertAdjacentHTML(
    "beforeend",
    renderTemplate(tabButtonNameList)
  );

  changeButtonState();
};

// Domain
const changeButtonState = () => {
  $$(".viewer-button").forEach((button) => {
    executeEventListener(button, {
      type: "click",
      listener: (event) => changeButtonColor(event),
    });
  });
};

const changeButtonColor = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  const nextButton = target.nextElementSibling;
  const previousButton = target.previousElementSibling;
  const CLICKED_BUTTON = "clicked-viewer-button";

  const isClicked =
    nextButton?.classList.contains(CLICKED_BUTTON) ??
    previousButton?.classList.contains(CLICKED_BUTTON);

  if (!target.classList.contains(CLICKED_BUTTON) && isClicked) {
    (nextButton ?? previousButton)?.classList.remove(CLICKED_BUTTON);
    target.classList.toggle(CLICKED_BUTTON);
  }

  updateRestaurantList();
};
