import createDOMElement from '../util/createDomElement.js';

function Header({ title, right }) {
  return createDOMElement({
    tag: 'header',
    props: {
      class: 'gnb',
    },
    children: [
      createDOMElement({
        tag: 'h1',
        props: {
          class: ['gnb__title', 'text-title'],
          textContent: title,
        },
      }),
      right,
    ],
  });
}

export default Header;
