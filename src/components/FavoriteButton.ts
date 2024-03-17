import restaurantAPI from '../domain/restaurantAPI';

type Props = {
  name: string;
  initialIsFavorite: boolean;
};

const FavoriteButton = ({ name, initialIsFavorite }: Props) => {
  let isFavorite = initialIsFavorite;

  const getImgName = (isFavorite: boolean) => `favorite-icon-${isFavorite ? 'filled' : 'lined'}`;

  const createImageElement = (isFavorite: boolean) => {
    const img = document.createElement('img');
    img.classList.add('favorite-icon');
    img.src = `./templates/${getImgName(isFavorite)}.png`;
    img.alt = '즐겨찾기 버튼';
    return img;
  };

  const createFavoriteButton = (img: HTMLImageElement) => {
    const button = document.createElement('button');
    button.classList.add('favorite-button');
    button.appendChild(img);

    button.addEventListener('click', () => {
      isFavorite = !isFavorite;
      img.src = `./templates/${getImgName(isFavorite)}.png`;
      img.alt = isFavorite ? '즐겨찾기 해제 버튼' : '즐겨찾기 버튼';
      restaurantAPI.updateFavorite(name);
    });

    return button;
  };

  const assembleFavoriteButton = () => {
    const imgElement = createImageElement(isFavorite);
    const favoriteButton = createFavoriteButton(imgElement);

    return favoriteButton;
  };

  const favoriteButton = assembleFavoriteButton();
  const create = () => favoriteButton;

  return { create };
};

export default FavoriteButton;
