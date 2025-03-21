import createElement from "../../../util/createElement.js";
import restaurantDataList from "../../../domain/RestaurantList.ts";
import restaurantUI from "../../../domain/RestaurantUI.ts";
import { removeModal } from "../Modal";

export default function RestaurantDetailModalButtonContainer(id) {
  const $buttonContainer = createElement({
    tag: "div",
    classNames: ["restaurantDetail__buttonWrap"],
  });
  const $deleteButton = createElement({
    tag: "button",
    classNames: ["restaurantDetail__button", "restaurantDetail_delete"],
    textContent: "삭제하기",
  });
  const $closeButton = createElement({
    tag: "button",
    classNames: ["restaurantDetail__button", "restaurantDetail_close"],
    textContent: "닫기",
  });

  $deleteButton.addEventListener("click", () => {
    removeModal();

    restaurantDataList.removeRestaurant(id);
    restaurantUI.renderRestaurantList();
  });

  $closeButton.addEventListener("click", removeModal);

  $buttonContainer.appendChild($deleteButton);
  $buttonContainer.appendChild($closeButton);

  return $buttonContainer;
}
