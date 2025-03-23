function createFavoriteStar(fieldName) {
  const dataIdAttr = fieldName.dataId ? `data-id="${fieldName.dataId}"` : '';
  const favoriteStar = `<img src="${fieldName.inactiveSrc}" class="${fieldName.className}" ${dataIdAttr} alt="자주 가는 음식점 아이콘">`;
  return favoriteStar;
}

export default createFavoriteStar;
