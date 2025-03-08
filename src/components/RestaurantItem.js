import createElement from '../utils/createElement.js';

function createTags(data) {
  const categoryImg = createElement('img', 'category-icon', null, {
    src: data.categoryImgSrc,
    alt: data.category,
  });
  const nameHeading = createElement('h3', 'restaurant__name text-subtitle', data.name);
  const distanceSpan = createElement(
    'span',
    'restaurant__distance text-body',
    `캠퍼스부터 ${data.distance}`
  );
  const descriptionPara = createElement('p', 'restaurant__description text-body', data.description);

  return { categoryImg, nameHeading, distanceSpan, descriptionPara };
}

function createRestaurantItem(data) {
  const restaurantItem = createElement('li', 'restaurant');
  const categoryDiv = createElement('div', 'restaurant__category');
  const infoDiv = createElement('div', 'restaurant__info');

  const { categoryImg, nameHeading, distanceSpan, descriptionPara } = createTags(data);

  categoryDiv.append(categoryImg);
  infoDiv.append(nameHeading, distanceSpan, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);

  return restaurantItem;
}

export default createRestaurantItem;
