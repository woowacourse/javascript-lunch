import restaurants from '../../../public/data/restaurants.json';
import createDOMElement from '../../util/createDomElement';
import RestaurantIcon from './RestaurantIcon';
import RestaurantItem from './RestaurantItem';

function RestaurantList() {
  return createDOMElement({
    tag: 'section',
    class: 'restaurant-list-container',
    children: [
      createDOMElement({
        tag: 'ul',
        class: 'restaurant-list',
        children: restaurants.map((restaurant) =>
          RestaurantItem({ ...restaurant, icon: RestaurantIcon(restaurant.icon) }),
        ),
      }),
    ],
  });
}

export default RestaurantList;
