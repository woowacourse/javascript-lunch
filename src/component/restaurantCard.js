import { KOREAN_CATEGORY } from '../constant/cons';
import { starButton } from './iconButtons/starButton.js';

function createRestaurantCard(restaurant) {
  const restaurantCard = render(restaurant);

  return restaurantCard;
}

function render({ category, name, walkingTime, description = '' }) {
  const fragment = new DocumentFragment();
  fragment.append(
    createRestaurantCategory(category),
    createRestaurantInfo({ name, walkingTime, description })
  );

  return fragment;
}

function createRestaurantCategory(category) {
  const restaurantCategory = document.createElement('div');
  restaurantCategory.className = 'restaurant__category';

  const categoryImg = document.createElement('img');
  categoryImg.src = `./category-${KOREAN_CATEGORY[category]}.png`;
  categoryImg.alt = category;
  categoryImg.className = 'category-icon';

  restaurantCategory.append(categoryImg);

  return restaurantCategory;
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

  const restaurantDistance = document.createElement('span');
  restaurantDistance.className = 'restaurant__distance text-body';
  restaurantDistance.textContent = `캠퍼스부터 ${walkingTime}분 내`;

  const favoriteButton = starButton.create({ id: 1 });

  const restaurantDescription = document.createElement('p');
  restaurantDescription.className = 'restaurant__description text-body';
  restaurantDescription.textContent = description;

  nameAndDistanceDiv.appendChild(restaurantName);
  nameAndDistanceDiv.appendChild(restaurantDistance);

  mainDiv.appendChild(nameAndDistanceDiv);
  mainDiv.appendChild(favoriteButton);

  infoDiv.appendChild(mainDiv);
  infoDiv.appendChild(restaurantDescription);

  return infoDiv;
}

export default createRestaurantCard;
