import createElement from '../utils/createElement.js';

function createTags(data) {
  const categoryImg = createElement({
    tag: 'img',
    className: 'category-icon',
    attributes: {
      src: `./images/category-${data.category}.png`,
      alt: data.category,
    },
  });
  const nameHeading = createElement({
    tag: 'h3',
    className: 'restaurant__name text-subtitle',
    textContent: data.name,
  });
  const distanceSpan = createElement({
    tag: 'span',
    className: 'restaurant__distance text-body',
    textContent: `캠퍼스부터 ${data.distance}분 내`,
  });
  const starImg = createElement({
    tag: 'div',
    className: `restaurant__star${data.isFavorite ? ' restaurant__star--clicked' : ''}`,
  });
  const descriptionPara = createElement({
    tag: 'p',
    className: 'restaurant__description text-body',
    textContent: data.description,
  });

  return { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara };
}

function createRestaurantItem({ data, onClickItem, onClickStar, detail = false }) {
  const restaurantItem = createElement({ tag: 'li', className: 'restaurant' });
  const categoryDiv = createElement({ tag: 'div', className: 'restaurant__category' });
  const infoDiv = createElement({ tag: 'div', className: 'restaurant__info' });
  const titleDiv = createElement({ tag: 'div', className: 'restaurant__title' });
  const flexDiv = createElement({ tag: 'div', className: 'flex' });

  const { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara } = createTags(data);

  if (onClickItem) {
    restaurantItem.addEventListener('click', (event) => {
      onClickItem(event, data);
    });
  }

  if (onClickStar) {
    starImg.addEventListener('click', (event) => {
      event.stopPropagation();
      onClickStar(event, data.id);
    });
  }

  if (detail) {
    descriptionPara.classList.remove('restaurant__description');
    descriptionPara.classList.add('restaurant__detail__description');
  }

  categoryDiv.append(categoryImg);
  titleDiv.append(nameHeading, distanceSpan);
  flexDiv.append(titleDiv, starImg);
  infoDiv.append(flexDiv, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);

  return restaurantItem;
}

export default createRestaurantItem;
