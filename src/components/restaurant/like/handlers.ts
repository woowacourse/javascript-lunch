import RestaurantCRUD from "../../../domain/RestaurantCRUD";
import replaceLikeImg from "../../../utils/replaceLikeImg";

const updateLikeState = (restaurantElement: Element) => {
  const likeButtonImage = restaurantElement.querySelector(
    ".restaurant__like-button img",
  );
  if (likeButtonImage) replaceLikeImg(restaurantElement, likeButtonImage);
};

const likeButtonClickHandler = (button: Element) => {
  button.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const restaurantElement = target.closest(".restaurant") as HTMLElement;
    RestaurantCRUD.updateRestaurant(Number(restaurantElement.id));
    updateLikeState(button);
  });
};

const addLikeEvent = () => {
  const likeButtons = document.querySelectorAll(".restaurant__like-button");
  likeButtons.forEach((button) => {
    likeButtonClickHandler(button);
  });
};

export default addLikeChangeEvent;
