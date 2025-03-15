import storage from "../../domain/storage";
import renderFavoritePage from "../../ui/renderFavoritePage";
import createElement from "../../utils/createElement/createElement";
import Image from "../common/Image";

const FavoriteIcon = (restaurant, clickFavorite) =>
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
        e.stopPropagation();
        restaurant.toggleFavorite();
        e.target.src = restaurant.value.isFavorite
          ? "./public/favorite-icon-filled.png"
          : "./public/favorite-icon-lined.png";
        clickFavorite && clickFavorite(restaurant);
      },
    },
  });

export default FavoriteIcon;
