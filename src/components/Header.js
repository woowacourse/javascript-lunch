import createDOMElement from '../util/createDomElement.js';

function Header({ title, right }) {
  return createDOMElement({
    tag: 'header',
    class: 'gnb',
    children: [
      createDOMElement({
        tag: 'h1',
        class: ['gnb__title', 'text-title'],
        textContent: title
      }),
      right
    ]
  });
}

export default Header;
