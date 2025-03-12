function createFavoriteStar(fieldName) {
  const favoriteStar = `<img src="${fieldName.inactiveSrc}" class="${fieldName.className}">`
  return favoriteStar
}

export default createFavoriteStar;
