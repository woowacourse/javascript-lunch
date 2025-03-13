import createDOMElement from '../../util/createDomElement';
import Modal from '../Modal';
import RestaurantAddModalForm from './RestaurantAddModalForm';

function RestaurantAddModal() {
  return Modal({
    content: createDOMElement({
      tag: 'div',
      class: 'modal-container',
      children: [
        createDOMElement({
          tag: 'h2',
          class: 'modal-title text-title',
          textContent: '새로운 음식점',
        }),
        RestaurantAddModalForm(),
      ],
    }),
  });
}

export default RestaurantAddModal;
