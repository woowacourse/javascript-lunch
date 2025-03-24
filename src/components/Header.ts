import createDOMElement from '../util/createDomElement';

function Header({ title, right }: { title: string; right: HTMLElement }) {
  return createDOMElement({
    tag: 'header',
    class: 'gnb',
    children: [
      createDOMElement({
        tag: 'h1',
        class: 'gnb__title text-title',
        textContent: title,
      }),
      right,
    ],
  });
}

export default Header;
