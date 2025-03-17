export const getStarIconSrc = (isFavorite) => {
  return isFavorite ? "/favorite-icon-filled.png" : "favorite-icon-lined.png";
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
