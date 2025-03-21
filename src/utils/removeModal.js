
// 모달 제거 및 관련 이벤트 정리를 위한 함수
export default function removeModal() {
  const $modal = document.querySelector(".modal");
  if ($modal) {
    // 모달 내부의 모든 버튼과 인터랙티브 요소들에서 이벤트 리스너 제거
    const $buttons = $modal.querySelectorAll("button");
    $buttons.forEach((button) => {
      // 버튼의 모든 이벤트 리스너를 복제된 버튼으로 대체해 제거
      const newButton = button.cloneNode(true);
      if (button.parentNode) {
        button.parentNode.replaceChild(newButton, button);
      }
    });

    // 모달 배경에서 이벤트 리스너 제거
    const $backdrop = $modal.querySelector(".modal-backdrop");
    if ($backdrop) {
      const newBackdrop = $backdrop.cloneNode(true);
      $backdrop.parentNode.replaceChild(newBackdrop, $backdrop);
    }

    // 모달 자체 제거
    $modal.remove();

    // 모달이 닫힌 후 탭 이벤트 리스너 재설정 (다음 틱에서 실행)
    setTimeout(() => {
      resetTabEventListeners();
    }, 0);

  } else {
    console.warn("제거할 모달을 찾을 수 없습니다.");
  }
}


// 탭 이벤트 리스너를 재설정하는 함수
function resetTabEventListeners() {
  try {
    // 동적으로 tabHandler.ts의 setupTabEventListeners 함수 가져오기
    import("../handlers/tabHandler.ts")
      .then((module) => {
        if (typeof module.setupTabEventListeners === "function") {
          module.setupTabEventListeners();
        }
      })
      .catch((err) => {
        console.error("탭 이벤트 리스너 재설정 중 오류 발생:", err);
      });
  } catch (error) {
    console.error("탭 이벤트 리스너 재설정 중 오류 발생:", error);
  }
}

