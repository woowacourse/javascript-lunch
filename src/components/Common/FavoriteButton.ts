const FavoriteButton = (favorite: boolean) => {
  return /*html*/ `
  <img src=${favorite ? './favorite-icon-filled.svg' : './favorite-icon-lined.svg'} alt="사진" class="favorite-button" />
  `;
};

export default FavoriteButton;
