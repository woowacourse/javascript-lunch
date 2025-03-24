import createDOMElement from '../../util/createDomElement';
import RestaurantAddModalForm from './RestaurantAddModalForm';

function RestaurantAddModalContent() {
  return createDOMElement({
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
  });
}

export default RestaurantAddModalContent;
