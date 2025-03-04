import CATEGORY from '../constant/category.js';

const createRestaurantIcon = (category) => {
  const iconDiv = document.createElement('div');
  const iconImage = document.createElement('img');

  iconDiv.classList = 'retaurant__category';
  iconImage.classList = 'category__icon';

  iconImage.src = getImageSrc(category);
  iconImage.alt = category;

  iconDiv.appendChild(iconImage);

  return iconDiv;
};

const getImageSrc = (category) => {
  if (category === '한식') return CATEGORY.KOREAN.SRC;
  if (category === '중식') return CATEGORY.CHINESE.SRC;
  if (category === '일식') return CATEGORY.JAPANESE.SRC;
  if (category === '양식') return CATEGORY.WESTERN.SRC;
  if (category === '아시안') return CATEGORY.ASIAN.SRC;
  if (category === '기타') return CATEGORY.ETC.SRC;
};

const restaurantInfo = (title, distance, description) => {
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

  restaurantInfo.appendChild(restaurantName, restaurantDistance, restaurantDescription);

  return restaurantInfo;
};
