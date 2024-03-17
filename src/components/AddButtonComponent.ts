const AddButtonComponent = () => {
  const handleClick = () => {
    const modal = document.querySelector('.modal');
    modal?.classList.add('modal--open');
  };

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'gnb__button';
  button.setAttribute('aria-label', '음식점 추가');

  const img = document.createElement('img');
  img.src = '../templates/add-button.png';
  img.alt = '음식점 추가';

  button.appendChild(img);
  button.addEventListener('click', handleClick);

  const create = () => button;

  return {
    create
    // handleClick
  };
};

export default AddButtonComponent;
