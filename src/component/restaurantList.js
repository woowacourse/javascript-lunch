import { toggleStarButton } from './iconButtons/starButton.js';
import { openModal } from './modal/modal.js';
import createRestaurantCard from './restaurantCard.js';

function handleFavorite({ restaurantId, toggleFavorite }) {
  toggleStarButton(restaurantId);
  toggleFavorite(restaurantId);
}

function clearRestaurantListContainer() {
  const alertElement = document.createElement('div');
  alertElement.textContent = '음식점이 존재하지 않습니다.';

  restaurantListContainer.append(alertElement);
}

function renderRestaurantList({ restaurantList, hasFavorite }) {
  const restaurantListWrapper = document.createElement('ul');
  restaurantListWrapper.className = 'restaurant-list';

  restaurantList.forEach((restaurant) => {
    const listItem = document.createElement('li');
    listItem.id = restaurant.id;
    listItem.className = 'restaurant';

    createRestaurantCard({
      baseComponent: listItem,
      restaurant,
      hasFavorite,
    });

    restaurantListWrapper.append(listItem);
  });

  return restaurantListWrapper;
}

function createRestaurantList({ restaurantList, toggleFavorite, hasFavorite }) {
  const restaurantListContainer = document.querySelector(
    '.restaurant-list-container'
  );

  restaurantListContainer.replaceChildren();

  if (restaurantList.length === 0) return clearRestaurantListContainer();

  const restaurantListWrapper = renderRestaurantList({
    restaurantList,
    hasFavorite,
  });

  const restaurantItemList = restaurantListWrapper.querySelectorAll('li');

  restaurantItemList.forEach((restaurantItem, i) => {
    restaurantItem.addEventListener('starButtonClick', (event) => {
      const restaurantId = Number(event.currentTarget.id);

      handleFavorite({ restaurantId, toggleFavorite });
    });

    restaurantItem.addEventListener('click', (event) => {
      const isStarButton = [...event.target.classList].some((className) =>
        className.startsWith('star__button')
      );

      if (!isStarButton)
        openModal('restaurantDetail', {
          restaurant: restaurantList[i],
          hasFavorite,
          handleFavorite,
        });
    });
  });

  restaurantListContainer.appendChild(restaurantListWrapper);
}

export default createRestaurantList;
