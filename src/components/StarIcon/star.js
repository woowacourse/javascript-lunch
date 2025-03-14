export const clickStar = (isFavorite) => {
  const imgSrc = isFavorite
    ? "public/images/star.png"
    : "public/images/empty-star.png";

  return `<img src="${imgSrc}" class="star-icon">`;
};
