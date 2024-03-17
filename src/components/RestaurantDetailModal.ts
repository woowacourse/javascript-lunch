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
  const createRestaurantName = (name: string): HTMLElement => {
    const restaurantNameH3 = document.createElement('h3');
    restaurantNameH3.textContent = name;
    return restaurantNameH3;
  };

  const createRestaurantDistance = (distance: number): HTMLElement => {
    const restaurantDistanceSpan = document.createElement('span');
    restaurantDistanceSpan.classList.add('restaurant__distance', 'text-body');
    restaurantDistanceSpan.textContent = `캠퍼스부터 ${distance}분 내`;
    return restaurantDistanceSpan;
  };

  const createRestaurantDescription = (description?: string): HTMLElement => {
    const restaurantDescriptionP = document.createElement('p');
    restaurantDescriptionP.textContent = description || '';
    return restaurantDescriptionP;
  };

  const createRestaurantLink = (name: string, link?: string): HTMLElement => {
    const linkA = document.createElement('a');
    linkA.href = link || '';
    linkA.title = `${name} 음식점 관련 링크 사이트`;
    linkA.target = '_blank';
    linkA.textContent = link || '';
    return linkA;
  };

  const createButtonContainer = (): HTMLElement => {
    const buttonContainerDiv = document.createElement('div');
    buttonContainerDiv.classList.add('button-container');
    return buttonContainerDiv;
  };

  const setupModalActions = (
    buttonContainerDiv: HTMLElement,
    modalComponent: HTMLElement
  ): void => {
    const deleteRestaurant = (): void => {
      restaurantAPI.delete(restaurantInfo.name);
      restaurantList.updateRestaurants();
      closeModal();
    };

    const closeModal = (): void => {
      modalComponent.classList.remove('modal--open');
      modalComponent.remove();
    };

    buttonContainerDiv
      .querySelector('#restaurant-detail-modal_delete-button')
      ?.addEventListener('click', deleteRestaurant);

    buttonContainerDiv
      .querySelector('#restaurant-detail-modal_close-button')
      ?.addEventListener('click', closeModal);
  };

  const assembleButtonContainer = () => {
    const buttonContainerDiv = createButtonContainer();

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

    return buttonContainerDiv;
  };

  const buttonContainer = assembleButtonContainer();

  const modalComponent = Modal({
    modalClass: 'modal-detail',
    modalContainerClass: 'modal-container__detail',
    children: [
      CategoryIcon(restaurantInfo.category).create(),
      FavoriteButton({
        name: restaurantInfo.name,
        initialIsFavorite: restaurantInfo.isFavorite
      }).create(),
      createRestaurantName(restaurantInfo.name),
      createRestaurantDistance(restaurantInfo.distance),
      createRestaurantDescription(restaurantInfo.description),
      createRestaurantLink(restaurantInfo.name, restaurantInfo.link),
      buttonContainer
    ]
  }).create();

  setupModalActions(buttonContainer, modalComponent);

  const create = () => modalComponent;

  return { create };
};

export default RestaurantDetailModal;
