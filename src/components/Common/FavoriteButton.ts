const FavoriteButton = (favorite: boolean) => {
  return /*html*/ `
  <img src=${favorite ? './favorite-icon-filled.png' : './favorite-icon-lined.png'} alt="사진" class="favorite-button" />
  `;
};

export default FavoriteButton;
