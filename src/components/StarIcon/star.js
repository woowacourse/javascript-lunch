export const clickStar = (isFavorite) => {
  const imgSrc = isFavorite ? "images/star.png" : "images/empty-star.png";

  return `<img src="${imgSrc}" class="star-icon">`;
};
