import { Restaurant } from '../../types/types';
import createDOMElement from '../../util/createDomElement';
import RestaurantIcon from './RestaurantIcon';

function RestaurantItem({ restaurant }: { restaurant: Restaurant }) {
  return createDOMElement({
    tag: 'li',
    class: 'restaurant',
    'data-id': restaurant.name,
    children: [
      createDOMElement({
        tag: 'div',
        class: 'restaurant__category',
        children: [RestaurantIcon({ category: restaurant.category })],
      }),
      createDOMElement({
        tag: 'div',
        class: 'restaurant__info',
        children: [
          createDOMElement({
            tag: 'h3',
            class: 'restaurant__name text-subtitle',
            textContent: restaurant.name,
          }),
          createDOMElement({
            tag: 'span',
            class: 'restaurant__distance text-body',
            textContent: `캠퍼스부터 ${restaurant.distance}분 내`,
          }),
          createDOMElement({
            tag: 'p',
            class: 'restaurant__description text-body',
            textContent: restaurant.description,
          }),
        ],
      }),
    ],
  });
}

export default RestaurantItem;
