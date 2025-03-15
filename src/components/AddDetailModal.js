import CustomButton from "../shared/CustomButton.js";
import RestaurantItem from "./RestaurantItem.js";


export function AddDetailModal(container, selectedRestaurant) {
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
          ${RestaurantItem(selectedRestaurant, true)}
            <div class="button-container">
              ${cancelButton}
              ${submitButton}
            </div>
        </div>
      </div>
    `;
}
