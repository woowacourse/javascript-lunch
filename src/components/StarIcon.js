const StarIcon = (isFavorite) => {
  const iconContainer = document.createElement("button");
  iconContainer.classList.add("star-icon-container");
  const starIcon = document.createElement("img");
  starIcon.src = isFavorite
    ? "/public/favorite-icon-filled.png"
    : "/public/favorite-icon-lined.png";
  iconContainer.appendChild(starIcon);
  return iconContainer;
};

export default StarIcon;
