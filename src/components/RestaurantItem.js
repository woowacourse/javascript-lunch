import createDOMElement from '../util/createDomElement.js';

function RestaurantItem({ icon, name, distance, description }) {
  return createDOMElement({
    tag: 'li',
    class: 'restaurant',
    children: [
      createDOMElement({
        tag: 'div',
        class: 'restaurant__category',
        children: [
          createDOMElement({
            tag: 'img',
            src: './category-korean.png',
            alt: '한식',
            class: 'category-icon',
          }),
        ],
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
