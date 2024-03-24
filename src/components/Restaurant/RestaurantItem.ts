import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';
import createFavoriteIcon from '../FavoriteIcon/FavoriteIcon';

interface Props {
  restaurant: Restaurant;
  onClick: () => void;
  onToggle: (id: string) => void;
}

const createRestaurantItem = ({ restaurant, onClick, onToggle }: Props) => {
  const itemContainer = document.createElement('li');
  itemContainer.classList.add('restaurant');

  const favorite = createFavoriteIcon({ isFavorite: restaurant.isFavorite });

  const category = document.createElement('div');
  category.classList.add('restaurant__category');

  const categoryIcon = document.createElement('img');
  categoryIcon.setAttribute('src', `./category-${CATEGORY_CONVERTER[restaurant.category]}.png`);
  categoryIcon.classList.add('category-icon');
  category.appendChild(categoryIcon);

  const info = document.createElement('div');
  info.classList.add('restaurant__info');

  const infoName = document.createElement('h3');
  infoName.classList.add('restaurant__name', 'text-subtitle');
  infoName.textContent = restaurant.name;
  info.appendChild(infoName);

  const infoDistance = document.createElement('span');
  infoDistance.classList.add('restaurant__distance', 'text-body');
  infoDistance.textContent = `캠퍼스부터 ${restaurant.distance}분 내`;
  info.appendChild(infoDistance);

  if (restaurant.description) {
    const infoDescription = document.createElement('p');
    infoDescription.classList.add('restaurant__description', 'text-body');
    infoDescription.textContent = restaurant.description;
    info.appendChild(infoDescription);
  }

  itemContainer.appendChild(favorite);
  itemContainer.appendChild(category);
  itemContainer.appendChild(info);

  itemContainer.addEventListener('click', () => {
    onClick();
  });

  favorite.addEventListener('click', () => {
    onToggle(restaurant.id);
  });

  return itemContainer;
};

export default createRestaurantItem;
