import Header from './components/Header.js';
import Modal from './components/Modal.js';
import PlusButton from './components/PlusButton.js';
import RestaurantAddModal from './components/RestaurantAddModal.js';
import RestaurantIcon from './components/RestaurantIcon.js';
import RestaurantItem from './components/RestaurantItem.js';
import RestaurantList from './components/RestaurantList.js';
import createDOMElement from './util/createDomElement.js';
import { lockScroll, unlockScroll } from './util/scroll.js';
import { $ } from './util/selector.js';

addEventListener('load', () => {
  const body = $('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);

  const main = $('main');

  main.appendChild(RestaurantList());

  const { modal: restaurantAddModal, open } = RestaurantAddModal();

  main.appendChild(restaurantAddModal);

  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', () => {
    open();
  });
});
