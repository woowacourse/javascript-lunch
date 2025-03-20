import ActionButton from '../button/ActionButton.js';
import CTAButton from '../button/CTAButton.js';
import createDOMElement from '../../util/createDomElement.js';
import Modal from '../Modal.js';
import FavoriteButton from '../button/FavoriteButton.js';
import { removeRestaurant } from '../../service/restaurantService.ts';

function DetailModal({ id, name, distance, description, link, icon }) {
  return createDOMElement({
    tag: 'div',
    className: 'modal-container detail-modal',
    children: [
      icon,
      createDOMElement({
        tag: 'h3',
        className: 'restaurant__name text-subtitle',
        textContent: name
      }),
      FavoriteButton({ id }),
      createDOMElement({
        tag: 'span',
        className: 'restaurant__distance text-body',
        textContent: `캠퍼스부터 ${distance}분 내`
      }),
      createDOMElement({
        tag: 'p',
        className: 'text-body',
        textContent: description
      }),
      createDOMElement({
        tag: 'a',
        className: 'modal-link text-body',
        href: link,
        textContent: link,
        target: '_blank'
      }),
      createDOMElement({
        tag: 'div'
      }),
      createDOMElement({
        tag: 'div',
        className: 'button-container',
        children: [
          ActionButton({
            text: '삭제하기',
            onClick: () => {
              removeRestaurant(id);
              Modal.close();
            }
          }),
          CTAButton({ text: '닫기', onClick: () => Modal.close() })
        ]
      })
    ]
  });
}

export default DetailModal;
