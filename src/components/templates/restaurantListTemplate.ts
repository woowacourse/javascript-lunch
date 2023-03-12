import { FavoriteImage, ImageByCategory } from '@res/images/imageByCategory';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';
import { iconImageTemplate } from './iconImage';

const descriptionTemplate = (description: string): string => {
  return `<p class="restaurant__description text-body">${description}</p>`;
};

const distanceTemplate = (distance: string): string => {
  return `<span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>`;
};

const titleTemplate = (name: string): string => {
  return `<h3 class="restaurant__name text-subtitle">${name}</h3>`;
};

const categoryImageTemplate = (category: string): string => {
  return iconImageTemplate(
    { src: ImageByCategory[category], alt: category },
    { className: 'category-icon' }
  );
};

const favoriteImage = (favorite: boolean): string => {
  return iconImageTemplate(
    {
      src: favorite ? FavoriteImage.favoriteOn : FavoriteImage.favoriteOff,
      alt: '즐겨 찾는 음식점 토글 이미지',
    },
    { className: `favorite-icon ${favorite ? 'favorite' : ''}` }
  );
};

const handleCreateList = ({
  id,
  category,
  name,
  distance,
  description,
  favorite,
}: IRestaurant): string => {
  return `
  <li data-id = ${id} class="restaurant">
    <div class="restaurant__category">
      ${categoryImageTemplate(category)}
    </div>
    <div class="restaurant__info">
      ${titleTemplate(name)}
      ${Number(distance) !== 0 ? distanceTemplate(distance) : ''}
      ${descriptionTemplate(description)}
    </div>
    <div class="restaurant__favorite"> 
      ${favoriteImage(favorite)}
    </div>
  </li>`;
};

const listTemplate = (restaurantList: IRestaurant[]): string => {
  return restaurantList.map(handleCreateList).join('');
};

export default listTemplate;
