import Header from './components/Header.js';
import createDOMElement from './util/createDomElement.js';

const PlusButton = createDOMElement({
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

addEventListener('load', () => {
  const body = document.querySelector('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton });
  header.classList.add('gnb');
  body.prepend(header);
});
