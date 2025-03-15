import CustomButton from "../shared/CustomButton.js";
import RestaurantItem from "./RestaurantItem.js";
import { initialRestaurants } from "../data/initialRestaurants.js";

export function AddDetailModal(container) {
  const cancelButton = CustomButton(
    "close-modal",
    "button--secondary",
    "취소하기",
  );
  const submitButton = CustomButton("", "button--primary", "추가하기");

  container.innerHTML += /* html */ `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${RestaurantItem(initialRestaurants[0], true)}
            <div class="button-container">
              ${cancelButton}
              ${submitButton}
            </div>
        </div>
      </div>
    `;
}
