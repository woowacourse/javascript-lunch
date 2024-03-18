import FAVORITES from "../../../../templates/favorite-icon-filled.png";
import NOT_FAVORITES from "../../../../templates/favorite-icon-lined.png";
import createElementByTag from "../../utils/createElementByTag";
import generateButton from "./generateButton";
import { patchRestaurantFavorites } from "../../../domain/AllRestaurantList";

interface FavoritesButtonProps {
  isFavorites: boolean;
  restaurantName: string;
  onClickHandler?: (e: Event) => void;
}

const generateFavoriteButton = ({
  isFavorites,
  restaurantName,
  onClickHandler = () => {},
}: FavoritesButtonProps) => {
  const favoriteButton = generateButton({
    value: "",
    classes: ["button--favorites"],
    onClickHandler: (e) => {
      handleFavorite(e);
      onClickHandler(e);
    },
  });

  const favoriteImage = getFavoriteImage(isFavorites, restaurantName);

  favoriteButton.appendChild(favoriteImage);

  return favoriteButton;
};

const getFavoriteImage = (isFavorites: boolean, restaurantName: string) => {
  return createElementByTag({
    tag: "img",
    attribute: {
      src: isFavorites ? FAVORITES : NOT_FAVORITES,
      restaurantName: restaurantName,
    },
  });
};

const handleFavorite = (e: Event) => {
  if (!(e.target instanceof HTMLElement)) {
    throw new Error(
      "[ERROR_IN_handleFavorite()] EventTarget is not HTMLElement"
    );
  }

  toggleFavoriteButtonImage(e.target);
  patchRestaurantFavorites(e.target.getAttribute("restaurantName")!);
};

const toggleFavoriteButtonImage = (eventTarget: HTMLElement) => {
  const currentImageSrc = eventTarget.getAttribute("src");

  if (currentImageSrc) {
    const newSrc = currentImageSrc === FAVORITES ? NOT_FAVORITES : FAVORITES;
    eventTarget.setAttribute("src", newSrc);
  }
};

export default generateFavoriteButton;
