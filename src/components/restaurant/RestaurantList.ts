import { Restaurant } from '../../types/types';
import createDOMElement from '../../util/createDomElement';
import RestaurantItem from './RestaurantItem';

function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  return createDOMElement({
    tag: 'ul',
    class: 'restaurant-list',
    children: restaurants.map((restaurant) => RestaurantItem({ restaurant })),
  });
}

export default RestaurantList;
