import CustomButton from "../shared/CustomButton.js";
import RestaurantItem from "./RestaurantItem.js";

export function AddDetailModal(container, selectedRestaurant) {
  const deleteButton = CustomButton(
    "delete--restaurant",
    "button--secondary",
    "삭제하기",
  );
  const cancelButton = CustomButton("close--modal", "button--primary", "닫기");

  container.innerHTML += /* html */ `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${RestaurantItem(selectedRestaurant, true)}
            <div class="button-container">
              ${deleteButton}
              ${cancelButton}
            </div>
        </div>
      </div>
    `;
}
