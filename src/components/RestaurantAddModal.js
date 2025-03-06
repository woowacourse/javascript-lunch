import createDOMElement from '../util/createDomElement.js';
import Modal from './Modal.js';
import RestaurantAddModalForm from './modal/RestaurantAddModalForm.js';

function RestaurantAddModal() {
  return Modal({
    content: createDOMElement({
      tag: 'div',
      class: 'modal-container',
      children: [
        createDOMElement({
          tag: 'h2',
          class: ['modal-title', 'text-title'],
          textContent: '새로운 음식점',
        }),
        RestaurantAddModalForm(),
      ],
    }),
  });
}

export default RestaurantAddModal;
