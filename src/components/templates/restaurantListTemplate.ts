import { FavoriteImage, ImageByCategory } from '@res/images/imageByCategory';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';

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
  return `<img src=${ImageByCategory[category]} alt=${category} class="category-icon"/>`;
};

const favoriteImageTemplate = (favorite: boolean): string => {
  return `<img src=${
    favorite ? FavoriteImage.favoriteOn : FavoriteImage.favoriteOff
  } alt='즐겨찾기' class="favorite-icon ${favorite ? 'favorite' : ''}"/>`;
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
      ${favoriteImageTemplate(favorite)}
    </div>
  </li>`;
};

const listTemplate = (restaurantList: IRestaurant[]): string => {
  return restaurantList.map(handleCreateList).join('');
};

export default listTemplate;
