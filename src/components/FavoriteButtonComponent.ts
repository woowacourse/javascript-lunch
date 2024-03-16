import restaurantAPI from '../domain/restaurantAPI';

type Props = {
  name: string;
  initialIsFavorite: boolean;
};

const getImgName = (isFavorite: boolean) => `favorite-icon-${isFavorite ? 'filled' : 'lined'}`;

const FavoriteButton = ({ name, initialIsFavorite }: Props) => {
  const button = document.createElement('button');
  const img = document.createElement('img');
  let isFavorite = initialIsFavorite;
  let imgName = getImgName(isFavorite);
  button.appendChild(img);

  img.classList.add('favorite-icon');
  img.src = `./templates/${imgName}.png`;
  img.alt = '즐겨찾기 버튼';

  const updateImage = () => {
    isFavorite = !isFavorite;
    imgName = getImgName(isFavorite);
    img.src = `./templates/${imgName}.png`;
    img.alt = isFavorite ? '즐겨찾기 해제 버튼' : '즐겨찾기 버튼';

    console.log('클릭됨');
  };

  button.addEventListener('click', () => {
    updateImage();
    restaurantAPI.updateFavorite(name);
  });

  const create = () => button;

  return {
    create
  };
};

export default FavoriteButton;
