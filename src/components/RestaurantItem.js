import createDOMElement from '../util/createDomElement.js';

function RestaurantItem({ icon, name, distance, description }) {
  return createDOMElement({
    tag: 'li',
    props: {
      class: 'restaurant',
    },
    children: [
      createDOMElement({
        tag: 'div',
        props: {
          class: 'restaurant__category',
        },
        children: [
          createDOMElement({
            tag: 'img',
            props: {
              src: './category-korean.png',
              alt: '한식',
              class: 'category-icon',
            },
          }),
        ],
      }),
      createDOMElement({
        tag: 'div',
        props: {
          class: 'restaurant__info',
        },
        children: [
          createDOMElement({
            tag: 'h3',
            props: {
              class: ['restaurant__name', 'text-subtitle'],
              textContent: name,
            },
          }),
          createDOMElement({
            tag: 'span',
            props: {
              class: ['restaurant__distance', 'text-body'],
              textContent: `캠퍼스부터 ${distance}분 내`,
            },
          }),
          createDOMElement({
            tag: 'p',
            props: {
              class: ['restaurant__description', 'text-body'],
              textContent: description,
            },
          }),
        ],
      }),
    ],
  });
}
