import { toggleStarButton } from './iconButtons/starButton.js';
import { openModal } from './modal/modal.js';
import createRestaurantCard from './restaurantCard.js';

function createRestaurantList({ restaurantList, toggleFavorite, hasFavorite }) {
  const restaurantListContainer = document.querySelector(
    '.restaurant-list-container'
  );

  restaurantListContainer.replaceChildren();

  if (restaurantList.length === 0) {
    const alertElement = document.createElement('div');
    alertElement.textContent = '음식점이 존재하지 않습니다.';

    restaurantListContainer.append(alertElement);
    return;
  }

  const restaurantListWrapper = document.createElement('ul');
  restaurantListWrapper.className = 'restaurant-list';

  restaurantList.map((restaurant) => {
    const listItem = document.createElement('li');
    listItem.id = restaurant.id;
    listItem.className = 'restaurant';

    createRestaurantCard({
      baseComponent: listItem,
      restaurant,
      hasFavorite,
    });

    const handleFavorite = (restaurantId) => {
      toggleStarButton(restaurantId);
      toggleFavorite(restaurantId);
    };

    listItem.addEventListener('starButtonClick', (event) => {
      const restaurantId = Number(event.currentTarget.id);

      handleFavorite(restaurantId);
    });

    listItem.addEventListener('click', (event) => {
      const isStarButton = [...event.target.classList].some((className) =>
        className.startsWith('star__button')
      );

      if (!isStarButton)
        openModal('restaurantDetail', {
          restaurant,
          hasFavorite,
          handleFavorite,
        });
    });

    restaurantListWrapper.append(listItem);
  });

  restaurantListContainer.appendChild(restaurantListWrapper);
}

export default createRestaurantList;
