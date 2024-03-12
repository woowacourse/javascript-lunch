import restaurantListStateStore from "../../../store/RestaurantListStateStore";

export function handleLikeButtonClick(button: Element) {
  button.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement) {
      const restaurantElement = event.target.closest(
        ".restaurant",
      ) as HTMLElement;
      restaurantListStateStore.updateListData(Number(restaurantElement.id));
    }
  });
}

export const likeChange = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const likeButtons = document.querySelectorAll(".like__button");

    likeButtons.forEach((button) => {
      handleLikeButtonClick(button);
    });
  });
};
