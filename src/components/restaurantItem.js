import CATEGORY from '../constant/category.js';

export const createRestaurantItem = (restaurant) => {
  const restaurantItem = document.createElement('li');
  const restaurantIcon = createRestaurantIcon(restaurant.getCategory());
  const restaurantInfo = createRestaurantInfo(
    restaurant.getName(),
    restaurant.getDistance(),
    restaurant.getDescription(),
  );

  restaurantItem.classList = 'restaurant';
  restaurantItem.appendChild(restaurantIcon);
  restaurantItem.appendChild(restaurantInfo);

  return restaurantItem;
};

const createRestaurantIcon = (category) => {
  const iconDiv = document.createElement('div');
  const iconImage = document.createElement('img');

  iconDiv.classList = 'restaurant__category';
  iconImage.classList = 'category-icon';

  iconImage.src = getImageSrc(category);
  iconImage.alt = category;

  iconDiv.appendChild(iconImage);

  return iconDiv;
};

const getImageSrc = (category) => {
  if (category === CATEGORY.KOREAN.ALT) return CATEGORY.KOREAN.SRC;
  if (category === CATEGORY.CHINESE.ALT) return CATEGORY.CHINESE.SRC;
  if (category === CATEGORY.JAPANESE.ALT) return CATEGORY.JAPANESE.SRC;
  if (category === CATEGORY.WESTERN.ALT) return CATEGORY.WESTERN.SRC;
  if (category === CATEGORY.ASIAN.ALT) return CATEGORY.ASIAN.SRC;
  if (category === CATEGORY.ETC.ALT) return CATEGORY.ETC.SRC;
};

const createRestaurantInfo = (title, distance, description) => {
  const restaurantInfo = document.createElement('div');
  const restaurantName = document.createElement('h3');
  const restaurantDistance = document.createElement('span');
  const restaurantDescription = document.createElement('p');

  restaurantInfo.classList.add('restaurant__info');
  restaurantName.classList.add('restaurant__name', 'text-subtitle');
  restaurantDistance.classList.add('restaurant__distance', 'text-body');
  restaurantDescription.classList.add('restaurant__description', 'text-body');

  restaurantName.textContent = title;
  restaurantDistance.textContent = distance;
  restaurantDescription.textContent = description;

  restaurantInfo.appendChild(restaurantName);
  restaurantInfo.appendChild(restaurantDistance);
  restaurantInfo.appendChild(restaurantDescription);
  return restaurantInfo;
};
