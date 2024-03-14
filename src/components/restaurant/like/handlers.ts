import RestaurantCRUD from "../../../domain/RestaurantCRUD";

const likeButtonClickHandler = (button: Element) => {
  button.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const restaurantElement = target.closest(".restaurant") as HTMLElement;
    RestaurantCRUD.updateRestaurant(Number(restaurantElement.id));
  });
};

const likeChange = () => {
  const likeButtons = document.querySelectorAll(".restaurant__like-button");
  likeButtons.forEach((button) => {
    likeButtonClickHandler(button);
  });
};

export default likeChange;
