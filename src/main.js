import Header from './components/Header.js';
import PlusButton from './components/PlusButton.js';
import RestaurantIcon from './components/RestaurantIcon.js';
import RestaurantItem from './components/RestaurantItem.js';
import RestaurantList from './components/RestaurantList.js';
import createDOMElement from './util/createDomElement.js';

addEventListener('load', () => {
  const body = document.querySelector('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);

  const main = document.querySelector('main');

  main.appendChild(RestaurantList());
});
