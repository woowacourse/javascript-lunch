const FavoriteButton = (favorite: boolean, index: number) => {
  return /*html*/ `
  <img src=${favorite ? './favorite-icon-filled.png' : './favorite-icon-lined.png'} alt="사진" id=${index} class="favorite-button" />
  `;
};

export default FavoriteButton;
