import createRestaurantDescription from "../components/restaurant/restaurantDescription";

export function handleFormModalToggle(event) {
  const modal = document.querySelector(".form-modal");

  if (event.target.closest(".restaurant-add-button")) {
    modal.show();
  }

  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}
export function handleDescriptionModalToggle(event, restaurantList) {
  const modal = document.querySelector(".description-modal");
  const descriptionContainer = document.querySelector(".description");

  // favorite-icon 클릭은 무시
  if (event.target.classList.contains("favorite-icon")) return;
  const closeButton = document.querySelector("#close-button");

  if (event.target === closeButton) {
    modal.close();
    return;
  }
  if (
    event.target.closest(".description-modal") &&
    !event.target.closest(".modal-backdrop")
  ) {
    // 모달 내부(모달 배경 제외) 클릭 시 아무 동작도 하지 않도록 처리
    return;
  }

  descriptionContainer.innerHTML = "";

  // close-button 클릭 시 모달 닫기

  const restaurantElement = event.target.closest(".restaurant");

  if (restaurantElement) {
    if (event.target.classList.contains("restaurant-list")) return;

    const name =
      restaurantElement.querySelector(".restaurant__name").textContent;
    const descriptionDiv = createRestaurantDescription(
      restaurantList.searchRestaurant(name)
    );
    descriptionContainer.appendChild(descriptionDiv);
    modal.showModal();
    return;
  }

  if (event.target.closest(".modal-backdrop")) {
    modal.close();
  }
}
