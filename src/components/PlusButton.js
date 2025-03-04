import createDOMElement from '../util/createDomElement.js';

function PlusButton() {
  return createDOMElement({
    tag: 'button',
    props: {
      type: 'button',
      class: 'gnb__button',
      'aria-label': '음식점 추가',
    },
    children: [
      createDOMElement({
        tag: 'img',
        props: {
          src: './add-button.png',
          alt: '음식점 추가',
        },
      }),
    ],
  });
}

export default PlusButton;
