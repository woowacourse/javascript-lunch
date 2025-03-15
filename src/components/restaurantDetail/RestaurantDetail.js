import RestaurantListItem from "../restaurantListSection/restaurantListItem/RestaurantListItem.js";
import Button from "../common/button/Button.js";
import { BUTTON_TEXTS, BUTTON_TYPES } from "../../constants/constants.js";
import "./restaurantDetail.css";

export default class RestaurantDetail {
  #restaurant;
  #updateList;
  #toggleModal;

  constructor(restaurant, updateList, toggleModal) {
    this.#restaurant = restaurant;
    this.#updateList = updateList;
    this.#toggleModal = toggleModal;
  }

  render() {
    const $div = document.createElement("div");
    const $link = document.createElement("a");
    const $text = document.createElement("p");

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";

    const $deleteButton = new Button({
      text: BUTTON_TEXTS.delete,
      action: BUTTON_TYPES.delete,
    }).render();
    const $closeButton = new Button({
      text: BUTTON_TEXTS.close,
      action: BUTTON_TYPES.close,
    }).render();

    const $item = new RestaurantListItem(
      this.#restaurant,
      [], // 레스토랑 리스트
      this.#updateList
    ).render();
    $item.classList.add("restaurant-detail");

    $div.appendChild($item);

    const link = this.#restaurant.link;

    if (link !== "") {
      $link.setAttribute("href", link);
      $link.textContent = link;
      $div.appendChild($link);
    }

    if (link === "") {
      $text.textContent = "주소가 없습니다.";
      $div.appendChild($text);
    }

    $buttonContainer.appendChild($deleteButton);
    $buttonContainer.appendChild($closeButton);
    $div.appendChild($buttonContainer);

    $deleteButton.addEventListener("click", () => {});

    $closeButton.addEventListener("click", this.#toggleModal);
    return $div;
  }
}
