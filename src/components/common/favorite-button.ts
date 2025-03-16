export interface FavoriteImageElement extends HTMLImageElement {
  isFavorite: boolean;
}

type FavoriteButtonProps = {
  isFavorite: boolean;
  className?: string[];
};

const $favoriteButton = ({
  isFavorite,
  className = [],
}: FavoriteButtonProps): FavoriteImageElement => {
  const favoriteButton = document.createElement("img") as FavoriteImageElement;
  favoriteButton.classList.add(...className);
  if (isFavorite) favoriteButton.src = "images/star-filled.png";
  else favoriteButton.src = "images/star-outline.png";

  return favoriteButton;
};

export default $favoriteButton;
