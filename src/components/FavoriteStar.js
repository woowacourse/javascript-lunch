function createFavoriteStar(fieldName) {
  const dataIdAttr = fieldName.dataId ? `data-id="${fieldName.dataId}"` : '';
  const favoriteStar = `<img src="${fieldName.inactiveSrc}" class="${fieldName.className}" ${dataIdAttr}>`;
  return favoriteStar;
}

export default createFavoriteStar;
