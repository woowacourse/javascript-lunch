const AddButton = () => {
  const handleClick = () => {
    const modal = document.querySelector('.modal');
    modal?.classList.add('modal--open');
  };

  const createButton = () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gnb__button';
    button.setAttribute('aria-label', '음식점 추가');

    return button;
  };

  const createImg = () => {
    const img = document.createElement('img');
    img.src = '../templates/add-button.png';
    img.alt = '음식점 추가';

    return img;
  };

  const configureButton = (button: HTMLButtonElement) => {
    const img = createImg();
    button.appendChild(img);
    button.addEventListener('click', handleClick);
  };

  const button = createButton();
  configureButton(button);

  const create = () => button;

  return {
    create
  };
};

export default AddButton;
