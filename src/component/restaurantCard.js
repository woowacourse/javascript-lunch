import { KOREAN_CATEGORY } from '../constant/cons';

function createRestaurantCard(restaurant) {
  const restaurantCard = render(restaurant);

  return restaurantCard;
}

function render({ category, name, walkingTime, description = '' }) {
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'restaurant__category';

  categoryDiv.append(createCategoryImage(), createInfoDiv());

  return categoryDiv;
}

function createInfoDiv({ name, walkingTime, description = '' }) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'restaurant__info';
  const restaurantName = document.createElement('h3');
  restaurantName.className = 'restaurant__name text-subtitle';
  restaurantName.textContent = name;

  const restaurantDistance = document.createElement('span');
  restaurantDistance.className = 'restaurant__distance text-body';
  restaurantDistance.textContent = `캠퍼스부터 ${walkingTime}분 내`;

  const restaurantDescription = document.createElement('p');
  restaurantDescription.className = 'restaurant__description text-body';
  restaurantDescription.textContent = description;
  return infoDiv;
}

function createCategoryImage(category) {
  const categoryImg = document.createElement('img');
  categoryImg.src = `./category-${KOREAN_CATEGORY.category}.png`;
  categoryImg.alt = category;
  categoryImg.className = 'category-icon';
}
