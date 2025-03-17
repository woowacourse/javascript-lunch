export const getStarIconSrc = (isFavorite) => {
  return isFavorite
    ? "public/favorite-icon-filled.png"
    : "public/favorite-icon-lined.png";
};

const StarIcon = (isFavorite) => {
  const iconSrc = getStarIconSrc(isFavorite);

  return /*html*/ `
    <button class="star-icon-container">
      <img src="${iconSrc}" alt="star" class="star-icon" />
    </button>
  `;
};

export default StarIcon;
