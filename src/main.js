import Header from './components/Header.js';
import PlusButton from './components/PlusButton.js';
import createDOMElement from './util/createDomElement.js';

addEventListener('load', () => {
  const body = document.querySelector('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);
});
