import Header from './components/Header.js';
import PlusButton from './components/PlusButton.js';
import RestaurantIcon from './components/RestaurantIcon.js';
import RestaurantItem from './components/RestaurantItem.js';
import createDOMElement from './util/createDomElement.js';
import restaurants from '../public/data/restaurants.json';

addEventListener('load', () => {
  const body = document.querySelector('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);

  const restaurantList = document.querySelector('.restaurant-list');

  restaurants.forEach((restaurant) => {
    restaurantList.appendChild(RestaurantItem({ ...restaurant, icon: RestaurantIcon(restaurant.icon) }));
  });
});
