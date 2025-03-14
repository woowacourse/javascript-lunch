import { Restaurant } from '../../types/types';
import createDOMElement from '../../util/createDomElement';

function RestaurantIcon({ category }: { category: Restaurant['category'] }) {
  return createDOMElement({
    tag: 'img',
    src: `images/category-${category}.png`,
    alt: category,
    class: 'category-icon',
  });
}

export default RestaurantIcon;
