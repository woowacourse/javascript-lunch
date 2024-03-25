const FavoriteImage = (favorite: boolean) => {
  const img = document.createElement('img');
  img.classList.add('favorite-button');
  img.src = favorite ? './favorite-icon-filled.svg' : './favorite-icon-lined.svg';
  img.alt = '사진';

  return img;
};

export default FavoriteImage;
