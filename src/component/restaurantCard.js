import createRestaurantCategoryIcon from './restaurantCategoryIcon/restaurantCategoryIcon.js';
import { createStarButton } from './iconButtons/starButton.js';

function createRestaurantCard({ restaurant, baseComponent, hasFavorite }) {
  const restaurantCard = render({
    ...restaurant,
    baseComponent,
    hasFavorite,
  });

  return restaurantCard;
}

function render({
  id,
  category,
  name,
  walkingTime,
  description = '',
  baseComponent,
  hasFavorite,
}) {
  baseComponent.append(
    createRestaurantCategoryIcon(category),
    createRestaurantInfo({ id, name, walkingTime, description, hasFavorite })
  );

  return baseComponent;
}

export function createRestaurantWalkingTime(walkingTime) {
  const restaurantWalkingTime = document.createElement('span');
  restaurantWalkingTime.className = 'restaurant__distance text-body';
  restaurantWalkingTime.textContent = `캠퍼스로부터 ${walkingTime}분 내`;

  return restaurantWalkingTime;
}

function createRestaurantInfo({
  id,
  name,
  walkingTime,
  description = '',
  hasFavorite,
}) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'restaurant__info';

  const mainDiv = document.createElement('div');
  mainDiv.className = 'restaurant__info__main';

  const nameAndDistanceDiv = document.createElement('div');

  const restaurantName = document.createElement('h3');
  restaurantName.className = 'restaurant__name text-subtitle';
  restaurantName.textContent = name;

  const favoriteButton = createStarButton({
    id,
    initialState: hasFavorite(id),
  });

  const restaurantWalkingTime = createRestaurantWalkingTime(walkingTime);


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
