import createElement from '../utils/createElement.js';

function createRestaurantItem(data) {
  const restaurantItem = createElement('li', 'restaurant');
  const categoryDiv = createElement('div', 'restaurant__category');
  const categoryImg = createElement('img', 'category-icon', null, {
    src: data.categoryImgSrc,
    alt: data.category,
  });
  const infoDiv = createElement('div', 'restaurant__info');
  const nameHeading = createElement('h3', 'restaurant__name text-subtitle', data.name);
  const distanceSpan = createElement(
    'span',
    'restaurant__distance text-body',
    `캠퍼스부터 ${data.distance}`
  );
  const descriptionPara = createElement('p', 'restaurant__description text-body', data.description);

  categoryDiv.appendChild(categoryImg);
  infoDiv.append(nameHeading, distanceSpan, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);

  return restaurantItem;
}

export default createRestaurantItem;
