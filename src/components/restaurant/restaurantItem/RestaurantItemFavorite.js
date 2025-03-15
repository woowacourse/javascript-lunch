import createElement from "../../../util/createElement";
import restaurantDataList from "../../../domain/RestaurantDataList.ts";

export default function RestaurantItemFavorite({ isFavorite, id }) {
  const $favoriteWrap = createElement({
    tag: "div",
  });
  const $favorite = createElement({
    tag: "img",
    name: "favorite__star",
    classNames: ["favorite__star"],
    src: isFavorite ? "/public/fill-star.png" : "/public/empty-star.png",
    alt: isFavorite ? "좋아요한 별" : "좋아요안한 별",
  });
  $favoriteWrap.appendChild($favorite);

  $favorite.addEventListener("click", () => {
    restaurantDataList.changeFavorite(id);

    const dataById = restaurantDataList.getDataById(id);
    $favorite.src = dataById.isFavorite
      ? "/public/fill-star.png"
      : "/public/empty-star.png";
  });

  return $favoriteWrap;
}
