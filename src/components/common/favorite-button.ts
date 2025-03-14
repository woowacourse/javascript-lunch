type FavoriteButtonProps = {
  isFavorite: boolean;
  className?: string[];
};

const $favoriteButton = ({
  isFavorite,
  className = [],
}: FavoriteButtonProps): HTMLImageElement => {
  const favoriteButton = document.createElement("img");
  favoriteButton.classList.add(...className);
  if (isFavorite) favoriteButton.src = "images/star-filled.png";
  else favoriteButton.src = "images/star-outline.png";

  return favoriteButton;
};

export default $favoriteButton;
