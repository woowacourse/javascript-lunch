import { setupAddRestaurantModal } from "../handlers/modalHandler.ts";

export function initializeModalButton() {
  const $modalButton = document.getElementById("gnb-button");
  const $appContainer = document.getElementById("app");

  if (!$appContainer) {
    console.warn("앱 컨테이너를 DOM에서 찾을 수 없습니다.");
    return;
  }

  if ($modalButton) {
    $modalButton.addEventListener("click", () => {
      setupAddRestaurantModal($appContainer);
    });
  } else {
    console.warn("모달 버튼을 DOM에서 찾을 수 없습니다.");
  }
}
