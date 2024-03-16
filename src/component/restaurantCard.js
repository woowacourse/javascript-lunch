import { KOREAN_CATEGORY } from '../constant/select';
import { createCategoryImage } from './categoryImage';
import { createStarButton } from './starButton';

function createRestaurantCard(restaurant, favoriteRestaurantNames = []) {
  const restaurantCard = render(restaurant, favoriteRestaurantNames);
  return restaurantCard;
}

function render(
  { category, name, walkingTime, description = '' },
  favoriteRestaurantNames
) {
  const categoryDiv = createCategoryImage(category);
  const fragment = new DocumentFragment();
  fragment.append(
    categoryDiv,
    createInfoDiv({ name, walkingTime, description }, favoriteRestaurantNames)
  );
  return fragment;
}

function createInfoDiv(
  { name, walkingTime, description = '' },
  favoriteRestaurantNames
) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'restaurant__info';

  const infoHeader = document.createElement('div');
  infoHeader.className = 'restaurant__info__header';

  const infoHeaderTextArea = document.createElement('div');
  infoHeaderTextArea.className = 'restaurant__info';

  const star = createStarButton(name, favoriteRestaurantNames);

  const restaurantName = document.createElement('h3');
  restaurantName.className = 'restaurant__name text-subtitle';
  restaurantName.textContent = name;

  const restaurantDistance = document.createElement('span');
  restaurantDistance.className = 'restaurant__distance text-body';
  restaurantDistance.textContent = `캠퍼스부터 ${walkingTime}분 내`;

  const restaurantDescription = document.createElement('p');
  restaurantDescription.className = 'restaurant__description text-body';
  restaurantDescription.textContent = description;

  infoHeaderTextArea.append(restaurantName, restaurantDistance);
  infoHeader.append(infoHeaderTextArea, star);
  infoDiv.append(infoHeader, restaurantDescription);

  return infoDiv;
}

export default createRestaurantCard;
