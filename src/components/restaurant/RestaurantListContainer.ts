import { Restaurant } from '../../types/types';
import createDOMElement from '../../util/createDomElement';
import RestaurantList from './RestaurantList';

function RestaurantListContainer({ restaurants }: { restaurants: Restaurant[] }) {
  return createDOMElement({
    tag: 'section',
    class: 'restaurant-list-container',
    children: [RestaurantList({ restaurants })],
  });
}

export default RestaurantListContainer;
