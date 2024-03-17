interface Props {
  favorite: boolean;
  onFavoriteButtonClick?: (event: any) => void;
}

const FavoriteButton = ({ favorite, onFavoriteButtonClick }: Props) => {
  const img = document.createElement('img');
  img.classList.add('favorite-button');
  img.src = favorite ? './favorite-icon-filled.svg' : './favorite-icon-lined.svg';
  img.alt = '사진';

  if (onFavoriteButtonClick) {
    img.addEventListener('click', event => {
      onFavoriteButtonClick(event);
      event.stopPropagation();
    });
  }

  return img;
};

export default FavoriteButton;
