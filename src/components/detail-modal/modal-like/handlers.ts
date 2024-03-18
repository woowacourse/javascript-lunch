import RestaurantCRUD from "../../../domain/RestaurantCRUD";

const updateState = (restaurantElement: Element, likeButton: Element) => {
  RestaurantCRUD.updateLikeState(
    restaurantElement,
    ".restaurant__like-button img",
  );
  RestaurantCRUD.updateLikeState(likeButton, ".modal__like-button img");
};

const clickLikeHandler = (restaurantElement: HTMLElement) => {
  const likeButton = document.getElementsByClassName("modal__like-button")[0];
  likeButton.addEventListener("click", () => {
    RestaurantCRUD.updateRestaurant(Number(restaurantElement.id));
    updateState(
      restaurantElement.getElementsByClassName("restaurant__like-button")[0],
      likeButton,
    );
  });
};

export default clickLikeHandler;
