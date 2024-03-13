import restaurantListStateStore from "../../../store/RestaurantListStateStore";

const likeButtonClickHandler = (button: Element) => {
  button.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const restaurantElement = target.closest(".restaurant") as HTMLElement;
    restaurantListStateStore.updateListData(Number(restaurantElement.id));
  });
};

const likeChange = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const likeButtons = document.querySelectorAll(".like__button");
    likeButtons.forEach((button) => {
      likeButtonClickHandler(button);
    });
  });
};

export default likeChange;
