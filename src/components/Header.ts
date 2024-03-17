import AddButton from './AddButton';

const Header = () => {
  const createButton = () => AddButton().create();

  const createHeader = () => {
    const header = document.createElement('header');
    header.className = 'gnb';

    return header;
  };

  const createTitle = () => {
    const h1 = document.createElement('h1');
    h1.className = 'gnb__title text-title';
    h1.textContent = '점심 뭐 먹지';

    return h1;
  };

  const assembleHeader = () => {
    const header = createHeader();
    const title = createTitle();
    const button = createButton();

    header.appendChild(title);
    header.appendChild(button);

    return header;
  };

  const header = assembleHeader();

  const create = () => header;

  return {
    create
  };
};

export default Header;
