import { KOREAN_CATEGORY } from '../constant/cons';
import { starButton } from './iconButtons/starButton.js';
import createNewRestaurantModal from './modal/addRestaurantModal.js';
import modal from './modal/modalLayout.js';
import createRestaurantDetailModal from './modal/restaurantDetailModal.js';

function createRestaurantCard({ restaurant, baseComponent }) {
  const restaurantCard = render({ ...restaurant, baseComponent });

  restaurantCard.addEventListener('click', (event) => {
    if (event.target.classList.contains('star__button')) {
      starButton.toggle(event.target);
    } else {
      const newRestaurantModalElement = createRestaurantDetailModal();
      const newRestaurantModal = modal.create(
        'modal--open',
        newRestaurantModalElement
      );
      document.body.append(newRestaurantModal);
    }
  });

  return restaurantCard;
}

function render({
  category,
  name,
  walkingTime,
  description = '',
  baseComponent,
}) {
  baseComponent.append(
    createRestaurantCategory(category),
    createRestaurantInfo({ name, walkingTime, description })
  );

  return baseComponent;
}

export function createRestaurantCategory(category) {
  const restaurantCategory = document.createElement('div');
  restaurantCategory.className = 'restaurant__category';

  const categoryImg = document.createElement('img');
  categoryImg.src = `./category-${KOREAN_CATEGORY[category]}.png`;
  categoryImg.alt = category;
  categoryImg.className = 'category-icon';

  restaurantCategory.append(categoryImg);

  return restaurantCategory;
}

export function createRestaurantWalkingTime(walkingTime) {
  const restaurantWalkingTime = document.createElement('span');
  restaurantWalkingTime.className = 'restaurant__distance text-body';
  restaurantWalkingTime.textContent = `캠퍼스부터 ${walkingTime}분 내`;

  return restaurantWalkingTime;
}

function createRestaurantInfo({ name, walkingTime, description = '' }) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'restaurant__info';

  const mainDiv = document.createElement('div');
  mainDiv.className = 'restaurant__info__main';

  const nameAndDistanceDiv = document.createElement('div');

  const restaurantName = document.createElement('h3');
  restaurantName.className = 'restaurant__name text-subtitle';
  restaurantName.textContent = name;

  const restaurantWalkingTime = createRestaurantWalkingTime(walkingTime);

  const favoriteButton = starButton.create({ id: 1 });

  const restaurantDescription = document.createElement('p');
  restaurantDescription.className = 'restaurant__description text-body';
  restaurantDescription.textContent = description;

  nameAndDistanceDiv.appendChild(restaurantName);
  nameAndDistanceDiv.appendChild(restaurantWalkingTime);

  mainDiv.appendChild(nameAndDistanceDiv);
  mainDiv.appendChild(favoriteButton);

  infoDiv.appendChild(mainDiv);
  infoDiv.appendChild(restaurantDescription);

  return infoDiv;
}

export default createRestaurantCard;
