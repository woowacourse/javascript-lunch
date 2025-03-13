import createElement from "../../utils/createElement/createElement";
import Image from "../common/Image";

const FavoriteIcon = (restaurant) =>
  createElement({
    tagName: "div",
    classNames: ["restaurant__favorite"],
    children: [
      Image({
        src: restaurant.value.isFavorite
          ? "./public/favorite-icon-filled.png"
          : "./public/favorite-icon-lined.png",
        alt: "favorite-icon",
        classNames: ["favorite-icon"],
      }),
    ],
    events: {
      click: (e) => {
        restaurant.toggleFavorite();
        e.target.src = restaurant.value.isFavorite
          ? "./public/favorite-icon-filled.png"
          : "./public/favorite-icon-lined.png";
        if (!restaurant.value.isFavorite) {
          e.target.closest(".restaurant").remove();
        }
      },
    },
  });

export default FavoriteIcon;
