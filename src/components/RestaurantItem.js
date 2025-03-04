import createDOMElement from '../util/createDomElement.js';

function RestaurantItem({ name, distance, description, icon }) {
  return createDOMElement({
    tag: 'li',
    class: 'restaurant',
    children: [
      createDOMElement({
        tag: 'div',
        class: 'restaurant__category',
        children: [icon],
      }),
      createDOMElement({
        tag: 'div',
        class: 'restaurant__info',
        children: [
          createDOMElement({
            tag: 'h3',
            class: ['restaurant__name', 'text-subtitle'],
            textContent: name,
          }),
          createDOMElement({
            tag: 'span',
            class: ['restaurant__distance', 'text-body'],
            textContent: `캠퍼스부터 ${distance}분 내`,
          }),
          createDOMElement({
            tag: 'p',
            class: ['restaurant__description', 'text-body'],
            textContent: description,
          }),
        ],
      }),
    ],
  });
}

export default RestaurantItem;
