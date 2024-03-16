import { closeModal, createModalContainer } from './modal';
import { createRestaurantWalkingTime } from '../restaurantCard.js';
import { createStarButton, starButton } from '../iconButtons/starButton.js';
import createRestaurantCategoryIcon from '../restaurantCategoryIcon/restaurantCategoryIcon.js';
import createButton from '../button.js';

const deleteRestaurantInModalEvent = new Event('deleteRestaurantInModal', {
  bubbles: true,
});

function createRestaurantDetailModal({
  restaurant,
  hasFavorite,
  handleFavorite,
}) {
  const container = render({
    ...restaurant,
    hasFavorite,
  });

  container.addEventListener('starButtonClick', () => {
    const { id } = restaurant;

    handleFavorite(id);
  });

  return container;
}

function render({
  id,
  name,
  walkingTime,
  description,
  category,
  link,
  hasFavorite,
}) {
  const container = createModalContainer();
  container.style.gap = '10px';
  container.classList.add(`restaurant__id__${id}`);

  const categoryAndFavoriteButtonContainer = document.createElement('div');
  categoryAndFavoriteButtonContainer.className = 'space__between__row';

  const restaurantCategory = createRestaurantCategoryIcon(category);

  const favoriteButton = createStarButton({
    id,
    initialState: hasFavorite(id),
  });

  favoriteButton.addEventListener('click', () => {});
  categoryAndFavoriteButtonContainer.append(restaurantCategory, favoriteButton);

  const restaurantName = document.createElement('h1');
  restaurantName.innerText = name;

  const restaurantWalkingTime = createRestaurantWalkingTime(walkingTime);

  const restaurantDescription = document.createElement('p');
  restaurantDescription.innerHTML =
    description === ''
      ? '(이 음식점은 설명이 작성되어 있지 않아요.)'
      : description;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';

  const restaurantUrl = document.createElement('a');

  if (link === '') restaurantUrl.textContent = '(이 음식점은 링크가 없어요)';
  else {
    restaurantUrl.href = link.startsWith('https://') ? link : `https://${link}`;
    restaurantUrl.textContent = link;
    restaurantUrl.target = '_blank'; // 새 창에서 링크 열기
  }

  const cancelButton = createButton({
    className: 'button button--secondary text-caption',
    eventType: 'click',
    name: '삭제하기',
    // TODO: 삭제 기능 구현
    callback: () => cancelButton.dispatchEvent(deleteRestaurantInModalEvent),
  });

  const addButton = createButton({
    className: 'button button--primary text-caption',
    eventType: 'click',
    name: '닫기',
    callback: closeModal,
  });

  buttonContainer.append(cancelButton, addButton);

  container.append(
    categoryAndFavoriteButtonContainer,
    restaurantName,
    restaurantWalkingTime,
    restaurantDescription,
    restaurantUrl,
    buttonContainer
  );

  return container;
}

export default createRestaurantDetailModal;
