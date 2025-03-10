export default function removeModal() {
  const $modal = document.querySelector(".modal");
  if ($modal) {
    $modal.remove();
  } else {
    console.warn("제거할 모달을 찾을 수 없습니다.");
  }
}
