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
    `캠퍼스부터 ${data.distance}분 내`
  );

  const starImg = createElement('div', 'restaurant__star');

  const descriptionPara = createElement('p', 'restaurant__description text-body', data.description);

  return { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara };
}

function createRestaurantItem(data) {
  const restaurantItem = createElement('li', 'restaurant');
  const categoryDiv = createElement('div', 'restaurant__category');
  const infoDiv = createElement('div', 'restaurant__info');
  const titleDiv = createElement('div', 'restaurant__title');
  const flexDiv = createElement('div', 'flex');

  const { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara } = createTags(data);

  starImg.addEventListener('click', () => {
    starImg.classList.toggle('favorite');
  });

  categoryDiv.append(categoryImg);
  titleDiv.append(nameHeading, distanceSpan);
  flexDiv.append(titleDiv, starImg);
  infoDiv.append(flexDiv, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);

  return restaurantItem;
}

export default createRestaurantItem;
