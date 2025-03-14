import { Restaurant } from '../../types/types';
import createDOMElement from '../../util/createDomElement';
import RestaurantIcon from '../restaurant/RestaurantIcon';

function RestaurantDetailInfo({ restaurant }: { restaurant: Restaurant }) {
  return createDOMElement({
    tag: 'div',
    class: 'restaurant-detail-container',
    children: [
      createDOMElement({
        tag: 'div',
        class: 'restaurant__category',
        children: [RestaurantIcon({ category: restaurant.category })],
      }),
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
        class: 'text-body',
        textContent: restaurant.description,
      }),
      createDOMElement({
        tag: 'p',
        class: 'restaurant__link text-body',
        textContent: restaurant.link,
      }),
    ],
  });
}

export default RestaurantDetailInfo;
