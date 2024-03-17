import RestaurantList from '../domain/restaurantList';
import { RestaurantInfo } from '../types/types';
import CategoryIcon from './CategoryIcon';
import FavoriteButton from './FavoriteButton';
import RestaurantDetailModal from './RestaurantDetailModal';

type Props = {
  restaurantInfo: RestaurantInfo;
  restaurantList: RestaurantList;
};

export const RestaurantCard = ({ restaurantInfo, restaurantList }: Props) => {
  const { name, distance, category, isFavorite, link, description } = restaurantInfo;

  const categoryIconComponent = CategoryIcon(category).create();

  const li = document.createElement('li');
  li.classList.add('restaurant');

  const divCategory = document.createElement('div');
  divCategory.classList.add('restaurant__category');
  divCategory.innerHTML = categoryIconComponent.outerHTML;

  const divInfo = document.createElement('div');
  divInfo.classList.add('restaurant__info');

  const h3 = document.createElement('h3');
  h3.classList.add('restaurant__name', 'text-subtitle');
  h3.textContent = name;

  const span = document.createElement('span');
  span.classList.add('restaurant__distance', 'text-body');
  span.textContent = `캠퍼스부터 ${distance}분 내`;

  const p = document.createElement('p');
  p.classList.add('restaurant__description', 'text-body');
  p.textContent = description || '';

  [h3, span, p].forEach((element) => divInfo.appendChild(element));

  li.appendChild(divCategory);
  li.appendChild(divInfo);
  li.appendChild(FavoriteButton({ name, initialIsFavorite: isFavorite }).create());

  const create = () => li;

  li.addEventListener('click', (event: Event) => {
    if (!(event.target as Element).closest('.favorite-button')) {
      const detailModal = RestaurantDetailModal({
        restaurantInfo,
        restaurantList
      }).create();

      document.querySelector('#app')?.appendChild(detailModal);
      document.querySelector('.modal-detail')?.classList.add('modal--open');
    }
  });

  return {
    create
  };
};
