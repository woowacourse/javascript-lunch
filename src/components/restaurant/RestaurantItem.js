import createDOMElement from '../../util/createDomElement.js';
import DetailModal from '../modal/DetailModal.js';
import Modal from '../Modal.js';
import FavoriteButton from '../button/FavoriteButton.js';

function RestaurantItem({ id, name, distance, description, icon, link, category }) {
  return createDOMElement({
    tag: 'li',
    className: 'restaurant',
    attributes: { 'data-id': id },
    children: [
      createDOMElement({
        tag: 'div',
        className: 'restaurant__category',
        children: [icon.cloneNode(true)]
      }),
      createDOMElement({
        tag: 'div',
        className: 'restaurant__info',
        children: [
          createDOMElement({
            tag: 'h3',
            className: 'restaurant__name text-subtitle',
            textContent: name
          }),
          createDOMElement({
            tag: 'div',
            className: 'restaurant__star',
            children: [FavoriteButton({ id })]
          }),
          createDOMElement({
            tag: 'span',
            className: 'restaurant__distance text-body',
            textContent: `캠퍼스부터 ${distance}분 내`
          }),
          createDOMElement({
            tag: 'p',
            className: 'restaurant__description text-body',
            textContent: description
          })
        ]
      })
    ],
    onClick: () => {
      Modal.open(DetailModal({ id, name, distance, description, link, icon: icon.cloneNode(true) }));
    }
  });
}

export default RestaurantItem;
