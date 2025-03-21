function resetTabEventListeners() {
  try {
    const $restaurantHeader = document.querySelector(".restaurant-header");
    if (!$restaurantHeader) return;

    import("../components/RestaurantTabs.js")
      .then((module) => {
        module.default($restaurantHeader);
      })
      .catch((err) => {
        console.error("탭 이벤트 리스너 재설정 중 오류 발생:", err);
      });
  } catch (error) {
    console.error("탭 이벤트 리스너 재설정 중 오류 발생:", error);
  }
}

export default function removeModal() {
  const $modal = document.querySelector(".modal");
  if (!$modal) return;

  $modal.remove();
  resetTabEventListeners();
}
