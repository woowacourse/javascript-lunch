import createElement from "../../../util/createElement";
import restaurantDataList from "../../../domain/RestaurantList.ts";
import CLASS_NAME from "../../../constants/className.js";

export default function RestaurantItemFavorite({ isFavorite, id }) {
  const $favoriteWrap = createElement({
    tag: "div",
  });
  const $favorite = createElement({
    tag: "img",
    name: CLASS_NAME.favoriteIcon,
    classNames: [CLASS_NAME.favoriteIcon],
    src: isFavorite ? "./fill-star.png" : "./empty-star.png",
    alt: isFavorite ? "좋아요한 별" : "좋아요안한 별",
  });
  $favoriteWrap.appendChild($favorite);

  $favorite.addEventListener("click", () => {
    restaurantDataList.toggleFavorite(id);

    const dataById = restaurantDataList.getRestaurantById(id);
    $favorite.src = dataById.isFavorite
      ? "./fill-star.png"
      : "./empty-star.png";
  });

  return $favoriteWrap;
}
