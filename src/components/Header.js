import createDOMElement from '../util/createDomElement.js';

function Header({ title, right }) {
  const header = document.createElement('header');

  // createDOMElement({
  //   tag: 'header',
  //   class: 'gnb__title text-title',
  //   children: [],
  // });
  header.innerHTML =
    /*html*/
    ` <h1 class="gnb__title text-title">${title}</h1>
      `;
  header.appendChild(right);
  header.classList.add('gnb');

  return header;
}

export default Header;
