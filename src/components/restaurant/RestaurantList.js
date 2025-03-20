import createDOMElement from '../../util/createDomElement.js';
import RestaurantIcon from './RestaurantIcon.js';
import RestaurantItem from './RestaurantItem.js';

function RestaurantList({ restaurants }) {
  return createDOMElement({
    tag: 'section',
    className: 'restaurant-list-container',
    children: [
      createDOMElement({
        tag: 'ul',
        className: 'restaurant-list',
        children: restaurants.map((restaurant) =>
          RestaurantItem({
            ...restaurant,
            icon: RestaurantIcon({ src: restaurant.icon.src, alt: restaurant.category })
          })
        )
      })
    ]
  });
}

export default RestaurantList;
