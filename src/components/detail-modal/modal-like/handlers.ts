import RestaurantCRUD from "../../../domain/RestaurantCRUD";

const clickLikeHandler = (id: string) => {
  const likeButton = document.getElementsByClassName("modal__like-button")[0];

  likeButton.addEventListener("click", () => {
    RestaurantCRUD.updateRestaurant(Number(id));
  });
};

export default clickLikeHandler;
