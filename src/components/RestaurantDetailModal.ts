import restaurantAPI from '../domain/restaurantAPI';
import RestaurantList from '../domain/restaurantList';
import { RestaurantInfo } from '../types/types';
import CategoryIcon from './CategoryIcon';
import FavoriteButton from './FavoriteButton';
import Button from './common/Button';
import Modal from './common/Modal';

type Props = {
  restaurantInfo: RestaurantInfo;
  restaurantList: RestaurantList;
};

const RestaurantDetailModal = ({ restaurantInfo, restaurantList }: Props) => {
  const { category, name, distance, isFavorite, description, link } = restaurantInfo;
  console.log({ category, name, distance, isFavorite, description, link });
  const favoriteButton = FavoriteButton({ name, initialIsFavorite: isFavorite }).create();

  const restaurantNameH3 = document.createElement('h3');
  restaurantNameH3.textContent = name;

  const categoryIconComponent = CategoryIcon(category).create();

  const restaurantDistanceSpan = document.createElement('span');
  restaurantDistanceSpan.classList.add('restaurant__distance', 'text-body');
  restaurantDistanceSpan.textContent = `캠퍼스부터 ${distance}분 내`;

  const restaurantDescriptionP = document.createElement('p');
  restaurantDescriptionP.textContent = description || '';

  const linkA = document.createElement('a');
  linkA.href = link || '';
  linkA.title = `${name} 음식점 관련 링크 사이트`;
  linkA.target = '_blank';
  linkA.textContent = link || '';

  const buttonContainerDiv = document.createElement('div');
  buttonContainerDiv.classList.add('button-container');

  buttonContainerDiv.appendChild(
    Button({
      id: 'restaurant-detail-modal_delete-button',
      text: '삭제하기',
      variant: 'secondary',
      type: 'button'
    }).create()
  );

  buttonContainerDiv.appendChild(
    Button({
      id: 'restaurant-detail-modal_close-button',
      text: '닫기',
      variant: 'primary'
    }).create()
  );

  const modalComponent = Modal({
    modalClass: 'modal-detail',
    modalContainerClass: 'modal-container__detail',
    children: [
      categoryIconComponent,
      favoriteButton,
      restaurantNameH3,
      restaurantDistanceSpan,
      restaurantDescriptionP,
      linkA,
      buttonContainerDiv
    ]
  }).create();

  const deleteRestaurant = () => {
    restaurantAPI.delete(name);
    restaurantList.updateRestaurants();
  };

  const closeModal = () => {
    const modalElement = document.querySelector('.modal-detail');
    modalElement?.classList.remove('modal--open');
    modalElement?.remove();
  };

  buttonContainerDiv
    .querySelector('#restaurant-detail-modal_delete-button')
    ?.addEventListener('click', () => {
      deleteRestaurant();
      closeModal();
    });

  buttonContainerDiv
    .querySelector('#restaurant-detail-modal_close-button')
    ?.addEventListener('click', closeModal);

  const create = () => modalComponent;

  return {
    create
  };
};

export default RestaurantDetailModal;
