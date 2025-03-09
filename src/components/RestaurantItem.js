import { CATEGORY_DISPLAY } from '../../public/restaurantData.js';
import createElement from '../utils/createElement.js';

function createTags(data) {
  const categoryImg = createElement({
    tag: 'img',
    className: 'category-icon',
    attributes: {
      src: `./category-${data.category}.png`,
      alt: CATEGORY_DISPLAY[data.category],
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
  const descriptionPara = createElement({
    tag: 'p',
    className: 'restaurant__description text-body',
    textContent: data.description,
  });

  return { categoryImg, nameHeading, distanceSpan, descriptionPara };
}

function createRestaurantItem(data) {
  const restaurantItem = createElement({ tag: 'li', className: 'restaurant' });
  const categoryDiv = createElement({ tag: 'div', className: 'restaurant__category' });
  const infoDiv = createElement({ tag: 'div', className: 'restaurant__info' });

  const { categoryImg, nameHeading, distanceSpan, descriptionPara } = createTags(data);

  categoryDiv.append(categoryImg);
  infoDiv.append(nameHeading, distanceSpan, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);

  return restaurantItem;
}

export default createRestaurantItem;
