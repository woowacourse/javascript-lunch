import type RestaurantList from "../../model/RestaurantList";
import createRestaurantDescription from "../../components/restaurant/restaurantDescription";

export default function handleDescriptionModalToggle(
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

  if (isClosingConditionMet(target)) {
    closeModal(modal);
    return;
  }

  const restaurantElement = target.closest(".restaurant");
  if (restaurantElement) {
    openModal(modal, container, restaurantElement, restaurantList);
  }
}

function isClosingConditionMet(target: HTMLElement): boolean {
  const closeButton = document.querySelector("#close-button");
  const isCloseButton = target === closeButton;
  const isBackdrop = !!target.closest(".modal-backdrop");
  const isInsideModal = !!target.closest(".description-modal");

  return isCloseButton || isBackdrop || (isInsideModal && !isBackdrop);
}

function closeModal(modal: HTMLDialogElement): void {
  modal.close();
}

function openModal(
  modal: HTMLDialogElement,
  container: HTMLElement,
  restaurantElement: Element,
  restaurantList: RestaurantList
): void {
  if (restaurantElement.classList.contains("restaurant-list")) return;

  updateModalContent(container, restaurantElement, restaurantList);
  modal.show();
}

function updateModalContent(
  container: HTMLElement,
  restaurantElement: Element,
  restaurantList: RestaurantList
): void {
  container.innerHTML = "";
  const name =
    restaurantElement.querySelector(".restaurant__name")?.textContent || "";
  const descriptionDiv = createRestaurantDescription(
    restaurantList.searchRestaurant(name)
  );
  container.appendChild(descriptionDiv);
}
