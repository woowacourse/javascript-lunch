import CustomButton from "../shared/CustomButton.js";

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
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            <div class="button-container">
              ${cancelButton}
              ${submitButton}
            </div>
          </form>
        </div>
      </div>
    `;
}
