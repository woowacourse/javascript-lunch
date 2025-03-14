import type RestaurantList from "../model/RestaurantList";
import createRestaurantDescription from "../components/restaurant/restaurantDescription";
export function handleFormModalToggle(
  event: MouseEvent,
  modal: HTMLDialogElement
) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (target.closest(".restaurant-add-button")) {
    modal.show();
  }

  if (target.closest(".modal-backdrop")) {
    modal.close();
  }
}

export function handleDescriptionModalToggle(
  event: MouseEvent,
  restaurantList: RestaurantList,
  {
    modal,
    container,
  }: {
    modal: HTMLDialogElement;
    container: HTMLElement;
  }
) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (target.classList.contains("favorite-icon")) return;
  const closeButton = document.querySelector("#close-button");
  const isCloseButton = target === closeButton;
  const isBackdrop = !!target.closest(".modal-backdrop");
  const isInsideModal = !!target.closest(".description-modal");
  const restaurantElement = target.closest(".restaurant");

  if (isCloseButton || isBackdrop) {
    modal.close();
    return;
  }

  if (isInsideModal && !isBackdrop && !restaurantElement) {
    return;
  }

  if (restaurantElement) {
    if (target.classList.contains("restaurant-list")) return;

    container.innerHTML = "";
    const name =
      restaurantElement.querySelector(".restaurant__name")?.textContent || "";
    const descriptionDiv = createRestaurantDescription(
      restaurantList.searchRestaurant(name)
    );
    container.appendChild(descriptionDiv);
    modal.showModal();
  }
}
