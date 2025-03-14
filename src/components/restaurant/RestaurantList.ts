import { Restaurant } from './../../types/types';
import createDOMElement from '../../util/createDomElement';
import RestaurantIcon from './RestaurantIcon';
import RestaurantItem from './RestaurantItem';

function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  return createDOMElement({
    tag: 'section',
    class: 'restaurant-list-container',
    children: [
      createDOMElement({
        tag: 'ul',
        class: 'restaurant-list',
        children: restaurants.map((restaurant) =>
          RestaurantItem({ ...restaurant, icon: RestaurantIcon({ category: restaurant.category }) }),
        ),
      }),
    ],
  });
}

export default RestaurantList;
