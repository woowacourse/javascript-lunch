import AddButtonComponent from './AddButtonComponent';

export function LunchHeaderComponent() {
  const buttonComponent = AddButtonComponent().create();

  const header = document.createElement('header');
  header.className = 'gnb';

  const h1 = document.createElement('h1');
  h1.className = 'gnb__title text-title';
  h1.textContent = '점심 뭐 먹지';

  header.appendChild(h1);
  header.appendChild(buttonComponent);

  const create = () => header;

  return {
    create
  };
}
